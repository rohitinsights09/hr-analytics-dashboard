/**
 * Recruiter Detail & Pipeline Breakdown Modal
 */

import React from 'react';
import { X, Trophy, Award, Clock, DollarSign, Users, Briefcase, CheckCircle2 } from 'lucide-react';
import { useHR } from '../../context/HRContext';
import { computeRecruiterLeaderboard } from '../../utils/hrCalculations';

export const RecruiterDetailModal: React.FC = () => {
  const { selectedRecruiter, setSelectedRecruiter, allCandidates, allRecruiters } = useHR();

  if (!selectedRecruiter) return null;
  const rec = selectedRecruiter;

  const leaderboard = computeRecruiterLeaderboard(allCandidates, allRecruiters);
  const recStats = leaderboard.find((r) => r.recruiterId === rec.recruiterId) || leaderboard[0];
  const assignedCandidates = allCandidates.filter((c) => c.recruiter === rec.recruiterName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl shadow-blue-950/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 bg-slate-900/90 p-5">
          <div className="flex items-center gap-4">
            <img
              src={rec.avatar}
              alt={rec.recruiterName}
              className="h-14 w-14 rounded-xl border border-slate-700 object-cover bg-slate-800"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-white">{rec.recruiterName}</h3>
                <span className="font-mono text-xs text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  {rec.recruiterLevel}
                </span>
                <span className="rounded-md bg-blue-950 px-2 py-0.5 text-xs font-semibold text-cyan-300 border border-blue-800/50">
                  Rank #{recStats.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {rec.department} Sourcing Division • {rec.location} • {rec.experienceYears} Years Sourcing Experience
              </p>
            </div>
          </div>
          <button
            id="btn-close-rec-modal"
            onClick={() => setSelectedRecruiter(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Offers Converted (Joined)
              </span>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                {recStats.joined} Joiners
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{recStats.offers} Offers made</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                End-to-End Conversion
              </span>
              <div className="text-xl font-bold text-cyan-300 font-mono mt-0.5">
                {recStats.conversionRate}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">App to Join ratio</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Avg Time to Hire
              </span>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {recStats.avgTimeToHire} Days
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Target: 30 Days</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cost Per Hire
              </span>
              <div className="text-xl font-bold text-purple-300 font-mono mt-0.5">
                ${recStats.costPerHire.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Avg Sourcing Expense</div>
            </div>
          </div>

          {/* Sourcing Funnel Stats */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Recruiter Pipeline Performance Funnel
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Applications</span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {recStats.applications.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Shortlisted</span>
                <span className="text-sm font-bold text-cyan-300 mt-1 block">
                  {recStats.shortlisted.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Interviewed</span>
                <span className="text-sm font-bold text-indigo-300 mt-1 block">
                  {recStats.interviewed.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Selected</span>
                <span className="text-sm font-bold text-purple-300 mt-1 block">
                  {recStats.selected.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Offers</span>
                <span className="text-sm font-bold text-amber-300 mt-1 block">
                  {recStats.offers.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Joined</span>
                <span className="text-sm font-bold text-emerald-400 mt-1 block">
                  {recStats.joined.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Sample Candidates under recruiter */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recent Assigned Candidates ({assignedCandidates.length} Total)
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {assignedCandidates.slice(0, 8).map((cand) => (
                <div
                  key={cand.candidateId}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2 text-xs border border-slate-800/80"
                >
                  <div>
                    <span className="font-semibold text-slate-200">{cand.candidateName}</span>
                    <span className="text-[10px] text-slate-400 ml-2">
                      {cand.jobRole} • {cand.source}
                    </span>
                  </div>
                  <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                    {cand.applicationStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-[#090d16] p-4 flex justify-end">
          <button
            onClick={() => setSelectedRecruiter(null)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Recruiter View
          </button>
        </div>
      </div>
    </div>
  );
};
