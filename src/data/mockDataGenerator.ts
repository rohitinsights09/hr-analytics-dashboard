/**
 * Deterministic, realistic synthetic HR data generator
 * Generates ~1,500 employees, ~12,000 candidates, 4,000 attendance records, leave, performance & recruiter records.
 */

import {
  AttendanceRecord,
  AttendanceStatus,
  Candidate,
  CandidateSource,
  Department,
  EducationLevel,
  Employee,
  EmployeeStatus,
  EmploymentType,
  Gender,
  LeaveRecord,
  LeaveType,
  Location,
  PerformanceReview,
  Recruiter,
  SalaryBand,
} from '../types';

// Seeded pseudo-random generator (Mulberry32) for fast, deterministic generation
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(1337);

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return rng() * (max - min) + min;
}

// Master lists
export const DEPARTMENTS: Department[] = [
  'Engineering',
  'IT',
  'Sales',
  'Marketing',
  'Operations',
  'Finance',
  'HR',
  'Customer Support',
  'Administration',
];

export const LOCATIONS: Location[] = [
  'New York',
  'San Francisco',
  'Chicago',
  'Austin',
  'London',
  'Bangalore',
  'Remote',
];

export const SOURCES: CandidateSource[] = [
  'LinkedIn',
  'Naukri',
  'Indeed',
  'Employee Referral',
  'Company Website',
  'Consultant',
  'Campus Hiring',
  'Job Fair',
];

export const ROLES_BY_DEPT: Record<Department, string[]> = {
  Engineering: [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Frontend Engineer',
    'Backend Engineer',
    'DevOps Engineer',
    'QA Automation Engineer',
    'Engineering Manager',
    'Tech Lead',
  ],
  IT: [
    'Systems Administrator',
    'Cloud Architect',
    'Network Engineer',
    'Cybersecurity Analyst',
    'IT Support Specialist',
    'Database Administrator',
  ],
  Sales: [
    'Account Executive',
    'Sales Development Rep',
    'Enterprise Sales Director',
    'Sales Operations Lead',
    'Business Development Manager',
    'Inside Sales Specialist',
  ],
  Marketing: [
    'Digital Marketing Specialist',
    'Growth Marketer',
    'Content Strategist',
    'Product Marketing Manager',
    'SEO / SEM Specialist',
    'Brand Designer',
  ],
  Operations: [
    'Operations Manager',
    'Supply Chain Analyst',
    'Process Improvement Specialist',
    'Logistics Coordinator',
    'Operations Associate',
  ],
  Finance: [
    'Financial Analyst',
    'Senior Accountant',
    'Treasury Manager',
    'Payroll Specialist',
    'Financial Planning Manager',
    'Audit Lead',
  ],
  HR: [
    'HR Business Partner',
    'Talent Acquisition Specialist',
    'HR Generalist',
    'Compensation & Benefits Lead',
    'HR Operations Analyst',
    'Learning & Development Specialist',
  ],
  'Customer Support': [
    'Customer Success Manager',
    'Technical Support Engineer',
    'Customer Service Lead',
    'Support Operations Analyst',
  ],
  Administration: [
    'Facilities Manager',
    'Executive Assistant',
    'Office Coordinator',
    'Procurement Specialist',
  ],
};

const FIRST_NAMES_MALE = [
  'James', 'Marcus', 'David', 'Arjun', 'Alexander', 'Ethan', 'Daniel', 'Michael', 'Liam',
  'Lucas', 'Vikram', 'Mateo', 'Benjamin', 'Ryan', 'Wei', 'Samir', 'Noah', 'Gabriel', 'Julian', 'Kevin',
];

const FIRST_NAMES_FEMALE = [
  'Elena', 'Sophia', 'Priya', 'Chloe', 'Amara', 'Isabella', 'Maya', 'Emily', 'Aaliyah',
  'Mia', 'Neha', 'Camila', 'Ananya', 'Hannah', 'Sara', 'Zoe', 'Leila', 'Victoria', 'Grace', 'Olivia',
];

const LAST_NAMES = [
  'Vance', 'Chen', 'Sharma', 'Patel', 'Novak', 'Rostova', 'Kim', 'O’Connor', 'Al-Mansoor',
  'Rodriguez', 'Mercer', 'Dubois', 'Tanaka', 'Ibrahim', 'Larsson', 'Goldman', 'Washington',
  'Gupta', 'Kowalski', 'Sinclair', 'Nair', 'Moretti', 'Fischer', 'Mendoza', 'Kapadia',
];

const ATTRITION_REASONS = [
  'Better Compensation & Perks',
  'Career Advancement Elsewhere',
  'Work-Life Balance & Burnout',
  'Relocation / Family Priorities',
  'Dissatisfaction with Leadership',
  'Pursuing Higher Education',
  'Health / Personal Reasons',
  'Commute / Return-to-Office Friction',
];

const MANAGERS = [
  'Elena Vance (VP Engineering)',
  'Marcus Vance (Head of Sales)',
  'David Chen (Director of IT)',
  'Priya Sharma (VP Product Marketing)',
  'Robert Sterling (Chief Financial Officer)',
  'Angela Davis (Chief People Officer)',
  'Siddharth Nair (VP Customer Success)',
  'Chloe Bennett (Head of Administration)',
];

// 12 Dedicated Recruiters
export const RECRUITERS: Recruiter[] = [
  {
    recruiterId: 'REC-101',
    recruiterName: 'Maya Lin',
    recruiterLevel: 'Lead Recruiter',
    department: 'Engineering',
    location: 'San Francisco',
    experienceYears: 8,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-102',
    recruiterName: 'Alex Thorne',
    recruiterLevel: 'Senior Recruiter',
    department: 'IT',
    location: 'New York',
    experienceYears: 6,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-103',
    recruiterName: 'Devon Clarke',
    recruiterLevel: 'Senior Recruiter',
    department: 'Sales',
    location: 'Chicago',
    experienceYears: 7,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-104',
    recruiterName: 'Sophia Zhang',
    recruiterLevel: 'Talent Partner',
    department: 'Marketing',
    location: 'Austin',
    experienceYears: 5,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-105',
    recruiterName: 'Kavita Menon',
    recruiterLevel: 'Lead Recruiter',
    department: 'Engineering',
    location: 'Bangalore',
    experienceYears: 9,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-106',
    recruiterName: 'Liam O’Connor',
    recruiterLevel: 'Senior Recruiter',
    department: 'Operations',
    location: 'London',
    experienceYears: 6,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-107',
    recruiterName: 'Jessica Taylor',
    recruiterLevel: 'Talent Partner',
    department: 'Finance',
    location: 'New York',
    experienceYears: 4,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-108',
    recruiterName: 'Tariq Al-Mansoor',
    recruiterLevel: 'Senior Recruiter',
    department: 'Customer Support',
    location: 'Austin',
    experienceYears: 5,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-109',
    recruiterName: 'Chloe Bennett',
    recruiterLevel: 'Junior Recruiter',
    department: 'Administration',
    location: 'Chicago',
    experienceYears: 2,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-110',
    recruiterName: 'Ethan Wright',
    recruiterLevel: 'Junior Recruiter',
    department: 'Sales',
    location: 'San Francisco',
    experienceYears: 3,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-111',
    recruiterName: 'Zoe Morales',
    recruiterLevel: 'Talent Partner',
    department: 'HR',
    location: 'New York',
    experienceYears: 4,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
  },
  {
    recruiterId: 'REC-112',
    recruiterName: 'Julian Vance',
    recruiterLevel: 'Lead Recruiter',
    department: 'Engineering',
    location: 'Remote',
    experienceYears: 10,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

function determineSalaryBand(monthlyIncome: number): SalaryBand {
  const annual = monthlyIncome * 12;
  if (annual < 65000) return 'Junior ($40k-$65k)';
  if (annual < 95000) return 'Mid-Level ($65k-$95k)';
  if (annual < 130000) return 'Senior ($95k-$130k)';
  if (annual < 175000) return 'Lead / Staff ($130k-$175k)';
  return 'Executive ($175k+)';
}

function calculate9BoxCategory(performance: number, potential: 'High' | 'Medium' | 'Low'): string {
  if (potential === 'High') {
    if (performance >= 4) return 'Star / High Performer';
    if (performance === 3) return 'High Potential / Growth';
    return 'Enigma / Rough Diamond';
  } else if (potential === 'Medium') {
    if (performance >= 4) return 'High Impact / High Professional';
    if (performance === 3) return 'Core Player / Solid';
    return 'Dilemma / Inconsistent';
  } else {
    if (performance >= 4) return 'Trusted Professional / Workhorse';
    if (performance === 3) return 'Effective / Solid Professional';
    return 'Risk / Action Needed';
  }
}

export function generateAllSyntheticData() {
  const TOTAL_EMPLOYEES = 1500;
  const employees: Employee[] = [];

  for (let i = 1; i <= TOTAL_EMPLOYEES; i++) {
    const employeeId = `EMP-${String(1000 + i).padStart(5, '0')}`;
    const isFemale = rng() < 0.44;
    const isNonBinary = !isFemale && rng() < 0.04;
    const gender: Gender = isNonBinary ? 'Non-Binary' : isFemale ? 'Female' : 'Male';

    const firstName = isFemale
      ? randomChoice(FIRST_NAMES_FEMALE)
      : isNonBinary
      ? 'Alex'
      : randomChoice(FIRST_NAMES_MALE);
    const lastName = randomChoice(LAST_NAMES);
    const employeeName = `${firstName} ${lastName}`;

    const department = randomChoice(DEPARTMENTS);
    const jobRole = randomChoice(ROLES_BY_DEPT[department]);
    const location = randomChoice(LOCATIONS);

    const eduRoll = rng();
    const education: EducationLevel =
      eduRoll < 0.52 ? "Bachelor's" : eduRoll < 0.86 ? "Master's" : eduRoll < 0.94 ? 'Associate' : 'Doctorate';

    const age = randomInt(22, 59);
    const maxExp = Math.max(1, age - 21);
    const experienceYears = Math.min(maxExp, randomInt(1, maxExp));
    const yearsAtCompany = Math.min(experienceYears, randomInt(0, Math.min(18, experienceYears)));
    const yearsInCurrentRole = Math.min(yearsAtCompany, randomInt(0, Math.min(6, yearsAtCompany)));
    const yearsSinceLastPromotion = Math.min(yearsAtCompany, randomInt(0, 4));

    let baseRate = 5500;
    if (department === 'Engineering') baseRate = 7800;
    else if (department === 'IT') baseRate = 6500;
    else if (department === 'Finance') baseRate = 6200;
    else if (department === 'Sales') baseRate = 5800;
    else if (department === 'Marketing') baseRate = 5400;
    else if (department === 'HR') baseRate = 5000;
    else if (department === 'Operations') baseRate = 4800;
    else if (department === 'Customer Support') baseRate = 3800;

    const roleMultiplier =
      jobRole.includes('Director') || jobRole.includes('Head') || jobRole.includes('VP')
        ? 2.2
        : jobRole.includes('Manager') || jobRole.includes('Lead') || jobRole.includes('Architect')
        ? 1.6
        : jobRole.includes('Senior')
        ? 1.3
        : 1.0;

    const monthlyIncome = Math.round(baseRate * roleMultiplier + experienceYears * 160 + randomInt(-250, 450));
    const salaryBand = determineSalaryBand(monthlyIncome);

    const overtimeChance =
      department === 'Sales' ? 0.45 : department === 'Customer Support' ? 0.38 : department === 'Operations' ? 0.32 : 0.18;
    const overtime: 'Yes' | 'No' = rng() < overtimeChance ? 'Yes' : 'No';

    let workLifeBalance = randomInt(2, 5);
    if (overtime === 'Yes' && rng() < 0.6) workLifeBalance = randomInt(1, 3);

    let jobSatisfaction = randomInt(2, 5);
    if (workLifeBalance <= 2 && rng() < 0.5) jobSatisfaction = randomInt(1, 3);

    const pRoll = rng();
    const performanceRating = pRoll < 0.08 ? 1 : pRoll < 0.22 ? 2 : pRoll < 0.62 ? 3 : pRoll < 0.88 ? 4 : 5;
    const potRoll = rng();
    const potentialRating: 'High' | 'Medium' | 'Low' =
      potRoll < 0.25 ? 'High' : potRoll < 0.72 ? 'Medium' : 'Low';
    const nineBoxCategory = calculate9BoxCategory(performanceRating, potentialRating);
    const trainingHours = randomInt(8, 48);

    const promotionLast5Years: 'Yes' | 'No' = yearsAtCompany > 2 && rng() < 0.32 ? 'Yes' : 'No';

    let employeeStatus: EmployeeStatus = 'Active';
    let attritionReason: string | undefined = undefined;
    let attritionDate: string | undefined = undefined;

    let attritionProb = 0.08;
    if (department === 'Sales') attritionProb += 0.09;
    if (department === 'Customer Support') attritionProb += 0.07;
    if (overtime === 'Yes') attritionProb += 0.06;
    if (jobSatisfaction <= 2) attritionProb += 0.14;
    if (workLifeBalance <= 2) attritionProb += 0.08;
    if (yearsAtCompany <= 2) attritionProb += 0.05;
    if (promotionLast5Years === 'No' && yearsAtCompany > 3) attritionProb += 0.04;

    if (rng() < Math.min(0.65, attritionProb)) {
      employeeStatus = rng() < 0.88 ? 'Resigned' : 'Terminated';
      attritionReason = employeeStatus === 'Terminated' ? 'Performance / Policy Violation' : randomChoice(ATTRITION_REASONS);
      const leaveMonth = randomInt(1, 12);
      attritionDate = `2025-${String(leaveMonth).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`;
    }

    const joinYear = 2026 - yearsAtCompany;
    const joinMonth = randomInt(1, 12);
    const joinDay = randomInt(1, 28);
    const joiningDate = `${joinYear}-${String(joinMonth).padStart(2, '0')}-${String(joinDay).padStart(2, '0')}`;

    const empTypes: EmploymentType[] = ['Full Time', 'Full Time', 'Full Time', 'Full Time', 'Contract', 'Part Time', 'Intern'];
    const employmentType: EmploymentType = randomChoice(empTypes);

    const manager = randomChoice(MANAGERS);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@enterprise-hr.org`;
    const phone = `+1 (555) ${randomInt(100, 999)}-${randomInt(1000, 9999)}`;
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${employeeId}`;

    employees.push({
      employeeId,
      employeeName,
      avatar,
      gender,
      age,
      department,
      jobRole,
      location,
      education,
      experienceYears,
      joiningDate,
      employmentType,
      manager,
      monthlyIncome,
      salaryBand,
      jobSatisfaction,
      performanceRating,
      potentialRating,
      nineBoxCategory,
      trainingHours,
      yearsSinceLastPromotion,
      overtime,
      workLifeBalance,
      yearsAtCompany,
      yearsInCurrentRole,
      promotionLast5Years,
      employeeStatus,
      attritionReason,
      attritionDate,
      email,
      phone,
    });
  }

  // 2. Generate 12,000 Candidates
  const TOTAL_CANDIDATES = 12000;
  const candidates: Candidate[] = [];

  for (let i = 1; i <= TOTAL_CANDIDATES; i++) {
    const candidateId = `APP-${String(100000 + i)}`;
    const isFemale = rng() < 0.45;
    const gender: Gender = isFemale ? 'Female' : 'Male';
    const firstName = isFemale ? randomChoice(FIRST_NAMES_FEMALE) : randomChoice(FIRST_NAMES_MALE);
    const lastName = randomChoice(LAST_NAMES);
    const candidateName = `${firstName} ${lastName}`;

    const department = randomChoice(DEPARTMENTS);
    const jobRole = randomChoice(ROLES_BY_DEPT[department]);
    const source = randomChoice(SOURCES);
    const location = randomChoice(LOCATIONS);

    const eduRoll = rng();
    const qualification: EducationLevel =
      eduRoll < 0.6 ? "Bachelor's" : eduRoll < 0.9 ? "Master's" : 'Doctorate';
    const experienceYears = randomInt(0, 15);

    const appMonth = randomInt(1, 12);
    const appDay = randomInt(1, 28);
    const applicationDate = `2025-${String(appMonth).padStart(2, '0')}-${String(appDay).padStart(2, '0')}`;

    let assignedRecruiter = RECRUITERS.find((r) => r.department === department);
    if (!assignedRecruiter) assignedRecruiter = randomChoice(RECRUITERS);

    const screenPassed = rng() < (source === 'Employee Referral' ? 0.65 : source === 'LinkedIn' ? 0.38 : 0.28);
    let applicationStatus: Candidate['applicationStatus'] = 'Applied';
    let screeningStatus: Candidate['screeningStatus'] = 'In Review';
    let interviewStatus: Candidate['interviewStatus'] = 'Pending';
    let selectionStatus: Candidate['selectionStatus'] = 'On Hold';
    let offerStatus: Candidate['offerStatus'] = 'Not Offered';
    let joiningStatus: Candidate['joiningStatus'] = 'N/A';
    let interviewScore = 0;
    let timeToHire = 0;
    let hiringCost = randomInt(250, 600);

    if (source === 'Consultant') hiringCost += randomInt(1800, 3200);
    else if (source === 'Employee Referral') hiringCost += randomInt(800, 1500);
    else if (source === 'LinkedIn' || source === 'Indeed') hiringCost += randomInt(400, 900);

    if (screenPassed) {
      screeningStatus = 'Passed';
      applicationStatus = 'Screened';

      const interviewPassed = rng() < 0.45;
      interviewScore = randomInt(40, 98);

      if (interviewPassed) {
        interviewStatus = 'Completed';
        applicationStatus = 'Interviewed';

        const selected = rng() < 0.42;
        if (selected) {
          selectionStatus = 'Selected';
          applicationStatus = 'Selected';

          const offerMade = rng() < 0.85;
          if (offerMade) {
            offerStatus = 'Offered';
            applicationStatus = 'Offered';

            const joined = rng() < 0.78;
            if (joined) {
              offerStatus = 'Accepted';
              joiningStatus = 'Joined';
              applicationStatus = 'Joined';
              timeToHire = randomInt(18, 54);
            } else {
              offerStatus = rng() < 0.7 ? 'Declined' : 'Offered';
              joiningStatus = 'No Show';
              applicationStatus = 'Withdrawn';
            }
          }
        } else {
          selectionStatus = 'Not Selected';
          applicationStatus = 'Rejected';
        }
      } else {
        interviewStatus = 'Rejected';
        applicationStatus = 'Rejected';
      }
    } else {
      screeningStatus = rng() < 0.8 ? 'Failed' : 'In Review';
      if (screeningStatus === 'Failed') applicationStatus = 'Rejected';
    }

    const expectedSalary = Math.round(50000 + experienceYears * 6500 + randomInt(-4000, 8000));
    const offeredSalary = Math.round(expectedSalary * randomFloat(0.95, 1.1));

    candidates.push({
      candidateId,
      candidateName,
      applicationDate,
      gender,
      age: randomInt(21, 48),
      qualification,
      experienceYears,
      department,
      jobRole,
      source,
      recruiter: assignedRecruiter.recruiterName,
      applicationStatus,
      screeningStatus,
      interviewStatus,
      interviewScore,
      selectionStatus,
      offerStatus,
      joiningStatus,
      expectedSalary,
      offeredSalary,
      applicationLocation: location,
      timeToHire,
      hiringCost,
    });
  }

  // 3. Generate Leave Records (850 records)
  const leaveRecords: LeaveRecord[] = [];
  const LEAVE_TYPES: LeaveType[] = [
    'Casual Leave',
    'Sick Leave',
    'Earned Leave',
    'Unpaid Leave',
    'Maternity/Paternity Leave',
  ];

  for (let i = 1; i <= 850; i++) {
    const emp = randomChoice(employees);
    const leaveType = randomChoice(LEAVE_TYPES);
    const days =
      leaveType === 'Maternity/Paternity Leave'
        ? randomInt(45, 90)
        : leaveType === 'Earned Leave'
        ? randomInt(3, 10)
        : randomInt(1, 4);
    const month = randomInt(1, 12);
    const day = randomInt(1, 25);
    const startDate = `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const endDate = `2025-${String(month).padStart(2, '0')}-${String(Math.min(28, day + days)).padStart(2, '0')}`;
    const approvalRoll = rng();
    const approvalStatus: 'Approved' | 'Pending' | 'Rejected' =
      approvalRoll < 0.88 ? 'Approved' : approvalRoll < 0.96 ? 'Pending' : 'Rejected';

    leaveRecords.push({
      leaveId: `LV-${1000 + i}`,
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      department: emp.department,
      leaveType,
      startDate,
      endDate,
      days,
      approvalStatus,
      reason:
        leaveType === 'Sick Leave'
          ? 'Medical recovery & doctor consult'
          : leaveType === 'Casual Leave'
          ? 'Personal commitment / family event'
          : leaveType === 'Earned Leave'
          ? 'Annual planned vacation'
          : leaveType === 'Maternity/Paternity Leave'
          ? 'Parental leave bonding'
          : 'Extended unplanned personal emergency',
    });
  }

  // 4. Generate 4,000 Attendance Records for Monthly MIS
  const attendanceRecords: AttendanceRecord[] = [];
  const activeEmployees = employees.filter((e) => e.employeeStatus === 'Active');

  for (let i = 1; i <= 4000; i++) {
    const emp = randomChoice(activeEmployees);
    const aRoll = rng();
    let status: AttendanceStatus = 'Present';
    let leaveType: AttendanceRecord['leaveType'] = undefined;
    let workHours = 8.5;
    let overtimeHours = 0;

    if (aRoll < 0.68) {
      status = 'Present';
      if (emp.overtime === 'Yes' && rng() < 0.4) overtimeHours = randomFloat(1.5, 3.5);
    } else if (aRoll < 0.89) {
      status = 'Work From Home';
    } else if (aRoll < 0.96) {
      status = 'On Leave';
      workHours = 0;
      const lRoll = rng();
      leaveType =
        lRoll < 0.4 ? 'Casual Leave' : lRoll < 0.7 ? 'Sick Leave' : lRoll < 0.9 ? 'Paid Leave' : 'Unpaid Leave';
    } else {
      status = 'Absent';
      workHours = 0;
    }

    const month = randomInt(1, 12);
    const day = randomInt(1, 28);
    const date = `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    attendanceRecords.push({
      attendanceId: `ATT-${10000 + i}`,
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      department: emp.department,
      date,
      status,
      workHours,
      overtimeHours,
      leaveType,
    });
  }

  // 5. Generate Performance Reviews (1,500 records)
  const performanceReviews: PerformanceReview[] = employees.map((emp, idx) => {
    const goalAchievement = randomInt(72, 130);
    const managerRating = Math.min(5, Math.max(1, Math.round(emp.performanceRating + randomFloat(-0.4, 0.4))));
    const promotionRecommended = emp.performanceRating >= 4 && emp.yearsInCurrentRole >= 2 && rng() < 0.65;
    const trainingRequired = emp.performanceRating <= 2 || rng() < 0.18;
    const potentialRating = emp.potentialRating || 'Medium';

    return {
      performanceId: `PERF-${1000 + idx}`,
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      department: emp.department,
      jobRole: emp.jobRole,
      reviewDate: '2025-12-15',
      performanceRating: emp.performanceRating,
      goalAchievement,
      managerRating,
      promotionRecommended,
      trainingRequired,
      comments:
        emp.performanceRating >= 4
          ? 'Exemplary execution, demonstrates leadership behaviors, strong candidate for role progression.'
          : emp.performanceRating === 3
          ? 'Solid core performance meeting operational SLAs and objectives steadily.'
          : 'Needs focused mentoring, technical skill development, and structured performance improvement plan.',
      potentialRating,
    };
  });

  return {
    employees,
    candidates,
    leaveRecords,
    attendanceRecords,
    performanceReviews,
    recruiters: RECRUITERS,
  };
}
