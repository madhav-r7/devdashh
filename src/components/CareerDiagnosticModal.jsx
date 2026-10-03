import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Server, 
  Layout, 
  Layers, 
  Cloud, 
  Cpu, 
  Shield, 
  Smartphone, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  RotateCcw,
  Target
} from 'lucide-react';
import { ROLES_LIST } from '../data/mockData';

export default function CareerDiagnosticModal({ 
  isOpen, 
  onClose, 
  onSelectRole 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    problemDomain: null,
    toolingPreference: null,
    coreMotivation: null,
    experienceBaseline: 'Intermediate'
  });
  const [isComputing, setIsComputing] = useState(false);
  const [computedResult, setComputedResult] = useState(null);

  if (!isOpen) return null;

  const questions = [
    {
      step: 1,
      title: "What kind of engineering challenges excite you the most?",
      subtitle: "Select the problem space that naturally captures your curiosity.",
      options: [
        { id: 'frontend', role: 'frontend', label: 'Crafting fluid user interfaces, responsive designs, and rich animations', icon: Layout, badge: 'UI / UX' },
        { id: 'backend', role: 'backend', label: 'Designing high-throughput APIs, database schemas, and microservices logic', icon: Server, badge: 'Systems & APIs' },
        { id: 'fullstack', role: 'fullstack', label: 'Building end-to-end products: from database tables all the way to client UI', icon: Layers, badge: 'End-to-End' },
        { id: 'devops', role: 'devops', label: 'Automating cloud infrastructure, Docker/Kubernetes, and CI/CD deployment pipelines', icon: Cloud, badge: 'Cloud & Scale' },
        { id: 'data-ai', role: 'data-ai', label: 'Analyzing datasets, deploying machine learning models, vector databases & LLMs', icon: Cpu, badge: 'AI & Data' },
        { id: 'cybersecurity', role: 'cybersecurity', label: 'Defending cloud networks, performing vulnerability scans & cryptographic audits', icon: Shield, badge: 'Security' },
        { id: 'mobile', role: 'mobile', label: 'Developing native and cross-platform apps for iOS and Android smartphones', icon: Smartphone, badge: 'Mobile Apps' },
      ]
    },
    {
      step: 2,
      title: "Which daily developer environment sounds most appealing to you?",
      subtitle: "Choose the workspace toolchain where you'd love spending hours coding.",
      options: [
        { id: 'frontend', role: 'frontend', label: 'Chrome DevTools, CSS layout visualizers, component inspectors & Vite preview', icon: Layout, badge: 'Browser Engine' },
        { id: 'backend', role: 'backend', label: 'PostgreSQL CLI, Postman REST testing suites, Redis CLI & server terminal logs', icon: Server, badge: 'Database & REST' },
        { id: 'fullstack', role: 'fullstack', label: 'Integrated full-stack IDE: React frontend + Express/Node server + Prisma ORM', icon: Layers, badge: 'Full Spectrum' },
        { id: 'devops', role: 'devops', label: 'AWS/GCP Cloud Console, Terraform HCL, Kubernetes kubectl & Linux Bash terminal', icon: Cloud, badge: 'Infra As Code' },
        { id: 'data-ai', role: 'data-ai', label: 'Jupyter Notebooks, Python Pandas, PyTorch tensors & LangChain embedding pipelines', icon: Cpu, badge: 'Data Science' },
        { id: 'cybersecurity', role: 'cybersecurity', label: 'Wireshark packet analyzers, OWASP security scanners & Linux root terminals', icon: Shield, badge: 'Security Lab' },
        { id: 'mobile', role: 'mobile', label: 'Xcode / Android Studio simulators with live touch gestures and device hardware', icon: Smartphone, badge: 'Simulators' },
      ]
    },
    {
      step: 3,
      title: "What is your primary career outcome or ultimate motivation?",
      subtitle: "What impact do you want your code to deliver in production?",
      options: [
        { id: 'frontend', role: 'frontend', label: 'I want users to love every pixel, interaction, and visual detail of what I build.', icon: Layout, badge: 'User Delight' },
        { id: 'backend', role: 'backend', label: 'I want to architect rock-solid systems that handle millions of requests without failing.', icon: Server, badge: 'Reliability' },
        { id: 'fullstack', role: 'fullstack', label: 'I want the total creative freedom to take any idea from zero to a live launched product.', icon: Layers, badge: 'Independence' },
        { id: 'devops', role: 'devops', label: 'I want zero-downtime automated releases where code flows effortlessly to production.', icon: Cloud, badge: 'Velocity' },
        { id: 'data-ai', role: 'data-ai', label: 'I want to build intelligent systems and autonomous agents powered by modern AI.', icon: Cpu, badge: 'Intelligence' },
        { id: 'cybersecurity', role: 'cybersecurity', label: 'I want to protect critical digital infrastructure and safeguard sensitive user data.', icon: Shield, badge: 'Protection' },
        { id: 'mobile', role: 'mobile', label: 'I want millions of people carrying and using my applications directly in their pockets.', icon: Smartphone, badge: 'Ubiquity' },
      ]
    }
  ];

  const currentQ = questions.find(q => q.step === currentStep);

  const handleSelectOption = (roleId) => {
    let newAnswers = { ...answers };
    if (currentStep === 1) newAnswers.problemDomain = roleId;
    if (currentStep === 2) newAnswers.toolingPreference = roleId;
    if (currentStep === 3) newAnswers.coreMotivation = roleId;
    setAnswers(newAnswers);

    if (currentStep < 3) {
      setCurrentStep(s => s + 1);
    } else {
      runDiagnosis(newAnswers);
    }
  };

  const runDiagnosis = (finalAnswers) => {
    setIsComputing(true);

    setTimeout(() => {
      // Calculate role scores based on selections
      const scoreMap = {
        backend: 35,
        frontend: 35,
        fullstack: 40,
        devops: 30,
        'data-ai': 30,
        cybersecurity: 30,
        mobile: 30
      };

      if (finalAnswers.problemDomain) scoreMap[finalAnswers.problemDomain] += 25;
      if (finalAnswers.toolingPreference) scoreMap[finalAnswers.toolingPreference] += 20;
      if (finalAnswers.coreMotivation) scoreMap[finalAnswers.coreMotivation] += 20;

      // Find top role
      let topRoleId = 'fullstack';
      let maxScore = 0;
      Object.keys(scoreMap).forEach(roleKey => {
        if (scoreMap[roleKey] > maxScore) {
          maxScore = scoreMap[roleKey];
          topRoleId = roleKey;
        }
      });

      const topRoleObj = ROLES_LIST.find(r => r.id === topRoleId) || ROLES_LIST[0];

      setComputedResult({
        roleId: topRoleId,
        roleTitle: topRoleObj.title,
        roleObj: topRoleObj,
        matchScore: Math.min(98, maxScore),
        scoreBreakdown: scoreMap
      });

      setIsComputing(false);
      setCurrentStep(4);
    }, 1200);
  };

  const handleApplyDiagnosis = () => {
    if (computedResult) {
      onSelectRole(computedResult.roleId);
      onClose();
    }
  };

  const resetDiagnostic = () => {
    setCurrentStep(1);
    setAnswers({
      problemDomain: null,
      toolingPreference: null,
      coreMotivation: null,
      experienceBaseline: 'Intermediate'
    });
    setComputedResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/92 backdrop-blur-2xl animate-fadeIn">
      
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-[#09090f] border-2 border-white/[0.25] rounded-3xl shadow-[0_0_100px_rgba(255,255,255,0.25)] overflow-hidden flex flex-col max-h-[92vh] transition-all">
        
        {/* Top glowing accent flow line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

        {/* 1. Header */}
        <div className="px-5 sm:px-7 py-3.5 border-b border-white/[0.12] bg-white/[0.02] flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="mono-tag text-[10px] font-bold text-white border-white/30 bg-white/[0.1] px-2 py-0.5 tracking-wider">
                ✦ CAREER FIT DIAGNOSTIC
              </span>
              <span className="text-[11px] font-mono text-white/60 font-medium uppercase tracking-wider">
                {currentStep <= 3 ? `QUESTION ${currentStep} OF 3` : 'DIAGNOSIS COMPLETE'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
              {currentStep <= 3 ? 'Diagnose Your Ideal Career Track' : 'Your Recommended Specialization'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.16] border border-white/[0.15] flex items-center justify-center text-white transition-all hover:scale-105 shrink-0 cursor-pointer"
            title="Close diagnostic"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar for steps 1-3 */}
        {currentStep <= 3 && (
          <div className="w-full bg-white/[0.08] h-1">
            <div 
              className="bg-white h-full transition-all duration-500 shadow-[0_0_8px_#ffffff]"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        )}

        {/* 2. Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 custom-scrollbar space-y-5">

          {/* QUESTIONS 1 - 3 */}
          {currentStep <= 3 && currentQ && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  {currentQ.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-body">
                  {currentQ.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {currentQ.options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = (
                    (currentStep === 1 && answers.problemDomain === opt.role) ||
                    (currentStep === 2 && answers.toolingPreference === opt.role) ||
                    (currentStep === 3 && answers.coreMotivation === opt.role)
                  );

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.role)}
                      className={`group p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/[0.12] hover:border-white/60 hover:bg-white/[0.08] text-white'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'bg-black text-white' : 'bg-white/[0.08] text-white border border-white/20'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`mono-tag text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-black/15 text-black border-black/30' : 'bg-white/[0.08] text-white/80 border-white/20'
                          }`}>
                            {opt.badge}
                          </span>
                          <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-black' : 'text-white/50'}`}>
                            {isSelected ? '✓ Selected' : 'Option →'}
                          </span>
                        </div>

                        <p className={`text-xs sm:text-sm font-display font-medium leading-snug ${
                          isSelected ? 'text-black' : 'text-white'
                        }`}>
                          {opt.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* COMPUTING OVERLAY */}
          {isComputing && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full border-3 border-white/20 border-t-white animate-spin shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                  Analyzing Aptitude Vectors...
                </h3>
                <p className="text-xs text-white/70 font-mono">
                  Synthesizing problem domain, tooling preferences, and production outcomes.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: DIAGNOSTIC RESULT SCREEN */}
          {currentStep === 4 && computedResult && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Highlight Recommendation Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white/[0.14] to-white/[0.04] border border-white text-white shadow-[0_0_35px_rgba(255,255,255,0.25)] ring-2 ring-white/30 flex flex-col md:flex-row md:items-center justify-between gap-5">
                
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                    <Sparkles className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="mono-tag text-[10px] font-extrabold text-black bg-white px-2 py-0.5 border-white shadow-sm">
                        TOP COMPATIBILITY MATCH
                      </span>
                      <span className="text-xs font-mono text-white font-bold">
                        {computedResult.matchScore}% MATCH
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
                      {computedResult.roleTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/80 font-body max-w-xl leading-relaxed">
                      {computedResult.roleObj.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs font-mono text-white/80">
                      <span className="bg-white/[0.08] px-2.5 py-0.5 rounded-md border border-white/20">
                        {computedResult.roleObj.estTime}
                      </span>
                      <span className="bg-white/[0.08] px-2.5 py-0.5 rounded-md border border-white/20">
                        {computedResult.roleObj.requiredSkillsCount} Core Milestones
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={handleApplyDiagnosis}
                    className="btn-primary text-xs sm:text-sm py-2.5 px-5 font-display font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply Specialization →</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <button
                    onClick={resetDiagnostic}
                    className="btn-secondary text-xs py-2 px-4 font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Diagnosis</span>
                  </button>
                </div>

              </div>

              {/* Other Compatibility Matches */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono text-white/70 font-bold uppercase tracking-wider">
                  Complete Compatibility Breakdown Across All Tracks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {ROLES_LIST.map((r) => {
                    const isTop = r.id === computedResult.roleId;
                    const score = computedResult.scoreBreakdown[r.id] || 40;
                    return (
                      <div
                        key={r.id}
                        onClick={() => {
                          onSelectRole(r.id);
                          onClose();
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isTop 
                            ? 'bg-white/[0.12] border-white text-white font-bold' 
                            : 'bg-white/[0.03] border-white/[0.1] hover:border-white/50 hover:bg-white/[0.06] text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-display font-bold">{r.title}</span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded border border-white/15">
                          {score}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 3. Footer */}
        {currentStep <= 3 && (
          <div className="px-5 sm:px-7 py-3 border-t border-white/[0.1] bg-white/[0.02] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(s => s - 1)}
                className="btn-secondary text-xs py-2 px-4 font-display flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <span className="text-[11px] font-mono text-white/50">
                Click any option to proceed
              </span>
            )}

            <button
              onClick={onClose}
              className="text-xs font-mono text-white/60 hover:text-white underline cursor-pointer"
            >
              Skip diagnostic & pick manually
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
