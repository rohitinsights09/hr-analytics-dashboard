/**
 * Global Search Modal (Command Palette Style)
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  User,
  Briefcase,
  Trophy,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Building,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    allEmployees,
    allCandidates,
    allRecruiters,
    setSelectedEmployee,
    setSelectedCandidate,
    setSelectedRecruiter,
  } = useHR();

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | 'employees' | 'candidates' | 'recruiters'>('all');

  const filteredEmployees = useMemo(() => {
    if (!query.trim()) return allEmployees.slice(0, 5);
    const q = query.toLowerCase();
    return allEmployees
      .filter(
        (e) =>
          e.employeeName.toLowerCase().includes(q) ||
          e.employeeId.toLowerCase().includes(q) ||
          e.jobRole.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allEmployees, query]);

  const filteredCandidates = useMemo(() => {
    if (!query.trim()) return allCandidates.slice(0, 5);
    const q = query.toLowerCase();
    return allCandidates
      .filter(
        (c) =>
          c.candidateName.toLowerCase().includes(q) ||
          c.candidateId.toLowerCase().includes(q) ||
          c.jobRole.toLowerCase().includes(q) ||
          c.source.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allCandidates, query]);

  const filteredRecruiters = useMemo(() => {
    if (!query.trim()) return allRecruiters;
    const q = query.toLowerCase();
    return allRecruiters.filter(
      (r) =>
        r.recruiterName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [allRecruiters, query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl shadow-blue-950/40">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 p-4">
          <Search className="h-5 w-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Search employees, candidate pool, recruiters, roles, departments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2 text-xs">
          <button
            onClick={() => setTab('all')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              tab === 'all'
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setTab('employees')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              tab === 'employees'
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Employees ({filteredEmployees.length})
          </button>
          <button
            onClick={() => setTab('candidates')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              tab === 'candidates'
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Candidates ({filteredCandidates.length})
          </button>
          <button
            onClick={() => setTab('recruiters')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              tab === 'recruiters'
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Recruiters ({filteredRecruiters.length})
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Employees */}
          {(tab === 'all' || tab === 'employees') && filteredEmployees.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Employees
              </div>
              <div className="space-y-1">
                {filteredEmployees.map((emp) => (
                  <div
                    key={emp.employeeId}
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setIsSearchOpen(false);
                    }}
                    className="group flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.employeeName}
                        className="h-8 w-8 rounded-lg bg-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                            {emp.employeeName}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {emp.employeeId}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                              emp.employeeStatus === 'Active'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                                : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                            }`}
                          >
                            {emp.employeeStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {emp.jobRole} • {emp.department} • {emp.location}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates */}
          {(tab === 'all' || tab === 'candidates') && filteredCandidates.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Candidate Pipeline
              </div>
              <div className="space-y-1">
                {filteredCandidates.map((cand) => (
                  <div
                    key={cand.candidateId}
                    onClick={() => {
                      setSelectedCandidate(cand);
                      setIsSearchOpen(false);
                    }}
                    className="group flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-950/80 border border-purple-800/40 text-purple-300">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-purple-300">
                            {cand.candidateName}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {cand.candidateId}
                          </span>
                          <span className="rounded bg-blue-950/80 px-1.5 py-0.2 text-[9px] font-semibold text-cyan-300 border border-blue-800/40">
                            {cand.applicationStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {cand.jobRole} • Source: {cand.source} • Recruiter: {cand.recruiter}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recruiters */}
          {(tab === 'all' || tab === 'recruiters') && filteredRecruiters.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Recruiters & Talent Partners
              </div>
              <div className="space-y-1">
                {filteredRecruiters.map((rec) => (
                  <div
                    key={rec.recruiterId}
                    onClick={() => {
                      setSelectedRecruiter(rec);
                      setIsSearchOpen(false);
                    }}
                    className="group flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.recruiterName}
                        className="h-8 w-8 rounded-lg object-cover bg-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-amber-300">
                            {rec.recruiterName}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-400">
                            {rec.recruiterLevel}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {rec.department} Sourcing • {rec.location} • {rec.experienceYears}y exp
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#090d16] p-3 text-[11px] text-slate-500">
          <span>Click any item to view complete 360° analytics record</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
