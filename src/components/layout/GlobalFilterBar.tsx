/**
 * Global Interactive Filter Bar
 */

import React, { useState } from 'react';
import {
  Filter,
  RotateCcw,
  ChevronDown,
  Building,
  MapPin,
  Briefcase,
  User,
  Users,
  Target,
  Sparkles,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';
import { DEPARTMENTS, LOCATIONS, SOURCES, RECRUITERS, ROLES_BY_DEPT } from '../../data/mockDataGenerator';

export const GlobalFilterBar: React.FC = () => {
  const { filters, updateFilter, resetFilters, hasActiveFilters, activeFilterCount } = useHR();
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine role options based on selected department or list all
  const availableRoles = filters.department !== 'All' && ROLES_BY_DEPT[filters.department as any]
    ? ROLES_BY_DEPT[filters.department as any]
    : Array.from(new Set(Object.values(ROLES_BY_DEPT).flat()));

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-3.5 shadow-xl backdrop-blur-md transition-all">
      {/* Primary Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Filter Indicator */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/30">
            <Filter className="h-3.5 w-3.5" />
          </div>
          <span>Interactive Global Filters</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/40">
              {activeFilterCount} Active
            </span>
          )}
        </div>

        {/* Quick Horizontal Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Department Filter */}
          <div className="relative">
            <select
              id="filter-department"
              value={filters.department}
              onChange={(e) => {
                updateFilter('department', e.target.value);
                if (e.target.value === 'All') updateFilter('jobRole', 'All');
              }}
              className="h-8.5 appearance-none rounded-xl border border-slate-700/80 bg-slate-900/90 pl-3 pr-7 text-xs font-medium text-slate-200 hover:border-slate-600 focus:border-blue-500 focus:outline-hidden transition-all"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              id="filter-location"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="h-8.5 appearance-none rounded-xl border border-slate-700/80 bg-slate-900/90 pl-3 pr-7 text-xs font-medium text-slate-200 hover:border-slate-600 focus:border-blue-500 focus:outline-hidden transition-all"
            >
              <option value="All">All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <select
              id="filter-date-range"
              value={filters.dateRange}
              onChange={(e) => updateFilter('dateRange', e.target.value as any)}
              className="h-8.5 appearance-none rounded-xl border border-slate-700/80 bg-slate-900/90 pl-3 pr-7 text-xs font-medium text-slate-200 hover:border-slate-600 focus:border-blue-500 focus:outline-hidden transition-all"
            >
              <option value="All Time">Period: All Time</option>
              <option value="YTD (2026)">Period: YTD 2026</option>
              <option value="Last 12 Months">Period: Last 12 Months</option>
              <option value="Q1 2026">Period: Q1 2026</option>
              <option value="Q4 2025">Period: Q4 2025</option>
              <option value="Q3 2025">Period: Q3 2025</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* More Filters Toggle */}
          <button
            id="btn-toggle-more-filters"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex h-8.5 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-all ${
              isExpanded
                ? 'border-blue-500/50 bg-blue-500/10 text-cyan-300'
                : 'border-slate-700/80 bg-slate-900/90 text-slate-300 hover:border-slate-600'
            }`}
          >
            <span>{isExpanded ? 'Fewer Filters' : 'More Filters'}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              id="btn-reset-filters"
              onClick={resetFilters}
              className="flex h-8.5 items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>RESET FILTERS</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Secondary Filters Row */}
      {isExpanded && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 animate-in fade-in duration-200">
          {/* Job Role Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Job Role
            </label>
            <select
              id="filter-job-role"
              value={filters.jobRole}
              onChange={(e) => updateFilter('jobRole', e.target.value)}
              className="w-full h-8.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Job Roles</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Gender
            </label>
            <select
              id="filter-gender"
              value={filters.gender}
              onChange={(e) => updateFilter('gender', e.target.value)}
              className="w-full h-8.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Genders</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Employment Type
            </label>
            <select
              id="filter-employment-type"
              value={filters.employmentType}
              onChange={(e) => updateFilter('employmentType', e.target.value)}
              className="w-full h-8.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          {/* Recruiter Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Assigned Recruiter
            </label>
            <select
              id="filter-recruiter"
              value={filters.recruiter}
              onChange={(e) => updateFilter('recruiter', e.target.value)}
              className="w-full h-8.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Recruiters</option>
              {RECRUITERS.map((r) => (
                <option key={r.recruiterId} value={r.recruiterName}>
                  {r.recruiterName} ({r.department})
                </option>
              ))}
            </select>
          </div>

          {/* Sourcing Source Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Sourcing Channel
            </label>
            <select
              id="filter-source"
              value={filters.recruitmentSource}
              onChange={(e) => updateFilter('recruitmentSource', e.target.value)}
              className="w-full h-8.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">All Sources</option>
              {SOURCES.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
