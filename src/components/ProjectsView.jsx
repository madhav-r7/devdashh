import React, { useState } from 'react';
import { 
  FolderKanban, 
  Code2, 
  Clock, 
  ArrowRight, 
  Globe, 
  Check, 
  Send
} from 'lucide-react';
import { ALL_PROJECTS, FEATURED_PROJECT_WORKSPACE } from '../data/mockData';

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectsView({ 
  onViewEvidence, 
  onOpenDiagnosticQuiz,
  activeProjectId = 'url-shortener'
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(activeProjectId);
  const [checklist, setChecklist] = useState(FEATURED_PROJECT_WORKSPACE.checklist);
  const [githubUrl, setGithubUrl] = useState(FEATURED_PROJECT_WORKSPACE.submissionState.githubRepo);
  const [demoUrl, setDemoUrl] = useState(FEATURED_PROJECT_WORKSPACE.submissionState.liveDemo);
  const [notes, setNotes] = useState(FEATURED_PROJECT_WORKSPACE.submissionState.notes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeProject = ALL_PROJECTS.find(p => p.id === selectedProjectId) || FEATURED_PROJECT_WORKSPACE;

  const toggleChecklistItem = (id) => {
    setChecklist(prev => {
      return prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    });
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const checklistProgress = Math.round((completedCount / checklist.length) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onViewEvidence(activeProject);
    }, 1200);
  };

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* 1. PROJECTS HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            Production Projects Workspace
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mt-2 font-display">
            Build production architectures, verify test suites, and extract evidence.
          </p>
        </div>

        {/* Project Selector Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {ALL_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-mono shrink-0 transition-all border ${
                selectedProjectId === proj.id
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-white/[0.05] text-white/80 border-white/[0.16] hover:text-white hover:bg-white/[0.12] hover:border-white/30'
              }`}
            >
              BUILD #0{idx + 1} · {proj.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. PROJECT HERO CARD */}
      <div className="mono-card p-8 sm:p-10 border-white/[0.18] shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="mono-tag text-xs font-bold text-white border-white/30 bg-white/[0.1]">
                BUILD #04
              </span>
              <span className="text-sm font-mono text-white flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-white" /> {activeProject.estimatedTime || activeProject.timeEst}
              </span>
              <span className="mono-tag text-xs text-white border-white/30 bg-white/[0.1]">
                {activeProject.difficulty}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              {activeProject.title.toUpperCase()}
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed font-body">
              {activeProject.description || activeProject.desc}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['REST', 'DATABASE', 'AUTH', 'RATE LIMITING'].map((tag, tIdx) => (
                <span key={tIdx} className="mono-tag text-xs text-white border-white/20 bg-white/[0.08]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Card Metric */}
          <div className="p-6 rounded-2xl bg-white/[0.08] border border-white/[0.2] shrink-0 text-center min-w-[170px] shadow-sm">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">PROJECT PROGRESS</div>
            <div className="text-4xl font-black text-white font-mono mt-1">
              {selectedProjectId === 'url-shortener' ? checklistProgress : activeProject.progress}%
            </div>
            <div className="text-xs text-white font-mono mt-1 font-semibold">
              {completedCount}/{checklist.length} Criteria Met
            </div>
          </div>
        </div>

        {/* 3. WORKSPACE: CHECKLIST & SUBMISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* LEFT 7 COLS: REQUIREMENTS & STACK */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Acceptance Criteria Checklist */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-mono">
                <h3 className="font-bold text-white text-lg uppercase tracking-wider font-display">
                  Acceptance Criteria
                </h3>
                <span className="text-white/80">
                  Click to check criteria
                </span>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      item.completed 
                        ? 'bg-white/[0.12] border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                        : 'bg-white/[0.04] border-white/[0.14] hover:border-white/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      item.completed 
                        ? 'bg-white border-white text-black font-bold shadow-[0_0_12px_#ffffff]' 
                        : 'border-white/40 bg-transparent text-white'
                    }`}>
                      {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-bold font-display text-white">
                        {item.title}
                      </div>
                      <p className="text-sm text-white/90 mt-1 leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Stack */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg uppercase tracking-wider font-display">
                Recommended Technology Stack
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                {FEATURED_PROJECT_WORKSPACE.suggestedStack.map((stack, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.14] flex items-center justify-between hover:border-white/30 transition-all">
                    <span className="font-bold text-white text-base font-display">{stack.name}</span>
                    <span className="text-white/80 font-mono text-xs font-medium">{stack.role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: SUBMISSION & EVIDENCE */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="mono-card p-7 sm:p-8 border-white/[0.18] space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.12]">
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
                  Project Submission
                </h3>
                <span className="mono-tag text-xs text-white border-white/30 bg-white/[0.1]">
                  EVALUATION READY
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-mono text-white mb-2 uppercase tracking-wider font-semibold">
                    GitHub Repository URL
                  </label>
                  <div className="relative">
                    <GithubIcon className="w-5 h-5 text-white/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/project"
                      required
                      className="w-full bg-black/50 border border-white/[0.2] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white mb-2 uppercase tracking-wider font-semibold">
                    Live Demo / API Endpoint
                  </label>
                  <div className="relative">
                    <Globe className="w-5 h-5 text-white/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://api.yourdomain.com"
                      className="w-full bg-black/50 border border-white/[0.2] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white mb-2 uppercase tracking-wider font-semibold">
                    Architecture Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/50 border border-white/[0.2] rounded-xl p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white resize-none font-mono leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-base py-4 font-display"
                >
                  {isSubmitting ? (
                    <span>Analyzing AST & Running Test Suite...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project & Generate Evidence →</span>
                    </>
                  )}
                </button>

              </form>

              <button
                type="button"
                onClick={() => onViewEvidence(activeProject)}
                className="btn-secondary w-full text-sm py-3 font-display"
              >
                <span>Inspect Existing Evidence Report</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
