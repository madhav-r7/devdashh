import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  Play, 
  Code2, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Clock, 
  BookOpen, 
  Video, 
  ShieldCheck,
  Target,
  ArrowDown
} from 'lucide-react';

export default function CareerRoadmap({
  roadmapData,
  onSelectStop,
  onOpenProject,
  onOpenDiagnosticQuiz,
  onOpenMaterial,
  userState
}) {
  const [hoveredStopId, setHoveredStopId] = useState(null);

  if (!roadmapData || !roadmapData.stops) {
    return null;
  }

  const {
    path,
    stops,
    stats,
    svgPathString,
    totalSvgHeight,
    goalCoord,
    currentStopIndex
  } = roadmapData;

  return (
    <div className="relative w-full overflow-hidden select-none py-10">
      
      {/* Background Ambience & Gradient Trails */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center">
        <div className="w-[800px] h-full bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.02] blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. START BEACON (TOP OF THE ROAD)                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center mb-6 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/20 text-xs font-mono text-white mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="font-bold tracking-widest uppercase">JOURNEY START</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-black border-2 border-white flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          <span className="font-mono font-black text-sm">00</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS SVG CURVED ROAD & LIGHT BEAM                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full" style={{ minHeight: `${totalSvgHeight}px` }}>
        
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 1000 ${totalSvgHeight}`}
          preserveAspectRatio="xMidYMin meet"
          fill="none"
        >
          <defs>
            {/* Dark Charcoal Roadbed Gradient */}
            <linearGradient id="roadbedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141417" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0c0c0e" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#141417" stopOpacity="0.95" />
            </linearGradient>

            {/* Glowing Active Trail Gradient */}
            <linearGradient id="roadActiveGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>

            {/* Subtle Road Edge Blur Filter */}
            <filter id="roadEdgeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Layer 1: Road Asphalt Bed (Wide dark charcoal ribbon) */}
          <path
            d={svgPathString}
            stroke="#0a0a0c"
            strokeWidth="52"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 2: Outer Road Surface Layer */}
          <path
            d={svgPathString}
            stroke="url(#roadbedGrad)"
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 3: Left & Right Road Shoulder Border Lines */}
          <path
            d={svgPathString}
            stroke="#ffffff"
            strokeOpacity="0.22"
            strokeWidth="42"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={svgPathString}
            stroke="#0c0c0e"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Layer 4: Faint Dashed White Center Lane Markings */}
          <path
            d={svgPathString}
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="2.5"
            strokeDasharray="10 16"
            strokeLinecap="round"
            fill="none"
            className="road-dashed-animation"
          />

          {/* Layer 5: Glowing Light Pulse Travelling from Start to Current Stop */}
          <path
            d={svgPathString}
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeDasharray="24 160"
            strokeLinecap="round"
            filter="url(#roadEdgeGlow)"
            className="road-light-travel-animation"
          />

          {/* Bridge connection lines from road nodes to alternating cards */}
          {stops.map((stop) => {
            const { x, y } = stop.coord;
            const isLeft = stop.cardSide === 'left';
            const targetX = isLeft ? x - 130 : x + 130;

            return (
              <g key={`bridge-${stop.id}`}>
                <line
                  x1={x}
                  y1={y}
                  x2={targetX}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity={stop.status === 'current' ? '0.5' : '0.18'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={targetX}
                  cy={y}
                  r="3"
                  fill="#ffffff"
                  fillOpacity={stop.status === 'current' ? '0.9' : '0.4'}
                />
              </g>
            );
          })}
        </svg>

        {/* ===================================================================== */}
        {/* 3. STOPS & ALTERNATING CARDS                                         */}
        {/* ===================================================================== */}
        <div className="relative w-full h-full max-w-6xl mx-auto px-4 sm:px-6">
          {stops.map((stop, index) => {
            const isLeft = stop.cardSide === 'left';
            const isCurrent = stop.status === 'current';
            const isCompleted = stop.status === 'completed';
            const isLocked = stop.status === 'locked';
            const isHovered = hoveredStopId === stop.id;

            // Normalized position percentage for absolute container positioning
            const topPx = stop.coord.y - 40;

            return (
              <div
                key={stop.id}
                className="relative w-full"
                style={{ height: '240px' }}
                onMouseEnter={() => setHoveredStopId(stop.id)}
                onMouseLeave={() => setHoveredStopId(null)}
              >
                
                {/* 3A. THE ROAD STOP NODE (Centered precisely on the Road) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-4 z-30 flex flex-col items-center cursor-pointer group"
                  onClick={() => onSelectStop && onSelectStop(stop)}
                >
                  {/* Current Radar Glow Ripples */}
                  {isCurrent && (
                    <div className="absolute -inset-3 rounded-full bg-white/20 animate-ping pointer-events-none" />
                  )}

                  {/* Node Disk */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono font-black text-xs ${
                      isCompleted
                        ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:scale-110'
                        : isCurrent
                        ? 'bg-white text-black border-2 border-white shadow-[0_0_35px_#ffffff] scale-110'
                        : isLocked
                        ? 'bg-[#111114] border border-white/20 text-white/40'
                        : 'bg-[#18181c] border border-white/40 text-white hover:border-white hover:scale-105 shadow-md'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-black stroke-[3]" />
                    ) : isCurrent ? (
                      <Sparkles className="w-5 h-5 text-black" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-white/40" />
                    ) : (
                      <span>{stop.num}</span>
                    )}
                  </div>

                  {/* Active / Current Tag Pill */}
                  {isCurrent && (
                    <div className="mt-2 px-2.5 py-0.5 rounded-full bg-white text-black font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_15px_#ffffff] whitespace-nowrap animate-bounce">
                      CURRENT STOP
                    </div>
                  )}
                </div>

                {/* 3B. ALTERNATING COMPACT STOP CARD */}
                <div
                  className={`absolute top-0 w-full sm:w-[420px] md:w-[440px] z-20 transition-all duration-300 ${
                    isLeft
                      ? 'left-0 sm:left-2 md:left-6 lg:left-10'
                      : 'right-0 sm:right-2 md:right-6 lg:right-10'
                  }`}
                >
                  <div
                    onClick={() => onSelectStop && onSelectStop(stop)}
                    className={`mono-card p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? 'border-2 border-white bg-white/[0.12] shadow-[0_0_40px_rgba(255,255,255,0.3)] scale-[1.02]'
                        : isCompleted
                        ? 'border-white/[0.22] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/50'
                        : isLocked
                        ? 'border-white/[0.1] bg-white/[0.02] opacity-65 hover:opacity-90'
                        : 'border-white/[0.16] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/40'
                    }`}
                  >
                    <div>
                      {/* Top Card Header & Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider font-semibold">
                          {stop.phase}
                        </span>

                        {isCompleted && (
                          <span className="mono-tag text-[10px] font-mono bg-white text-black font-bold border-white">
                            COMPLETED ✓
                          </span>
                        )}
                        {isCurrent && (
                          <span className="mono-tag text-[10px] font-mono bg-white text-black font-extrabold border-white shadow-sm">
                            IN FOCUS ({stop.progress}%)
                          </span>
                        )}
                        {!isCompleted && !isCurrent && !isLocked && (
                          <span className="mono-tag text-[10px] font-mono text-white border-white/20 bg-white/[0.06]">
                            UP NEXT
                          </span>
                        )}
                        {isLocked && (
                          <span className="mono-tag text-[10px] font-mono text-white/50 border-white/10 bg-white/[0.02] flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className={`text-xl font-bold font-display text-white transition-colors ${
                        isCompleted ? 'line-through text-white/80' : 'text-white'
                      }`}>
                        {stop.title}
                      </h4>

                      {/* Why it matters */}
                      <p className="text-xs text-white/85 mt-2 line-clamp-2 leading-relaxed font-body">
                        {stop.whyItMatters}
                      </p>

                      {/* Skills List */}
                      {stop.skills && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {stop.skills.slice(0, 3).map((sk, sidx) => (
                            <span
                              key={sidx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-white/90 border border-white/10"
                            >
                              {sk}
                            </span>
                          ))}
                          {stop.skills.length > 3 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 text-white/60">
                              +{stop.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Card Footer */}
                    <div className="mt-4 pt-3 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono">
                      <div className="text-white/70 flex items-center gap-2">
                        <span>{stop.lessonsCount} lessons</span>
                        <span>•</span>
                        <span>{stop.estTime}</span>
                      </div>

                      <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform font-display">
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Progress Fill Bar (if in progress) */}
                    {stop.progress > 0 && stop.progress < 100 && (
                      <div className="w-full bg-white/[0.12] h-1.5 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="bg-white h-full shadow-[0_0_8px_#ffffff]"
                          style={{ width: `${stop.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. FINAL GOAL MILESTONE DESTINATION (BOTTOM OF THE ROAD)                  */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center mt-12 text-center px-4">
        
        {/* Downward Connector Arrow */}
        <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/25 flex items-center justify-center text-white mb-6 animate-bounce">
          <ArrowDown className="w-4 h-4 text-white" />
        </div>

        {/* Sophisticated Terminal Goal Station Card */}
        <div className="mono-card p-8 sm:p-10 max-w-2xl w-full rounded-3xl border-2 border-white/30 bg-gradient-to-b from-white/[0.08] via-black to-black shadow-[0_0_60px_rgba(255,255,255,0.25)] space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black font-mono font-black text-xs tracking-widest uppercase shadow-[0_0_20px_#ffffff]">
            <Award className="w-4 h-4 text-black" />
            <span>CAREER GOAL REACHED</span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              {path.goalTitle || path.title.toUpperCase()}
            </h2>
            <p className="text-sm sm:text-base text-white/85 mt-2 font-body max-w-xl mx-auto leading-relaxed">
              {path.goalDescription || path.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.12] grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="text-white/60 text-[10px] uppercase">CURRICULUM</div>
              <div className="text-white font-bold text-sm mt-0.5">{stats.totalStages} Stages</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="text-white/60 text-[10px] uppercase">SKILLS</div>
              <div className="text-white font-bold text-sm mt-0.5">{stats.totalSkills} Mastered</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="text-white/60 text-[10px] uppercase">EST. TIME</div>
              <div className="text-white font-bold text-sm mt-0.5">~{stats.totalHours} Hours</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-mono text-white/70">
              {stats.progressPercent}% of this path completed. Keep building to stamp permanent evidence to your Passport.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
