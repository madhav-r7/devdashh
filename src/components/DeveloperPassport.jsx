import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Share2, 
  Check, 
  Copy, 
  ChevronRight, 
  Code2
} from 'lucide-react';
import { DEVELOPER_PASSPORT_DATA } from '../data/mockData';

export default function DeveloperPassport({ 
  userState, 
  setView, 
  onSelectSkillForEvidence,
  onOpenShareModal 
}) {
  const passport = DEVELOPER_PASSPORT_DATA;
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* 1. TOP HEADER & PASSPORT IDENTITY PANEL */}
      <div className="mono-card p-8 sm:p-12 border-white/[0.18] shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* User ID & Avatar */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.12] border border-white/[0.3] flex items-center justify-center text-3xl font-bold text-white font-mono shadow-[0_0_30px_rgba(255,255,255,0.25)]">
              {userState?.name ? userState.name.charAt(0).toUpperCase() : 'M'}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3.5">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
                  {userState?.name || passport.name}
                </h1>
                <span className="mono-tag text-xs font-bold text-white border-white/30 bg-white/[0.1]">
                  {userState?.handle ? `@${userState.handle.replace('@','')}` : passport.badgeId}
                </span>
              </div>

              <div className="text-base sm:text-lg font-semibold text-white font-display">
                {userState?.targetRoleTitle || passport.role} <span className="text-white/80">· {userState?.experienceLevel || passport.level}</span>
              </div>

              <div className="text-xs font-mono text-white/90 flex items-center gap-2 pt-1 font-medium">
                {userState?.email && <span>{userState.email}</span>}
                {userState?.email && <span>•</span>}
                <span>Verified: {passport.verificationDate}</span>
                <span>•</span>
                <span className="text-white font-bold">Continuous Audit Active</span>
              </div>
            </div>
          </div>

          {/* Overall Progress & Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-5 shrink-0">
            <div className="p-5 rounded-2xl bg-white/[0.08] border border-white/[0.2] text-center min-w-[170px] shadow-sm">
              <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">PASSPORT SCORE</div>
              <div className="text-4xl font-black text-white font-mono mt-1">
                {passport.overallProgress}%
              </div>
              <div className="text-xs text-white font-mono mt-1 font-medium">3 Projects · 5 Quizzes</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenShareModal}
                className="btn-primary text-sm py-3 px-5 font-display"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Passport</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="btn-secondary text-sm p-3"
                title="Copy public link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. EVIDENCE-BACKED COMPETENCIES SECTION */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Demonstrated Engineering Skills
          </h2>
          <p className="text-base text-white/90 mt-1 font-body">
            Every score is backed by real code repositories, test runs, and diagnostic assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {passport.skills.map((skill, idx) => (
            <div
              key={idx}
              className="mono-card p-6 flex flex-col justify-between space-y-4 border-white/[0.16]"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-bold text-white text-base sm:text-lg uppercase tracking-wider font-display">
                    {skill.name}
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{skill.score}%</span>
                </div>

                {/* Score bar */}
                <div className="w-full bg-white/[0.12] rounded-full h-2 overflow-hidden mb-4">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#ffffff]"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>

                {/* Proof Counter */}
                <div className="p-3 rounded-xl bg-white/[0.06] border border-white/[0.14] text-xs font-mono text-white flex items-center justify-between font-medium">
                  <span>{skill.evidence.projects} Projects</span>
                  <span>•</span>
                  <span>{skill.evidence.assessments} Quizzes</span>
                  <span>•</span>
                  <span>{skill.evidence.exercises} Exercises</span>
                </div>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="mono-tag text-[10px] text-white border-white/20 bg-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Evidence Action */}
              <button
                onClick={() => {
                  onSelectSkillForEvidence(skill.name);
                  setView('evidence');
                }}
                className="pt-4 border-t border-white/[0.1] text-xs font-mono text-white hover:underline flex items-center justify-between font-semibold group"
              >
                <span>View Evidence Tree</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VERIFIED PROJECT ARTIFACTS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Verified Project Artifacts
            </h2>
          </div>
          <button
            onClick={() => setView('projects')}
            className="text-sm text-white hover:underline font-mono font-semibold"
          >
            Projects Hub →
          </button>
        </div>

        <div className="space-y-4">
          {passport.verifiedProjects.map((proj, idx) => (
            <div
              key={idx}
              className="mono-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 border-white/[0.16]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3.5">
                  <span className="font-bold text-white text-lg sm:text-xl font-display">{proj.title}</span>
                  <span className="mono-tag text-xs text-white border-white/30 bg-white/[0.1]">
                    {proj.completedDate}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white/90 font-mono">
                  {proj.verifiedMetrics}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {proj.skills.map((s, sIdx) => (
                    <span key={sIdx} className="mono-tag text-xs text-white border-white/20 bg-white/[0.08]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => setView('projects')}
                  className="btn-secondary text-sm py-2.5 px-5 font-display"
                >
                  <Code2 className="w-4 h-4 text-white" />
                  <span>Inspect Code Specs</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
