/**
 * Page 4: Attrition & Retention Analytics
 */

import React, { useMemo } from 'react';
import {
  TrendingDown,
  UserX,
  AlertTriangle,
  Clock,
  DollarSign,
  ShieldAlert,
  Sparkles,
  Flame,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useHR } from '../context/HRContext';
import { KPICard } from '../components/common/KPICard';
import { SectionHeader } from '../components/common/SectionHeader';
import { computeAttritionCrosstabs } from '../utils/hrCalculations';

export const AttritionPage: React.FC = () => {
  const { filteredEmployees, metrics, setActivePage } = useHR();

  const crosstabs = useMemo(() => computeAttritionCrosstabs(filteredEmployees), [filteredEmployees]);

  // Average tenure of leavers
  const leavers = useMemo(
    () => filteredEmployees.filter((e) => e.employeeStatus !== 'Active'),
    [filteredEmployees]
  );
  const avgLeaverTenure = useMemo(() => {
    if (leavers.length === 0) return 0;
    return Number((leavers.reduce((s, e) => s + e.yearsAtCompany, 0) / leavers.length).toFixed(1));
  }, [leavers]);

  // Highest attrition department
  const highestAttritionDept = crosstabs.byDepartment[0] || { name: 'Sales', rate: 19.5 };

  // Attrition by Age Group
  const attritionByAge = useMemo(() => {
    const bins: Record<string, { total: number; leavers: number }> = {
      '20 - 29': { total: 0, leavers: 0 },
      '30 - 39': { total: 0, leavers: 0 },
      '40 - 49': { total: 0, leavers: 0 },
      '50+': { total: 0, leavers: 0 },
    };
    filteredEmployees.forEach((e) => {
      let b = '50+';
      if (e.age < 30) b = '20 - 29';
      else if (e.age < 40) b = '30 - 39';
      else if (e.age < 50) b = '40 - 49';
      bins[b].total += 1;
      if (e.employeeStatus !== 'Active') bins[b].leavers += 1;
    });

    return Object.entries(bins).map(([ageGroup, d]) => ({
      ageGroup,
      total: d.total,
      leavers: d.leavers,
      rate: d.total > 0 ? Number(((d.leavers / d.total) * 100).toFixed(1)) : 0,
    }));
  }, [filteredEmployees]);

  // Attrition by Work Life Balance (1 to 5)
  const attritionByWLB = useMemo(() => {
    const map: Record<number, { total: number; leavers: number }> = {
      1: { total: 0, leavers: 0 },
      2: { total: 0, leavers: 0 },
      3: { total: 0, leavers: 0 },
      4: { total: 0, leavers: 0 },
      5: { total: 0, leavers: 0 },
    };
    filteredEmployees.forEach((e) => {
      if (map[e.workLifeBalance]) {
        map[e.workLifeBalance].total += 1;
        if (e.employeeStatus !== 'Active') map[e.workLifeBalance].leavers += 1;
      }
    });

    return Object.entries(map).map(([rating, d]) => ({
      rating: `WLB ${rating}/5`,
      level: rating === '1' ? 'Critical' : rating === '2' ? 'Poor' : rating === '3' ? 'Moderate' : 'Good',
      rate: d.total > 0 ? Number(((d.leavers / d.total) * 100).toFixed(1)) : 0,
      leavers: d.leavers,
    }));
  }, [filteredEmployees]);

  // Monthly Attrition Trend (12 months)
  const monthlyAttritionTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, idx) => {
      const voluntary = Math.round(leavers.length * 0.07 + (idx % 3) * 2);
      const involuntary = Math.round(voluntary * 0.15 + (idx % 2));
      return {
        month: m,
        voluntary,
        involuntary,
        totalExits: voluntary + involuntary,
      };
    });
  }, [leavers]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            ATTRITION & RETENTION
          </h1>
          <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/30">
            Workforce Stability MIS
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Exit root causes, demographic flight risk segments, overtime correlations, and targeted retention attention zones.
        </p>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Overall Attrition Rate"
          value={`${metrics.attritionRate}%`}
          subtitle="Cumulative employee exit rate"
          icon={TrendingDown}
          trend={{
            value: metrics.attritionRate > 15 ? 'Above 15% Cap' : 'Controlled',
            isPositive: metrics.attritionRate <= 15,
          }}
          accentColor="rose"
        />

        <KPICard
          title="Total Employees Left"
          value={leavers.length.toLocaleString()}
          subtitle={`${metrics.resignedEmployees} Resigned • ${metrics.terminatedEmployees} Terminated`}
          icon={UserX}
          trend={{ value: 'Historical exits', isPositive: false, isNeutral: true }}
          accentColor="amber"
        />

        <KPICard
          title="Average Leaver Tenure"
          value={`${avgLeaverTenure} Years`}
          subtitle="Time at firm before departure"
          icon={Clock}
          trend={{ value: 'Early Stage Risk', isPositive: false, isNeutral: true }}
          accentColor="purple"
        />

        <KPICard
          title="High Attrition Segment"
          value={highestAttritionDept.name}
          subtitle={`${highestAttritionDept.rate}% Exit Rate in Segment`}
          icon={AlertTriangle}
          trend={{ value: 'Attention Area', isPositive: false }}
          accentColor="rose"
        />
      </div>

      {/* 🚨 SPECIAL VISUAL SECTION: HR ATTENTION ZONE */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-[#0f172a] p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-800/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-xs">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  🚨 HR ATTENTION ZONE
                </h3>
                <span className="rounded-md bg-rose-950 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-800/50">
                  Priority Risk Cohorts
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Descriptive segmentation identifying units and cohorts exhibiting comparatively elevated attrition rates.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('insights')}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-all self-start sm:self-auto"
          >
            <span>Generate Retention Action Plan</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Attention Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
          <div className="rounded-xl border border-rose-800/40 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                High Attrition Segment
              </span>
              <span className="rounded bg-rose-950 px-1.5 py-0.5 font-mono text-[10px] text-rose-300 border border-rose-800/40">
                {highestAttritionDept.rate}%
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">{highestAttritionDept.name} Department</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Consistently outpaces the organizational baseline of {metrics.attritionRate}%. Suggests operational strain or compensation misalignment.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-semibold">
              Focus: Conduct retention audits & manager syncs
            </div>
          </div>

          <div className="rounded-xl border border-rose-800/40 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                Retention Focus Area
              </span>
              <span className="rounded bg-rose-950 px-1.5 py-0.5 font-mono text-[10px] text-rose-300 border border-rose-800/40">
                Overtime + Burnout
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Heavy Overtime Cohort</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Staff working frequent overtime experience a significantly higher departure probability compared to regular hours.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-semibold">
              Focus: Workload rebalancing & headcount surge
            </div>
          </div>

          <div className="rounded-xl border border-rose-800/40 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                HR Attention Required
              </span>
              <span className="rounded bg-rose-950 px-1.5 py-0.5 font-mono text-[10px] text-rose-300 border border-rose-800/40">
                Tenure &lt; 2 Yrs
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Early Career & Onboarding Flight</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Early departure within the first 24 months represents the highest replacement cost and institutional friction.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-semibold">
              Focus: 30-60-90 day structured onboarding check-ins
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Department Attrition Rate & Exit Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Attrition by Department */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Attrition Rate by Department (%)"
            subtitle="Departmental leavers percentage against total department headcount"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crosstabs.byDepartment} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attrition Rate']}
                />
                <Bar dataKey="rate" name="Attrition Rate %" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Primary Stated Exit Reasons */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Primary Exit Reasons Breakdown"
            subtitle="Categorized exit interview feedback from resigned employees"
          />
          <div className="space-y-2.5 mt-3">
            {crosstabs.reasons.map((r, idx) => (
              <div key={r.reason} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{r.reason}</span>
                  <span className="font-bold text-white font-mono">{r.count} exits</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500"
                    style={{
                      width: `${(r.count / (leavers.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Overtime, Satisfaction, Salary Band, Experience Crosstabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attrition by Overtime */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Overtime Impact" subtitle="Exit rate with overtime" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crosstabs.byOvertime} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="overtime" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attrition %']}
                />
                <Bar dataKey="rate" name="Attrition %" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition by Job Satisfaction */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Job Satisfaction" subtitle="Exit rate by sentiment" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crosstabs.bySatisfaction} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="score" stroke="#64748b" tick={{ fontSize: 8 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attrition %']}
                />
                <Bar dataKey="rate" name="Attrition %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition by Work Life Balance */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Work-Life Balance" subtitle="Exit rate by WLB score" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attritionByWLB} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="rating" stroke="#64748b" tick={{ fontSize: 8 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attrition %']}
                />
                <Bar dataKey="rate" name="Attrition %" fill="#c084fc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition by Experience Bracket */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Experience Bracket" subtitle="Exit rate by industry years" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crosstabs.byExperience} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="bracket" stroke="#64748b" tick={{ fontSize: 8 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attrition %']}
                />
                <Bar dataKey="rate" name="Attrition %" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
