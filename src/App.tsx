/**
 * HR Analytics Command Center - Main Application Root
 */

import React from 'react';
import { HRProvider, useHR } from './context/HRContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { GlobalFilterBar } from './components/layout/GlobalFilterBar';

// Page Components
import { OverviewPage } from './pages/OverviewPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { WorkforcePage } from './pages/WorkforcePage';
import { AttritionPage } from './pages/AttritionPage';
import { AttendanceLeavePage } from './pages/AttendanceLeavePage';
import { PerformancePage } from './pages/PerformancePage';
import { RecruiterPage } from './pages/RecruiterPage';
import { InsightsPage } from './pages/InsightsPage';
import { AboutPage } from './pages/AboutPage';

// Modals
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { EmployeeProfileModal } from './components/common/EmployeeProfileModal';
import { CandidateDetailModal } from './components/common/CandidateDetailModal';
import { RecruiterDetailModal } from './components/common/RecruiterDetailModal';
import { ExportModal } from './components/common/ExportModal';

const DashboardContent: React.FC = () => {
  const { activePage } = useHR();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileNavOpen} onCloseMobile={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader onToggleMobileMenu={() => setIsMobileNavOpen(true)} />

        {/* Global Filter Bar */}
        <GlobalFilterBar />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-6 flex-1">
            {activePage === 'overview' && <OverviewPage />}
            {activePage === 'recruitment' && <RecruitmentPage />}
            {activePage === 'workforce' && <WorkforcePage />}
            {activePage === 'attrition' && <AttritionPage />}
            {activePage === 'attendance' && <AttendanceLeavePage />}
            {activePage === 'performance' && <PerformancePage />}
            {activePage === 'recruiters' && <RecruiterPage />}
            {activePage === 'insights' && <InsightsPage />}
            {activePage === 'about' && <AboutPage />}
          </div>

          {/* Professional Portfolio Footer */}
          <footer id="app-footer" className="mt-12 pt-6 pb-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
              <span className="font-semibold text-slate-300">© 2026 Rohit Shinde</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="text-slate-400">HR Analytics Command Center</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="text-slate-500">HR MIS & Analytics Portfolio Project</span>
            </div>
            <div className="text-[11px] text-slate-500 text-center sm:text-right">
              Synthetic Dataset • For Educational & Demonstration Purposes
            </div>
          </footer>
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <EmployeeProfileModal />
      <CandidateDetailModal />
      <RecruiterDetailModal />
      <ExportModal />
    </div>
  );
};

export default function App() {
  return (
    <HRProvider>
      <DashboardContent />
    </HRProvider>
  );
}
