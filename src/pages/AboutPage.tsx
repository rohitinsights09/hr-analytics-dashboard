/**
 * Page 9: About Project & HR Interview Presentation Guide
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Briefcase,
  Code,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Zap,
  Target,
  MessageSquare,
  Copy,
  User,
  ExternalLink,
  Linkedin,
  Github,
  Globe,
  Compass,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';

export const AboutPage: React.FC = () => {
  const [copiedPitch, setCopiedPitch] = useState(false);

  const elevatorPitchText = `
"I developed the HR Analytics Command Center to address the enterprise challenge of fragmented HR reporting across recruitment pipelines, workforce demographics, employee attrition, attendance compliance, and talent appraisals. 

Using a synthetic enterprise dataset of 1,500 employees and 12,000 candidate applications, this MIS dashboard calculates real-time operational metrics—such as an 11.2% attrition rate, a 32-day average time-to-hire, and a 9-box talent matrix. 

Crucially, rather than just displaying static charts, the platform incorporates a rule-based Strategic Decision Engine that pinpoints priority risk cohorts in high-overtime departments and quantifies the exact financial ROI of retention interventions for executive leadership."
  `.trim();

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(elevatorPitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const formulas = [
    {
      metric: 'Attrition Rate (%)',
      formula: '(Total Leavers / Total Headcount) × 100',
      description: 'Measures total percentage of staff separations (voluntary + involuntary) over the period.',
      benchmark: '10% - 15%',
    },
    {
      metric: 'Recruitment Conversion Yield (%)',
      formula: '(Candidates Joined / Total Applications) × 100',
      description: 'End-to-end efficiency from initial candidate sourcing to signed onboarding.',
      benchmark: '3% - 6%',
    },
    {
      metric: 'Average Time to Hire (Days)',
      formula: 'Sum(Days from Application to Start) / Total Hires',
      description: 'Measures talent acquisition pipeline agility and vacancy fulfillment velocity.',
      benchmark: '30 - 40 Days',
    },
    {
      metric: 'Average Cost per Hire ($)',
      formula: 'Sum(Sourcing, Agency & Assessment Cost) / Total Hires',
      description: 'Direct recruitment expenditure invested per successful candidate onboarding.',
      benchmark: '$2,000 - $3,500',
    },
    {
      metric: 'Attendance Compliance Rate (%)',
      formula: '[(Present Days + WFH Days) / Total Working Days] × 100',
      description: 'Workforce availability index taking into account flexible hybrid presence.',
      benchmark: '> 92%',
    },
    {
      metric: '9-Box Potential vs Performance',
      formula: 'Matrix coordinates: (Appraisal Rating [1-5]) × (Potential Score [1-3])',
      description: 'Categorizes employees into 9 distinct succession and development buckets.',
      benchmark: '10-15% Stars',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            ABOUT PROJECT & PORTFOLIO OVERVIEW
          </h1>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
            Portfolio Documentation
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          HR MIS & Analytics Portfolio Project presented by Rohit Shinde.
        </p>
      </div>

      {/* Project Ownership & Profile Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Project Profile Summary Card */}
        <div className="lg:col-span-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/90 to-[#0b101d] p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Project Specification
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              Portfolio
            </span>
          </div>

          <div className="mt-4 space-y-3.5 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">PROJECT</span>
              <p className="text-base font-extrabold text-white">HR Analytics Command Center</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">CREATED BY</span>
                <p className="text-sm font-bold text-slate-200">Rohit Shinde</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">ROLE</span>
                <p className="text-xs font-semibold text-cyan-300">HR Executive | HR MIS | Analytics</p>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">PURPOSE</span>
              <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                A portfolio project demonstrating HR MIS, recruitment analytics, workforce reporting and data-driven HR insights.
              </p>
            </div>

            {/* Social & Portfolio Links (Easy to replace) */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <a
                href="#linkedin"
                onClick={(e) => {
                  e.preventDefault();
                  alert('LinkedIn profile placeholder: [ADD LINK]');
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-blue-500 hover:text-white transition-all shadow-xs"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                <span>LinkedIn → [ADD LINK]</span>
              </a>

              <a
                href="#github"
                onClick={(e) => {
                  e.preventDefault();
                  alert('GitHub profile placeholder: [ADD LINK]');
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-all shadow-xs"
                title="GitHub Profile"
              >
                <Github className="h-3.5 w-3.5 text-slate-300" />
                <span>GitHub → [ADD LINK]</span>
              </a>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Portfolio website placeholder: [ADD LINK]');
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500 hover:text-white transition-all shadow-xs"
                title="Portfolio Website"
              >
                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                <span>Portfolio → [ADD LINK]</span>
              </a>
            </div>
          </div>
        </div>

        {/* Project Owner & Focus Areas Card */}
        <div className="lg:col-span-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-slate-900/90 to-[#0b101d] p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                PROJECT OWNER
              </span>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                <User className="h-3.5 w-3.5 text-purple-400" />
                <span>Profile Card</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-sm font-black text-white shadow-md shadow-purple-500/20">
                RS
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Rohit Shinde</h3>
                <p className="text-xs font-bold text-purple-300">HR Executive | HR MIS | Analytics</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Focus Areas:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2 border border-slate-800 text-slate-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                  <span>Recruitment MIS</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2 border border-slate-800 text-slate-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                  <span>HR Operations</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2 border border-slate-800 text-slate-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                  <span>Workforce Analytics</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2 border border-slate-800 text-slate-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                  <span>Employee Reporting</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2 border border-slate-800 text-slate-200 sm:col-span-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                  <span>HR Data Visualization</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Prepared for HR MIS / Executive Evaluation</span>
            <span className="text-cyan-400 font-semibold">2026 Portfolio</span>
          </div>
        </div>
      </div>

      {/* 🎯 SPECIAL SECTION: HOW TO PRESENT IN AN HR INTERVIEW */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-[#0f172a] p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                🎯 How to Present This in an HR Interview
              </h3>
              <p className="text-xs text-slate-400">
                Ready-to-use elevator pitch, strategic talking points, and Q&A frameworks.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all self-start sm:self-auto"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copiedPitch ? 'Copied to Clipboard!' : 'Copy 30-Sec Pitch'}</span>
          </button>
        </div>

        {/* 30-Second Elevator Pitch Box */}
        <div className="mt-4 rounded-xl border border-cyan-800/40 bg-slate-900/80 p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            🎙️ The 30-Second Elevator Pitch (Memorize or Adapt)
          </span>
          <p className="text-xs text-slate-200 leading-relaxed italic font-serif">
            "{elevatorPitchText}"
          </p>
        </div>

        {/* 3 Interview Discussion Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-cyan-400">1.</span> Data-Driven Storytelling
            </h4>
            <p className="text-slate-300 mt-1.5 leading-relaxed">
              Show the interviewer you don't just calculate numbers—you understand what they mean for business. Point to the correlation between overtime and flight risk as a prime example of proactive HR management.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-purple-400">2.</span> Full Employee Lifecycle
            </h4>
            <p className="text-slate-300 mt-1.5 leading-relaxed">
              Highlight that this Command Center integrates all 5 core stages: Talent Sourcing (Recruitment) → Onboarding (Workforce) → Retention (Attrition) → Operations (Attendance) → Development (Performance).
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-emerald-400">3.</span> Financial & ROI Acumen
            </h4>
            <p className="text-slate-300 mt-1.5 leading-relaxed">
              Demonstrate commercial mindset using the 'What-If Impact Simulator' in the Strategic Insights page to translate a 3% drop in attrition into $200k+ in bottom-line savings.
            </p>
          </div>
        </div>
      </div>

      {/* Project Objectives & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Objectives */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Business Problem & Objectives"
            subtitle="Core organizational pain points addressed by this solution"
          />
          <div className="space-y-3 mt-3 text-xs">
            <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">Siloed Data Unification:</strong>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  Consolidates applicant tracking, core HRIS rosters, biometric attendance, and annual appraisal ratings into a unified single pane of glass.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">Proactive Attrition Mitigation:</strong>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  Identifies specific high-risk cohorts (e.g. Sales + Overtime) through descriptive crosstabs before voluntary separations escalate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">Recruitment Velocity & Cost Control:</strong>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  Tracks sourcing channel ROI and individual recruiter leaderboards to optimize cost-per-hire and shorten candidate turnaround time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-5 shadow-lg backdrop-blur-md">
          <SectionHeader
            title="Technical Implementation & Stack"
            subtitle="Modern web technologies powering the command center"
          />
          <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Frontend Framework</span>
              <div className="text-sm font-bold text-white mt-1">React 19 + TypeScript</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Type-safe component architecture</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Data Visualization</span>
              <div className="text-sm font-bold text-white mt-1">Recharts 2.x</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Responsive SVG charts & funnels</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Design System</span>
              <div className="text-sm font-bold text-white mt-1">Tailwind CSS 4</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Glassmorphic executive dark theme</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Data Simulation</span>
              <div className="text-sm font-bold text-white mt-1">Deterministic HR Engine</div>
              <p className="text-[11px] text-slate-400 mt-0.5">1,500 employees + 12k candidates</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-900/80 p-3 border border-slate-800 text-xs text-slate-300">
            <strong>Self-Contained Browser Architecture:</strong> All data manipulation, aggregations, filter cascades, and CSV exports execute client-side with zero external API dependencies.
          </div>
        </div>
      </div>

      {/* HR Metrics Formulas & Data Dictionary */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-5 shadow-lg backdrop-blur-md">
        <SectionHeader
          title="HR MIS Data Dictionary & Calculation Formulas"
          subtitle="Standard formulas used throughout the command center for candidate verification"
        />
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-3">HR Metric</th>
                <th className="py-2.5 px-3">Mathematical Formula</th>
                <th className="py-2.5 px-3">Operational Significance</th>
                <th className="py-2.5 px-3 text-right">Industry Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {formulas.map((f) => (
                <tr key={f.metric} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{f.metric}</td>
                  <td className="py-3 px-3 font-mono text-cyan-300 text-[11px]">{f.formula}</td>
                  <td className="py-3 px-3 text-slate-300">{f.description}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">{f.benchmark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dataset Disclaimer Notice */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400 leading-relaxed">
        <span className="font-bold text-slate-300">Data Notice: </span>
        Portfolio project using synthetic HR data. The dataset is created for educational and demonstration purposes and does not represent confidential information from any real organization.
      </div>
    </div>
  );
};
