/**
 * Top Navigation & Executive Command Bar
 */

import React from 'react';
import {
  Search,
  RotateCcw,
  Download,
  SlidersHorizontal,
  Bell,
  Menu,
  Sparkles,
  Users,
  Briefcase,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const TopHeader: React.FC<{ onToggleMobileMenu: () => void }> = ({
  onToggleMobileMenu,
}) => {
  const {
    activeFilterCount,
    hasActiveFilters,
    resetFilters,
    setIsSearchOpen,
    setIsExportOpen,
    filteredEmployees,
    filteredCandidates,
    allEmployees,
    allCandidates,
  } = useHR();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#090d16]/90 px-4 sm:px-6 backdrop-blur-xl">
      {/* Left: Mobile Menu Button & Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          id="btn-mobile-menu"
          onClick={onToggleMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Input Trigger */}
        <button
          id="btn-global-search"
          onClick={() => setIsSearchOpen(true)}
          className="flex h-9.5 items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 text-xs text-slate-400 shadow-inner hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-200 transition-all w-48 sm:w-72 md:w-88 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">Search employees, candidates, recruiters...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Data metrics, Filter summary & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Quick Dataset stats badge */}
        <div className="hidden xl:flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-900/80 px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <Users className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              <strong className="text-white">{filteredEmployees.length.toLocaleString()}</strong>
              <span className="text-slate-500">/{allEmployees.length.toLocaleString()}</span>
            </span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              <strong className="text-white">{filteredCandidates.length.toLocaleString()}</strong>
              <span className="text-slate-500">/{allCandidates.length.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* Reset Filter Button (Active when filtered) */}
        {hasActiveFilters && (
          <button
            id="btn-reset-filters-top"
            onClick={resetFilters}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all animate-pulse-subtle"
            title="Reset all active filters"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset ({activeFilterCount})</span>
          </button>
        )}

        {/* Export Data Button */}
        <button
          id="btn-export-report"
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white transition-all shadow-xs"
        >
          <Download className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Export MIS</span>
        </button>

        {/* User Identity & Portfolio Owner Pill */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/90 py-1 pl-1.5 pr-3 shadow-xs">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-[11px] font-bold text-white shadow-xs">
            RS
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-200 leading-none">ROHIT SHINDE</span>
              <span className="rounded bg-blue-500/20 px-1 py-0.2 text-[9px] font-semibold text-cyan-300 border border-blue-400/30">
                Portfolio
              </span>
            </div>
            <div className="text-[10px] text-slate-400 leading-none mt-1">HR Executive | HR MIS | Analytics</div>
          </div>
        </div>
      </div>
    </header>
  );
};
