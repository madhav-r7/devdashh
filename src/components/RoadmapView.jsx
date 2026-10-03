import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Lock, 
  Play, 
  Code2, 
  ChevronRight, 
  AlertTriangle, 
  Video, 
  BookOpen, 
  X, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Users, 
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import CareerRoadmap from './CareerRoadmap';
import { computeRoadmapState } from '../utils/roadmapEngine';
import { getOrCreatePathJourney } from '../data/roadmapJourneyData';
import { 
  ROLES_LIST, 
  SIDE_HUSTLE_PATHS, 
  SOFT_SKILLS_PATHS, 
  LEARNING_MATERIALS 
} from '../data/mockData';

export default function RoadmapView({ 
  userState = {}, 
  onOpenProject, 
  onOpenDiagnosticQuiz, 
  selectedNodeId, 
  setSelectedNodeId,
  onAdaptPath,
  learningMaterials = LEARNING_MATERIALS,
  onOpenMaterial,
  onToggleKnownSkill,
  setView,
  initialCategory = 'technical',
  initialPathId = null
}) {
  // Category state: 'technical' | 'side-hustle' | 'soft-skills'
  const [activeCategory, setActiveCategory] = useState(
    initialCategory || (userState.targetRoleId ? 'technical' : 'technical')
  );

  // Active path ID within the category
  const [activePathId, setActivePathId] = useState(() => {
    if (initialPathId) return initialPathId;
    if (userState.targetRoleId && activeCategory === 'technical') {
      return userState.targetRoleId;
    }
    return 'backend';
  });

  // Selected stop node for detailed inspection drawer/modal
  const [inspectedStop, setInspectedStop] = useState(null);

  // Available paths for current active category
  const currentCategoryPaths = useMemo(() => {
    if (activeCategory === 'technical') {
      return ROLES_LIST.map(r => ({ id: r.id, title: r.title, badge: r.badge }));
    }
    if (activeCategory === 'side-hustle') {
      return SIDE_HUSTLE_PATHS.map(s => ({ id: s.id, title: s.title, badge: s.badge }));
    }
    return SOFT_SKILLS_PATHS.map(k => ({ id: k.id, title: k.title, badge: k.badge }));
  }, [activeCategory]);

  // Retrieve or generate path data
  const rawPathConfig = useMemo(() => {
    return getOrCreatePathJourney(
      activeCategory, 
      activePathId, 
      ROLES_LIST, 
      SIDE_HUSTLE_PATHS, 
      SOFT_SKILLS_PATHS
    );
  }, [activeCategory, activePathId]);

  // Compute curved roadmap state dynamically based on user known skills
  const roadmapState = useMemo(() => {
    return computeRoadmapState(rawPathConfig, userState, activeCategory);
  }, [rawPathConfig, userState, activeCategory]);

  // Handle switching category
  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    let defaultId = 'backend';
    if (catKey === 'side-hustle') defaultId = 'freelancing';
    if (catKey === 'soft-skills') defaultId = 'leadership';
    setActivePathId(defaultId);
    setInspectedStop(null);
  };

  // Handle switching path
  const handlePathChange = (pathId) => {
    setActivePathId(pathId);
    setInspectedStop(null);
  };

  // Handle stop selection
  const handleSelectStop = (stop) => {
    setInspectedStop(stop);
    if (setSelectedNodeId) {
      setSelectedNodeId(stop.id);
    }
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 animate-fadeIn text-white">
      
      {/* ========================================================================= */}
      {/* 1. ROADMAP CONTROLS & CATEGORY SELECTOR                                    */}
      {/* ========================================================================= */}
      <div className="space-y-6 pb-6 border-b border-white/[0.14]">
        
        {/* Category Tabs: Technical | Side Hustle | Soft Skills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex p-1.5 bg-black/60 rounded-2xl border border-white/[0.18] shadow-inner font-mono text-xs">
            <button
              onClick={() => handleCategoryChange('technical')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer font-bold ${
                activeCategory === 'technical'
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>TECHNICAL</span>
            </button>

            <button
              onClick={() => handleCategoryChange('side-hustle')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer font-bold ${
                activeCategory === 'side-hustle'
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>SIDE HUSTLE</span>
            </button>

            <button
              onClick={() => handleCategoryChange('soft-skills')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer font-bold ${
                activeCategory === 'soft-skills'
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>SOFT SKILLS</span>
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/70">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>DYNAMIC ADAPTIVE ENGINE</span>
          </div>
        </div>

        {/* Path Quick-Selector Carousel / Pill List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider shrink-0 mr-2 font-bold">
            TRACK:
          </span>
          {currentCategoryPaths.map((p) => {
            const isSelected = activePathId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePathChange(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold shrink-0 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]'
                    : 'bg-white/[0.04] text-white/80 border-white/[0.12] hover:bg-white/[0.1] hover:text-white hover:border-white/30'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. VISUAL CURVED ROADMAP ENGINE (DIRECTLY BELOW NAV CONTROLS)              */}
      {/* ========================================================================= */}
      <CareerRoadmap
        roadmapData={roadmapState}
        onSelectStop={handleSelectStop}
        onOpenProject={onOpenProject}
        onOpenDiagnosticQuiz={onOpenDiagnosticQuiz}
        onOpenMaterial={onOpenMaterial}
        userState={userState}
      />

      {/* ========================================================================= */}
      {/* 3. TRACK SUMMARY & METRICS CARD (BELOW THE ROADMAP GRAPHIC)               */}
      {/* ========================================================================= */}
      <div className="mono-card p-6 sm:p-8 rounded-3xl border-white/[0.22] bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="mono-tag text-[10px] font-mono uppercase tracking-widest bg-white/[0.1] border-white/30">
                {activeCategory.toUpperCase()} TRACK
              </span>
              <span className="text-xs font-mono text-white/60">
                • {rawPathConfig.badge || 'Verified Curriculum'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight uppercase">
              {rawPathConfig.title}
            </h1>

            <p className="text-sm sm:text-base text-white/85 font-body leading-relaxed">
              {rawPathConfig.subtitle || `Your personalized roadmap to mastering ${rawPathConfig.title}.`}
            </p>
          </div>

          {/* Metric Stats Card */}
          <div className="p-5 rounded-2xl bg-black/80 border border-white/[0.2] space-y-3 shrink-0 min-w-[280px]">
            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div>
                <div className="text-[10px] text-white/60 uppercase">STAGES</div>
                <div className="text-lg font-black text-white">{roadmapState.stats.totalStages}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60 uppercase">SKILLS</div>
                <div className="text-lg font-black text-white">{roadmapState.stats.totalSkills}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60 uppercase">EST. TIME</div>
                <div className="text-lg font-black text-white">~{roadmapState.stats.totalHours}h</div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.1]">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-white/70">COMPLETION</span>
                <span className="font-extrabold text-white">{roadmapState.stats.progressPercent}%</span>
              </div>
              <div className="w-full bg-white/[0.15] h-2.5 rounded-full overflow-hidden border border-white/[0.2]">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500 shadow-[0_0_12px_#ffffff]"
                  style={{ width: `${roadmapState.stats.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Context Notice */}
        {userState.knownSkills && userState.knownSkills.length > 0 && (
          <div className="pt-3 border-t border-white/[0.1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/75">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>
                Roadmap adjusted: <strong>{userState.knownSkills.length} known competencies</strong> detected & automatically pruned from your journey.
              </span>
            </div>
            <button
              onClick={() => setView && setView('skills')}
              className="text-white hover:underline flex items-center gap-1 font-bold"
            >
              <span>Manage Skill Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 4. ADAPTIVE REMEDIATION BANNER (IF ACTIVE)                                 */}
      {/* ========================================================================= */}
      {userState.adaptedScenarioActive && (
        <div className="mono-card p-5 border-white/[0.35] bg-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-mono">
          <div className="flex items-center gap-3.5">
            <AlertTriangle className="w-5 h-5 text-white shrink-0" />
            <span className="text-white font-medium">
              <strong className="text-white font-bold">ADAPTIVE REBALANCER:</strong> Diagnostic assessment detected knowledge gap in SQL JOINs. Target remediation milestone ready.
            </span>
          </div>
          <button
            onClick={onAdaptPath}
            className="px-5 py-2 rounded-xl bg-white hover:bg-[#e4e4e7] text-black font-display font-bold text-sm shrink-0 transition-colors shadow-md cursor-pointer"
          >
            Rebalance Path Now
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. STOP INTERACTION MODAL / EXPANDED DRAWER (SECTION 14 OF SPEC)           */}
      {/* ========================================================================= */}
      {inspectedStop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="mono-card p-6 sm:p-8 max-w-2xl w-full rounded-3xl border-2 border-white/40 bg-[#09090b] shadow-[0_0_80px_rgba(255,255,255,0.3)] space-y-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Close Button */}
            <button
              onClick={() => setInspectedStop(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.08] hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-white/70 mb-2 uppercase tracking-wider font-semibold">
                <span>STAGE {inspectedStop.num}</span>
                <span>•</span>
                <span>{inspectedStop.phase}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{inspectedStop.estTime}</span>
              </div>

              <div className="flex items-center justify-between pr-8">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  {inspectedStop.title}
                </h3>
              </div>

              {/* Status Badge */}
              <div className="mt-2.5">
                {inspectedStop.status === 'completed' ? (
                  <span className="mono-tag text-xs font-mono bg-white text-black font-extrabold border-white">
                    COMPLETED & MASTERED ✓
                  </span>
                ) : inspectedStop.status === 'current' ? (
                  <span className="mono-tag text-xs font-mono bg-white text-black font-extrabold border-white shadow-[0_0_15px_#ffffff]">
                    ACTIVE FOCUS STAGE ({inspectedStop.progress}%)
                  </span>
                ) : inspectedStop.status === 'locked' ? (
                  <span className="mono-tag text-xs font-mono text-white/50 border-white/20 bg-white/[0.05] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> LOCKED PREREQUISITE
                  </span>
                ) : (
                  <span className="mono-tag text-xs font-mono text-white border-white/30 bg-white/[0.08]">
                    AVAILABLE UP NEXT
                  </span>
                )}
              </div>
            </div>

            {/* Why This Matters */}
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.15] space-y-1.5">
              <div className="text-xs font-mono text-white/60 uppercase tracking-wider font-bold">
                WHY THIS MATTERS
              </div>
              <p className="text-sm text-white font-body leading-relaxed font-medium">
                {inspectedStop.whyItMatters}
              </p>
            </div>

            {/* Skills List */}
            {inspectedStop.skills && inspectedStop.skills.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-white/70 uppercase tracking-wider font-bold">
                  SKILLS COVERED
                </div>
                <div className="flex flex-wrap gap-2">
                  {inspectedStop.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.07] border border-white/20 text-xs font-mono text-white font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.15]">
                <div className="text-xs font-mono text-white/60 font-bold uppercase">LEARNING</div>
                <div className="text-white font-black font-display mt-1 text-base">
                  {inspectedStop.lessonsCount || 4} Interactive Lessons
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.15]">
                <div className="text-xs font-mono text-white/60 font-bold uppercase">PRACTICE</div>
                <div className="text-white font-black font-display mt-1 text-base">
                  {inspectedStop.assessmentsCount || 1} Assessment / Diagnostic
                </div>
              </div>
            </div>

            {/* Attached Project Workspace */}
            {inspectedStop.project && (
              <div className="p-5 rounded-2xl bg-white/[0.08] border border-white/[0.25] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/70 uppercase tracking-wider font-bold">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-white" />
                    HANDS-ON PROJECT
                  </span>
                  <span>{inspectedStop.project.hours || '4–6 hours'}</span>
                </div>
                <div className="text-base font-bold text-white font-display">
                  {inspectedStop.project.name}
                </div>
                {onOpenProject && (
                  <button
                    onClick={() => {
                      setInspectedStop(null);
                      onOpenProject(inspectedStop.project.id);
                    }}
                    className="btn-secondary w-full text-xs py-2.5 mt-2 font-display cursor-pointer"
                  >
                    <span>Launch Project Workspace →</span>
                  </button>
                )}
              </div>
            )}

            {/* Video References & Learning Materials */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-white/70 uppercase tracking-wider font-bold">
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-white" />
                  STUDY MATERIALS & REFERENCES
                </span>
                {setView && (
                  <button
                    onClick={() => {
                      setInspectedStop(null);
                      setView('materials');
                    }}
                    className="text-white hover:underline text-[11px] font-mono lowercase"
                  >
                    all materials →
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {(() => {
                  const nodeMaterials = (learningMaterials || []).filter(m => 
                    inspectedStop.skillIds?.some(sid => m.skillId === sid) ||
                    m.id === inspectedStop.learningMaterialId
                  );
                  const displayMaterials = nodeMaterials.length > 0 
                    ? nodeMaterials.slice(0, 2)
                    : (learningMaterials || []).slice(0, 2);

                  return displayMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => {
                        if (onOpenMaterial) onOpenMaterial(mat);
                      }}
                      className="p-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.15] hover:border-white/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-12 h-10 rounded-xl bg-cover bg-center shrink-0 border border-white/20 relative flex items-center justify-center overflow-hidden"
                          style={{ backgroundImage: `url(${mat.thumbnail})` }}
                        >
                          <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow">
                            <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white font-display truncate">
                            {mat.title}
                          </div>
                          <div className="text-[11px] font-mono text-white/60 flex items-center gap-2 mt-0.5">
                            <span>{mat.creator}</span>
                            <span>•</span>
                            <span>{mat.duration}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-white font-bold shrink-0 p-1.5 rounded-lg bg-white/[0.08] group-hover:bg-white group-hover:text-black transition-colors">
                        Study →
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/[0.12] space-y-2.5">
              <button
                onClick={() => {
                  setInspectedStop(null);
                  if (onOpenDiagnosticQuiz) {
                    const testSkill = inspectedStop.skillIds?.[0] || 'rest-api';
                    onOpenDiagnosticQuiz(testSkill);
                  }
                }}
                className="btn-primary w-full text-sm py-3.5 font-display cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continue Learning →</span>
              </button>

              {onToggleKnownSkill && inspectedStop.skillIds?.[0] && (
                <button
                  onClick={() => {
                    onToggleKnownSkill(inspectedStop.skillIds[0]);
                  }}
                  className="btn-secondary w-full text-xs font-display cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {inspectedStop.status === 'completed'
                      ? 'Mark Incomplete'
                      : 'Mark Competency Mastered ✓'}
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Universal Footer */}
      <footer className="pt-16 pb-8 border-t border-white/[0.12] text-center text-xs text-white/80 font-mono space-y-2">
        <div>DEVPATH · FUTURISTIC DEVELOPER OPERATING SYSTEM</div>
        <div className="text-white/90 font-bold tracking-widest uppercase text-xs">
          by UNEMPLOYED 003
        </div>
        <div className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
          BY S.L.A.M
        </div>
      </footer>

    </div>
  );
}
