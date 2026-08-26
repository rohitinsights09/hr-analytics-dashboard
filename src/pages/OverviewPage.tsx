/**
 * Page 1: HR Executive Overview
 */

import React, { useMemo } from 'react';
import {
  Users,
  UserCheck,
  TrendingDown,
  UserPlus,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Building,
  ShieldAlert,
  ArrowRight,
  PieChart as PieIcon,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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
import {
  computeDepartmentBreakdown,
  computeHeadcountTrend,
  computeRecruitmentFunnel,
} from '../utils/hrCalculations';

export const OverviewPage: React.FC = () => {
  const { filteredEmployees, filteredCandidates, metrics, setActivePage, setSelectedEmployee } = useHR();

  const headcountTrend = useMemo(() => computeHeadcountTrend(filteredEmployees), [filteredEmployees]);
  const deptData = useMemo(() => computeDepartmentBreakdown(filteredEmployees), [filteredEmployees]);
  const funnelData = useMemo(() => computeRecruitmentFunnel(filteredCandidates), [filteredCandidates]);

  // Employee status distribution for Donut Chart
  const statusPieData = useMemo(() => {
    return [
      { name: 'Active', value: metrics.activeEmployees, color: '#10b981' },
      { name: 'Resigned', value: metrics.resignedEmployees, color: '#f59e0b' },
      { name: 'Terminated', value: metrics.terminatedEmployees, color: '#f43f5e' },
    ];
  }, [metrics]);

  // Top Job Roles by Headcount
  const topJobRoles = useMemo(() => {
    const roleMap: Record<string, { count: number; dept: string; totalSalary: number }> = {};
    filteredEmployees.forEach((e) => {
      if (!roleMap[e.jobRole]) {
        roleMap[e.jobRole] = { count: 0, dept: e.department, totalSalary: 0 };
      }
      roleMap[e.jobRole].count += 1;
      roleMap[e.jobRole].totalSalary += e.monthlyIncome;
    });

    return Object.entries(roleMap)
      .map(([role, d]) => ({
        role,
        dept: d.dept,
        headcount: d.count,
        avgSalary: Math.round(d.totalSalary / d.count),
      }))
      .sort((a, b) => b.headcount - a.headcount)
      .slice(0, 6);
  }, [filteredEmployees]);

  // Real-time computed HR Observations
  const computedObservations = useMemo(() => {
    const obs: string[] = [];
    if (deptData.length > 0) {
      const topDept = deptData[0];
      obs.push(
        `${topDept.department} constitutes the largest workforce segment with ${topDept.headcount} employees (${(
          (topDept.headcount / (filteredEmployees.length || 1)) *
          100
        ).toFixed(1)}% share).`
      );
    }

    if (metrics.attritionRate > 12) {
      obs.push(
        `Current company attrition rate stands at ${metrics.attritionRate}%, warranting targeted retention focus in operational and high-workload units.`
      );
    } else {
      obs.push(
        `Overall attrition remains healthy at ${metrics.attritionRate}%, within standard benchmark thresholds.`
      );
    }

    if (metrics.openPipelineCandidates > 500) {
      obs.push(
        `Recruitment velocity is robust with ${metrics.openPipelineCandidates.toLocaleString()} active candidates progressing through sourcing and interview pipelines.`
      );
    }

    const highSatCount = filteredEmployees.filter((e) => e.jobSatisfaction >= 4).length;
    const highSatPct = filteredEmployees.length > 0 ? ((highSatCount / filteredEmployees.length) * 100).toFixed(1) : 0;
    obs.push(
      `${highSatPct}% of surveyed employees report high job satisfaction (scores of 4 or 5 out of 5.0).`
    );

    return obs;
  }, [deptData, filteredEmployees, metrics]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
              HR EXECUTIVE OVERVIEW
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
              Live MIS View
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            A real-time style view of workforce, recruitment and employee metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('insights')}
            className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-300 hover:bg-purple-500/20 transition-all shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            <span>Strategic Insights</span>
          </button>
        </div>
      </div>

      {/* 8 Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          id="kpi-total-emp"
          title="Total Employees"
          value={metrics.totalEmployees.toLocaleString()}
          subtitle="Cumulative talent database"
          icon={Users}
          trend={{ value: '+4.8% YoY', isPositive: true }}
          accentColor="blue"
          sparklineData={[1200, 1260, 1310, 1380, 1440, 1500]}
          onClick={() => setActivePage('workforce')}
        />

        <KPICard
          id="kpi-active-emp"
          title="Active Headcount"
          value={metrics.activeEmployees.toLocaleString()}
          subtitle={`${((metrics.activeEmployees / (metrics.totalEmployees || 1)) * 100).toFixed(1)}% of total workforce`}
          icon={UserCheck}
          trend={{ value: '+28 MTD', isPositive: true }}
          accentColor="emerald"
          sparklineData={[1100, 1140, 1180, 1220, 1250, 1280]}
          onClick={() => setActivePage('workforce')}
        />

        <KPICard
          id="kpi-new-hires"
          title="New Hires (YTD)"
          value={metrics.newHiresYTD.toLocaleString()}
          subtitle="Tenure ≤ 1 Year"
          icon={UserPlus}
          trend={{ value: '+12% vs Q4', isPositive: true }}
          accentColor="purple"
          sparklineData={[30, 42, 55, 68, 85, 110]}
          onClick={() => setActivePage('recruitment')}
        />

        <KPICard
          id="kpi-attrition-rate"
          title="Attrition Rate"
          value={`${metrics.attritionRate}%`}
          subtitle={`${metrics.resignedEmployees + metrics.terminatedEmployees} total leavers`}
          icon={TrendingDown}
          trend={{
            value: metrics.attritionRate > 15 ? '+1.2% High' : '-0.6% Stable',
            isPositive: metrics.attritionRate <= 15,
          }}
          accentColor={metrics.attritionRate > 15 ? 'rose' : 'amber'}
          sparklineData={[16.2, 15.8, 15.1, 14.8, 14.5, metrics.attritionRate]}
          onClick={() => setActivePage('attrition')}
        />

        <KPICard
          id="kpi-open-pipeline"
          title="Open Hiring Pipeline"
          value={metrics.openPipelineCandidates.toLocaleString()}
          subtitle="Active candidate pipeline"
          icon={Briefcase}
          trend={{ value: '12 Recruiters', isPositive: true, isNeutral: true }}
          accentColor="cyan"
          sparklineData={[420, 560, 680, 750, 890, 980]}
          onClick={() => setActivePage('recruitment')}
        />

        <KPICard
          id="kpi-avg-salary"
          title="Average Salary"
          value={`$${metrics.avgMonthlySalary.toLocaleString()}/mo`}
          subtitle={`$${Math.round((metrics.totalPayrollAnnual / 1000000) * 10) / 10}M Annual Payroll`}
          icon={DollarSign}
          trend={{ value: '+3.5% Merit', isPositive: true }}
          accentColor="blue"
          sparklineData={[5200, 5350, 5420, 5600, 5750, metrics.avgMonthlySalary]}
          onClick={() => setActivePage('workforce')}
        />

        <KPICard
          id="kpi-time-to-hire"
          title="Average Time to Hire"
          value={`${metrics.avgTimeToHire} Days`}
          subtitle="Application to acceptance"
          icon={Clock}
          trend={{ value: '-3 Days MoM', isPositive: true }}
          accentColor="purple"
          sparklineData={[38, 36, 35, 34, 33, metrics.avgTimeToHire]}
          onClick={() => setActivePage('recruitment')}
        />

        <KPICard
          id="kpi-attendance-rate"
          title="Attendance Rate"
          value={`${metrics.avgAttendanceRate}%`}
          subtitle="Compliance across units"
          icon={CheckCircle}
          trend={{ value: '98.2% Present/WFH', isPositive: true }}
          accentColor="emerald"
          sparklineData={[93.2, 94.1, 94.5, 94.2, 94.8, metrics.avgAttendanceRate]}
          onClick={() => setActivePage('attendance')}
        />
      </div>

      {/* Row 1: Headcount Trend & Recruitment Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Headcount Growth & Monthly Additions */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Headcount & Workforce Trend"
            subtitle="Monthly active employee growth vs monthly joins and exits"
            badge="12-Month Series"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="hiresGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="headcount"
                  name="Active Headcount"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#headcountGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  name="New Joiners"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#hiresGrad)"
                />
                <Line
                  type="monotone"
                  dataKey="exits"
                  name="Exits"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruitment Funnel Visualizer */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <SectionHeader
              title="Recruitment Funnel"
              subtitle="Candidate stage progression & conversion"
            />
            <div className="space-y-2.5 mt-3">
              {funnelData.map((stage, idx) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-mono">{stage.count.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400">({stage.pctOfTotal}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stage.pctOfTotal}%`,
                        backgroundColor: stage.fill,
                      }}
                    />
                  </div>
                  {idx < funnelData.length - 1 && (
                    <div className="text-[10px] text-slate-500 text-right pr-1">
                      ↓ {stage.dropoffRate}% drop-off to next stage
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActivePage('recruitment')}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <span>Explore Recruitment Intelligence</span>
            <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Row 2: Department Workforce Distribution & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Department Workforce */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Department Workforce Distribution"
            subtitle="Headcount and active staff by organizational department"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="department" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any, name: string) => [
                    `${value} employees`,
                    name === 'headcount' ? 'Total Headcount' : 'Active Staff',
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="headcount" name="Total Headcount" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                <Bar dataKey="active" name="Active Staff" fill="#818cf8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Status Donut & HR Snapshot */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <SectionHeader
              title="Employee Status & Snapshot"
              subtitle="Active vs Resigned vs Terminated distribution"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 mt-2">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '11px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                {statusPieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-white font-mono">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick HR Snapshot Stats */}
            <div className="mt-3 rounded-xl bg-slate-900/80 p-3 border border-slate-800 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                HR Macro Snapshot
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Avg Experience:</span>
                  <p className="font-bold text-white mt-0.5">{metrics.avgExperienceYears} Years</p>
                </div>
                <div>
                  <span className="text-slate-400">Female Talent Ratio:</span>
                  <p className="font-bold text-white mt-0.5">{metrics.femaleRatio}%</p>
                </div>
                <div>
                  <span className="text-slate-400">Job Satisfaction:</span>
                  <p className="font-bold text-white mt-0.5">{metrics.avgJobSatisfaction} / 5.0</p>
                </div>
                <div>
                  <span className="text-slate-400">Annual Payroll Run:</span>
                  <p className="font-bold text-white mt-0.5">
                    ${Math.round(metrics.totalPayrollAnnual / 1000000)}M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Top Job Roles & Dynamic Automatic HR Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Job Roles */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Top Job Roles by Headcount"
            subtitle="Largest staffing volumes and average monthly salary"
          />
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Job Role</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3 text-right">Headcount</th>
                  <th className="py-2.5 px-3 text-right">Avg Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topJobRoles.map((role) => (
                  <tr key={role.role} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-200">{role.role}</td>
                    <td className="py-2.5 px-3 text-slate-400">{role.dept}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-300">
                      {role.headcount}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      ${role.avgSalary.toLocaleString()}/mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Automatic HR Observations */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold tracking-tight text-white uppercase">
                Automated HR Observations
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic rule-based synthesis computed directly from active dataset filters.
            </p>

            <div className="mt-3.5 space-y-2.5">
              {computedObservations.map((obs, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300 leading-relaxed"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
            <span className="text-[11px] text-slate-500">Updated continuously based on filter criteria</span>
            <button
              onClick={() => setActivePage('insights')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View Strategic Actions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
