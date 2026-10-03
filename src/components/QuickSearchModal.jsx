import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Briefcase, 
  Compass, 
  Layers, 
  Cpu, 
  Check, 
  Terminal,
  MessageSquare,
  Shield,
  Zap,
  Users,
  Video,
  Globe,
  Box,
  GraduationCap,
  Rocket
} from 'lucide-react';
import { ROLES_LIST, SIDE_HUSTLE_PATHS, SOFT_SKILLS_PATHS, LEARNING_MATERIALS } from '../data/mockData';

export default function QuickSearchModal({ 
  isOpen, 
  onClose, 
  onSelectCategory, 
  onSelectPath,
  onOpenMaterial,
  setView
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flattened searchable items
  const allItems = [
    // Technical Roles
    ...ROLES_LIST.map(r => ({
      id: r.id,
      title: r.title,
      category: 'technical',
      categoryLabel: 'Technical Track',
      icon: Code,
      badge: r.badge,
      desc: r.description,
      skills: r.skills || []
    })),
    // Side Hustle
    ...SIDE_HUSTLE_PATHS.map(s => ({
      id: s.id,
      title: s.title,
      category: 'side-hustle',
      categoryLabel: 'Side Hustle Track',
      icon: Briefcase,
      badge: s.badge,
      desc: s.description,
      skills: s.skills || []
    })),
    // Soft Skills
    ...SOFT_SKILLS_PATHS.map(k => ({
      id: k.id,
      title: k.title,
      category: 'soft-skills',
      categoryLabel: 'Leadership Track',
      icon: Compass,
      badge: k.badge,
      desc: k.description,
      skills: k.skills || []
    })),
    // Learning Materials & Videos
    ...LEARNING_MATERIALS.map(m => ({
      id: m.id,
      isMaterial: true,
      rawMaterial: m,
      title: m.title,
      category: m.category,
      categoryLabel: m.type === 'youtube' ? 'YouTube Masterclass' : 'Curated Doc',
      icon: Video,
      badge: m.duration,
      desc: `${m.creator} · ${m.description}`,
      skills: m.topics || []
    })),
    // Community Q&A & Doubts
    {
      id: 'community-hub',
      isCommunity: true,
      title: 'Community Doubts & Solutions Hub',
      category: 'technical',
      categoryLabel: 'Community Live Q&A',
      icon: MessageSquare,
      badge: 'Live Q&A',
      desc: 'Ask doubts, solve engineering blockers, share code snippets, like and discuss.',
      skills: ['doubts', 'questions', 'answers', 'community', 'solutions', 'ask']
    }
  ];

  const filtered = query.trim() === '' 
    ? allItems.slice(0, 8) 
    : allItems.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.skills.some(sk => sk.toLowerCase().includes(q))
        );
      });

  const handleItemClick = (item) => {
    if (item.isCommunity) {
      if (setView) {
        setView('community');
      }
      onClose();
      return;
    }

    if (item.isMaterial) {
      if (onOpenMaterial) {
        onOpenMaterial(item.rawMaterial);
      } else if (setView) {
        setView('materials');
      }
      onClose();
      return;
    }

    onSelectCategory(item.category);
    if (onSelectPath) {
      onSelectPath(item.id, item.category);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#09090b] border-2 border-white/30 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.15)] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.14] bg-white/[0.03]">
          <Search className="w-5 h-5 text-white/70 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Technical, Side Hustles, or Soft Skills (e.g., Full Stack, Freelancing, Leadership)..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-base font-display focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-white/50 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 rounded bg-white/[0.08] text-white/70 hover:text-white border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-black/50 border-b border-white/[0.08] overflow-x-auto">
          <span className="text-[11px] font-mono text-white/50 uppercase mr-1">Quick Jump:</span>
          <button
            onClick={() => { onSelectCategory('technical'); onClose(); }}
            className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white/80 transition-all border border-white/10"
          >
            💻 Technical
          </button>
          <button
            onClick={() => { onSelectCategory('side-hustle'); onClose(); }}
            className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white/80 transition-all border border-white/10"
          >
            💼 Side Hustle
          </button>
          <button
            onClick={() => { onSelectCategory('soft-skills'); onClose(); }}
            className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white/80 transition-all border border-white/10"
          >
            🧠 Soft Skills
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-white/60 font-body text-sm">No roadmap paths matching "{query}"</p>
              <p className="text-white/40 font-mono text-xs mt-1">Try searching for "Backend", "Pricing", "Public Speaking", or "MVP"</p>
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/[0.1] border border-transparent hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-white text-base">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.08] text-white/70 border border-white/10">
                          {item.categoryLabel}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 font-body mt-1 line-clamp-1">
                        {item.desc}
                      </p>
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.skills.slice(0, 4).map((sk, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-white/60">
                              {sk}
                            </span>
                          ))}
                          {item.skills.length > 4 && (
                            <span className="text-[10px] font-mono text-white/40 px-1">
                              +{item.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-3">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/[0.1] bg-black/60 flex items-center justify-between text-xs font-mono text-white/50">
          <span>DEVPATH FAST INDEXER</span>
          <span className="flex items-center gap-2">
            <span>Select to Switch Category</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↵ ENTER</kbd>
          </span>
        </div>

      </div>
    </div>
  );
}
