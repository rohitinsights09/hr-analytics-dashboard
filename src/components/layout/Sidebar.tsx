/**
 * Main Left Navigation Sidebar
 */

import React from 'react';
import {
  BarChart3,
  Users,
  UserCheck,
  TrendingDown,
  Clock,
  Award,
  Trophy,
  Lightbulb,
  Info,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';
import { PageId } from '../../types';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'HR Overview', icon: BarChart3 },
  { id: 'recruitment', label: 'Recruitment Funnel', icon: UserCheck, badge: '12k' },
  { id: 'workforce', label: 'Workforce Demographics', icon: Users, badge: '1.5k' },
  { id: 'attrition', label: 'Attrition & Retention', icon: TrendingDown },
  { id: 'attendance', label: 'Attendance & Leave', icon: Clock },
  { id: 'performance', label: 'Performance Reviews', icon: Award },
  { id: 'recruiters', label: 'Recruiter Leaderboard', icon: Trophy },
  { id: 'insights', label: 'HR Insights Engine', icon: Lightbulb, badge: 'Rules' },
];

export const Sidebar: React.FC<{ isMobileOpen?: boolean; onCloseMobile?: () => void }> = ({
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { activePage, setActivePage } = useHR();

  const handleNav = (page: PageId) => {
    setActivePage(page);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-800/80 bg-[#0b101d]/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090d16]">
                <Building2 className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 uppercase">
                  HR MIS & Analytics
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-950/80 px-1.5 py-0.2 text-[9px] font-semibold text-cyan-300 border border-blue-800/50">
                  Portfolio
                </span>
              </div>
              <h1 className="text-sm font-extrabold tracking-tight text-white uppercase">
                HR Analytics
              </h1>
              <p className="text-[11px] font-bold text-slate-300 tracking-wide uppercase">
                Command Center
              </p>
            </div>
          </div>

          <div className="mt-3.5 rounded-lg bg-slate-900/90 px-2.5 py-1.5 border border-slate-800/70">
            <p className="text-[10px] font-medium text-slate-400 leading-tight">
              HR MIS & Analytics Portfolio Project
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Dashboards
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/20 text-white border border-blue-500/40 shadow-md shadow-blue-950/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-500/20 text-cyan-300'
                        : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-blue-500/30 text-cyan-300 border border-blue-400/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Portfolio & Docs
          </div>

          <button
            id="nav-about"
            onClick={() => handleNav('about')}
            className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
              activePage === 'about'
                ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/40 shadow-md'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  activePage === 'about'
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'bg-slate-800/70 text-slate-400'
                }`}
              >
                <Info className="h-4 w-4" />
              </div>
              <span>About Project & Pitch</span>
            </div>
            <span className="rounded-md bg-purple-950/70 px-1.5 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-800/50">
              Guide
            </span>
          </button>
        </div>

        {/* Personal Profile & Portfolio Section */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090d16]/90 space-y-3">
          <div className="rounded-xl bg-slate-900/90 p-3 border border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-xs font-bold text-white shadow-md shadow-blue-500/20">
                RS
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-extrabold tracking-tight text-white uppercase truncate">
                  ROHIT SHINDE
                </h4>
                <p className="text-[10px] font-medium text-cyan-300 truncate">
                  HR Executive | HR MIS | Analytics
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-medium text-slate-400 border-t border-slate-800/80 pt-2">
              <span className="text-slate-300 font-semibold">Portfolio Project</span>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                1.5k Records
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
