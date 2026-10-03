import React, { useState, useMemo } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Code2,
  Clock,
  Briefcase,
  Server,
  Layout,
  Cloud,
  Shield,
  Smartphone,
  Zap,
  Flame,
  Crown,
  Database,
  GitBranch,
  Rocket,
  CheckCheck,
  RotateCcw,
  Sliders,
  CheckCircle
} from 'lucide-react';
import { ROLES_LIST, ALL_SKILLS } from '../data/mockData';
import CareerDiagnosticModal from './CareerDiagnosticModal';

export default function OnboardingModal({ isOpen, onClose, onCompleteOnboarding, initialRole = 'backend' }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedSkills, setSelectedSkills] = useState(['html', 'css', 'javascript', 'python', 'git']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [selectedProjects, setSelectedProjects] = useState(['portfolio', 'rest-api']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isCareerDiagnosticOpen, setIsCareerDiagnosticOpen] = useState(false);

  // Categories list for skill filters
  const categories = ['All', 'Foundations', 'Core', 'Backend', 'Frontend', 'Cloud', 'Database'];

  const filteredSkills = useMemo(() => {
    return ALL_SKILLS.filter(s => {
      const matchesSearch = !searchQuery.trim() || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  const selectAllFoundations = () => {
    const foundationIds = ALL_SKILLS.filter(s => s.category === 'Foundations').map(s => s.id);
    setSelectedSkills(prev => Array.from(new Set([...prev, ...foundationIds])));
  };

  const clearAllSkills = () => {
    setSelectedSkills([]);
  };

  const projectOptions = [
    { 
      id: 'portfolio', 
      title: 'Personal Portfolio & Design System', 
      desc: 'Responsive web application with fluid CSS grid, dark mode, and interactive components.',
      badge: 'Frontend Core'
    },
    { 
      id: 'rest-api', 
      title: 'RESTful CRUD Microservice Engine', 
      desc: 'Production API with PostgreSQL persistence, JWT auth tokens, and structured error handling.',
      badge: 'Backend Core'
    },
    { 
      id: 'fullstack', 
      title: 'Full-Stack Application & State Pipeline', 
      desc: 'Client UI + server API + database ORM synchronization pipeline with real-time sockets.',
      badge: 'Full Architecture'
    },
    { 
      id: 'cli', 
      title: 'Developer CLI Tooling & Automation', 
      desc: 'Automated workflow scripts, code generators, and command-line developer utilities.',
      badge: 'Tooling'
    },
    { 
      id: 'database', 
      title: 'Relational Database Schema & Indexing', 
      desc: 'Normalized SQL relational data models, indexed queries, transactions, and JOIN optimization.',
      badge: 'Data Layer'
    },
    { 
      id: 'oss', 
      title: 'Open Source Production Contributions', 
      desc: 'Pull request reviews, unit tests, and production code merged into public community repos.',
      badge: 'Community'
    },
  ];

  const toggleProject = (projId) => {
    setSelectedProjects(prev => 
      prev.includes(projId) ? prev.filter(p => p !== projId) : [...prev, projId]
    );
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => setGenerationStep(2), 600);
    setTimeout(() => setGenerationStep(3), 1200);
    setTimeout(() => setGenerationStep(4), 1800);
    setTimeout(() => {
      setIsGenerating(false);
      const roleObj = ROLES_LIST.find(r => r.id === selectedRole) || ROLES_LIST[0];
      onCompleteOnboarding({
        targetRoleId: selectedRole,
        targetRoleTitle: roleObj.title,
        knownSkills: selectedSkills,
        experienceLevel,
        weeklyHours,
        builtProjects: selectedProjects
      });
      onClose();
    }, 2400);
  };

  const stepLabels = [
    { num: 1, title: 'Specialization', desc: 'Target Track' },
    { num: 2, title: 'Skill Audit', desc: 'Prune Knowledge' },
    { num: 3, title: 'Baseline', desc: 'Experience' },
    { num: 4, title: 'Velocity', desc: 'Weekly Hours' },
    { num: 5, title: 'Portfolio', desc: 'Prior Projects' }
  ];

  const getRoleIcon = (iconName) => {
    switch (iconName) {
      case 'Server': return <Server className="w-5 h-5 text-white" />;
      case 'Layout': return <Layout className="w-5 h-5 text-white" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-white" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-white" />;
      case 'Shield': return <Shield className="w-5 h-5 text-white" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-white" />;
      default: return <Code2 className="w-5 h-5 text-white" />;
    }
  };

  // Estimated hours saved calculation
  const totalSavedHours = selectedSkills.reduce((acc, id) => {
    const s = ALL_SKILLS.find(sk => sk.id === id);
    return acc + (s?.hours || 15);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      {/* Outer Glow Container */}
      <div className="relative w-full max-w-5xl bg-[#09090e] border border-white/[0.2] rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.18)] overflow-hidden flex flex-col h-[88vh] max-h-[760px] transition-all text-white">
        
        {/* Luminous Top Glowing Flow Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

        {/* 1. MODAL HEADER */}
        <div className="px-5 sm:px-7 py-3.5 border-b border-white/[0.12] bg-white/[0.02] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="mono-tag text-[10px] font-bold text-white border-white/30 bg-white/[0.1] px-2 py-0.5 tracking-wider">
                ✦ ADAPTIVE PATH SYNTHESIZER
              </span>
              <span className="text-[11px] font-mono text-white/60 font-medium uppercase tracking-wider hidden sm:inline-block">
                STEP {step} OF 5 · {stepLabels[step - 1].desc}
              </span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
              Personalize Your Career Journey
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.16] border border-white/[0.15] flex items-center justify-center text-white transition-all hover:scale-105 shrink-0 cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="bg-white/[0.015] border-b border-white/[0.08] px-5 sm:px-7 py-2 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between min-w-[520px] gap-1.5">
            {stepLabels.map((item) => {
              const isCurrent = step === item.num;
              const isPast = step > item.num;
              return (
                <button
                  key={item.num}
                  onClick={() => setStep(item.num)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    isCurrent 
                      ? 'bg-white text-black font-bold shadow-sm' 
                      : isPast
                        ? 'bg-white/[0.08] text-white hover:bg-white/[0.14]'
                        : 'bg-white/[0.02] text-white/40 hover:text-white/70'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                    isCurrent 
                      ? 'bg-black text-white' 
                      : isPast 
                        ? 'bg-white text-black font-bold' 
                        : 'border border-white/20 text-white/40'
                  }`}>
                    {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : item.num}
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold leading-none">{item.title}</div>
                    <div className={`text-[9px] font-mono mt-0.5 ${isCurrent ? 'text-black/80 font-semibold' : 'text-white/50'}`}>{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MODAL CONTENT BODY */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 custom-scrollbar space-y-5">

          {/* STEP 1: TARGET ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  What is your target career specialization?
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-body">
                  Select your primary ambition to dynamically synthesize your curriculum and project milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {ROLES_LIST.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'bg-white/[0.12] border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.25)] ring-2 ring-white/30 scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/[0.12] hover:border-white/50 hover:bg-white/[0.07] text-white'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-all">
                            {getRoleIcon(role.icon)}
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="mono-tag text-[10px] font-mono text-white/80 border-white/20 bg-white/[0.08] px-2 py-0.5">
                              {role.badge}
                            </span>
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                              isSelected ? 'bg-white text-black border-white shadow-sm' : 'border-white/20 bg-transparent'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold font-display text-white">
                            {role.title}
                          </h4>
                          <p className="text-xs text-white/70 leading-relaxed font-body mt-1 line-clamp-2">
                            {role.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/80">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-white/60" />
                          {role.estTime}
                        </span>
                        <span className="text-[11px] font-semibold text-white/90 bg-white/[0.06] px-2 py-0.5 rounded border border-white/10">
                          {role.requiredSkillsCount} Milestones
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Option Below Career Options: "I don't know what to learn — Diagnose" */}
              <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.18] hover:border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white font-display">
                      I don't know what to learn — Diagnose Fit
                    </div>
                    <p className="text-xs text-white/70 font-body">
                      Unsure which path fits your background? Take our 3-question diagnostic aptitude test.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCareerDiagnosticOpen(true)}
                  className="btn-primary text-xs py-2 px-4 font-display font-bold rounded-xl shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Diagnose Fit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: KNOWN SKILLS AUDIT */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                    Which technologies do you already know?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-body">
                    Known skills will be marked complete and pruned from your active roadmap to save your time.
                  </p>
                </div>
                
                {/* Real-time stats badge */}
                <div className="p-2.5 rounded-xl bg-white/[0.08] border border-white/20 text-white font-mono flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold">{selectedSkills.length} SKILLS PRUNED</span>
                    <span className="text-white/60 ml-2">(~{totalSavedHours}h saved)</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar & Search Bar */}
              <div className="space-y-2.5 pt-1">
                <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search technologies (e.g. JavaScript, Python, SQL, Docker, Git)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/[0.18] rounded-xl pl-10 pr-3 py-2 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={selectAllFoundations}
                      className="btn-secondary text-xs py-2 px-3 font-mono font-bold flex items-center gap-1.5"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>+ Foundations</span>
                    </button>
                    <button
                      type="button"
                      onClick={clearAllSkills}
                      className="btn-secondary text-xs py-2 px-3 font-mono text-white/60 hover:text-white flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                        selectedCategory === cat
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-white/[0.03] text-white/70 border-white/[0.1] hover:bg-white/[0.08]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Grid - Sleek compact chips */}
              <div className="flex flex-wrap gap-2 pt-1 max-h-64 sm:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all border flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-sm font-bold'
                          : 'bg-white/[0.04] text-white/90 border-white/[0.14] hover:bg-white/[0.1] hover:border-white/40'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'bg-black text-white' : 'border border-white/30 text-white/50'
                      }`}>
                        {isSelected ? '✓' : '+'}
                      </span>
                      <span>{skill.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-mono ${
                        isSelected ? 'bg-black/15 text-black font-semibold' : 'bg-white/[0.08] text-white/60'
                      }`}>
                        {skill.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE LEVEL */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  How would you describe your baseline?
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-body">
                  We calibrate curriculum pacing and project test suites to match your starting point.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  { 
                    level: 'Beginner', 
                    title: 'Beginner (Foundations)', 
                    icon: <Sparkles className="w-5 h-5 text-white" />,
                    badge: 'Syntax & Core Concepts',
                    desc: 'Starting out with foundational syntax, basic variables, control structures, and introductory scripts.' 
                  },
                  { 
                    level: 'Beginner+', 
                    title: 'Beginner+ (Practitioner)', 
                    icon: <Zap className="w-5 h-5 text-white" />,
                    badge: 'Hands-on Projects',
                    desc: 'Comfortable with core programming fundamentals; have built several small practice tools and understand Git.' 
                  },
                  { 
                    level: 'Intermediate', 
                    title: 'Intermediate (Engineer)', 
                    icon: <Flame className="w-5 h-5 text-white" />,
                    badge: 'Production Systems',
                    desc: 'Regularly build full backend or frontend services with databases, RESTful APIs, and Git PR workflows.' 
                  },
                  { 
                    level: 'Advanced', 
                    title: 'Advanced (Architect)', 
                    icon: <Crown className="w-5 h-5 text-white" />,
                    badge: 'High Scale & Distributed',
                    desc: 'Experienced in distributed systems, performance profiling, high-scale caching, and CI/CD pipelines.' 
                  }
                ].map((item) => {
                  const isSelected = experienceLevel === item.level;
                  return (
                    <div
                      key={item.level}
                      onClick={() => setExperienceLevel(item.level)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'bg-white/[0.12] border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.25)] ring-2 ring-white/30 scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/[0.12] text-white hover:border-white/50 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-sm sm:text-base font-bold font-display text-white">
                              {item.title}
                            </span>
                            <div className="text-[10px] font-mono text-white/60 uppercase">{item.badge}</div>
                          </div>
                        </div>

                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected ? 'bg-white text-black border-white shadow-sm' : 'border-white/20 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      
                      <p className="text-xs text-white/70 leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: WEEKLY COMMITMENT */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  How many hours can you dedicate each week?
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-body">
                  Your timeline and milestone pace will automatically adjust based on your chosen schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  { 
                    hours: 5, 
                    label: '5 Hours / Week', 
                    pace: '6–8 Months Timeline', 
                    badge: 'Deliberate',
                    subtitle: 'Steady progress designed for busy professionals with limited weekday time.' 
                  },
                  { 
                    hours: 10, 
                    label: '10 Hours / Week', 
                    pace: '4–5 Months Timeline', 
                    badge: 'Balanced',
                    subtitle: 'Balanced velocity with focused evening drills and dedicated weekend blocks.' 
                  },
                  { 
                    hours: 15, 
                    label: '15 Hours / Week', 
                    pace: '3–4 Months (Recommended)', 
                    badge: 'Optimal',
                    subtitle: 'Optimal velocity for rapid skill acquisition and comprehensive project completion.' 
                  },
                  { 
                    hours: 25, 
                    label: '20+ Hours / Week', 
                    pace: '2 Months Fast-Track', 
                    badge: 'Immersion',
                    subtitle: 'Intensive immersion sprint for immediate job readiness and accelerated transition.' 
                  },
                ].map((item) => {
                  const isSelected = weeklyHours === item.hours;
                  return (
                    <div
                      key={item.hours}
                      onClick={() => setWeeklyHours(item.hours)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'bg-white/[0.12] border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.25)] ring-2 ring-white/30 scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/[0.12] text-white hover:border-white/50 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold font-display text-white">
                            {item.label}
                          </span>
                          <span className="mono-tag text-[10px] font-mono text-white/80 border-white/20 bg-white/[0.08] px-2 py-0.5">
                            {item.badge}
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected ? 'bg-white text-black border-white shadow-sm' : 'border-white/20 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-between text-xs font-mono text-white">
                        <span className="text-white/60">Estimated Pace:</span>
                        <span className="font-bold underline">{item.pace}</span>
                      </div>

                      <p className="text-xs text-white/70 font-body leading-relaxed">{item.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: PRIOR PROJECTS */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  What practical architectures have you already built?
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-body">
                  Select built architectures to skip basic drills and calibrate your initial project workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {projectOptions.map((proj) => {
                  const isSelected = selectedProjects.includes(proj.id);
                  return (
                    <div
                      key={proj.id}
                      onClick={() => toggleProject(proj.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'bg-white/[0.12] border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.25)] ring-2 ring-white/30 scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/[0.12] text-white hover:border-white/50 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="mono-tag text-[10px] font-mono text-white/80 border-white/20 bg-white/[0.08] px-2 py-0.5">
                            {proj.badge}
                          </span>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                            isSelected ? 'bg-white text-black border-white shadow-sm' : 'border-white/20 bg-transparent'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <h4 className="text-sm font-bold font-display text-white">
                          {proj.title}
                        </h4>

                        <p className="text-xs text-white/70 font-body leading-relaxed line-clamp-2">
                          {proj.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08] text-[11px] font-mono text-white/60 flex items-center gap-1.5">
                        <Rocket className="w-3 h-3 text-white/70" />
                        <span>Prerequisites auto-waived</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GENERATION SYNTHESIS OVERLAY */}
          {isGenerating && (
            <div className="absolute inset-0 bg-[#060609]/98 z-40 flex flex-col items-center justify-center p-6 sm:p-10 text-center animate-fadeIn">
              
              {/* Spinning Cybernetic Core */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-3 border-white/20 border-t-white animate-spin shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight uppercase mb-2">
                Synthesizing Adaptive Path...
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-body mb-6 max-w-md">
                Pruning redundant modules, sequencing DAG milestone tree, and configuring project test rubrics.
              </p>
              
              <div className="w-full max-w-md space-y-2.5 text-left font-mono text-xs sm:text-sm">
                <div className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  generationStep >= 1 ? 'bg-white text-black font-bold border-white shadow-sm' : 'bg-white/[0.03] border-white/[0.08] text-white/30'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Pruned {selectedSkills.length} known competencies (~{totalSavedHours}h saved)</span>
                </div>
                
                <div className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  generationStep >= 2 ? 'bg-white text-black font-bold border-white shadow-sm' : 'bg-white/[0.03] border-white/[0.08] text-white/30'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Sequenced Directed Acyclic Graph (DAG) dependencies</span>
                </div>
                
                <div className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  generationStep >= 3 ? 'bg-white text-black font-bold border-white shadow-sm' : 'bg-white/[0.03] border-white/[0.08] text-white/30'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Attached diagnostic assessment suite & practical projects</span>
                </div>

                <div className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  generationStep >= 4 ? 'bg-white text-black font-bold border-white shadow-sm' : 'bg-white/[0.03] border-white/[0.08] text-white/30'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Configured developer command center dashboard</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="px-5 sm:px-7 py-3 border-t border-white/[0.12] bg-white/[0.02] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="btn-secondary text-xs sm:text-sm py-2 px-4 font-display rounded-xl flex items-center gap-1.5 cursor-pointer"
              disabled={isGenerating}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="btn-primary text-xs sm:text-sm py-2 px-5 font-display font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleStartGeneration}
              disabled={isGenerating}
              className="btn-primary text-xs sm:text-sm py-2.5 px-6 font-display font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Synthesize My Path →</span>
            </button>
          )}
        </div>

      </div>

      {/* Career Aptitude Diagnostic Modal */}
      <CareerDiagnosticModal
        isOpen={isCareerDiagnosticOpen}
        onClose={() => setIsCareerDiagnosticOpen(false)}
        onSelectRole={(roleId) => setSelectedRole(roleId)}
      />

    </div>
  );
}
