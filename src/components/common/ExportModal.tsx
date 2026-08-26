/**
 * Export MIS Report & Data Extraction Modal
 */

import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2, Copy } from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const ExportModal: React.FC = () => {
  const {
    isExportOpen,
    setIsExportOpen,
    filteredEmployees,
    filteredCandidates,
    metrics,
    filters,
  } = useHR();

  const [copied, setCopied] = useState(false);

  if (!isExportOpen) return null;

  const downloadEmployeesCSV = () => {
    const headers = [
      'EmployeeID',
      'EmployeeName',
      'Gender',
      'Age',
      'Department',
      'JobRole',
      'Location',
      'Education',
      'ExperienceYears',
      'JoiningDate',
      'EmploymentType',
      'MonthlyIncome',
      'SalaryBand',
      'PerformanceRating',
      'JobSatisfaction',
      'Overtime',
      'EmployeeStatus',
      'AttritionReason',
    ];

    const rows = filteredEmployees.map((e) => [
      e.employeeId,
      `"${e.employeeName}"`,
      e.gender,
      e.age,
      `"${e.department}"`,
      `"${e.jobRole}"`,
      `"${e.location}"`,
      `"${e.education}"`,
      e.experienceYears,
      e.joiningDate,
      `"${e.employmentType}"`,
      e.monthlyIncome,
      `"${e.salaryBand}"`,
      e.performanceRating,
      e.jobSatisfaction,
      e.overtime,
      e.employeeStatus,
      `"${e.attritionReason || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HR_Workforce_MIS_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCandidatesCSV = () => {
    const headers = [
      'CandidateID',
      'CandidateName',
      'ApplicationDate',
      'Department',
      'JobRole',
      'Source',
      'Recruiter',
      'ApplicationStatus',
      'InterviewScore',
      'SelectionStatus',
      'OfferStatus',
      'JoiningStatus',
      'TimeToHireDays',
      'HiringCostUSD',
    ];

    const rows = filteredCandidates.map((c) => [
      c.candidateId,
      `"${c.candidateName}"`,
      c.applicationDate,
      `"${c.department}"`,
      `"${c.jobRole}"`,
      `"${c.source}"`,
      `"${c.recruiter}"`,
      `"${c.applicationStatus}"`,
      c.interviewScore,
      `"${c.selectionStatus}"`,
      `"${c.offerStatus}"`,
      `"${c.joiningStatus}"`,
      c.timeToHire,
      c.hiringCost,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HR_Recruitment_MIS_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyExecutiveSummary = () => {
    const text = `
=== HR ANALYTICS EXECUTIVE MIS SUMMARY ===
Report Generated: ${new Date().toLocaleDateString()}
Filters Applied: Dept: ${filters.department}, Loc: ${filters.location}, Period: ${filters.dateRange}

KEY METRICS:
- Total Headcount: ${metrics.totalEmployees.toLocaleString()}
- Active Employees: ${metrics.activeEmployees.toLocaleString()}
- Attrition Rate: ${metrics.attritionRate}%
- New Hires (YTD): ${metrics.newHiresYTD.toLocaleString()}
- Open Hiring Pipeline: ${metrics.openPipelineCandidates.toLocaleString()} candidates
- Avg Monthly Compensation: $${metrics.avgMonthlySalary.toLocaleString()}
- Avg Time to Hire: ${metrics.avgTimeToHire} days
- Attendance Compliance Rate: ${metrics.avgAttendanceRate}%
- Workforce Job Satisfaction: ${metrics.avgJobSatisfaction}/5.0

* Data source: Synthetic HR Analytics Dataset (Portfolio Candidate Verification).
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl shadow-blue-950/40">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 p-4.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/30">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Export HR MIS Reports</h3>
              <p className="text-[11px] text-slate-400">Download formatted datasets & summaries</p>
            </div>
          </div>
          <button
            id="btn-close-export-modal"
            onClick={() => setIsExportOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-3.5">
          {/* Employee CSV */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Workforce Demographics Master CSV</h4>
                <p className="text-[11px] text-slate-400">
                  {filteredEmployees.length.toLocaleString()} employee records with compensation & attrition
                </p>
              </div>
            </div>
            <button
              onClick={downloadEmployeesCSV}
              className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-xs"
            >
              Export CSV
            </button>
          </div>

          {/* Recruitment CSV */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-cyan-400 border border-blue-800/40">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Recruitment Funnel Records CSV</h4>
                <p className="text-[11px] text-slate-400">
                  {filteredCandidates.length.toLocaleString()} candidate applications, scores & hiring costs
                </p>
              </div>
            </div>
            <button
              onClick={downloadCandidatesCSV}
              className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-xs"
            >
              Export CSV
            </button>
          </div>

          {/* Executive Summary Copy */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-950 text-purple-300 border border-purple-800/40">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Executive MIS Summary (Clipboard)</h4>
                <p className="text-[11px] text-slate-400">Formatted text briefing for emails or leadership slides</p>
              </div>
            </div>
            <button
              onClick={copyExecutiveSummary}
              className="flex items-center gap-1 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition-all shadow-xs"
            >
              {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 bg-[#090d16] p-4 flex items-center justify-between text-xs text-slate-400">
          <span>Self-contained browser export</span>
          <button
            onClick={() => setIsExportOpen(false)}
            className="rounded-xl bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
