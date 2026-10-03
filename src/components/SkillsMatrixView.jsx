import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  ShieldCheck,
  Video,
  BookOpen
} from 'lucide-react';
import { ALL_SKILLS, LEARNING_MATERIALS } from '../data/mockData';

export default function SkillsMatrixView({ 
  userState, 
  onOpenDiagnosticQuiz, 
  onToggleKnownSkill,
  onOpenMaterial,
  setView
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Foundations', 'Core', 'Backend', 'Frontend', 'Production', 'DevOps', 'Languages'];

  const filteredSkills = ALL_SKILLS.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleOpenSkillMaterial = (skillId) => {
    const matched = LEARNING_MATERIALS.find(m => m.skillId === skillId);
    if (matched && onOpenMaterial) {
      onOpenMaterial(matched);
    } else if (setView) {
      setView('materials');
    }
  };

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn text-white">
      
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            Skills Matrix
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mt-2 font-display">
            Audit and test your competency across 22+ engineering frameworks with curated video references.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter skills (e.g. Docker, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/[0.18] rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white font-mono"
          />
        </div>
      </div>

      {/* 2. CATEGORY PILLS */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-mono transition-all shrink-0 border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black border-white font-bold shadow-md'
                : 'bg-white/[0.05] text-white/80 border-white/[0.16] hover:text-white hover:bg-white/[0.12] hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill) => {
          const isMastered = (userState?.knownSkills || []).includes(skill.id);
          const isFocus = userState?.currentFocusSkillId === skill.id;

          return (
            <div
              key={skill.id}
              className={`mono-card p-6 flex flex-col justify-between space-y-4 rounded-3xl ${
                isFocus
                  ? 'border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.2)]'
                  : 'border-white/[0.16]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    {skill.category} · {skill.diff}
                  </span>
                  
                  {isMastered ? (
                    <span className="text-xs font-mono text-white flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5 text-white" /> MASTERED
                    </span>
                  ) : isFocus ? (
                    <span className="mono-tag text-xs font-bold text-white border-white/40 bg-white/[0.12]">
                      IN FOCUS
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-white/80">
                      ~{skill.hours}h EST
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white font-display">
                  {skill.name}
                </h3>

                <p className="text-sm text-white/90 mt-2 leading-relaxed font-body">
                  {skill.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenDiagnosticQuiz(skill.id === 'sql' ? 'sql' : 'rest-api')}
                    className="text-xs text-white hover:underline flex items-center gap-1 font-mono font-semibold cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Audit</span>
                  </button>

                  <button
                    onClick={() => handleOpenSkillMaterial(skill.id)}
                    className="text-xs text-white hover:underline flex items-center gap-1 font-mono font-semibold cursor-pointer"
                    title="Watch YouTube tutorial & study reference"
                  >
                    <Video className="w-3.5 h-3.5 text-white" />
                    <span>Videos</span>
                  </button>
                </div>

                <button
                  onClick={() => onToggleKnownSkill(skill.id)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isMastered 
                      ? 'bg-white text-black font-bold border-white shadow-sm' 
                      : 'bg-white/[0.05] text-white border-white/[0.16] hover:bg-white/[0.15] hover:border-white/40'
                  }`}
                >
                  {isMastered ? 'Mastered ✓' : 'Mark Known'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

