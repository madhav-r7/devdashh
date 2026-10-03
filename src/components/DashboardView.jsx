import React from 'react';
import { 
  Play, 
  ChevronRight, 
  RefreshCw, 
  AlertTriangle,
  Video,
  Clock,
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { LEARNING_MATERIALS } from '../data/mockData';

export default function DashboardView({ 
  userState, 
  setView, 
  onAdaptPath, 
  onOpenProject, 
  onOpenDiagnosticQuiz, 
  onOpenNodeDetails,
  onOpenMaterial,
  learningMaterials = LEARNING_MATERIALS
}) {
  const skillProgressList = [
    { name: 'JAVASCRIPT', progress: 82, status: 'Mastered' },
    { name: 'PYTHON', progress: 91, status: 'Mastered' },
    { name: 'REST APIs', progress: 72, status: 'In Focus' },
    { name: 'SQL & RELATIONAL DBs', progress: 61, status: 'Remediation' },
  ];

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* 1. TOP COMMAND HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            Good afternoon, {userState.name.split(' ')[0]}
          </h1>
          <p className="text-white text-lg sm:text-xl mt-2 font-display">
            Target Track: <strong className="text-white font-bold">{userState.targetRoleTitle}</strong>
          </p>
        </div>

        {/* Quick System Metrics */}
        <div className="flex items-center gap-3.5">
          <div className="mono-card p-4 text-center min-w-[130px] border-white/[0.18]">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">HOURS / WK</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">{userState.hoursSpentThisWeek} / {userState.weeklyHours}h</div>
          </div>
          <div className="mono-card p-4 text-center min-w-[130px] border-white/[0.18]">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">STREAK</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">{userState.streakDays || 12} Days</div>
          </div>
          <div className="mono-card p-4 text-center min-w-[130px] border-white/[0.18]">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">EVIDENCE</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">3 Proofs</div>
          </div>
        </div>
      </div>

      {/* 2. ADAPTIVE ALERT BANNER (If Active) */}
      {userState.adaptedScenarioActive && userState.adaptiveNotice && (
        <div className="mono-card p-7 border-white/[0.3] relative animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-5">
              <div className="p-3.5 rounded-2xl bg-white/[0.15] border border-white/[0.3] text-white shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {userState.adaptiveNotice.subtitle}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-white font-mono">
                  <span>Diagnostic Score: <strong className="text-white font-bold">60%</strong></span>
                  <span>•</span>
                  <span>Gap: Multi-table JOINs</span>
                  <span>•</span>
                  <span className="text-white font-bold">Remediation module queued</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={onAdaptPath}
                className="btn-primary text-sm px-6 py-3 font-display"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Adapt My Path</span>
              </button>
              
              <button
                onClick={() => onOpenDiagnosticQuiz('sql')}
                className="btn-secondary text-sm px-5 py-3 font-display"
              >
                <span>Take Diagnostic</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. CORE DASHBOARD CARD STRUCTURE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: TRACK PROGRESS CARD */}
        <div className="mono-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-white uppercase tracking-widest mb-3 font-bold">
              <span>TRACK PROGRESS</span>
              <span className="text-white font-black text-xl">{userState.overallProgress}%</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              {userState.targetRoleTitle.toUpperCase()}
            </h2>

            {/* Technical Monochrome Progress Bar */}
            <div className="mt-6 space-y-3">
              <div className="w-full bg-white/[0.12] h-4 rounded-lg overflow-hidden border border-white/[0.2] p-0.5">
                <div 
                  className="bg-white h-full rounded-md transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  style={{ width: `${userState.overallProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm font-mono text-white pt-1 font-medium">
                <span>8 of 11 milestones mastered</span>
                <span className="text-white font-bold">Current: {userState.currentFocusSkillName}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.12] flex items-center justify-between text-sm">
            <span className="text-white font-mono">Milestone: <strong className="text-white">{userState.currentFocusSkillName}</strong></span>
            <button
              onClick={() => setView('roadmap')}
              className="text-white hover:underline flex items-center gap-1.5 font-display font-bold text-sm"
            >
              <span>View Full Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: CURRENT FOCUS CARD */}
        <div className="mono-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-white uppercase tracking-widest mb-3 font-bold">
              <span>CURRENT FOCUS</span>
              <span className="mono-tag text-xs font-bold text-white">60% COMPLETE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              REST APIs
            </h2>

            <p className="text-base sm:text-lg text-white mt-3 leading-relaxed font-body font-medium">
              Production HTTP contracts, status codes (RFC 7807), rate limiting, and CRUD architecture.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/[0.18]">
                <div className="text-white font-black text-lg">3 Lessons</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/[0.18]">
                <div className="text-white font-black text-lg">1 Assessment</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/[0.18]">
                <div className="text-white font-black text-lg">1 Project</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.12] flex items-center justify-between gap-3.5">
            <button
              onClick={() => onOpenNodeDetails('rest-api')}
              className="btn-primary text-sm px-6 py-3 font-display flex-1 sm:flex-initial"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Learning →</span>
            </button>

            <button
              onClick={() => onOpenDiagnosticQuiz('rest-api')}
              className="btn-secondary text-sm px-5 py-3 font-display"
            >
              <span>Take Quiz</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. RECOMMENDED PROJECT CARD (BUILD CARD) */}
      <div className="mono-card p-8 sm:p-10 border-white/[0.18]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.12]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="mono-tag text-xs font-bold text-white">BUILD #04</span>
              <span className="text-xs font-mono text-white uppercase tracking-wider font-semibold">RECOMMENDED PROJECT</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white font-display">
              URL SHORTENER API
            </h3>

            <p className="text-base sm:text-lg text-white max-w-3xl leading-relaxed font-body font-medium">
              Build a production-style URL shortening service with rate limiting, database persistence, and analytics.
            </p>
          </div>

          {/* Action */}
          <div className="shrink-0">
            <button
              onClick={() => onOpenProject('url-shortener')}
              className="btn-primary text-base px-8 py-3.5 font-display w-full sm:w-auto shadow-md"
            >
              <span>Start Project Workspace →</span>
            </button>
          </div>
        </div>

        {/* Project Metadata Footer */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-sm">
          <div>
            <div className="text-xs text-white uppercase tracking-wider font-semibold">SKILLS TESTED</div>
            <div className="text-white font-bold text-base mt-1">REST · HTTP · PostgreSQL · Auth</div>
          </div>
          <div>
            <div className="text-xs text-white uppercase tracking-wider font-semibold">ESTIMATED TIME</div>
            <div className="text-white font-bold text-base mt-1">4–6 Hours</div>
          </div>
          <div>
            <div className="text-xs text-white uppercase tracking-wider font-semibold">DIFFICULTY</div>
            <div className="text-white font-bold text-base mt-1">Intermediate</div>
          </div>
          <div>
            <div className="text-xs text-white uppercase tracking-wider font-semibold">CURRENT PROGRESS</div>
            <div className="text-white font-bold text-base mt-1">35% Completed</div>
          </div>
        </div>
      </div>

      {/* 5. SKILL PROGRESS CARDS GRID */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white font-display">
              Skill Progress Overview
            </h3>
          </div>
          <button
            onClick={() => setView('skills')}
            className="text-sm font-mono text-white hover:underline flex items-center gap-1 font-bold"
          >
            <span>Full Matrix →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillProgressList.map((skill, idx) => (
            <div key={idx} className="mono-card p-6 space-y-4 border-white/[0.15]">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white font-display uppercase tracking-wider">
                  {skill.name}
                </span>
                <span className="text-base font-mono font-bold text-white">
                  {skill.progress}%
                </span>
              </div>

              {/* Technical Bar */}
              <div className="w-full bg-white/[0.12] h-2.5 rounded-md overflow-hidden border border-white/[0.2]">
                <div 
                  className="bg-white h-full rounded-sm transition-all duration-700 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-white pt-1 font-medium">
                <span>{skill.status}</span>
                <button
                  onClick={() => onOpenDiagnosticQuiz(skill.name.toLowerCase().includes('sql') ? 'sql' : 'rest-api')}
                  className="text-white hover:underline text-xs font-bold"
                >
                  Audit Quiz →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CURATED REFERENCE VIDEOS & STUDY MATERIALS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-white/70 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-white" />
              CURATED STUDY ENGINE
            </div>
            <h3 className="text-2xl font-bold text-white font-display mt-0.5">
              Featured Video References & Masterclasses
            </h3>
          </div>
          <button
            onClick={() => setView('materials')}
            className="text-sm font-mono text-white hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <span>Explore All Materials ({learningMaterials.length}) →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {learningMaterials.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              onClick={() => onOpenMaterial && onOpenMaterial(mat)}
              className="mono-card p-5 border-white/[0.18] hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all duration-300 flex flex-col justify-between group rounded-3xl"
            >
              <div>
                <div 
                  className="relative w-full h-36 rounded-2xl overflow-hidden mb-3.5 bg-cover bg-center border border-white/15 group-hover:border-white/40 transition-all shadow-md"
                  style={{ backgroundImage: `url(${mat.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="mono-tag text-[10px] font-mono bg-black/80 text-white border-white/30 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {mat.duration}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.7)] group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                    {mat.creator}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-white/70 uppercase mb-1">
                  {mat.difficulty} · {mat.category.replace('-', ' ')}
                </div>

                <h4 className="text-base font-bold font-display text-white group-hover:text-white line-clamp-2 leading-snug">
                  {mat.title}
                </h4>

                <p className="text-xs text-white/80 mt-1.5 line-clamp-2 leading-relaxed font-body">
                  {mat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono text-white font-bold">
                <span className="text-white/70">{mat.views || 'YouTube'}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Watch Video →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
