/**
 * Candidate Detail & Pipeline Status Modal
 */

import React from 'react';
import {
  X,
  Briefcase,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const CandidateDetailModal: React.FC = () => {
  const { selectedCandidate, setSelectedCandidate } = useHR();

  if (!selectedCandidate) return null;
  const cand = selectedCandidate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl shadow-blue-950/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 bg-slate-900/90 p-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-white">{cand.candidateName}</h3>
              <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {cand.candidateId}
              </span>
              <span className="rounded-md bg-blue-950 px-2 py-0.5 text-xs font-semibold text-cyan-300 border border-blue-800/50">
                {cand.applicationStatus}
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-medium mt-0.5">
              Applied for {cand.jobRole} • {cand.department}
            </p>
          </div>
          <button
            id="btn-close-cand-modal"
            onClick={() => setSelectedCandidate(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Interview Score
              </span>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                {cand.interviewScore} / 100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Status: {cand.interviewStatus}</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Time to Hire
              </span>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {cand.timeToHire} Days
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Velocity index</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Sourcing Cost
              </span>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                ${cand.hiringCost.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Channel: {cand.source}</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Joining Outcome
              </span>
              <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                {cand.joiningStatus}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Offer: {cand.offerStatus}</div>
            </div>
          </div>

          {/* Sourcing & Compensation Profile */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Candidate & Evaluation Profile
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-400">Assigned Recruiter:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{cand.recruiter}</p>
              </div>
              <div>
                <span className="text-slate-400">Application Date:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{cand.applicationDate}</p>
              </div>
              <div>
                <span className="text-slate-400">Target Location:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{cand.applicationLocation}</p>
              </div>
              <div>
                <span className="text-slate-400">Experience & Qualification:</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {cand.experienceYears} Yrs • {cand.qualification}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Expected Annual CTC:</span>
                <p className="font-semibold text-slate-200 mt-0.5 font-mono">
                  ${cand.expectedSalary.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Offered CTC:</span>
                <p className="font-semibold text-slate-200 mt-0.5 font-mono">
                  {cand.offeredSalary > 0 ? `$${cand.offeredSalary.toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Funnel Progress Tracker */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Recruitment Funnel Milestone
            </h4>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="rounded-lg bg-blue-950/80 p-2 border border-blue-800/40">
                <span className="text-[10px] text-slate-400">1. Applied</span>
                <div className="font-bold text-cyan-300 mt-1">✓ Complete</div>
              </div>
              <div
                className={`rounded-lg p-2 border ${
                  cand.screeningStatus === 'Passed'
                    ? 'bg-blue-950/80 border-blue-800/40 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] text-slate-400">2. Screened</span>
                <div className="font-bold mt-1">
                  {cand.screeningStatus === 'Passed' ? '✓ Passed' : 'In Review'}
                </div>
              </div>
              <div
                className={`rounded-lg p-2 border ${
                  cand.interviewStatus === 'Completed'
                    ? 'bg-blue-950/80 border-blue-800/40 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] text-slate-400">3. Interview</span>
                <div className="font-bold mt-1">
                  {cand.interviewStatus === 'Completed' ? '✓ Done' : cand.interviewStatus}
                </div>
              </div>
              <div
                className={`rounded-lg p-2 border ${
                  cand.selectionStatus === 'Selected'
                    ? 'bg-blue-950/80 border-blue-800/40 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] text-slate-400">4. Selection</span>
                <div className="font-bold mt-1">
                  {cand.selectionStatus === 'Selected' ? '✓ Selected' : cand.selectionStatus}
                </div>
              </div>
              <div
                className={`rounded-lg p-2 border ${
                  cand.joiningStatus === 'Joined'
                    ? 'bg-emerald-950/80 border-emerald-800/40 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] text-slate-400">5. Onboard</span>
                <div className="font-bold mt-1">
                  {cand.joiningStatus === 'Joined' ? '✓ Joined' : cand.joiningStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-[#090d16] p-4 flex justify-end">
          <button
            onClick={() => setSelectedCandidate(null)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Candidate View
          </button>
        </div>
      </div>
    </div>
  );
};
