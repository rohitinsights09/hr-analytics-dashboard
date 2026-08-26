/**
 * Employee Profile & 360° HR Card Modal
 */

import React from 'react';
import {
  X,
  User,
  Building,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Award,
  Smile,
  ShieldAlert,
  Clock,
  Mail,
  Phone,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const EmployeeProfileModal: React.FC = () => {
  const { selectedEmployee, setSelectedEmployee, allLeaveRecords, allPerformanceReviews } = useHR();

  if (!selectedEmployee) return null;

  const emp = selectedEmployee;
  const empLeaves = allLeaveRecords.filter((l) => l.employeeId === emp.employeeId);
  const empReviews = allPerformanceReviews.filter((p) => p.employeeId === emp.employeeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl shadow-blue-950/40 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 bg-slate-900/90 p-5">
          <div className="flex items-center gap-4">
            <img
              src={emp.avatar}
              alt={emp.employeeName}
              className="h-14 w-14 rounded-xl border border-slate-700 bg-slate-800"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-white">{emp.employeeName}</h3>
                <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {emp.employeeId}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    emp.employeeStatus === 'Active'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                  }`}
                >
                  {emp.employeeStatus}
                </span>
              </div>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">
                {emp.jobRole} • {emp.department} • {emp.location}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span>{emp.email}</span>
                <span>•</span>
                <span>{emp.phone}</span>
              </div>
            </div>
          </div>

          <button
            id="btn-close-emp-modal"
            onClick={() => setSelectedEmployee(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Monthly Income
              </span>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                ${emp.monthlyIncome.toLocaleString()}/mo
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{emp.salaryBand}</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Company Tenure
              </span>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {emp.yearsAtCompany} Years
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Role: {emp.yearsInCurrentRole} yrs
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Performance Score
              </span>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>{emp.performanceRating}.0 / 5.0</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {emp.performanceRating >= 4
                  ? 'Exceeds Expectations'
                  : emp.performanceRating === 3
                  ? 'Meets Expectations'
                  : 'Needs Improvement'}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Job Satisfaction
              </span>
              <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5 flex items-center gap-1">
                <Smile className="h-4 w-4" />
                <span>{emp.jobSatisfaction}.0 / 5.0</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                WLB Rating: {emp.workLifeBalance}/5
              </div>
            </div>
          </div>

          {/* Demographic & Employment Details */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Workforce & Job Attributes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-400">Manager:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.manager}</p>
              </div>
              <div>
                <span className="text-slate-400">Joining Date:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.joiningDate}</p>
              </div>
              <div>
                <span className="text-slate-400">Employment Type:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.employmentType}</p>
              </div>
              <div>
                <span className="text-slate-400">Total Experience:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.experienceYears} Years</p>
              </div>
              <div>
                <span className="text-slate-400">Education Level:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.education}</p>
              </div>
              <div>
                <span className="text-slate-400">Overtime Logged:</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      emp.overtime === 'Yes'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {emp.overtime}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-slate-400">Promotion in 5 Yrs:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{emp.promotionLast5Years}</p>
              </div>
              <div>
                <span className="text-slate-400">Age & Gender:</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {emp.age} Years • {emp.gender}
                </p>
              </div>
              {emp.attritionReason && (
                <div className="col-span-2 sm:col-span-3 rounded-lg bg-rose-950/40 p-2.5 border border-rose-800/40">
                  <span className="text-rose-400 font-bold text-xs flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" />
                    Attrition Exit Details ({emp.attritionDate || 'Recent'}):
                  </span>
                  <p className="text-xs text-rose-200 mt-1">{emp.attritionReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Review Log */}
          {empReviews.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Latest Performance Appraisal ({empReviews[0].reviewDate})
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Goal Achievement:</span>
                  <span className="font-bold text-cyan-300">{empReviews[0].goalAchievement}%</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Manager Rating:</span>
                  <span className="font-bold text-amber-300">{empReviews[0].managerRating} / 5</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Promotion Recommendation:</span>
                  <span
                    className={`font-semibold ${
                      empReviews[0].promotionRecommended ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {empReviews[0].promotionRecommended ? 'Yes (Endorsed)' : 'Standard Growth Track'}
                  </span>
                </div>
                <div className="pt-2 text-slate-400 italic text-[11px] border-t border-slate-800">
                  "{empReviews[0].comments}"
                </div>
              </div>
            </div>
          )}

          {/* Leave History Sample */}
          {empLeaves.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recent Leave Requests ({empLeaves.length} Records)
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {empLeaves.map((lv) => (
                  <div
                    key={lv.leaveId}
                    className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2 text-xs border border-slate-800/80"
                  >
                    <div>
                      <span className="font-semibold text-slate-200">{lv.leaveType}</span>
                      <span className="text-[10px] text-slate-400 ml-2">
                        {lv.startDate} to {lv.endDate} ({lv.days} days)
                      </span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                        lv.approvalStatus === 'Approved'
                          ? 'bg-emerald-950 text-emerald-400'
                          : lv.approvalStatus === 'Pending'
                          ? 'bg-amber-950 text-amber-300'
                          : 'bg-rose-950 text-rose-400'
                      }`}
                    >
                      {lv.approvalStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-[#090d16] p-4 flex justify-end">
          <button
            onClick={() => setSelectedEmployee(null)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Employee View
          </button>
        </div>
      </div>
    </div>
  );
};
