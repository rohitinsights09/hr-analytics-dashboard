/**
 * Page 8: HR Strategic Insights & Management Decision Engine
 */

import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  TrendingDown,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Zap,
  Target,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useHR } from '../context/HRContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { HRInsightCard } from '../types';

export const InsightsPage: React.FC = () => {
  const { insights, metrics, filters } = useHR();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  // What-if Simulator State
  const [targetRetentionGain, setTargetRetentionGain] = useState<number>(3); // % reduction in attrition
  const [hiringVelocityImprovement, setHiringVelocityImprovement] = useState<number>(5); // days faster

  // Calculated ROI of HR interventions
  const costPerAttritionExit = 45000; // industry avg replacement cost
  const annualSavingsFromRetention = useMemo(() => {
    const retainedEmployees = Math.round((metrics.totalEmployees * targetRetentionGain) / 100);
    return retainedEmployees * costPerAttritionExit;
  }, [metrics.totalEmployees, targetRetentionGain]);

  const productivityHoursGained = useMemo(() => {
    return Math.round(metrics.newHiresYTD * hiringVelocityImprovement * 8);
  }, [metrics.newHiresYTD, hiringVelocityImprovement]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            HR INSIGHTS & RECOMMENDATIONS
          </h1>
          <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
            Rule-Based Decision Engine
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Executive decision framework converting HR MIS data into boardroom-ready recommendations with quantified business impact.
        </p>
      </div>

      {/* Strategic Overview Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-md">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Target className="h-4 w-4" />
            <span>Active Signals Evaluated</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{insights.length} Action Directives</div>
          <span className="text-[10px] text-slate-400">Targeting {filters.department} / {filters.location}</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-md">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>High Risk Priority</span>
          </div>
          <div className="text-2xl font-bold text-rose-300 font-mono mt-1">
            {insights.filter((i) => i.riskLevel === 'High').length} Critical Areas
          </div>
          <span className="text-[10px] text-slate-400">Immediate leadership action</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-md">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="h-4 w-4" />
            <span>Estimated Retention Value</span>
          </div>
          <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">
            ${(annualSavingsFromRetention / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400">Projected savings at {targetRetentionGain}% reduction</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/90 p-4 shadow-md">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="h-4 w-4" />
            <span>Capacity Reclaimed</span>
          </div>
          <div className="text-2xl font-bold text-purple-300 font-mono mt-1">
            {productivityHoursGained.toLocaleString()} Hrs
          </div>
          <span className="text-[10px] text-slate-400">Faster ramp-up & reduced cycle</span>
        </div>
      </div>

      {/* WHAT-IF STRATEGIC IMPACT SIMULATOR */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900/90 to-[#0f172a] p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 border-b border-purple-800/40 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              HR Strategic ROI & What-If Impact Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Simulate organizational cost savings and efficiency gains from implementing targeted HR interventions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Slider 1 */}
          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Target Attrition Rate Reduction:</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">-{targetRetentionGain}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={targetRetentionGain}
              onChange={(e) => setTargetRetentionGain(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-1% (Modest)</span>
              <span>-4% (Target)</span>
              <span>-8% (Aggressive)</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-medium">
              → Estimated Cost Saved: ${(annualSavingsFromRetention).toLocaleString()} annually
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Time-to-Hire Reduction:</span>
              <span className="font-mono font-bold text-purple-300 text-sm">-{hiringVelocityImprovement} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={hiringVelocityImprovement}
              onChange={(e) => setHiringVelocityImprovement(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-1 Day</span>
              <span>-5 Days</span>
              <span>-15 Days</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-xs text-purple-300 font-medium">
              → Productivity Saved: {productivityHoursGained.toLocaleString()} work hours
            </div>
          </div>
        </div>
      </div>

      {/* Management Decision Cards List */}
      <div className="space-y-4">
        <SectionHeader
          title="Boardroom Decision Cards & Recommended Actions"
          subtitle="Structured analytical memos designed for presentation to CHRO and Executive Leadership"
        />

        <div className="space-y-4">
          {insights.map((card, idx) => {
            const isExpanded = selectedInsight === card.id || selectedInsight === null;
            const riskBadge =
              card.riskLevel === 'High'
                ? 'bg-rose-950 text-rose-300 border-rose-800/60'
                : card.riskLevel === 'Medium'
                ? 'bg-amber-950 text-amber-300 border-amber-800/60'
                : 'bg-blue-950 text-cyan-300 border-blue-800/60';

            return (
              <div
                key={card.id}
                className="rounded-2xl border border-slate-800 bg-[#0f172a]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-slate-700"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-bold text-cyan-400">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{card.title}</h3>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold border ${riskBadge}`}>
                          {card.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{card.category} Focus Area</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="rounded-lg bg-slate-900/90 px-2.5 py-1 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-sans">Current Metric</span>
                      <span className="font-bold text-rose-400">{card.currentValue}</span>
                    </div>
                    <div className="rounded-lg bg-slate-900/90 px-2.5 py-1 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-sans">Target Benchmark</span>
                      <span className="font-bold text-emerald-400">{card.benchmarkValue}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 text-xs">
                  {/* Left: Root Cause & Potential Impact */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        🔍 Root Cause Analysis
                      </span>
                      <p className="text-slate-300 leading-relaxed">{card.rootCause}</p>
                    </div>

                    <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                        ⚡ Potential Business Impact
                      </span>
                      <p className="text-slate-300 leading-relaxed">{card.potentialImpact}</p>
                    </div>
                  </div>

                  {/* Right: Actionable HR Recommendations & Outcome */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                        📋 Actionable HR Directives
                      </span>
                      <ul className="space-y-1.5">
                        {card.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-slate-200">
                            <span className="text-cyan-400 font-bold mt-0.5">▪</span>
                            <span className="leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-emerald-950/30 p-3.5 border border-emerald-800/40 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                          Expected Business Outcome
                        </span>
                        <p className="text-slate-200 font-medium text-xs mt-0.5">{card.expectedOutcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
