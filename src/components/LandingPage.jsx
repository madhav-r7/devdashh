import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Code, 
  Compass, 
  Sparkles, 
  Zap, 
  Terminal, 
  Layers,
  Briefcase,
  Video,
  Globe,
  Box,
  GraduationCap,
  Rocket,
  MessageSquare,
  Shield,
  Cpu,
  Users,
  Clock,
  TrendingUp,
  Target,
  PanelLeftOpen
} from 'lucide-react';
import { ROLES_LIST, SIDE_HUSTLE_PATHS, SOFT_SKILLS_PATHS } from '../data/mockData';
import CareerDiagnosticModal from './CareerDiagnosticModal';
import Sidebar from './Sidebar';

export default function LandingPage({ 
  activeCategory = 'technical', 
  setActiveCategory,
  onOpenOnboarding, 
  setView, 
  onSelectRole,
  onSelectSideHustleTrack,
  onSelectSoftSkillsTrack,
  userState,
  currentView = 'landing',
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) {
  const [isCareerDiagnosticOpen, setIsCareerDiagnosticOpen] = useState(false);
  const [isTechnicalSidebarOpen, setIsTechnicalSidebarOpen] = useState(false);
  const [isSideHustleSidebarOpen, setIsSideHustleSidebarOpen] = useState(false);
  const [isSoftSkillsSidebarOpen, setIsSoftSkillsSidebarOpen] = useState(false);

  // Technical progression loop
  const technicalLoopSteps = [
    { 
      num: '01', 
      title: 'DISCOVER', 
      desc: 'Target your engineering career ambition and calibrate your specialization.',
      icon: Compass,
      tag: 'Ambition'
    },
    { 
      num: '02', 
      title: 'ASSESS', 
      desc: 'Audit your existing baseline competencies through interactive code diagnostics.',
      icon: Sparkles,
      tag: 'Diagnostics'
    },
    { 
      num: '03', 
      title: 'PERSONALIZE', 
      desc: 'Prune known milestones automatically to eliminate redundant study hours.',
      icon: Zap,
      tag: 'Pruning'
    },
    { 
      num: '04', 
      title: 'LEARN', 
      desc: 'Master targeted system architecture lessons and core foundational concepts.',
      icon: Terminal,
      tag: 'Mastery'
    },
    { 
      num: '05', 
      title: 'BUILD', 
      desc: 'Ship production-grade code verified with automated AST test suites.',
      icon: Layers,
      tag: 'Production'
    },
  ];

  // Side hustle progression loop
  const sideHustleLoopSteps = [
    { 
      num: '01', 
      title: 'DISCOVER', 
      desc: 'Identify high-demand monetization niches and underserved market gaps.',
      icon: Target,
      tag: 'Niches'
    },
    { 
      num: '02', 
      title: 'VALIDATE', 
      desc: 'Test customer willingness-to-pay and validate demand before writing code.',
      icon: Sparkles,
      tag: 'Validation'
    },
    { 
      num: '03', 
      title: 'PACKAGE', 
      desc: 'Formulate high-margin service offers, pricing tiers, and client contracts.',
      icon: Box,
      tag: 'Packaging'
    },
    { 
      num: '04', 
      title: 'DELIVER', 
      desc: 'Execute seamless client handoffs, production builds, and retainer milestones.',
      icon: Briefcase,
      tag: 'Delivery'
    },
    { 
      num: '05', 
      title: 'SCALE', 
      desc: 'Automate distribution channels, build recurring retainers, and productize.',
      icon: TrendingUp,
      tag: 'Scaling'
    },
  ];

  // Soft skills progression loop
  const softSkillsLoopSteps = [
    { 
      num: '01', 
      title: 'ASSESS', 
      desc: 'Audit your interpersonal communication instincts and emotional intelligence.',
      icon: Compass,
      tag: 'Self-Audit'
    },
    { 
      num: '02', 
      title: 'REFRAME', 
      desc: 'Adopt first-principles reasoning and empathetic stakeholder perspectives.',
      icon: Sparkles,
      tag: 'Mindset'
    },
    { 
      num: '03', 
      title: 'PRACTICE', 
      desc: 'Execute scenario-based leadership, conflict resolution, and feedback drills.',
      icon: Users,
      tag: 'Drills'
    },
    { 
      num: '04', 
      title: 'APPLY', 
      desc: 'Lead technical meetings, write architectural RFCs, and drive team consensus.',
      icon: MessageSquare,
      tag: 'Execution'
    },
    { 
      num: '05', 
      title: 'ADVANCE', 
      desc: 'Build lasting professional reputation, executive presence, and industry influence.',
      icon: Zap,
      tag: 'Influence'
    },
  ];

  // Helper to get matching Lucide icon
  const getSideHustleIcon = (iconName) => {
    switch (iconName) {
      case 'Briefcase': return Briefcase;
      case 'Video': return Video;
      case 'Globe': return Globe;
      case 'Box': return Box;
      case 'GraduationCap': return GraduationCap;
      case 'Rocket': return Rocket;
      default: return Briefcase;
    }
  };

  const getSoftSkillsIcon = (iconName) => {
    switch (iconName) {
      case 'MessageSquare': return MessageSquare;
      case 'Shield': return Shield;
      case 'Cpu': return Cpu;
      case 'Compass': return Compass;
      case 'Users': return Users;
      case 'Zap': return Zap;
      default: return MessageSquare;
    }
  };

  return (
    <div className="min-h-screen text-[#ffffff] selection:bg-white selection:text-black relative">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">

        {/* Dynamic Category View Container with smooth subtle fade transition */}
        <div key={activeCategory} className="page-transition">

          {/* ========================================================================= */}
          {/* 1. TECHNICAL SECTION (Default Experience)                                 */}
          {/* ========================================================================= */}
          {activeCategory === 'technical' && (
            <>
              {/* Top Section: Sidebar on the left edge + Hero & Compact Foundational Pillars beside it */}
              <section className="pt-8 pb-16 relative">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
                  {/* Left Edge: Closable Navigation Sidebar */}
                  {isTechnicalSidebarOpen && (
                    <div className="w-full lg:w-72 shrink-0 animate-fadeIn">
                      <Sidebar
                        category="technical"
                        currentView={currentView}
                        setView={setView}
                        userState={userState}
                        onSwitchRole={onSelectRole}
                        onOpenOnboarding={onOpenOnboarding}
                        isCollapsed={isSidebarCollapsed}
                        setIsCollapsed={setIsSidebarCollapsed}
                        onClose={() => setIsTechnicalSidebarOpen(false)}
                        isEmbedded={true}
                      />
                    </div>
                  )}

                  {/* Right Area: Hero + Compact Foundational Pillars beside Sidebar */}
                  <div className={`flex-1 ${isTechnicalSidebarOpen ? 'lg:text-left text-center' : 'text-center pt-8 max-w-5xl mx-auto'} transition-all relative w-full`}>
                    {!isTechnicalSidebarOpen && (
                      <div className="mb-8 flex justify-center">
                        <button
                          onClick={() => setIsTechnicalSidebarOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.18] text-white font-display text-xs cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] group transition-all"
                          title="Open Navigation Menu"
                        >
                          <PanelLeftOpen className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                          <span>Open Nav Sidebar</span>
                        </button>
                      </div>
                    )}

                    {/* Subtle Ambient Behind-Heading Glow */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-white/[0.04] blur-[90px] rounded-full pointer-events-none -z-10" />

                    {/* Main Heading */}
                    <h1 className={`${isTechnicalSidebarOpen ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl' : 'text-6xl sm:text-8xl lg:text-9xl'} font-black tracking-tighter text-white max-w-5xl ${isTechnicalSidebarOpen ? 'mx-0' : 'mx-auto'} leading-[0.95] font-display transition-all`}>
                      BUILD YOUR <span className="text-[#ff7700]">PATH.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`mt-6 text-xl sm:text-2xl text-white max-w-2xl ${isTechnicalSidebarOpen ? 'mx-0' : 'mx-auto'} font-medium font-display leading-relaxed`}>
                      Learn what matters. Build what proves it.
                    </p>

                    <p className={`mt-2.5 text-sm sm:text-base text-white/80 max-w-xl ${isTechnicalSidebarOpen ? 'mx-0' : 'mx-auto'} font-body`}>
                      An adaptive developer learning engine that prunes what you know and connects learning directly to production code.
                    </p>

                    {/* CTAs */}
                    <div className={`mt-8 flex flex-col sm:flex-row items-center ${isTechnicalSidebarOpen ? 'lg:justify-start justify-center' : 'justify-center'} gap-4`}>
                      <button
                        onClick={onOpenOnboarding}
                        className="btn-primary w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2.5 group font-display cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                        <span>Synthesize My Path</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => setView('dashboard')}
                        className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-display cursor-pointer"
                      >
                        <span>Explore Command Center</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Compact Foundational Pillars beside Sidebar */}
                    <div className="mt-12 pt-8 border-t border-white/[0.1]">
                      <div className="mb-4">
                        <div className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-semibold mb-1">
                          FOUNDATIONAL PILLARS
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                          Learn. Build.
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. LEARN */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <Compass className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">01 / ADAPTIVE PATH</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Learn</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Personalized paths based on what you already know. Pruning mastered skills dynamically when diagnostic quizzes reveal gaps.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Prunes known skills & adapts</span>
                          </div>
                        </div>

                        {/* 2. BUILD */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <Code className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">02 / REAL ARCHITECTURE</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Build</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Every milestone connects directly to a practical project. Build real-world APIs, rate limiters, caching layers, and microservices.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>1:1 Skill-to-Project link</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Below Sidebar Content Area: Clean Centered Max-W-6xl */}
              <div className="max-w-6xl mx-auto">

              {/* 3. THE CENTRAL PRODUCT LOOP */}
              <section className="py-28 border-b border-white/[0.12]">
                <div className="mb-16 text-center space-y-2">
                  <div className="text-xs sm:text-sm font-mono text-white uppercase tracking-widest font-bold">
                    ✦ SYSTEM ARCHITECTURE CYCLE
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight">
                    The Progression <span className="text-[#ff7700]">Loop</span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-body">
                    How our adaptive engine continuously personalizes, calibrates, and accelerates your developer journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                  {technicalLoopSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div 
                        key={idx}
                        className="mono-card p-7 sm:p-8 border-2 border-white/[0.18] hover:border-white hover:bg-white/[0.14] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300 flex flex-col justify-between space-y-6 group rounded-3xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="mono-tag text-xs font-black text-black bg-white px-3 py-1 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                              {step.num}
                            </span>
                            <span className="text-xs font-mono text-white/70 font-semibold uppercase tracking-wider">
                              {step.tag}
                            </span>
                          </div>

                          <div className="w-14 h-14 rounded-2xl bg-white/[0.1] border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-inner">
                            <Icon className="w-7 h-7" />
                          </div>

                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/80 mt-2.5 leading-relaxed font-body">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
                          <span>Phase 0{idx + 1}</span>
                          <span className="flex items-center gap-1 font-bold">
                            Explore →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 4. CAREER TRACKS */}
              <section className="py-24">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                  <div>
                    <div className="text-xs font-mono text-white uppercase tracking-widest mb-1 font-semibold">
                      ENGINEERING ROLES
                    </div>
                    <h2 className="text-3xl font-black text-white font-display">
                      Available Career Paths
                    </h2>
                  </div>
                  <button
                    onClick={onOpenOnboarding}
                    className="mono-tag text-sm font-bold text-white border-white/40 bg-white/[0.1] hover:bg-white/[0.2] px-4 py-2 flex items-center gap-2 group transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  >
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    <span>Launch Adaptive Path Synthesizer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROLES_LIST.map((role) => {
                    const isSelected = userState?.targetRoleId === role.id;
                    return (
                      <div
                        key={role.id}
                        onClick={() => {
                          onSelectRole(role.id);
                        }}
                        className={`mono-card-interactive p-6 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-white bg-white/[0.12] shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                            : 'border-white/[0.16]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="font-mono text-xs text-white/80 font-medium">{role.estTime}</span>
                          <span className={`mono-tag text-xs ${isSelected ? 'bg-white text-black font-bold border-white' : 'text-white border-white/30 bg-white/[0.1]'}`}>
                            {isSelected ? 'Active Track' : role.badge}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white font-display">
                          {role.title}
                        </h4>
                        
                        <p className="text-xs text-white/90 mt-2 line-clamp-2 leading-relaxed font-body">
                          {role.description}
                        </p>

                        <div className="mt-5 pt-3.5 border-t border-white/[0.1] flex items-center justify-between text-xs text-white">
                          <span className="font-mono text-xs text-white/80">{role.requiredSkillsCount} Milestones</span>
                          <span className="text-white text-xs font-semibold flex items-center gap-1 font-display">
                            {isSelected ? 'Selected' : 'Select Track'} <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Option Below Career Options: "I don't know what to learn — Diagnose" */}
                <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.14] to-white/[0.08] border-2 border-white/[0.3] hover:border-white shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_25px_#ffffff]">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                        I don't know what to learn — Diagnose
                      </h3>
                      <p className="text-sm sm:text-base text-white/85 font-body mt-1">
                        Take our 60-second interactive career diagnostic to determine your best engineering specialization and personalized starting syllabus.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCareerDiagnosticOpen(true)}
                    className="btn-primary text-base sm:text-lg py-4 px-8 font-display font-extrabold rounded-2xl shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                    <span>Diagnose Career Fit</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </section>

              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* 2. SIDE HUSTLE SECTION                                                    */}
          {/* ========================================================================= */}
          {activeCategory === 'side-hustle' && (
            <>
              {/* Top Section: Side Hustle Sidebar on left edge + Hero & Compact Commercial Pillars beside it */}
              <section className="pt-8 pb-16 relative">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
                  {/* Left Edge: Closable Side Hustle Sidebar */}
                  {isSideHustleSidebarOpen && (
                    <div className="w-full lg:w-72 shrink-0 animate-fadeIn">
                      <Sidebar
                        category="side-hustle"
                        currentView={currentView}
                        setView={setView}
                        userState={userState}
                        onSwitchRole={onSelectRole}
                        onOpenOnboarding={onOpenOnboarding}
                        isCollapsed={isSidebarCollapsed}
                        setIsCollapsed={setIsSidebarCollapsed}
                        onClose={() => setIsSideHustleSidebarOpen(false)}
                        isEmbedded={true}
                      />
                    </div>
                  )}

                  {/* Right Area: Hero + Compact Commercial Pillars beside Sidebar */}
                  <div className={`flex-1 ${isSideHustleSidebarOpen ? 'lg:text-left text-center' : 'text-center pt-8 max-w-5xl mx-auto'} transition-all relative w-full`}>
                    {!isSideHustleSidebarOpen && (
                      <div className="mb-8 flex justify-center">
                        <button
                          onClick={() => setIsSideHustleSidebarOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.18] text-white font-display text-xs cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] group transition-all"
                          title="Open Side Hustle Navigation Menu"
                        >
                          <PanelLeftOpen className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                          <span>Open Side Hustle Sidebar</span>
                        </button>
                      </div>
                    )}

                    {/* Subtle Ambient Behind-Heading Glow */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-white/[0.04] blur-[90px] rounded-full pointer-events-none -z-10" />

                    {/* Main Heading */}
                    <h1 className={`${isSideHustleSidebarOpen ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl' : 'text-6xl sm:text-8xl lg:text-9xl'} font-black tracking-tighter text-white max-w-5xl ${isSideHustleSidebarOpen ? 'mx-0' : 'mx-auto'} leading-[0.95] font-display transition-all`}>
                      SIDE HUSTLE
                    </h1>

                    {/* Subtitle */}
                    <p className={`mt-6 text-xl sm:text-2xl text-white max-w-2xl ${isSideHustleSidebarOpen ? 'mx-0' : 'mx-auto'} font-medium font-display leading-relaxed`}>
                      Build skills that can turn into income.
                    </p>

                    <p className={`mt-2.5 text-sm sm:text-base text-white/80 max-w-xl ${isSideHustleSidebarOpen ? 'mx-0' : 'mx-auto'} font-body`}>
                      Practical monetization paths, client acquisition blueprints, and scalable digital product frameworks tailored for developers & creators.
                    </p>

                    {/* CTAs */}
                    <div className={`mt-8 flex flex-col sm:flex-row items-center ${isSideHustleSidebarOpen ? 'lg:justify-start justify-center' : 'justify-center'} gap-4`}>
                      <button
                        onClick={onOpenOnboarding}
                        className="btn-primary w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2.5 group font-display cursor-pointer"
                      >
                        <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
                        <span>Synthesize Side Hustle Path</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => setView('dashboard')}
                        className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-display cursor-pointer"
                      >
                        <span>Explore Command Center</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Compact Commercial Pillars beside Sidebar */}
                    <div className="mt-12 pt-8 border-t border-white/[0.1]">
                      <div className="mb-4">
                        <div className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-semibold mb-1">
                          COMMERCIAL PILLARS
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                          Acquire. Monetize.
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. ACQUIRE */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">01 / CLIENT ACQUISITION</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Acquire</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Master high-ticket client prospecting, proposal positioning, cold outreach frameworks, and closing lucrative retainers.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Proven client outreach pipelines</span>
                          </div>
                        </div>

                        {/* 2. MONETIZE */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">02 / REVENUE GENERATION</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Monetize</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Productize your capabilities into high-margin digital templates, developer boilerplates, and tutoring cohorts.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Turn code into recurring revenue</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Below Sidebar Content Area: Clean Centered Max-W-6xl */}
              <div className="max-w-6xl mx-auto">

              {/* 3. PROGRESSION LOOP */}
              <section className="py-28 border-b border-white/[0.12]">
                <div className="mb-16 text-center space-y-2">
                  <div className="text-xs sm:text-sm font-mono text-white uppercase tracking-widest font-bold">
                    ✦ INCOME ACCELERATION CYCLE
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight">
                    The Progression <span className="text-[#ff7700]">Loop</span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-body">
                    How to systematically progress from initial skill validation to scalable commercial income streams.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                  {sideHustleLoopSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div 
                        key={idx}
                        className="mono-card p-7 sm:p-8 border-2 border-white/[0.18] hover:border-white hover:bg-white/[0.14] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300 flex flex-col justify-between space-y-6 group rounded-3xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="mono-tag text-xs font-black text-black bg-white px-3 py-1 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                              {step.num}
                            </span>
                            <span className="text-xs font-mono text-white/70 font-semibold uppercase tracking-wider">
                              {step.tag}
                            </span>
                          </div>

                          <div className="w-14 h-14 rounded-2xl bg-white/[0.1] border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-inner">
                            <Icon className="w-7 h-7" />
                          </div>

                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/80 mt-2.5 leading-relaxed font-body">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
                          <span>Phase 0{idx + 1}</span>
                          <span className="flex items-center gap-1 font-bold">
                            Explore →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 4. SIDE HUSTLE PATH CARDS */}
              <section className="py-24">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                  <div>
                    <div className="text-xs font-mono text-white uppercase tracking-widest mb-1 font-semibold">
                      INCOME BLUEPRINTS
                    </div>
                    <h2 className="text-3xl font-black text-white font-display">
                      Available Side Hustle Paths
                    </h2>
                  </div>
                  <button
                    onClick={onOpenOnboarding}
                    className="mono-tag text-sm font-bold text-white border-white/40 bg-white/[0.1] hover:bg-white/[0.2] px-4 py-2 flex items-center gap-2 group transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  >
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    <span>Launch Side Hustle Synthesizer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {SIDE_HUSTLE_PATHS.map((path) => {
                    const Icon = getSideHustleIcon(path.icon);
                    const isSelected = userState?.sideHustle?.activeTrackId === path.id;
                    return (
                      <div
                        key={path.id}
                        onClick={() => {
                          if (onSelectSideHustleTrack) {
                            onSelectSideHustleTrack(path);
                          }
                        }}
                        className={`mono-card-interactive p-6 cursor-pointer group flex flex-col justify-between transition-all duration-300 ${
                          isSelected 
                            ? 'border-white bg-white/[0.12] shadow-[0_0_25px_rgba(255,255,255,0.25)]' 
                            : 'border-white/[0.16]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-4">
                            <span className="font-mono text-xs text-white/80 font-medium flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {path.estTime}
                            </span>
                            <span className={`mono-tag text-xs ${isSelected ? 'bg-white text-black font-bold border-white' : 'text-white border-white/30 bg-white/[0.1]'}`}>
                              {isSelected ? 'Active Track' : path.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-2.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-white text-black' : 'bg-white/[0.08] border border-white/20 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-bold text-white font-display">
                              {path.title}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-white/90 mt-2 leading-relaxed font-body">
                            {path.description}
                          </p>

                          {/* Learn topics pill list */}
                          <div className="mt-4 pt-3 border-t border-white/[0.08]">
                            <div className="text-[11px] font-mono text-white/60 mb-2 uppercase tracking-wider font-semibold">
                              Learn Roadmap:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {path.skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-white/85 border border-white/10"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-white/[0.1] flex items-center justify-between text-xs text-white">
                          <span className="font-mono text-xs text-white/80">{path.requiredSkillsCount} Practical Modules</span>
                          <span className="text-white text-xs font-semibold flex items-center gap-1 font-display">
                            {isSelected ? 'Selected' : 'Select Track'} <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Diagnostic Recommendation Box */}
                <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.14] to-white/[0.08] border-2 border-white/[0.3] hover:border-white shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_25px_#ffffff]">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                        I don't know what side hustle to start — Diagnose
                      </h3>
                      <p className="text-sm sm:text-base text-white/85 font-body mt-1">
                        Take our interactive diagnostic to match your technical strengths with high-demand client niches and personalized launch syllabi.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCareerDiagnosticOpen(true)}
                    className="btn-primary text-base sm:text-lg py-4 px-8 font-display font-extrabold rounded-2xl shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                    <span>Diagnose Side Hustle Fit</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </section>

              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* 3. SOFT SKILLS SECTION                                                    */}
          {/* ========================================================================= */}
          {activeCategory === 'soft-skills' && (
            <>
              {/* Top Section: Soft Skills Sidebar on left edge + Hero & Compact Interpersonal Pillars beside it */}
              <section className="pt-8 pb-16 relative">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
                  {/* Left Edge: Closable Soft Skills Sidebar */}
                  {isSoftSkillsSidebarOpen && (
                    <div className="w-full lg:w-72 shrink-0 animate-fadeIn">
                      <Sidebar
                        category="soft-skills"
                        currentView={currentView}
                        setView={setView}
                        userState={userState}
                        onSwitchRole={onSelectRole}
                        onOpenOnboarding={onOpenOnboarding}
                        isCollapsed={isSidebarCollapsed}
                        setIsCollapsed={setIsSidebarCollapsed}
                        onClose={() => setIsSoftSkillsSidebarOpen(false)}
                        isEmbedded={true}
                      />
                    </div>
                  )}

                  {/* Right Area: Hero + Compact Interpersonal Pillars beside Sidebar */}
                  <div className={`flex-1 ${isSoftSkillsSidebarOpen ? 'lg:text-left text-center' : 'text-center pt-8 max-w-5xl mx-auto'} transition-all relative w-full`}>
                    {!isSoftSkillsSidebarOpen && (
                      <div className="mb-8 flex justify-center">
                        <button
                          onClick={() => setIsSoftSkillsSidebarOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.18] text-white font-display text-xs cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] group transition-all"
                          title="Open Soft Skills Navigation Menu"
                        >
                          <PanelLeftOpen className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                          <span>Open Soft Skills Sidebar</span>
                        </button>
                      </div>
                    )}

                    {/* Subtle Ambient Behind-Heading Glow */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-white/[0.04] blur-[90px] rounded-full pointer-events-none -z-10" />

                    {/* Main Heading */}
                    <h1 className={`${isSoftSkillsSidebarOpen ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl' : 'text-6xl sm:text-8xl lg:text-9xl'} font-black tracking-tighter text-white max-w-5xl ${isSoftSkillsSidebarOpen ? 'mx-0' : 'mx-auto'} leading-[0.95] font-display transition-all`}>
                      SOFT SKILLS
                    </h1>

                    {/* Subtitle */}
                    <p className={`mt-6 text-xl sm:text-2xl text-white max-w-2xl ${isSoftSkillsSidebarOpen ? 'mx-0' : 'mx-auto'} font-medium font-display leading-relaxed`}>
                      Skills that make your technical ability useful in the real world.
                    </p>

                    <p className={`mt-2.5 text-sm sm:text-base text-white/80 max-w-xl ${isSoftSkillsSidebarOpen ? 'mx-0' : 'mx-auto'} font-body`}>
                      Master high-stakes stakeholder communication, strategic engineering leadership, first-principles problem solving, and career acceleration.
                    </p>

                    {/* CTAs */}
                    <div className={`mt-8 flex flex-col sm:flex-row items-center ${isSoftSkillsSidebarOpen ? 'lg:justify-start justify-center' : 'justify-center'} gap-4`}>
                      <button
                        onClick={onOpenOnboarding}
                        className="btn-primary w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2.5 group font-display cursor-pointer"
                      >
                        <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
                        <span>Synthesize Soft Skills Path</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => setView('dashboard')}
                        className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-display cursor-pointer"
                      >
                        <span>Explore Command Center</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Compact Interpersonal Pillars beside Sidebar */}
                    <div className="mt-12 pt-8 border-t border-white/[0.1]">
                      <div className="mb-4">
                        <div className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-semibold mb-1">
                          INTERPERSONAL PILLARS
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                          Communicate. Lead.
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. COMMUNICATE */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">01 / INTERPERSONAL MASTERY</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Communicate</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Translate architectural complexity into crisp stakeholder narratives, persuasive engineering RFCs, and high-impact presentations.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>High-clarity technical narratives</span>
                          </div>
                        </div>

                        {/* 2. LEAD */}
                        <div className="mono-card p-5 flex flex-col justify-between border-white/[0.16] rounded-2xl">
                          <div>
                            <div className="w-9 h-9 rounded-lg bg-white/[0.1] border border-white/[0.2] flex items-center justify-center text-white mb-3 shadow-sm">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1 font-semibold">02 / STRATEGIC IMPACT</div>
                            <h3 className="text-lg font-bold text-white mb-1 font-display">Lead</h3>
                            <p className="text-xs text-white/85 leading-relaxed font-body">
                              Elevate engineering teams through strategic decision making, proactive delegation, constructive conflict resolution, and ownership.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/[0.08] text-[11px] font-mono text-white flex items-center gap-1.5 font-semibold">
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Turn technical depth into leadership</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Below Sidebar Content Area: Clean Centered Max-W-6xl */}
              <div className="max-w-6xl mx-auto">

              {/* 3. PROGRESSION LOOP */}
              <section className="py-28 border-b border-white/[0.12]">
                <div className="mb-16 text-center space-y-2">
                  <div className="text-xs sm:text-sm font-mono text-white uppercase tracking-widest font-bold">
                    ✦ INTERPERSONAL MASTERY CYCLE
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight">
                    The Progression <span className="text-[#ff7700]">Loop</span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-body">
                    How to systematically refine your communication, engineering influence, and real-world leadership impact.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                  {softSkillsLoopSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div 
                        key={idx}
                        className="mono-card p-7 sm:p-8 border-2 border-white/[0.18] hover:border-white hover:bg-white/[0.14] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300 flex flex-col justify-between space-y-6 group rounded-3xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="mono-tag text-xs font-black text-black bg-white px-3 py-1 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                              {step.num}
                            </span>
                            <span className="text-xs font-mono text-white/70 font-semibold uppercase tracking-wider">
                              {step.tag}
                            </span>
                          </div>

                          <div className="w-14 h-14 rounded-2xl bg-white/[0.1] border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-inner">
                            <Icon className="w-7 h-7" />
                          </div>

                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/80 mt-2.5 leading-relaxed font-body">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
                          <span>Phase 0{idx + 1}</span>
                          <span className="flex items-center gap-1 font-bold">
                            Explore →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 4. SOFT SKILLS PATH CARDS */}
              <section className="py-24">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                  <div>
                    <div className="text-xs font-mono text-white uppercase tracking-widest mb-1 font-semibold">
                      MASTERY BLUEPRINTS
                    </div>
                    <h2 className="text-3xl font-black text-white font-display">
                      Available Soft Skills Paths
                    </h2>
                  </div>
                  <button
                    onClick={onOpenOnboarding}
                    className="mono-tag text-sm font-bold text-white border-white/40 bg-white/[0.1] hover:bg-white/[0.2] px-4 py-2 flex items-center gap-2 group transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  >
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    <span>Launch Soft Skills Synthesizer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {SOFT_SKILLS_PATHS.map((path) => {
                    const Icon = getSoftSkillsIcon(path.icon);
                    const isSelected = userState?.softSkills?.activeTrackId === path.id;
                    return (
                      <div
                        key={path.id}
                        onClick={() => {
                          if (onSelectSoftSkillsTrack) {
                            onSelectSoftSkillsTrack(path);
                          }
                        }}
                        className={`mono-card-interactive p-6 cursor-pointer group flex flex-col justify-between transition-all duration-300 ${
                          isSelected 
                            ? 'border-white bg-white/[0.12] shadow-[0_0_25px_rgba(255,255,255,0.25)]' 
                            : 'border-white/[0.16]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-4">
                            <span className="font-mono text-xs text-white/80 font-medium flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {path.estTime}
                            </span>
                            <span className={`mono-tag text-xs ${isSelected ? 'bg-white text-black font-bold border-white' : 'text-white border-white/30 bg-white/[0.1]'}`}>
                              {isSelected ? 'Active Track' : path.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-2.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-white text-black' : 'bg-white/[0.08] border border-white/20 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-bold text-white font-display">
                              {path.title}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-white/90 mt-2 leading-relaxed font-body">
                            {path.description}
                          </p>

                          {/* Learn topics pill list */}
                          <div className="mt-4 pt-3 border-t border-white/[0.08]">
                            <div className="text-[11px] font-mono text-white/60 mb-2 uppercase tracking-wider font-semibold">
                              Learn Roadmap:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {path.skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-white/85 border border-white/10"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-white/[0.1] flex items-center justify-between text-xs text-white">
                          <span className="font-mono text-xs text-white/80">{path.requiredSkillsCount} Core Focus Areas</span>
                          <span className="text-white text-xs font-semibold flex items-center gap-1 font-display">
                            {isSelected ? 'Selected' : 'Select Track'} <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Diagnostic Recommendation Box */}
                <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.14] to-white/[0.08] border-2 border-white/[0.3] hover:border-white shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_25px_#ffffff]">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                        I don't know what soft skills I need — Diagnose
                      </h3>
                      <p className="text-sm sm:text-base text-white/85 font-body mt-1">
                        Take our interactive soft skills diagnostic to identify your interpersonal strengths, communication blind spots, and leadership growth areas.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCareerDiagnosticOpen(true)}
                    className="btn-primary text-base sm:text-lg py-4 px-8 font-display font-extrabold rounded-2xl shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                    <span>Diagnose Soft Skills Fit</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </section>

              </div>
            </>
          )}

        </div>

        {/* Universal Footer */}
        <footer className="py-12 border-t border-white/[0.12] text-center text-xs text-white/80 font-mono space-y-2">
          <div>DEVPATH · FUTURISTIC DEVELOPER OPERATING SYSTEM</div>
          <div className="text-white/90 font-bold tracking-widest uppercase text-xs">
            by UNEMPLOYED 003
          </div>
          <div className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
            BY S.L.A.M
          </div>
        </footer>

      </div>

      {/* Career Diagnostic Modal */}
      <CareerDiagnosticModal
        isOpen={isCareerDiagnosticOpen}
        onClose={() => setIsCareerDiagnosticOpen(false)}
        onSelectRole={(roleId) => {
          onSelectRole(roleId);
          setView('roadmap');
        }}
      />

    </div>
  );
}
