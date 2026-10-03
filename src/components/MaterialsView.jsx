import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Video, 
  BookOpen, 
  ExternalLink, 
  Check, 
  Bookmark, 
  Clock, 
  Star, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Code2, 
  TrendingUp, 
  Compass, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { LEARNING_MATERIALS } from '../data/mockData';

export default function MaterialsView({
  learningMaterials = LEARNING_MATERIALS,
  onOpenMaterial,
  bookmarkedIds = [],
  completedIds = [],
  onToggleBookmark,
  onToggleCompleted,
  userState,
  setView
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'technical' | 'side-hustle' | 'soft-skills'
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'youtube' | 'doc'
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'saved' | 'completed'

  const filteredMaterials = learningMaterials.filter((item) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchCreator = item.creator?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchTopics = item.topics?.some(t => t.toLowerCase().includes(q));
      const matchSkill = item.skillId?.toLowerCase().includes(q);
      if (!matchTitle && !matchCreator && !matchDesc && !matchTopics && !matchSkill) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && item.type !== selectedType) {
      return false;
    }

    // Status filter
    if (selectedStatus === 'saved' && !bookmarkedIds.includes(item.id)) {
      return false;
    }
    if (selectedStatus === 'completed' && !completedIds.includes(item.id)) {
      return false;
    }

    return true;
  });

  const totalCount = learningMaterials.length;
  const youtubeCount = learningMaterials.filter(m => m.type === 'youtube').length;
  const completedCount = completedIds.length;
  const savedCount = bookmarkedIds.length;

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn text-white">
      
      {/* 1. TOP HEADER & STATS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-tag text-xs bg-white text-black font-bold border-white">
              REFERENCE & STUDY ENGINE
            </span>
            <span className="text-xs font-mono text-white/70">
              Curated Video Masterclasses & Official Docs
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            Learning Materials & Video Hub
          </h1>
          <p className="text-white/85 text-lg sm:text-xl mt-2 font-display">
            Deep-dive YouTube tutorials, architectural RFCs, and documentation mapped directly to your milestones.
          </p>
        </div>

        {/* Quick System Stats */}
        <div className="flex items-center gap-3">
          <div className="mono-card p-4 text-center min-w-[110px] border-white/[0.18]">
            <div className="text-[11px] font-mono text-white/70 uppercase">VIDEOS</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">{youtubeCount}</div>
          </div>
          <div className="mono-card p-4 text-center min-w-[110px] border-white/[0.18]">
            <div className="text-[11px] font-mono text-white/70 uppercase">STUDIED</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">{completedCount}</div>
          </div>
          <div className="mono-card p-4 text-center min-w-[110px] border-white/[0.18]">
            <div className="text-[11px] font-mono text-white/70 uppercase">SAVED</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">{savedCount}</div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search YouTube videos, topics, creators (ByteByteGo, Fireship, Traversy, Hussein Nasser, Gergely...)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.2] text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm sm:text-base font-body"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/60 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category & Format Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'technical', label: 'Developer OS (Tech)' },
              { id: 'side-hustle', label: 'Side Hustle OS' },
              { id: 'soft-skills', label: 'Leadership OS' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id 
                    ? 'bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : 'bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.1] border border-white/[0.1]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Formats & Status */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedType(selectedType === 'youtube' ? 'all' : 'youtube')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedType === 'youtube'
                  ? 'bg-white text-black border border-white shadow-sm'
                  : 'bg-white/[0.04] text-white/80 hover:text-white border border-white/[0.1]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>YouTube Only</span>
            </button>

            <button
              onClick={() => setSelectedStatus(selectedStatus === 'saved' ? 'all' : 'saved')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'saved'
                  ? 'bg-white text-black border border-white shadow-sm'
                  : 'bg-white/[0.04] text-white/80 hover:text-white border border-white/[0.1]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedCount})</span>
            </button>

            <button
              onClick={() => setSelectedStatus(selectedStatus === 'completed' ? 'all' : 'completed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'completed'
                  ? 'bg-white text-black border border-white shadow-sm'
                  : 'bg-white/[0.04] text-white/80 hover:text-white border border-white/[0.1]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Studied ({completedCount})</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. MATERIALS GRID */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => {
            const isBookmarked = bookmarkedIds.includes(mat.id);
            const isCompleted = completedIds.includes(mat.id);

            return (
              <div
                key={mat.id}
                className="mono-card p-6 border-white/[0.18] hover:border-white hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between group rounded-3xl"
              >
                <div>
                  {/* Thumbnail & Video Preview Trigger */}
                  <div 
                    onClick={() => onOpenMaterial && onOpenMaterial(mat)}
                    className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-cover bg-center cursor-pointer border border-white/15 group-hover:border-white/40 transition-all shadow-md"
                    style={{ backgroundImage: `url(${mat.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    
                    {/* Floating Duration & Type Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="mono-tag text-[10px] font-mono bg-black/80 text-white border-white/30 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1">
                        {mat.type === 'youtube' ? <Video className="w-3 h-3 text-white" /> : <BookOpen className="w-3 h-3 text-white" />}
                        {mat.type === 'youtube' ? 'Video' : 'Doc'}
                      </span>
                      <span className="mono-tag text-[10px] font-mono bg-black/80 text-white border-white/30 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {mat.duration}
                      </span>
                    </div>

                    {/* Play Button Center Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.7)] group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Verified Creator Pill bottom right */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white">
                      {mat.creator}
                    </div>
                  </div>

                  {/* Title & Creator */}
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-1.5 font-semibold">
                    <span className="uppercase">{mat.category.replace('-', ' ')}</span>
                    <span>{mat.difficulty}</span>
                  </div>

                  <h3 
                    onClick={() => onOpenMaterial && onOpenMaterial(mat)}
                    className="text-xl font-bold font-display text-white group-hover:text-white leading-snug cursor-pointer line-clamp-2"
                  >
                    {mat.title}
                  </h3>

                  <p className="text-xs text-white/80 mt-2 line-clamp-2 leading-relaxed font-body">
                    {mat.description}
                  </p>

                  {/* Topics List */}
                  {mat.topics && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {mat.topics.slice(0, 3).map((t, tidx) => (
                        <span 
                          key={tidx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-white/85 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-white/[0.1] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenMaterial && onOpenMaterial(mat)}
                    className="btn-primary flex-1 py-2 px-3 text-xs font-display flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reference</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark && onToggleBookmark(mat.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.06] text-white hover:bg-white/[0.14] border-white/15'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Material'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => onToggleCompleted && onToggleCompleted(mat.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.06] text-white hover:bg-white/[0.14] border-white/15'
                    }`}
                    title={isCompleted ? 'Mark as Unwatched' : 'Mark as Watched'}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="mono-card p-12 text-center space-y-3 rounded-3xl">
          <Video className="w-10 h-10 text-white/50 mx-auto" />
          <h3 className="text-xl font-bold font-display text-white">No matching materials found</h3>
          <p className="text-sm text-white/70 max-w-md mx-auto font-body">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
              setSelectedStatus('all');
            }}
            className="btn-secondary text-xs px-4 py-2 mt-2 font-display"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. RECOMMENDATION BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.14] to-white/[0.08] border-2 border-white/[0.3] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_20px_#ffffff]">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Need practical milestones for these videos?
            </h3>
            <p className="text-sm text-white/85 font-body mt-1">
              Connect every video tutorial directly to hands-on project builds with automated AST code verification.
            </p>
          </div>
        </div>

        <button
          onClick={() => setView('roadmap')}
          className="btn-primary text-sm py-3 px-6 font-display font-bold shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Jump to Active Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
