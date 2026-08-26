/**
 * Page 6: Performance Analytics & 9-Box Talent Matrix
 */

import React, { useMemo, useState } from 'react';
import {
  Award,
  Star,
  TrendingUp,
  BookOpen,
  Zap,
  Users,
  Grid,
  Search,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
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
import { compute9BoxGrid } from '../utils/hrCalculations';
import { Employee } from '../types';

export const PerformancePage: React.FC = () => {
  const { filteredEmployees, setSelectedEmployee } = useHR();
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  // 9-Box Grid calculation
  const nineBox = useMemo(() => compute9BoxGrid(filteredEmployees), [filteredEmployees]);

  // Overall KPIs
  const activeEmp = useMemo(
    () => filteredEmployees.filter((e) => e.employeeStatus === 'Active'),
    [filteredEmployees]
  );
  const avgPerf = useMemo(() => {
    if (activeEmp.length === 0) return 0;
    return Number((activeEmp.reduce((s, e) => s + e.performanceRating, 0) / activeEmp.length).toFixed(2));
  }, [activeEmp]);

  const topPerformers = useMemo(
    () => activeEmp.filter((e) => e.performanceRating >= 4.0),
    [activeEmp]
  );

  const avgTrainingHours = useMemo(() => {
    if (activeEmp.length === 0) return 0;
    return Number((activeEmp.reduce((s, e) => s + e.trainingHours, 0) / activeEmp.length).toFixed(1));
  }, [activeEmp]);

  const promotionCount = useMemo(
    () => activeEmp.filter((e) => e.yearsSinceLastPromotion <= 1).length,
    [activeEmp]
  );
  const promotionRate = activeEmp.length > 0 ? ((promotionCount / activeEmp.length) * 100).toFixed(1) : '0';

  // Performance Rating Distribution (1 to 5)
  const ratingDistribution = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    activeEmp.forEach((e) => {
      counts[e.performanceRating] = (counts[e.performanceRating] || 0) + 1;
    });

    return [
      { rating: '1.0 Needs Improvement', count: counts[1] || 0, fill: '#f43f5e' },
      { rating: '2.0 Developing', count: counts[2] || 0, fill: '#f59e0b' },
      { rating: '3.0 Meets Expectations', count: counts[3] || 0, fill: '#38bdf8' },
      { rating: '4.0 Exceeds Expectations', count: counts[4] || 0, fill: '#818cf8' },
      { rating: '5.0 Outstanding / Star', count: counts[5] || 0, fill: '#10b981' },
    ];
  }, [activeEmp]);

  // Performance by Department
  const deptPerformance = useMemo(() => {
    const map: Record<string, { totalPerf: number; totalTraining: number; count: number }> = {};
    activeEmp.forEach((e) => {
      if (!map[e.department]) map[e.department] = { totalPerf: 0, totalTraining: 0, count: 0 };
      map[e.department].totalPerf += e.performanceRating;
      map[e.department].totalTraining += e.trainingHours;
      map[e.department].count += 1;
    });

    return Object.entries(map)
      .map(([dept, d]) => ({
        department: dept,
        avgRating: Number((d.totalPerf / (d.count || 1)).toFixed(2)),
        avgTraining: Math.round(d.totalTraining / (d.count || 1)),
      }))
      .sort((a, b) => b.avgRating - a.avgRating);
  }, [activeEmp]);

  // Selected cohort employees for modal/inspection
  const selectedBoxCohort = useMemo(() => {
    if (!selectedBox) return [];
    return activeEmp.filter((e) => e.nineBoxCategory === selectedBox);
  }, [activeEmp, selectedBox]);

  // 9-Box Grid configuration (3x3)
  // Rows: High Potential, Medium Potential, Low Potential
  // Cols: Low Performance, Medium Performance, High Performance
  const gridRows = [
    {
      potentialLabel: 'High Potential',
      boxes: [
        { key: 'Enigma / Rough Diamond', label: 'Rough Diamond', desc: 'High Pot, Low Perf', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
        { key: 'High Potential / Growth', label: 'Future Star', desc: 'High Pot, Med Perf', color: 'border-blue-500/40 bg-blue-950/30 text-cyan-300' },
        { key: 'Star / High Performer', label: '★ Star / High Performer', desc: 'High Pot, High Perf', color: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300' },
      ],
    },
    {
      potentialLabel: 'Med Potential',
      boxes: [
        { key: 'Dilemma / Inconsistent', label: 'Dilemma', desc: 'Med Pot, Low Perf', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
        { key: 'Core Player / Solid', label: 'Core Professional', desc: 'Med Pot, Med Perf', color: 'border-blue-500/30 bg-slate-900/60 text-slate-200' },
        { key: 'High Impact / High Professional', label: 'High Impact Specialist', desc: 'Med Pot, High Perf', color: 'border-teal-500/40 bg-teal-950/30 text-teal-300' },
      ],
    },
    {
      potentialLabel: 'Low Potential',
      boxes: [
        { key: 'Risk / Action Needed', label: 'Risk / Action Needed', desc: 'Low Pot, Low Perf', color: 'border-rose-500/50 bg-rose-950/30 text-rose-300' },
        { key: 'Effective / Solid Professional', label: 'Effective Contributor', desc: 'Low Pot, Med Perf', color: 'border-slate-700 bg-slate-900/40 text-slate-400' },
        { key: 'Trusted Professional / Workhorse', label: 'Trusted Workhorse', desc: 'Low Pot, High Perf', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            PERFORMANCE ANALYTICS
          </h1>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
            9-Box Talent Matrix
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Appraisal score distribution, 9-box performance vs potential categorization, training enablement, and leadership bench strength.
        </p>
      </div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Average Rating"
          value={`${avgPerf} / 5.0`}
          subtitle="Organization-wide appraisal score"
          icon={Star}
          trend={{ value: '+0.15 YoY', isPositive: true }}
          accentColor="amber"
        />

        <KPICard
          title="Top Performers (★)"
          value={topPerformers.length.toLocaleString()}
          subtitle={`${((topPerformers.length / (activeEmp.length || 1)) * 100).toFixed(1)}% of Active Headcount`}
          icon={Award}
          trend={{ value: 'Rating ≥ 4.0', isPositive: true }}
          accentColor="emerald"
        />

        <KPICard
          title="Training per Employee"
          value={`${avgTrainingHours} Hrs`}
          subtitle="Annual skill development hours"
          icon={BookOpen}
          trend={{ value: 'Benchmark: 24h', isPositive: avgTrainingHours >= 24 }}
          accentColor="cyan"
        />

        <KPICard
          title="Promotion Rate (YTD)"
          value={`${promotionRate}%`}
          subtitle={`${promotionCount} promoted in past 12m`}
          icon={TrendingUp}
          trend={{ value: 'Merit-Based', isPositive: true }}
          accentColor="purple"
        />

        <KPICard
          title="Talent Bench Index"
          value={`${nineBox['Star / High Performer']?.count || 0} Stars`}
          subtitle="High Potential + High Rating"
          icon={Zap}
          trend={{ value: 'Succession Ready', isPositive: true }}
          accentColor="blue"
        />
      </div>

      {/* SPECIAL FEATURE: 9-BOX TALENT MATRIX */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/30">
                <Grid className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">9-Box Performance vs Potential Matrix</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click on any tile below to inspect talent distribution, counts and employee rosters.
            </p>
          </div>
          {selectedBox && (
            <button
              onClick={() => setSelectedBox(null)}
              className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-cyan-300 hover:bg-slate-700 self-start sm:self-auto"
            >
              Clear Selection ({selectedBoxCohort.length} shown)
            </button>
          )}
        </div>

        {/* The 9-Box Grid Container */}
        <div className="mt-4 grid grid-cols-1 gap-3">
          {/* Axis Labels */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center">
            Y-Axis: Potential Level ↑ &nbsp;&nbsp;|&nbsp;&nbsp; X-Axis: Performance Level →
          </div>

          <div className="grid grid-rows-3 gap-3">
            {gridRows.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {row.boxes.map((box) => {
                  const stat = nineBox[box.key] || { count: 0, pct: 0 };
                  const isSelected = selectedBox === box.key;
                  return (
                    <div
                      key={box.key}
                      onClick={() => setSelectedBox(isSelected ? null : box.key)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] ${
                        box.color
                      } ${
                        isSelected
                          ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-950/50'
                          : 'hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {row.potentialLabel}
                          </span>
                          <h4 className="text-sm font-bold mt-0.5">{box.label}</h4>
                          <p className="text-[11px] opacity-75 mt-0.5">{box.desc}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold font-mono block">{stat.count}</span>
                          <span className="text-[10px] opacity-75">{stat.pct}% total</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Box Cohort Preview */}
        {selectedBox && (
          <div className="mt-4 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Inspecting Cohort: {selectedBox} ({selectedBoxCohort.length} Employees)
                </h4>
                <p className="text-[11px] text-slate-400">Click an employee to view their full 360° profile</p>
              </div>
              <button
                onClick={() => setSelectedBox(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto">
              {selectedBoxCohort.map((emp) => (
                <div
                  key={emp.employeeId}
                  onClick={() => setSelectedEmployee(emp)}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-xs hover:border-slate-700 cursor-pointer transition-all"
                >
                  <img src={emp.avatar} alt={emp.employeeName} className="h-7 w-7 rounded-md bg-slate-800" />
                  <div className="truncate">
                    <span className="font-bold text-white block truncate">{emp.employeeName}</span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {emp.jobRole} • Rating: {emp.performanceRating}.0
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Row 2: Performance Rating Distribution & Dept Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Rating Distribution */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Appraisal Rating Distribution"
            subtitle="Count of employees across 1.0 to 5.0 performance categories"
          />
          <div className="h-64 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="rating"
                  stroke="#64748b"
                  tick={{ fontSize: 9 }}
                  interval={0}
                  angle={-15}
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
                />
                <Bar dataKey="count" name="Employees" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dept Performance & Training */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Department Performance & Training"
            subtitle="Average appraisal score and average training enablement hours"
          />
          <div className="h-64 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformance} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="department"
                  stroke="#64748b"
                  tick={{ fontSize: 9 }}
                  interval={0}
                  angle={-20}
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
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="avgRating" name="Avg Rating (out of 5)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgTraining" name="Avg Training (Hours)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Top Performer Talent Directory */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <SectionHeader
          title="Top Performer Talent Roster (Ratings ≥ 4.0)"
          subtitle="Key performers recognized for leadership, technical mastery and high organizational impact"
        />
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-3">Emp ID</th>
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Department & Role</th>
                <th className="py-2.5 px-3 text-center">Appraisal Score</th>
                <th className="py-2.5 px-3 text-center">9-Box Designation</th>
                <th className="py-2.5 px-3 text-center">Training Hours</th>
                <th className="py-2.5 px-3 text-center">Satisfaction</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {topPerformers.slice(0, 8).map((emp) => (
                <tr
                  key={emp.employeeId}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{emp.employeeId}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={emp.avatar} alt={emp.employeeName} className="h-6 w-6 rounded-md bg-slate-800" />
                      <span className="font-bold text-white hover:text-cyan-300">{emp.employeeName}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-slate-200">{emp.jobRole}</span>
                    <span className="text-[10px] text-slate-400 block">{emp.department}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="rounded bg-emerald-950 px-2 py-0.5 font-mono font-bold text-emerald-300 border border-emerald-800/50">
                      ★ {emp.performanceRating}.0
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-300">{emp.nineBoxCategory}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-cyan-300">{emp.trainingHours} hrs</td>
                  <td className="py-2.5 px-3 text-center font-mono text-amber-300">{emp.jobSatisfaction}/5</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(emp);
                      }}
                      className="rounded-lg bg-slate-800 px-2 py-1 text-[10px] font-semibold text-cyan-300 hover:bg-slate-700"
                    >
                      View 360°
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
