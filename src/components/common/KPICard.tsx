/**
 * Premium Dark KPI Card Component with Trend Indicators & Sparkline
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: {
    value: string | number;
    isPositive: boolean;
    isNeutral?: boolean;
    label?: string;
  };
  accentColor?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan';
  sparklineData?: number[];
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'blue',
  sparklineData,
  onClick,
}) => {
  const colorMap = {
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-cyan-400 border-blue-500/30',
      glow: 'shadow-blue-950/20',
      sparkline: '#38bdf8',
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      glow: 'shadow-purple-950/20',
      sparkline: '#a855f7',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'shadow-emerald-950/20',
      sparkline: '#10b981',
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: 'shadow-amber-950/20',
      sparkline: '#f59e0b',
    },
    rose: {
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      glow: 'shadow-rose-950/20',
      sparkline: '#f43f5e',
    },
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      glow: 'shadow-cyan-950/20',
      sparkline: '#06b6d4',
    },
  };

  const scheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border ${scheme.border} bg-[#0f172a]/90 p-4.5 shadow-lg ${scheme.glow} backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Subtle top edge gradient highlight */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-blue-400/60 transition-all" />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
            {value}
          </div>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${scheme.iconBg} shadow-xs`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Bottom Subtitle / Trend & Sparkline */}
      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5 text-xs">
        {trend && (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                trend.isNeutral
                  ? 'bg-slate-800 text-slate-300'
                  : trend.isPositive
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                  : 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
              }`}
            >
              {trend.isNeutral ? (
                <Minus className="h-3 w-3" />
              ) : trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.value}
            </span>
            {trend.label && <span className="text-[11px] text-slate-400">{trend.label}</span>}
          </div>
        )}

        {subtitle && !trend && (
          <span className="text-[11px] text-slate-400">{subtitle}</span>
        )}

        {/* Minimal SVG Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="h-5 w-16 opacity-75 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 60 20" className="h-full w-full overflow-visible">
              <path
                d={generateSparklinePath(sparklineData, 60, 20)}
                fill="none"
                stroke={scheme.sparkline}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

function generateSparklinePath(data: number[], width: number, height: number): string {
  if (data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  return data
    .map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}
