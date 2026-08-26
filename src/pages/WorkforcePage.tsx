/**
 * Page 3: Workforce Demographics & Master Analytics
 */

import React, { useMemo, useState } from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  Award,
  DollarSign,
  Search,
  ArrowUpDown,
  Filter,
  Eye,
  Building,
  MapPin,
  Smile,
} from 'lucide-react';
import {
  BarChart,
  Bar,
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
import { computeDepartmentBreakdown } from '../utils/hrCalculations';
import { Employee } from '../types';

export const WorkforcePage: React.FC = () => {
  const { filteredEmployees, metrics, setSelectedEmployee } = useHR();

  // Search, Sort & Pagination State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<keyof Employee>('monthlyIncome');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Demographic Aggregations
  const deptBreakdown = useMemo(() => computeDepartmentBreakdown(filteredEmployees), [filteredEmployees]);

  // Location Distribution
  const locationData = useMemo(() => {
    const map: Record<string, number> = {};
    filteredEmployees.forEach((e) => {
      map[e.location] = (map[e.location] || 0) + 1;
    });
    return Object.entries(map)
      .map(([loc, count]) => ({ location: loc, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredEmployees]);

  // Gender Distribution
  const genderData = useMemo(() => {
    const map: Record<string, number> = {};
    filteredEmployees.forEach((e) => {
      map[e.gender] = (map[e.gender] || 0) + 1;
    });
    return [
      { name: 'Male', value: map['Male'] || 0, color: '#38bdf8' },
      { name: 'Female', value: map['Female'] || 0, color: '#a855f7' },
      { name: 'Non-Binary', value: map['Non-Binary'] || 0, color: '#34d399' },
    ];
  }, [filteredEmployees]);

  // Experience Level Distribution
  const experienceData = useMemo(() => {
    const brackets = {
      '< 2 Yrs': 0,
      '2 - 5 Yrs': 0,
      '5 - 8 Yrs': 0,
      '8 - 12 Yrs': 0,
      '> 12 Yrs': 0,
    };
    filteredEmployees.forEach((e) => {
      if (e.experienceYears < 2) brackets['< 2 Yrs']++;
      else if (e.experienceYears <= 5) brackets['2 - 5 Yrs']++;
      else if (e.experienceYears <= 8) brackets['5 - 8 Yrs']++;
      else if (e.experienceYears <= 12) brackets['8 - 12 Yrs']++;
      else brackets['> 12 Yrs']++;
    });
    return Object.entries(brackets).map(([bracket, count]) => ({
      bracket,
      count,
    }));
  }, [filteredEmployees]);

  // Salary Band Distribution
  const salaryBandData = useMemo(() => {
    const map: Record<string, number> = {};
    filteredEmployees.forEach((e) => {
      map[e.salaryBand] = (map[e.salaryBand] || 0) + 1;
    });
    return Object.entries(map).map(([band, count]) => ({
      band: band.replace(' ($40k-$65k)', '').replace(' ($65k-$95k)', '').replace(' ($95k-$130k)', '').replace(' ($130k-$175k)', '').replace(' ($175k+)', ''),
      fullBand: band,
      count,
    }));
  }, [filteredEmployees]);

  // Employment Type Distribution
  const empTypeData = useMemo(() => {
    const map: Record<string, number> = {};
    filteredEmployees.forEach((e) => {
      map[e.employmentType] = (map[e.employmentType] || 0) + 1;
    });
    return Object.entries(map).map(([type, count]) => ({ type, count }));
  }, [filteredEmployees]);

  // Tenure Distribution
  const tenureData = useMemo(() => {
    const bins = { '< 1 Yr': 0, '1 - 3 Yrs': 0, '3 - 5 Yrs': 0, '5 - 8 Yrs': 0, '> 8 Yrs': 0 };
    filteredEmployees.forEach((e) => {
      if (e.yearsAtCompany < 1) bins['< 1 Yr']++;
      else if (e.yearsAtCompany <= 3) bins['1 - 3 Yrs']++;
      else if (e.yearsAtCompany <= 5) bins['3 - 5 Yrs']++;
      else if (e.yearsAtCompany <= 8) bins['5 - 8 Yrs']++;
      else bins['> 8 Yrs']++;
    });
    return Object.entries(bins).map(([tenure, count]) => ({ tenure, count }));
  }, [filteredEmployees]);

  // Table Data Processing (Filter, Sort, Paginate)
  const processedTableData = useMemo(() => {
    let list = filteredEmployees.filter((e) => {
      if (statusFilter !== 'All' && e.employeeStatus !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const mName = e.employeeName.toLowerCase().includes(q);
        const mId = e.employeeId.toLowerCase().includes(q);
        const mRole = e.jobRole.toLowerCase().includes(q);
        const mDept = e.department.toLowerCase().includes(q);
        const mLoc = e.location.toLowerCase().includes(q);
        if (!mName && !mId && !mRole && !mDept && !mLoc) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return list;
  }, [filteredEmployees, statusFilter, search, sortField, sortAsc]);

  const totalPages = Math.ceil(processedTableData.length / rowsPerPage) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return processedTableData.slice(start, start + rowsPerPage);
  }, [processedTableData, page]);

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const avgAge = useMemo(() => {
    if (filteredEmployees.length === 0) return 0;
    return Math.round(filteredEmployees.reduce((s, e) => s + e.age, 0) / filteredEmployees.length);
  }, [filteredEmployees]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            WORKFORCE ANALYTICS
          </h1>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
            Demographics & Headcount
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Comprehensive organizational structure, demographic breakdown, compensation distribution, and employee master records.
        </p>
      </div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Headcount"
          value={metrics.totalEmployees.toLocaleString()}
          subtitle="All registered staff"
          icon={Users}
          trend={{ value: '100% Base', isPositive: true, isNeutral: true }}
          accentColor="blue"
        />

        <KPICard
          title="Active Employees"
          value={metrics.activeEmployees.toLocaleString()}
          subtitle={`${((metrics.activeEmployees / (metrics.totalEmployees || 1)) * 100).toFixed(1)}% On Payroll`}
          icon={UserCheck}
          trend={{ value: '+24 Net', isPositive: true }}
          accentColor="emerald"
        />

        <KPICard
          title="Average Age"
          value={`${avgAge} Years`}
          subtitle="Workforce maturity index"
          icon={Calendar}
          trend={{ value: 'Mid-Career', isPositive: true, isNeutral: true }}
          accentColor="cyan"
        />

        <KPICard
          title="Average Experience"
          value={`${metrics.avgExperienceYears} Years`}
          subtitle="Cumulative industry tenure"
          icon={Award}
          trend={{ value: 'Senior Depth', isPositive: true }}
          accentColor="purple"
        />

        <KPICard
          title="Average Salary"
          value={`$${metrics.avgMonthlySalary.toLocaleString()}/mo`}
          subtitle={`$${(metrics.avgMonthlySalary * 12).toLocaleString()}/yr avg CTC`}
          icon={DollarSign}
          trend={{ value: 'Market Competitive', isPositive: true, isNeutral: true }}
          accentColor="amber"
        />
      </div>

      {/* Row 1: Department Headcount & Location Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Department Headcount */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Department Headcount Distribution"
            subtitle="Staffing breakdown and active vs total headcount"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptBreakdown} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="department"
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
                />
                <Bar dataKey="headcount" name="Total Headcount" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" name="Active Staff" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Location & Hub Distribution"
            subtitle="Headcount across global regional delivery centers"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="location" type="category" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Headcount" fill="#818cf8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Gender, Experience, Salary Band, Tenure Distributions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gender Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Gender Ratio" subtitle="Diversity representation" />
          <div className="h-40 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
                  {genderData.map((e, idx) => (
                    <Cell key={`gender-${idx}`} fill={e.color} />
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
          <div className="space-y-1 mt-1 text-xs">
            {genderData.map((g) => (
              <div key={g.name} className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: g.color }} />
                  {g.name}
                </span>
                <span className="font-mono font-bold text-white">
                  {g.value} ({((g.value / (filteredEmployees.length || 1)) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Experience Bins" subtitle="Years in industry" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="bracket" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
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

        {/* Salary Band Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Salary Bands" subtitle="Compensation tiers" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryBandData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="band" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Employees" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenure Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-lg backdrop-blur-md">
          <SectionHeader title="Company Tenure" subtitle="Years at organization" />
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenureData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="tenure" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Employees" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Comprehensive Employee Master Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white uppercase">Employee Master Roster (MIS Table)</h3>
            <p className="text-xs text-slate-400">
              Showing {processedTableData.length.toLocaleString()} employee records with complete attributes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search name, ID, role, department..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="h-8.5 w-52 sm:w-64 rounded-xl border border-slate-700 bg-slate-900/90 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
              />
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-8.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Resigned">Resigned</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40 select-none">
                <th className="py-2.5 px-3">Emp ID</th>
                <th className="py-2.5 px-3 cursor-pointer" onClick={() => handleSort('employeeName')}>
                  <div className="flex items-center gap-1">
                    <span>Employee</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Job Role</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3 cursor-pointer text-center" onClick={() => handleSort('experienceYears')}>
                  <div className="flex items-center justify-center gap-1">
                    <span>Exp</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 cursor-pointer text-right" onClick={() => handleSort('monthlyIncome')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Monthly Salary</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-center cursor-pointer" onClick={() => handleSort('performanceRating')}>
                  <div className="flex items-center justify-center gap-1">
                    <span>Perf</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-center">Satisfaction</th>
                <th className="py-2.5 px-3 text-center">Overtime</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {paginatedEmployees.map((emp) => (
                <tr
                  key={emp.employeeId}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{emp.employeeId}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img src={emp.avatar} alt={emp.employeeName} className="h-6 w-6 rounded-md bg-slate-800" />
                      <span className="font-bold text-white hover:text-cyan-300">{emp.employeeName}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{emp.department}</td>
                  <td className="py-2.5 px-3 text-slate-300">{emp.jobRole}</td>
                  <td className="py-2.5 px-3 text-slate-400">{emp.location}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-300">{emp.experienceYears}y</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-white">
                    ${emp.monthlyIncome.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        emp.performanceRating >= 4
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : emp.performanceRating === 3
                          ? 'bg-blue-950 text-cyan-300 border border-blue-800/40'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {emp.performanceRating}.0
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-cyan-300">{emp.jobSatisfaction}/5</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                        emp.overtime === 'Yes'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {emp.overtime}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        emp.employeeStatus === 'Active'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                      }`}
                    >
                      {emp.employeeStatus}
                    </span>
                  </td>
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

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80 pt-3 mt-2 text-xs text-slate-400">
          <span>
            Showing {(page - 1) * rowsPerPage + 1} to{' '}
            {Math.min(page * rowsPerPage, processedTableData.length)} of{' '}
            {processedTableData.length.toLocaleString()} employees
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
