# 📊 HR Analytics Command Center

**HR MIS & Analytics Portfolio Project**

**Created by:**  
Rohit Shinde

**Profile:**  
HR Executive | HR MIS | Analytics

**Project Overview:**  
This project demonstrates the use of HR data to monitor recruitment, workforce, attrition, attendance, performance and recruiter effectiveness.

---

## 🌟 Executive Overview

The **HR Analytics Command Center** is an interactive Human Resources Management Information System (MIS) web application. It transforms workforce, talent acquisition, and operational data into real-time visual intelligence and actionable HR insights.

Built with a synthetic enterprise dataset of **1,500 active and separated employees**, **12,000 multi-stage recruitment candidates**, **12 dedicated talent recruiters**, and continuous **attendance & performance appraisal records**, this portfolio project models end-to-end employee lifecycle operations.

---

## 👤 Project Portfolio & Links

- **Created By:** Rohit Shinde
- **Role / Profile:** HR Executive | HR MIS | Analytics
- **Focus Areas:** Recruitment MIS • HR Operations • Workforce Analytics • Employee Reporting • HR Data Visualization
- **LinkedIn:** [(https://www.linkedin.com/in/rohit-shinde)]
- **GitHub:** [(https://github.com/rohitinsights09)]
- **Portfolio:** [(https://github.com/rohitinsights09/hr-analytics-command-center)]

---

## 🎯 Business Problem & Objectives

### The Business Challenge
In many enterprises, HR data is siloed across disparate systems:
1. **Applicant Tracking Systems (ATS)** track candidate stages independently of recruiter capacity.
2. **Core HRIS** stores demographic and compensation records without real-time connection to flight risk.
3. **Biometric Time & Attendance** machines generate isolated logs rarely reconciled with burnout patterns.
4. **Annual Performance Appraisals** reside in static review sheets without 9-Box talent matrix visualization.

### Project Objectives
- **Centralize the HR Data Architecture:** Deliver a unified executive command center with interactive multi-dimensional filtering (Department, Location, Date Range, Status).
- **Proactive Retention Mitigation:** Identify elevated attrition risk segments (such as overtime-heavy operational units) and quantify the financial impact of employee departures.
- **Recruitment Funnel Optimization:** Measure gate-by-gate conversion drop-offs, sourcing channel ROI, and individual recruiter time-to-hire metrics.
- **Talent Bench Planning:** Map active personnel into an interactive **9-Box Performance vs Potential Matrix** to accelerate succession planning and training resource allocation.
- **Quantified Strategic HR ROI:** Bridge the gap between transactional HR reporting and executive decision-making via a **What-If ROI Impact Simulator**.

---

## 🚀 Key Modules & Capabilities

### 1. 📈 HR Executive Overview
- **8 Core Real-Time KPIs:** Total Headcount, Active Headcount, New Hires (YTD), Attrition Rate, Open Hiring Pipeline, Average Monthly Compensation, Average Time to Hire, and Attendance Compliance Rate.
- **Headcount Growth vs Joiner/Leaver Dynamics:** 12-month area chart tracking net talent growth.
- **Recruitment Funnel Overview:** High-level candidate progression visualizer.
- **Departmental Workforce Distribution & Status Donut:** Active vs Resigned vs Terminated employee ratios.
- **Dynamic HR Observations Engine:** Generates synthesized operational insights directly computed from active filter parameters.

### 2. 🎯 Recruitment Intelligence & Funnel Analytics
- **Stage Progression:** Visualizes **Applications → Shortlisted → Interviewed → Selected → Offers Extended → Joined**.
- **Channel Effectiveness:** Sourcing ROI analysis across LinkedIn, Employee Referrals, Direct Portals, Campus Drives, Internal Mobility, and Agencies.
- **Velocity Metrics:** Average time-to-fill tracked across departments and specific job roles.
- **Interactive Candidate Pipeline Master:** Searchable and filterable candidate directory with individual assessment scorecards.

### 3. 👥 Workforce Demographics & Master Records
- **Demographic Segmentation:** Age profiles, gender distribution, experience brackets, tenure curves, and compensation bands.
- **Regional Hub Analysis:** Staffing breakdown across corporate headquarters and regional delivery centers.
- **Employee Master Roster (MIS):** Full-featured data table supporting multi-field search, column sorting, pagination, and a **360° Employee Profile Modal**.

### 4. 🚨 Attrition & Retention (HR Attention Zone)
- **Descriptive Flight Risk Analysis:** Exit rates segmented by Department, Job Role, Overtime Status, Job Satisfaction, and Work-Life Balance scores.
- **🚨 Priority HR Attention Zone:** Visual alert cards spotlighting high-risk cohorts (e.g. Sales units experiencing high overtime) without ungrounded predictive claims.
- **Exit Interview Feedback:** Categorization of voluntary departures (Compensation, Career Growth, Burnout, Relocation, Leadership).

### 5. ⏱️ Attendance & Leave Metrics
- **Availability Compliance:** Tracks daily presence, hybrid Work-From-Home (WFH), approved leave, and unplanned absenteeism.
- **Leave Balance Utilization:** Utilization trends for Sick Leave, Casual Leave, and Paid Time Off.
- **Late Marks & Punctuality Scoring:** Identifies operational units needing shift alignment.

### 6. 🏆 Performance Analytics & 9-Box Matrix
- **Interactive 9-Box Talent Grid:** Performance (Low/Med/High) × Potential (Low/Med/High) matrix with 9 interactive tiles and instant cohort drill-downs.
- **Appraisal Rating Distribution:** Distribution curve from 1.0 (Needs Improvement) to 5.0 (Star Performer).
- **Training Enablement Correlation:** Evaluates annual training hours against performance rating milestones.

### 7. 🥇 Recruiter Performance Leaderboard
- **TA Scorecards:** Evaluates individual recruiters on applications handled, conversion yield %, average time-to-hire (days), and cost-per-hire ($).
- **Interactive Recruiter Profiles:** Detailed breakdown of requisitions, sourcing velocity, and candidate rosters.

### 8. 💡 Strategic Insights & What-If Decision Engine
- **Structured Boardroom Decision Cards:** Includes Issue Title, Current vs Benchmark, Risk Level, Root Cause Analysis, Actionable HR Recommendations, and Expected Business Outcome.
- **What-If ROI Impact Simulator:** Interactive sliders allowing leaders to model the direct dollar savings of reducing attrition and shortening time-to-hire.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core:** React 19, TypeScript 5.8
- **Data Visualization:** Recharts 2.x (Area, Bar, Line, Pie, and Custom Funnels)
- **Styling & UI:** Tailwind CSS 4, Custom Glassmorphic Dark Architecture (`#070b14`), Lucide React Icons
- **Data Engine:** Deterministic Client-Side Synthetic Generation (1,500 employees, 12,000 candidates, 12 recruiters, 4,000 attendance records)
- **Persistence & Export:** Browser-native CSV exports for Workforce Master and Candidate Pipeline datasets; clipboard-ready Executive Summaries.

---

## 📐 Key HR Metrics & Mathematical Formulas

| HR Metric | Mathematical Formula | Operational Purpose | Industry Benchmark |
| :--- | :--- | :--- | :--- |
| **Attrition Rate (%)** | `(Total Leavers / Total Headcount) × 100` | Measures total workforce separation rate over the period. | `10% - 15%` |
| **Conversion Yield (%)** | `(Candidates Joined / Total Applications) × 100` | Sourcing-to-onboarding conversion efficiency. | `3% - 6%` |
| **Avg Time to Hire** | `Sum(Days: Application → Start) / Total Hires` | Recruitment velocity and talent acquisition agility. | `30 - 40 Days` |
| **Avg Cost per Hire** | `Total Sourcing & Assessment Cost / Total Hires` | Direct financial expenditure per successful joiner. | `$2,000 - $3,500` |
| **Attendance Rate (%)** | `[(Present + WFH Days) / Total Working Days] × 100` | Overall operational availability rate. | `> 92%` |
| **9-Box Coordinates** | `Appraisal Rating [1-5] × Potential Tier [1-3]` | Succession planning and talent development categorization. | `10% - 15% Stars` |

---
> *"I developed the HR Analytics Command Center to address the enterprise challenge of fragmented HR reporting across recruitment pipelines, workforce demographics, employee attrition, attendance compliance, and talent appraisals.*
> 
> *Using an enterprise dataset of 1,500 employees and 12,000 candidate applications, this MIS dashboard calculates real-time operational metrics—such as an 11.2% attrition rate, a 32-day average time-to-hire, and a 9-box talent matrix.*
> 
> *Crucially, rather than just displaying static charts, the platform incorporates a rule-based Strategic Decision Engine that pinpoints priority risk cohorts in high-overtime departments and quantifies the exact financial ROI of retention interventions for executive leadership."*

### Strategic Discussion Points
1. **Commercial & Financial Mindset:** Explain how you used the *What-If Simulator* to convert a 3% drop in attrition into over **$200,000 in bottom-line cost savings** (factoring in replacement recruiting, onboarding, and lost productivity).
2. **Cross-Tabulated Flight Risk Analysis:** Highlight that attrition shouldn't just be viewed at a company-wide level; demonstrate how you cross-tabulated attrition against **Overtime**, **Tenure < 2 Years**, and **Work-Life Balance scores** to find the exact root cause.
3. **Recruiter Capacity Management:** Walk through the Recruiter Leaderboard to show how you evaluate sourcing channels—explaining why Employee Referrals deliver the highest conversion yield at the lowest cost-per-hire compared to external agencies.
4. **Talent Succession via 9-Box:** Discuss how you designed the 9-Box matrix to help management separate high performance from high potential, ensuring training budgets are directed toward high-impact development.
5. **Data Governance & MIS Accuracy:** Emphasize that all formulas match standard HR MIS conventions and include exportable CSV datasets for payroll and leadership audit compliance.

---

## 📋 Running and Verifying the Project

The application runs directly in your browser environment without external configuration:

```bash
# Build verification
npm run build

# Development preview
npm run dev
```

---

© 2026 Rohit Shinde • HR Analytics Command Center • HR MIS & Analytics Portfolio Project

