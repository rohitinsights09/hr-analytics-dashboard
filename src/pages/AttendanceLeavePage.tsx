/**
 * Page 5: Attendance & Leave Analytics MIS
 */

import React, { useMemo, useState } from 'react';
import {
  CheckCircle,
  Calendar,
  Clock,
  Home,
  AlertCircle,
  TrendingUp,
  Sun,
  PieChart as PieIcon,
  Search,
} from 'lucide-react';
import {
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
import { computeAttendanceSummary } from '../utils/hrCalculations';

export const AttendanceLeavePage: React.FC = () => {
  const { filteredEmployees, filteredAttendance, metrics } = useHR();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const attendanceSummary = useMemo(
    () => computeAttendanceSummary(filteredAttendance, filteredEmployees),
    [filteredAttendance, filteredEmployees]
  );

  // Leave Type Breakdown
  const leaveTypeData = useMemo(() => {
    const counts = { 'Sick Leave': 0, 'Casual Leave': 0, 'Paid Leave': 0, 'Unpaid Leave': 0 };
    filteredAttendance.forEach((a) => {
      if (a.leaveType && counts[a.leaveType] !== undefined) {
        counts[a.leaveType] += 1;
      }
    });

    const colors: Record<string, string> = {
      'Sick Leave': '#f43f5e',
      'Casual Leave': '#38bdf8',
      'Paid Leave': '#10b981',
      'Unpaid Leave': '#f59e0b',
    };

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || '#94a3b8',
    }));
  }, [filteredAttendance]);

  // Attendance Status Distribution for month (Present vs WFH vs On Leave vs Absent)
  const statusPieData = useMemo(() => {
    const counts: Record<string, number> = { Present: 0, 'Work From Home': 0, 'On Leave': 0, Absent: 0 };
    filteredAttendance.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });

    return [
      { name: 'Present (In-Office)', value: counts['Present'] || 0, color: '#38bdf8' },
      { name: 'Work From Home', value: counts['Work From Home'] || 0, color: '#a855f7' },
      { name: 'On Approved Leave', value: counts['On Leave'] || 0, color: '#10b981' },
      { name: 'Unplanned Absent', value: counts['Absent'] || 0, color: '#f43f5e' },
    ];
  }, [filteredAttendance]);

  // Department Attendance Compliance
  const deptCompliance = useMemo(() => {
    const map: Record<string, { totalDays: number; presentDays: number; wfhDays: number }> = {};
    filteredAttendance.forEach((a) => {
      if (!map[a.department]) {
        map[a.department] = { totalDays: 0, presentDays: 0, wfhDays: 0 };
      }
      map[a.department].totalDays += 1;
      if (a.status === 'Present') map[a.department].presentDays += 1;
      if (a.status === 'Work From Home') map[a.department].wfhDays += 1;
    });

    return Object.entries(map)
      .map(([department, d]) => ({
        department,
        attendanceRate: Number((((d.presentDays + d.wfhDays) / (d.totalDays || 1)) * 100).toFixed(1)),
        inOfficeRate: Number(((d.presentDays / (d.totalDays || 1)) * 100).toFixed(1)),
        wfhRate: Number(((d.wfhDays / (d.totalDays || 1)) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.attendanceRate - a.attendanceRate);
  }, [filteredAttendance]);

  // Filtered Roster for table
  const filteredRoster = useMemo(() => {
    return attendanceSummary.roster.filter((r) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        r.employeeName.toLowerCase().includes(q) ||
        r.employeeId.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
      );
    });
  }, [attendanceSummary.roster, searchTerm]);

  const totalPages = Math.ceil(filteredRoster.length / rowsPerPage) || 1;
  const paginatedRoster = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredRoster.slice(start, start + rowsPerPage);
  }, [filteredRoster, page]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            ATTENDANCE & LEAVE METRICS
          </h1>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
            Workforce MIS Compliance
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Workforce availability monitoring, leave balance utilization, overtime patterns, and hybrid work ratios.
        </p>
      </div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Attendance Rate"
          value={`${attendanceSummary.avgAttendanceRate}%`}
          subtitle="Present + WFH Compliance"
          icon={CheckCircle}
          trend={{ value: 'Target: >92%', isPositive: attendanceSummary.avgAttendanceRate >= 92 }}
          accentColor="emerald"
        />

        <KPICard
          title="Work From Home Rate"
          value={`${attendanceSummary.wfhRate}%`}
          subtitle="Hybrid remote days"
          icon={Home}
          trend={{ value: 'Flexible Policy', isPositive: true, isNeutral: true }}
          accentColor="purple"
        />

        <KPICard
          title="Leave Utilization"
          value={`${attendanceSummary.leaveUtilization}%`}
          subtitle="Entitled leaves consumed"
          icon={Calendar}
          trend={{ value: 'Balanced Usage', isPositive: true, isNeutral: true }}
          accentColor="blue"
        />

        <KPICard
          title="Unplanned Leaves"
          value={`${attendanceSummary.unplannedLeaveDays} Days`}
          subtitle="Sick + emergency absence"
          icon={AlertCircle}
          trend={{ value: '1.4 Days / Employee', isPositive: false, isNeutral: true }}
          accentColor="amber"
        />

        <KPICard
          title="Avg Late Marks"
          value={`${attendanceSummary.avgLateMarks}`}
          subtitle="Punctuality index (MTD)"
          icon={Clock}
          trend={{ value: '-0.3 vs Last Month', isPositive: true }}
          accentColor="cyan"
        />
      </div>

      {/* Row 1: Monthly Attendance Trend & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Monthly Trend */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Attendance Trend & Hybrid Patterns"
            subtitle="Monthly tracking of in-office presence, remote WFH, and approved leaves"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceSummary.monthlyTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="present" name="In-Office Present" fill="#38bdf8" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="wfh" name="Work From Home" fill="#818cf8" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="leave" name="Approved Leave" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Donut */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <SectionHeader title="Daily Status Ratio" subtitle="Workforce presence allocation" />
            <div className="h-44 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                    {statusPieData.map((e, idx) => (
                      <Cell key={`status-${idx}`} fill={e.color} />
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

            <div className="space-y-1.5 mt-2 text-xs">
              {statusPieData.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Department Compliance & Leave Types */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Department Compliance */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Department Attendance Compliance (%)"
            subtitle="Overall workforce availability rate by operational unit"
          />
          <div className="h-64 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptCompliance} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} domain={[80, 100]} />
                <YAxis dataKey="department" type="category" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Attendance Rate']}
                />
                <Bar dataKey="attendanceRate" name="Attendance Rate %" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leave Type Breakdown */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader title="Leave Category Breakdown" subtitle="Distribution of employee leave days" />
          <div className="space-y-3 mt-3">
            {leaveTypeData.map((lt) => {
              const totalLeaves = leaveTypeData.reduce((s, x) => s + x.value, 0) || 1;
              const pct = ((lt.value / totalLeaves) * 100).toFixed(1);
              return (
                <div key={lt.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lt.color }} />
                      <span className="font-semibold text-slate-200">{lt.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-white">{lt.value} days</span>
                      <span className="text-[11px] text-slate-400">({pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: lt.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Employee Attendance & Leave Roster Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white uppercase">Employee Attendance & Leave Roster</h3>
            <p className="text-xs text-slate-400">
              Monthly compliance score, WFH days, late marks, and leave balances
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search employee or dept..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="h-8.5 w-52 sm:w-64 rounded-xl border border-slate-700 bg-slate-900/90 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
            />
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-3">Emp ID</th>
                <th className="py-2.5 px-3">Employee Name</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3 text-center">Present Days</th>
                <th className="py-2.5 px-3 text-center">WFH Days</th>
                <th className="py-2.5 px-3 text-center">Leaves Taken</th>
                <th className="py-2.5 px-3 text-center">Late Marks</th>
                <th className="py-2.5 px-3 text-right">Attendance Rate</th>
                <th className="py-2.5 px-3 text-center">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {paginatedRoster.map((r) => (
                <tr key={r.employeeId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{r.employeeId}</td>
                  <td className="py-2.5 px-3 font-bold text-white">{r.employeeName}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.department}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-200">{r.presentDays}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-purple-300">{r.wfhDays}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-amber-300">{r.leaveDays}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400">{r.lateMarks}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-300">
                    {r.attendanceRate}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        r.attendanceRate >= 92
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : r.attendanceRate >= 85
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {r.attendanceRate >= 92 ? 'Excellent' : r.attendanceRate >= 85 ? 'Standard' : 'At Risk'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80 pt-3 mt-2 text-xs text-slate-400">
          <span>
            Showing {(page - 1) * rowsPerPage + 1} to{' '}
            {Math.min(page * rowsPerPage, filteredRoster.length)} of {filteredRoster.length.toLocaleString()}{' '}
            employees
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="font-mono text-xs text-slate-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
