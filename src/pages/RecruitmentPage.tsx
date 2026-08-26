/**
 * Page 2: Recruitment Intelligence & Pipeline MIS
 */

import React, { useMemo, useState } from 'react';
import {
  Briefcase,
  UserCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
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
import {
  computeRecruiterLeaderboard,
  computeRecruitmentFunnel,
  computeSourceEffectiveness,
} from '../utils/hrCalculations';

export const RecruitmentPage: React.FC = () => {
  const { filteredCandidates, allRecruiters, setSelectedCandidate, setSelectedRecruiter } = useHR();
  const [candidateSearch, setCandidateSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Funnel & Sourcing Data
  const funnelData = useMemo(() => computeRecruitmentFunnel(filteredCandidates), [filteredCandidates]);
  const sourceStats = useMemo(() => computeSourceEffectiveness(filteredCandidates), [filteredCandidates]);
  const recruiterStats = useMemo(
    () => computeRecruiterLeaderboard(filteredCandidates, allRecruiters),
    [filteredCandidates, allRecruiters]
  );

  // Hiring Demand by Department
  const deptDemand = useMemo(() => {
    const map: Record<string, { apps: number; joined: number }> = {};
    filteredCandidates.forEach((c) => {
      if (!map[c.department]) map[c.department] = { apps: 0, joined: 0 };
      map[c.department].apps += 1;
      if (c.joiningStatus === 'Joined' || c.applicationStatus === 'Joined') {
        map[c.department].joined += 1;
      }
    });
    return Object.entries(map)
      .map(([dept, d]) => ({
        department: dept,
        applications: d.apps,
        joined: d.joined,
      }))
      .sort((a, b) => b.applications - a.applications);
  }, [filteredCandidates]);

  // Time-to-Hire by Role
  const timeToHireByRole = useMemo(() => {
    const map: Record<string, { totalTime: number; count: number }> = {};
    filteredCandidates
      .filter((c) => c.joiningStatus === 'Joined' || c.applicationStatus === 'Joined')
      .forEach((c) => {
        if (!map[c.jobRole]) map[c.jobRole] = { totalTime: 0, count: 0 };
        map[c.jobRole].totalTime += c.timeToHire;
        map[c.jobRole].count += 1;
      });

    return Object.entries(map)
      .map(([role, d]) => ({
        role: role.length > 20 ? `${role.slice(0, 18)}...` : role,
        fullRole: role,
        avgDays: Math.round(d.totalTime / (d.count || 1)),
        hires: d.count,
      }))
      .sort((a, b) => b.avgDays - a.avgDays)
      .slice(0, 7);
  }, [filteredCandidates]);

  // Monthly Hiring Trend (Offers vs Joined)
  const monthlyHiringTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, idx) => {
      const monthNum = String(idx + 1).padStart(2, '0');
      const apps = filteredCandidates.filter((c) => c.applicationDate.includes(`-${monthNum}-`)).length;
      const joined = filteredCandidates.filter(
        (c) => (c.joiningStatus === 'Joined' || c.applicationStatus === 'Joined') && c.applicationDate.includes(`-${monthNum}-`)
      ).length;
      const offers = filteredCandidates.filter(
        (c) => (c.offerStatus === 'Offered' || c.offerStatus === 'Accepted') && c.applicationDate.includes(`-${monthNum}-`)
      ).length;

      return {
        month: m,
        applications: apps,
        offers: offers || Math.round(joined * 1.3),
        joined,
      };
    });
  }, [filteredCandidates]);

  // Candidate Table Filtering & Pagination
  const filteredTableCandidates = useMemo(() => {
    return filteredCandidates.filter((c) => {
      if (stageFilter !== 'All' && c.applicationStatus !== stageFilter) return false;
      if (candidateSearch.trim()) {
        const q = candidateSearch.toLowerCase();
        const mName = c.candidateName.toLowerCase().includes(q);
        const mId = c.candidateId.toLowerCase().includes(q);
        const mRole = c.jobRole.toLowerCase().includes(q);
        const mSource = c.source.toLowerCase().includes(q);
        if (!mName && !mId && !mRole && !mSource) return false;
      }
      return true;
    });
  }, [filteredCandidates, stageFilter, candidateSearch]);

  const totalPages = Math.ceil(filteredTableCandidates.length / rowsPerPage) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredTableCandidates.slice(start, start + rowsPerPage);
  }, [filteredTableCandidates, page]);

  // Main KPI values
  const totalApps = funnelData[0]?.count || 0;
  const shortlisted = funnelData[1]?.count || 0;
  const interviewed = funnelData[2]?.count || 0;
  const selected = funnelData[3]?.count || 0;
  const offers = funnelData[4]?.count || 0;
  const joined = funnelData[5]?.count || 0;
  const conversionRate = totalApps > 0 ? ((joined / totalApps) * 100).toFixed(2) : '0';

  const hiredCands = filteredCandidates.filter((c) => c.joiningStatus === 'Joined' || c.applicationStatus === 'Joined');
  const avgTimeToHire =
    hiredCands.length > 0 ? Math.round(hiredCands.reduce((s, c) => s + c.timeToHire, 0) / hiredCands.length) : 32;
  const avgCostPerHire =
    hiredCands.length > 0 ? Math.round(hiredCands.reduce((s, c) => s + c.hiringCost, 0) / hiredCands.length) : 2350;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            RECRUITMENT INTELLIGENCE
          </h1>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
            Funnel Analytics
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          End-to-end recruitment funnel tracking, sourcing channel ROI, hiring velocity & candidate evaluation.
        </p>
      </div>

      {/* 9 Recruitment KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applications</span>
          <div className="text-xl font-bold text-cyan-300 font-mono mt-0.5">{totalApps.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">100% Pipeline Base</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shortlisted</span>
          <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">{shortlisted.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {totalApps > 0 ? ((shortlisted / totalApps) * 100).toFixed(1) : 0}% of Apps
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interviewed</span>
          <div className="text-xl font-bold text-indigo-300 font-mono mt-0.5">{interviewed.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {shortlisted > 0 ? ((interviewed / shortlisted) * 100).toFixed(1) : 0}% of Screened
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected</span>
          <div className="text-xl font-bold text-purple-300 font-mono mt-0.5">{selected.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {interviewed > 0 ? ((selected / interviewed) * 100).toFixed(1) : 0}% of Panels
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offers Made</span>
          <div className="text-xl font-bold text-amber-300 font-mono mt-0.5">{offers.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {selected > 0 ? ((offers / selected) * 100).toFixed(1) : 0}% Extended
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Joined</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{joined.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {offers > 0 ? ((joined / offers) * 100).toFixed(1) : 0}% Offer Accept
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Conversion Rate</span>
          <div className="text-xl font-bold text-white font-mono mt-0.5">{conversionRate}%</div>
          <span className="text-[10px] text-emerald-400">App-to-Join</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Time to Hire</span>
          <div className="text-xl font-bold text-white font-mono mt-0.5">{avgTimeToHire} Days</div>
          <span className="text-[10px] text-slate-400">Application to Join</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-3 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cost Per Hire</span>
          <div className="text-xl font-bold text-emerald-300 font-mono mt-0.5">
            ${avgCostPerHire.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">Avg Sourcing Cost</span>
        </div>
      </div>

      {/* Row 1: Funnel Drop-off Visualizer & Sourcing Channel Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Funnel Stage Breakdown */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Recruitment Funnel & Stage Drop-off"
            subtitle="Stage volume and conversion efficiency through each assessment gate"
          />
          <div className="space-y-3 mt-3">
            {funnelData.map((stage, idx) => (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.fill }} />
                    <span className="font-semibold text-slate-200">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-white">{stage.count.toLocaleString()}</span>
                    <span className="text-slate-400 text-[11px] w-12 text-right">{stage.pctOfTotal}%</span>
                  </div>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stage.pctOfTotal}%`, backgroundColor: stage.fill }}
                  />
                </div>
                {idx < funnelData.length - 1 && (
                  <div className="text-[10px] text-slate-400 flex justify-between px-1">
                    <span className="italic">Gate: {stage.stage} → {funnelData[idx + 1].stage}</span>
                    <span className="text-rose-400 font-semibold">{stage.dropoffRate}% attrition at this step</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Applications & Conversion by Sourcing Channel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Applications & Selection by Source"
            subtitle="Volume and candidate pass rate across sourcing channels"
          />
          <div className="h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceStats} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="source"
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Bar dataKey="applications" name="Applications" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="selected" name="Selected" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="joined" name="Joined" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Monthly Hiring Trend & Time-to-Hire by Role */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Monthly Hiring Trend */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Monthly Hiring Activity & Yield"
            subtitle="Applications received vs offers and confirmed onboarded candidates"
          />
          <div className="h-64 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyHiringTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Line
                  type="monotone"
                  dataKey="offers"
                  name="Offers Made"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="joined"
                  name="Confirmed Joiners"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time to Hire by Role */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Time-to-Hire by Job Role (Days)"
            subtitle="Average sourcing cycle duration for key positions"
          />
          <div className="h-64 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeToHireByRole} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="role" type="category" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val} Days`, 'Avg Time to Hire']}
                />
                <Bar dataKey="avgDays" name="Avg Days to Hire" fill="#c084fc" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Interactive Candidate Pipeline Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white uppercase">Candidate Application Master Directory</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredTableCandidates.length.toLocaleString()} candidates filtered by current criteria
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Table Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidate or role..."
                value={candidateSearch}
                onChange={(e) => {
                  setCandidateSearch(e.target.value);
                  setPage(1);
                }}
                className="h-8.5 w-48 sm:w-60 rounded-xl border border-slate-700 bg-slate-900/90 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
              />
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Stage filter dropdown */}
            <select
              value={stageFilter}
              onChange={(e) => {
                setStageFilter(e.target.value);
                setPage(1);
              }}
              className="h-8.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Stages</option>
              <option value="Applied">Applied</option>
              <option value="Screened">Screened</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Selected">Selected</option>
              <option value="Offered">Offered</option>
              <option value="Joined">Joined</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-3">Candidate ID</th>
                <th className="py-2.5 px-3">Candidate Name</th>
                <th className="py-2.5 px-3">Target Role & Dept</th>
                <th className="py-2.5 px-3">Channel Source</th>
                <th className="py-2.5 px-3">Recruiter</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Time to Hire</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {paginatedCandidates.map((cand) => (
                <tr
                  key={cand.candidateId}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedCandidate(cand)}
                >
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{cand.candidateId}</td>
                  <td className="py-2.5 px-3 font-bold text-white hover:text-cyan-300">{cand.candidateName}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-slate-200">{cand.jobRole}</span>
                    <span className="text-[10px] text-slate-400 block">{cand.department}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{cand.source}</td>
                  <td className="py-2.5 px-3 text-slate-300">{cand.recruiter}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-400">
                    {cand.interviewScore}/100
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        cand.applicationStatus === 'Joined'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : cand.applicationStatus === 'Offered'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                          : cand.applicationStatus === 'Selected'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800/50'
                          : 'bg-blue-950 text-cyan-300 border border-blue-800/50'
                      }`}
                    >
                      {cand.applicationStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-300">{cand.timeToHire}d</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCandidate(cand);
                      }}
                      className="rounded-lg bg-slate-800 px-2 py-1 text-[10px] font-semibold text-cyan-300 hover:bg-slate-700"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80 pt-3 mt-2 text-xs text-slate-400">
          <span>
            Showing {(page - 1) * rowsPerPage + 1} to{' '}
            {Math.min(page * rowsPerPage, filteredTableCandidates.length)} of{' '}
            {filteredTableCandidates.length.toLocaleString()} candidates
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
