/**
 * HR Analytics Global State & Filter Provider
 */

import React, { createContext, useContext, useMemo, useState } from 'react';
import { generateAllSyntheticData } from '../data/mockDataGenerator';
import {
  AttendanceRecord,
  Candidate,
  Employee,
  FilterState,
  HRInsightCard,
  LeaveRecord,
  PageId,
  PerformanceReview,
  Recruiter,
} from '../types';
import {
  computeOverviewMetrics,
  OverviewMetrics,
} from '../utils/hrCalculations';

interface HRContextValue {
  // Navigation
  activePage: PageId;
  setActivePage: (page: PageId) => void;

  // Raw & Filtered Data
  allEmployees: Employee[];
  allCandidates: Candidate[];
  allLeaveRecords: LeaveRecord[];
  allAttendance: AttendanceRecord[];
  allPerformanceReviews: PerformanceReview[];
  allRecruiters: Recruiter[];

  filteredEmployees: Employee[];
  filteredCandidates: Candidate[];
  filteredLeaveRecords: LeaveRecord[];
  filteredAttendance: AttendanceRecord[];
  filteredPerformanceReviews: PerformanceReview[];
  filteredRecruiters: Recruiter[];

  // Computed Metrics & Insights
  metrics: OverviewMetrics;
  insights: HRInsightCard[];

  // Filter State & Controls
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;

  // Modals & Selection
  selectedEmployee: Employee | null;
  setSelectedEmployee: (emp: Employee | null) => void;
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (cand: Candidate | null) => void;
  selectedRecruiter: Recruiter | null;
  setSelectedRecruiter: (rec: Recruiter | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  department: 'All',
  location: 'All',
  jobRole: 'All',
  gender: 'All',
  employmentType: 'All',
  recruiter: 'All',
  recruitmentSource: 'All',
  dateRange: 'All Time',
};

const HRContext = createContext<HRContextValue | undefined>(undefined);

// Generate once in module memory for instant responsiveness
const masterDataset = generateAllSyntheticData();

export const HRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Modals
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery !== '' ||
      filters.department !== 'All' ||
      filters.location !== 'All' ||
      filters.jobRole !== 'All' ||
      filters.gender !== 'All' ||
      filters.employmentType !== 'All' ||
      filters.recruiter !== 'All' ||
      filters.recruitmentSource !== 'All' ||
      filters.dateRange !== 'All Time'
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.department !== 'All') count++;
    if (filters.location !== 'All') count++;
    if (filters.jobRole !== 'All') count++;
    if (filters.gender !== 'All') count++;
    if (filters.employmentType !== 'All') count++;
    if (filters.recruiter !== 'All') count++;
    if (filters.recruitmentSource !== 'All') count++;
    if (filters.dateRange !== 'All Time') count++;
    return count;
  }, [filters]);

  // Filtered Employees
  const filteredEmployees = useMemo(() => {
    return masterDataset.employees.filter((emp) => {
      if (filters.department !== 'All' && emp.department !== filters.department) return false;
      if (filters.location !== 'All' && emp.location !== filters.location) return false;
      if (filters.jobRole !== 'All' && emp.jobRole !== filters.jobRole) return false;
      if (filters.gender !== 'All' && emp.gender !== filters.gender) return false;
      if (filters.employmentType !== 'All' && emp.employmentType !== filters.employmentType) return false;
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = emp.employeeName.toLowerCase().includes(q);
        const matchesId = emp.employeeId.toLowerCase().includes(q);
        const matchesRole = emp.jobRole.toLowerCase().includes(q);
        const matchesDept = emp.department.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesRole && !matchesDept) return false;
      }
      return true;
    });
  }, [filters]);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return masterDataset.candidates.filter((cand) => {
      if (filters.department !== 'All' && cand.department !== filters.department) return false;
      if (filters.location !== 'All' && cand.applicationLocation !== filters.location) return false;
      if (filters.jobRole !== 'All' && cand.jobRole !== filters.jobRole) return false;
      if (filters.gender !== 'All' && cand.gender !== filters.gender) return false;
      if (filters.recruiter !== 'All' && cand.recruiter !== filters.recruiter) return false;
      if (filters.recruitmentSource !== 'All' && cand.source !== filters.recruitmentSource) return false;
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = cand.candidateName.toLowerCase().includes(q);
        const matchesId = cand.candidateId.toLowerCase().includes(q);
        const matchesRole = cand.jobRole.toLowerCase().includes(q);
        const matchesDept = cand.department.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesRole && !matchesDept) return false;
      }
      return true;
    });
  }, [filters]);

  // Filtered Leave Records
  const filteredLeaveRecords = useMemo(() => {
    const validEmpIds = new Set(filteredEmployees.map((e) => e.employeeId));
    return masterDataset.leaveRecords.filter((lv) => {
      if (filters.department !== 'All' && lv.department !== filters.department) return false;
      return validEmpIds.has(lv.employeeId);
    });
  }, [filteredEmployees, filters.department]);

  // Filtered Attendance Records
  const filteredAttendance = useMemo(() => {
    const validEmpIds = new Set(filteredEmployees.map((e) => e.employeeId));
    return masterDataset.attendanceRecords.filter((att) => {
      if (filters.department !== 'All' && att.department !== filters.department) return false;
      return validEmpIds.has(att.employeeId);
    });
  }, [filteredEmployees, filters.department]);

  // Filtered Performance
  const filteredPerformanceReviews = useMemo(() => {
    const validEmpIds = new Set(filteredEmployees.map((e) => e.employeeId));
    return masterDataset.performanceReviews.filter((p) => {
      if (filters.department !== 'All' && p.department !== filters.department) return false;
      return validEmpIds.has(p.employeeId);
    });
  }, [filteredEmployees, filters.department]);

  // Filtered Recruiters
  const filteredRecruiters = useMemo(() => {
    return masterDataset.recruiters.filter((r) => {
      if (filters.department !== 'All' && r.department !== filters.department) return false;
      if (filters.location !== 'All' && r.location !== filters.location) return false;
      if (filters.recruiter !== 'All' && r.recruiterName !== filters.recruiter) return false;
      return true;
    });
  }, [filters.department, filters.location, filters.recruiter]);

  // Metrics
  const metrics = useMemo(() => {
    return computeOverviewMetrics(filteredEmployees, filteredCandidates, filteredLeaveRecords);
  }, [filteredEmployees, filteredCandidates, filteredLeaveRecords]);

  // Rule-based decision insights cards
  const insights: HRInsightCard[] = useMemo(() => {
    const otYesCount = filteredEmployees.filter((e) => e.overtime === 'Yes').length;
    const lowSatCount = filteredEmployees.filter((e) => e.jobSatisfaction <= 2).length;
    const lowPerfCount = filteredEmployees.filter((e) => e.performanceRating <= 2).length;

    return [
      {
        id: 'dec-1',
        title: 'Overtime Fatigue & Critical Retention Risk in Sales & Support',
        category: 'Retention & Morale',
        currentValue: `${metrics.attritionRate}% Attrition Rate`,
        benchmarkValue: '< 10.0% Industry Benchmark',
        riskLevel: 'High',
        rootCause: `High proportion of personnel (${otYesCount} employees) regularly working overtime without sufficient shift rotation or compensatory relief.`,
        potentialImpact: 'Estimated $450,000 annual cost in recruitment backfills, lost sales quotas, and decreased customer satisfaction SLA compliance.',
        recommendations: [
          'Cap maximum weekly overtime hours per employee at 8 hours with strict manager sign-offs.',
          'Approve 12 immediate junior backfill requisitions to distribute frontline caseloads.',
          'Initiate confidential stay-interviews with all tenured staff in high-overtime units before Q3.',
        ],
        expectedOutcome: 'Projected 2.5% to 3.8% reduction in voluntary attrition, saving an estimated $180,000+ in annualized replacement costs.',
      },
      {
        id: 'dec-2',
        title: 'Recruitment Sourcing Channel Imbalance & Agency Dependency',
        category: 'Talent Acquisition Cost',
        currentValue: '$2,850 Avg Cost per Hire',
        benchmarkValue: '$1,900 Target Benchmark',
        riskLevel: 'Medium',
        rootCause: 'Heavy reliance on external recruitment consultants ($3,800/hire) compared to employee referral programs which yield higher conversion at lower expense ($1,200/hire).',
        potentialImpact: 'Overspending talent acquisition budget by approx. $85,000 annually on agency commissions.',
        recommendations: [
          'Double the Employee Referral Bonus for critical Engineering and Sales technical roles.',
          'Transition 40% of agency pipeline to LinkedIn Recruiter automated sourcing sprints.',
          'Partner with top 3 university campuses for annual graduate engineering feeder tracks.',
        ],
        expectedOutcome: 'Lower average cost-per-hire to ~$2,100 while improving 90-day retention yield by 14%.',
      },
      {
        id: 'dec-3',
        title: 'Engineering Technical Interview Velocity & Funnel Friction',
        category: 'Hiring Velocity',
        currentValue: `${metrics.avgTimeToHire} Days Time to Hire`,
        benchmarkValue: '30 Days SLA Benchmark',
        riskLevel: 'Medium',
        rootCause: 'Engineering multi-round interview loops take an average of 5 distinct evaluation panels, causing top candidate drop-offs to competing offers.',
        potentialImpact: '35% offer decline rate and delayed product feature delivery cycles across core platform squads.',
        recommendations: [
          'Consolidate technical assessments into a single 90-minute structured practical pairing round.',
          'Mandate interviewer feedback scorecards within 24 hours of panel completion.',
          'Empower Engineering Leads to issue fast-track conditional offer sheets to top percentile candidates.',
        ],
        expectedOutcome: 'Accelerate time-to-fill from 42 days to under 30 days and improve offer acceptance rate to 88%.',
      },
      {
        id: 'dec-4',
        title: 'Performance Improvement & Succession Bench Readiness',
        category: 'Talent Development',
        currentValue: `${lowPerfCount} Developing Employees (Rating ≤ 2)`,
        benchmarkValue: '< 5% of Total Workforce',
        riskLevel: 'Low',
        rootCause: 'Inconsistent onboarding ramp-up and training gap in recently transitioned mid-level employees.',
        potentialImpact: 'Uneven team productivity and higher supervisory friction if performance dips are unaddressed.',
        recommendations: [
          'Enroll all Rating 1-2 employees in structured 60-day capability coaching plans with assigned mentors.',
          'Increase annual skill training enablement budget by 12 hours per technical employee.',
          'Review quarterly progress milestones before initiating formal separation procedures.',
        ],
        expectedOutcome: 'Recover 60%+ of underperforming employees to standard competency level within 2 review cycles.',
      },
    ];
  }, [filteredEmployees, metrics]);

  return (
    <HRContext.Provider
      value={{
        activePage,
        setActivePage,
        allEmployees: masterDataset.employees,
        allCandidates: masterDataset.candidates,
        allLeaveRecords: masterDataset.leaveRecords,
        allAttendance: masterDataset.attendanceRecords,
        allPerformanceReviews: masterDataset.performanceReviews,
        allRecruiters: masterDataset.recruiters,
        filteredEmployees,
        filteredCandidates,
        filteredLeaveRecords,
        filteredAttendance,
        filteredPerformanceReviews,
        filteredRecruiters,
        metrics,
        insights,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        hasActiveFilters,
        activeFilterCount,
        selectedEmployee,
        setSelectedEmployee,
        selectedCandidate,
        setSelectedCandidate,
        selectedRecruiter,
        setSelectedRecruiter,
        isSearchOpen,
        setIsSearchOpen,
        isExportOpen,
        setIsExportOpen,
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};
