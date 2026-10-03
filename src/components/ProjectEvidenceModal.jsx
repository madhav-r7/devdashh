import React from 'react';
import { 
  X, 
  Award, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Layers,
  Code2,
  ExternalLink
} from 'lucide-react';
import { FEATURED_PROJECT_WORKSPACE } from '../data/mockData';

export default function ProjectEvidenceModal({ isOpen, onClose, project = FEATURED_PROJECT_WORKSPACE, onCommitToPassport, setView }) {
  if (!isOpen) return null;

  const report = project.evidenceReport || FEATURED_PROJECT_WORKSPACE.evidenceReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-[#0a0a0d] border border-white/[0.14] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.12] flex items-center justify-between bg-white/[0.04]">
          <div>
            <div className="flex items-center gap-2">
              <span className="mono-tag text-[9px] font-bold text-white border-white/30 bg-white/[0.1]">
                {report.assessmentType}
              </span>
              <span className="text-[10px] font-mono text-white uppercase tracking-wider font-semibold">
                AST EVALUATION
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mt-0.5">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
          
          <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.14] text-xs text-white leading-relaxed font-body">
            <strong className="text-white font-display font-bold">Analysis Summary:</strong> {report.assessmentSubtitle}
          </div>

          {/* 1. SKILLS DEMONSTRATED */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white font-semibold">
              <span>Skills Demonstrated</span>
              <span className="text-white font-bold">5 Skills Detected</span>
            </div>

            <div className="space-y-2">
              {report.skillsDemonstrated.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.12] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white font-display">{item.name}</span>
                      <span className="mono-tag text-[9px] text-white border-white/20 bg-white/[0.08]">
                        {item.confidence} CONFIDENCE
                      </span>
                    </div>
                    <span className="font-mono font-bold text-white text-xs">{item.score}%</span>
                  </div>

                  <div className="w-full bg-white/[0.1] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-white h-full rounded-full shadow-[0_0_8px_#ffffff]"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-white/90 leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MISSING EVIDENCE */}
          <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.14] space-y-2">
            <div className="text-[10px] font-mono text-white font-bold uppercase tracking-wider">
              Identified Knowledge Gaps
            </div>

            <ul className="space-y-1.5 text-xs text-white/90 font-body">
              {report.missingEvidence.map((gap, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-white font-mono font-bold">→</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. RECOMMENDED NEXT PROJECT */}
          {report.recommendedNextProject && (
            <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.14] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-white">
                <span className="text-white font-bold uppercase tracking-wider">RECOMMENDED NEXT BUILD</span>
                <span className="text-white/80 font-medium">{report.recommendedNextProject.hours}</span>
              </div>

              <div className="text-sm font-bold text-white font-display">
                {report.recommendedNextProject.title}
              </div>

              <p className="text-xs text-white/90 font-body">
                {report.recommendedNextProject.reason}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.12] bg-white/[0.04] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              setView('evidence');
            }}
            className="btn-secondary text-xs font-display"
          >
            <span>Evidence Graph →</span>
          </button>

          <button
            onClick={() => {
              onCommitToPassport();
              onClose();
              setView('passport');
            }}
            className="btn-primary text-xs font-display"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commit to Passport</span>
          </button>
        </div>

      </div>
    </div>
  );
}
