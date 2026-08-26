/**
 * Types and interfaces for HR Analytics Command Center
 */

export type Department =
  | 'IT'
  | 'Engineering'
  | 'Finance'
  | 'Sales'
  | 'Marketing'
  | 'Operations'
  | 'HR'
  | 'Customer Support'
  | 'Administration';

export type Location =
  | 'New York'
  | 'San Francisco'
  | 'Chicago'
  | 'Austin'
  | 'London'
  | 'Bangalore'
  | 'Remote';

export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Intern';

export type Gender = 'Male' | 'Female' | 'Non-Binary';

export type EmployeeStatus = 'Active' | 'Resigned' | 'Terminated';

export type SalaryBand =
  | 'Junior ($40k-$65k)'
  | 'Mid-Level ($65k-$95k)'
  | 'Senior ($95k-$130k)'
  | 'Lead / Staff ($130k-$175k)'
  | 'Executive ($175k+)';

export type EducationLevel = "Bachelor's" | "Master's" | 'Doctorate' | 'Associate' | 'Diploma';

export interface Employee {
  employeeId: string;
  employeeName: string;
  avatar: string;
  gender: Gender;
  age: number;
  department: Department;
  jobRole: string;
  location: Location;
  education: EducationLevel;
  experienceYears: number;
  joiningDate: string;
  employmentType: EmploymentType;
  manager: string;
  monthlyIncome: number;
  salaryBand: SalaryBand;
  jobSatisfaction: number; // 1 - 5
  performanceRating: number; // 1 - 5
  potentialRating?: 'High' | 'Medium' | 'Low';
  nineBoxCategory?: string;
  trainingHours: number;
  yearsSinceLastPromotion: number;
  overtime: 'Yes' | 'No';
  workLifeBalance: number; // 1 - 5
  yearsAtCompany: number;
  yearsInCurrentRole: number;
  promotionLast5Years: 'Yes' | 'No';
  employeeStatus: EmployeeStatus;
  attritionReason?: string;
  attritionDate?: string;
  email: string;
  phone: string;
}

export type CandidateSource =
  | 'LinkedIn'
  | 'Naukri'
  | 'Indeed'
  | 'Employee Referral'
  | 'Company Website'
  | 'Consultant'
  | 'Campus Hiring'
  | 'Job Fair';

export type ApplicationStatus =
  | 'Applied'
  | 'Screened'
  | 'Interviewed'
  | 'Selected'
  | 'Offered'
  | 'Joined'
  | 'Rejected'
  | 'Withdrawn';

export interface Candidate {
  candidateId: string;
  candidateName: string;
  applicationDate: string;
  gender: Gender;
  age: number;
  qualification: EducationLevel;
  experienceYears: number;
  department: Department;
  jobRole: string;
  source: CandidateSource;
  recruiter: string;
  applicationStatus: ApplicationStatus;
  screeningStatus: 'Passed' | 'Failed' | 'In Review';
  interviewStatus: 'Completed' | 'Scheduled' | 'Pending' | 'Rejected';
  interviewScore: number; // 0 - 100
  selectionStatus: 'Selected' | 'On Hold' | 'Not Selected';
  offerStatus: 'Accepted' | 'Offered' | 'Declined' | 'Not Offered';
  joiningStatus: 'Joined' | 'Pending' | 'No Show' | 'N/A';
  expectedSalary: number;
  offeredSalary: number;
  applicationLocation: Location;
  timeToHire: number; // days
  hiringCost: number; // USD
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Half Day' | 'On Leave' | 'Work From Home';

export interface AttendanceRecord {
  attendanceId: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  date: string;
  status: AttendanceStatus;
  workHours: number;
  overtimeHours: number;
  leaveType?: 'Casual Leave' | 'Sick Leave' | 'Paid Leave' | 'Unpaid Leave';
}

export type LeaveType =
  | 'Casual Leave'
  | 'Sick Leave'
  | 'Earned Leave'
  | 'Unpaid Leave'
  | 'Maternity/Paternity Leave';

export interface LeaveRecord {
  leaveId: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
  reason: string;
}

export interface PerformanceReview {
  performanceId: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  jobRole: string;
  reviewDate: string;
  performanceRating: number; // 1 - 5
  goalAchievement: number; // % e.g. 75 - 125
  managerRating: number; // 1 - 5
  promotionRecommended: boolean;
  trainingRequired: boolean;
  comments: string;
  potentialRating: 'High' | 'Medium' | 'Low';
}

export interface SalaryRecord {
  salaryHistoryId: string;
  employeeId: string;
  effectiveDate: string;
  salary: number;
  salaryBand: SalaryBand;
  reason: 'Annual Increment' | 'Promotion' | 'Market Adjustment' | 'Joining';
}

export interface Recruiter {
  recruiterId: string;
  recruiterName: string;
  recruiterLevel: 'Lead Recruiter' | 'Senior Recruiter' | 'Talent Partner' | 'Junior Recruiter';
  department: Department;
  location: Location;
  experienceYears: number;
  status: 'Active' | 'On Leave';
  avatar: string;
}

export interface FilterState {
  searchQuery: string;
  department: string;
  location: string;
  jobRole: string;
  gender: string;
  employmentType: string;
  recruiter: string;
  recruitmentSource: string;
  dateRange: 'All Time' | 'YTD (2026)' | 'Last 12 Months' | 'Q1 2026' | 'Q4 2025' | 'Q3 2025';
}

export type PageId =
  | 'overview'
  | 'recruitment'
  | 'workforce'
  | 'attrition'
  | 'attendance'
  | 'performance'
  | 'recruiters'
  | 'insights'
  | 'about';

export interface HRInsight {
  id: string;
  category: 'Retention' | 'Recruitment' | 'Workforce' | 'Performance' | 'Attendance' | 'Compensation';
  title: string;
  finding: string;
  businessImpact: string;
  recommendedAction: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  metricTag: string;
  affectedDepartment?: Department | 'Company-wide';
  statValue?: string;
}

export interface HRInsightCard {
  id: string;
  title: string;
  category: string;
  currentValue: string;
  benchmarkValue: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  rootCause: string;
  potentialImpact: string;
  recommendations: string[];
  expectedOutcome: string;
}
