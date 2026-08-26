/**
 * Page 7: Recruiter Performance & Sourcing Leaderboard
 */

import React, { useMemo } from 'react';
import {
  Trophy,
  Users,
  Award,
  DollarSign,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
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
import { computeRecruiterLeaderboard } from '../utils/hrCalculations';

export const RecruiterPage: React.FC = () => {
  const { allCandidates, allRecruiters, setSelectedRecruiter } = useHR();

  const leaderboard = useMemo(
    () => computeRecruiterLeaderboard(allCandidates, allRecruiters),
    [allCandidates, allRecruiters]
  );

  const topRecruiter = leaderboard[0] || { recruiterName: 'Elena Rostova', joined: 45, conversionRate: 4.8 };

  const totalJoinedAll = useMemo(
    () => leaderboard.reduce((s, r) => s + r.joined, 0),
    [leaderboard]
  );

  const avgCostPerHireOverall = useMemo(() => {
    if (leaderboard.length === 0) return 0;
    return Math.round(leaderboard.reduce((s, r) => s + r.costPerHire, 0) / leaderboard.length);
  }, [leaderboard]);

  const avgTimeToHireOverall = useMemo(() => {
    if (leaderboard.length === 0) return 0;
    return Math.round(leaderboard.reduce((s, r) => s + r.avgTimeToHire, 0) / leaderboard.length);
  }, [leaderboard]);

  // Chart data: Joiners vs Conversion Rate
  const chartData = useMemo(() => {
    return leaderboard.map((r) => ({
      name: r.recruiterName.split(' ')[0],
      fullName: r.recruiterName,
      joined: r.joined,
      conversionRate: r.conversionRate,
      avgTime: r.avgTimeToHire,
      cost: Math.round(r.costPerHire / 100), // scaled
    }));
  }, [leaderboard]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            RECRUITER PERFORMANCE
          </h1>
          <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
            Talent Acquisition MIS
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Recruitment team scorecard, pipeline yield, time-to-fill velocity, sourcing cost optimization, and ranking leaderboard.
        </p>
      </div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Talent Sourcing Team"
          value={`${leaderboard.length} Recruiters`}
          subtitle="Enterprise TA capacity"
          icon={Users}
          trend={{ value: 'Full Staffing', isPositive: true, isNeutral: true }}
          accentColor="blue"
        />

        <KPICard
          title="Top Performer (Rank #1)"
          value={topRecruiter.recruiterName}
          subtitle={`${topRecruiter.joined} Joiners • ${topRecruiter.conversionRate}% Yield`}
          icon={Trophy}
          trend={{ value: 'Leaderboard #1', isPositive: true }}
          accentColor="amber"
        />

        <KPICard
          title="Total Joined (YTD)"
          value={totalJoinedAll.toLocaleString()}
          subtitle="Successful placements"
          icon={CheckCircle2}
          trend={{ value: '+14% vs Target', isPositive: true }}
          accentColor="emerald"
        />

        <KPICard
          title="Team Avg Cost per Hire"
          value={`$${avgCostPerHireOverall.toLocaleString()}`}
          subtitle="Sourcing expense per joiner"
          icon={DollarSign}
          trend={{ value: '-$180 Budget Yield', isPositive: true }}
          accentColor="purple"
        />

        <KPICard
          title="Team Avg Time to Hire"
          value={`${avgTimeToHireOverall} Days`}
          subtitle="Requisition to start date"
          icon={Clock}
          trend={{ value: 'Target: ≤35d', isPositive: avgTimeToHireOverall <= 35 }}
          accentColor="cyan"
        />
      </div>

      {/* Row 1: Sourcing Yield Chart */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <SectionHeader
          title="Recruiter Placement Volume & Conversion Yield"
          subtitle="Comparison of candidates joined and end-to-end conversion efficiency across team members"
        />
        <div className="h-72 w-full mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
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
              <Bar dataKey="joined" name="Candidates Joined" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgTime" name="Avg Time to Hire (Days)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Comprehensive Recruiter Performance Leaderboard Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-4.5 shadow-lg backdrop-blur-md">
        <SectionHeader
          title="Official Recruiter Leaderboard & Sourcing Scorecard"
          subtitle="Click on any recruiter profile to view full candidate pipelines and funnel breakdowns"
        />
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-3 px-3 text-center">Rank</th>
                <th className="py-3 px-3">Recruiter Profile</th>
                <th className="py-3 px-3">Sourcing Division</th>
                <th className="py-3 px-3 text-right">Apps Handled</th>
                <th className="py-3 px-3 text-right">Shortlisted</th>
                <th className="py-3 px-3 text-right">Interviewed</th>
                <th className="py-3 px-3 text-right">Offers</th>
                <th className="py-3 px-3 text-right">Joined</th>
                <th className="py-3 px-3 text-right">Yield %</th>
                <th className="py-3 px-3 text-right">Avg Days</th>
                <th className="py-3 px-3 text-right">Cost / Hire</th>
                <th className="py-3 px-3 text-center">Scorecard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {leaderboard.map((rec) => (
                <tr
                  key={rec.recruiterId}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedRecruiter(rec)}
                >
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold ${
                        rec.rank === 1
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                          : rec.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : rec.rank === 3
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rec.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img src={rec.avatar} alt={rec.recruiterName} className="h-7 w-7 rounded-lg bg-slate-800" />
                      <div>
                        <span className="font-bold text-white hover:text-cyan-300 block">{rec.recruiterName}</span>
                        <span className="text-[10px] text-slate-400">{rec.recruiterLevel}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    <span>{rec.department}</span>
                    <span className="text-[10px] text-slate-500 block">{rec.location}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {rec.applications.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-cyan-300">
                    {rec.shortlisted.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-indigo-300">
                    {rec.interviewed.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-amber-300">{rec.offers}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">{rec.joined}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {rec.conversionRate}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">{rec.avgTimeToHire}d</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    ${rec.costPerHire.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecruiter(rec);
                      }}
                      className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-slate-700 transition-all"
                    >
                      Scorecard →
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
