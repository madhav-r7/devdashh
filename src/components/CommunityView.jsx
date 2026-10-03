import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Share2, 
  Search, 
  Plus, 
  Send, 
  Code2, 
  Check, 
  Copy, 
  Layers, 
  Briefcase, 
  Users, 
  Filter, 
  TrendingUp, 
  X,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  Activity,
  Radio
} from 'lucide-react';
import WaveformBackground from './WaveformBackground';
import { INITIAL_COMMUNITY_DOUBTS } from '../data/communityData';

export default function CommunityView({ 
  userState = {},
  setView,
  initialCategory = 'technical'
}) {
  const [doubts, setDoubts] = useState(INITIAL_COMMUNITY_DOUBTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'technical' | 'side-hustle' | 'soft-skills'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'open' | 'solved'
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'popular'
  
  // Expanded doubt discussion IDs
  const [expandedDoubtIds, setExpandedDoubtIds] = useState(['doubt-1']);
  
  // New Doubt Modal State
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newDoubtForm, setNewDoubtForm] = useState({
    title: '',
    category: 'technical',
    description: '',
    codeSnippet: '',
    tags: ''
  });

  // Inline Answer Input Map { [doubtId]: string }
  const [answerDrafts, setAnswerDrafts] = useState({});
  const [answerCodeDrafts, setAnswerCodeDrafts] = useState({});
  const [showCodeInputForDoubt, setShowCodeInputForDoubt] = useState({});

  // Filter and sort doubts
  const filteredDoubts = useMemo(() => {
    return doubts.filter(d => {
      const matchesSearch = !searchQuery.trim() || 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = filterCategory === 'all' || d.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || d.status === filterStatus;

      return matchesSearch && matchesCat && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likesCount + (b.answers?.length || 0) * 3) - (a.likesCount + (a.answers?.length || 0) * 3);
      }
      return 0; // Default order
    });
  }, [doubts, searchQuery, filterCategory, filterStatus, sortBy]);

  // Handle Like Doubt
  const handleToggleLikeDoubt = (doubtId) => {
    setDoubts(prev => prev.map(d => {
      if (d.id === doubtId) {
        const isLiked = !d.isLiked;
        return {
          ...d,
          isLiked,
          likesCount: isLiked ? d.likesCount + 1 : Math.max(0, d.likesCount - 1)
        };
      }
      return d;
    }));
  };

  // Handle Like Answer
  const handleToggleLikeAnswer = (doubtId, answerId) => {
    setDoubts(prev => prev.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answers: (d.answers || []).map(ans => {
            if (ans.id === answerId) {
              const isLiked = !ans.isLiked;
              return {
                ...ans,
                isLiked,
                likesCount: isLiked ? ans.likesCount + 1 : Math.max(0, ans.likesCount - 1)
              };
            }
            return ans;
          })
        };
      }
      return d;
    }));
  };

  // Toggle Discussion Expand
  const toggleExpandDoubt = (doubtId) => {
    setExpandedDoubtIds(prev => 
      prev.includes(doubtId) ? prev.filter(id => id !== doubtId) : [...prev, doubtId]
    );
  };

  // Handle Mark Answer as Accepted Solution
  const handleMarkAcceptedAnswer = (doubtId, answerId) => {
    setDoubts(prev => prev.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          status: 'solved',
          acceptedAnswerId: answerId,
          answers: (d.answers || []).map(ans => ({
            ...ans,
            isAccepted: ans.id === answerId
          }))
        };
      }
      return d;
    }));
  };

  // Handle Submit Answer
  const handlePostAnswer = (doubtId) => {
    const text = (answerDrafts[doubtId] || '').trim();
    const code = (answerCodeDrafts[doubtId] || '').trim();
    if (!text && !code) return;

    const newAnswer = {
      id: `ans-${Date.now()}`,
      author: {
        name: userState.name || 'Anonymous Developer',
        handle: userState.handle || '@developer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        roleBadge: userState.targetRoleTitle || 'Developer'
      },
      content: text,
      codeSnippet: code || null,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
      isAccepted: false
    };

    setDoubts(prev => prev.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answers: [...(d.answers || []), newAnswer]
        };
      }
      return d;
    }));

    setAnswerDrafts(prev => ({ ...prev, [doubtId]: '' }));
    setAnswerCodeDrafts(prev => ({ ...prev, [doubtId]: '' }));
    setShowCodeInputForDoubt(prev => ({ ...prev, [doubtId]: false }));

    if (!expandedDoubtIds.includes(doubtId)) {
      setExpandedDoubtIds(prev => [...prev, doubtId]);
    }
  };

  // Handle Submit New Doubt
  const handleSubmitNewDoubt = (e) => {
    e.preventDefault();
    if (!newDoubtForm.title.trim() || !newDoubtForm.description.trim()) return;

    const parsedTags = newDoubtForm.tags
      .split(/[,\s]+/)
      .map(t => t.replace(/^#/, '').trim())
      .filter(Boolean);

    const newDoubtItem = {
      id: `doubt-${Date.now()}`,
      author: {
        name: userState.name || 'Anonymous Developer',
        handle: userState.handle || '@developer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        roleBadge: userState.targetRoleTitle || 'Developer'
      },
      category: newDoubtForm.category,
      trackTitle: newDoubtForm.category === 'technical' ? 'Technical Track' : newDoubtForm.category === 'side-hustle' ? 'Side Hustle Track' : 'Soft Skills Track',
      title: newDoubtForm.title.trim(),
      description: newDoubtForm.description.trim(),
      codeSnippet: newDoubtForm.codeSnippet.trim() || null,
      tags: parsedTags.length > 0 ? parsedTags : ['general', 'discussion'],
      createdAt: 'Just now',
      likesCount: 1,
      isLiked: true,
      status: 'open',
      acceptedAnswerId: null,
      answers: []
    };

    setDoubts(prev => [newDoubtItem, ...prev]);
    setIsAskModalOpen(false);
    setNewDoubtForm({
      title: '',
      category: 'technical',
      description: '',
      codeSnippet: '',
      tags: ''
    });
    setExpandedDoubtIds(prev => [...prev, newDoubtItem.id]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 animate-fadeIn text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SOUNDWAVE BANNER & COMMUNITY HEADER                                */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl border-2 border-white/[0.22] bg-[#07070a] overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.15)]">
        
        {/* Dynamic Black & White Waveform Soundwave Graphic Background */}
        <div className="absolute inset-0 z-0 opacity-80 overflow-hidden flex items-center justify-center">
          <WaveformBackground height={220} barCount={80} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-black/40 to-transparent" />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.1] border border-white/25 text-xs font-mono text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="font-bold uppercase tracking-widest">LIVE DEVELOPER Q&A HUB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-none uppercase">
              Community Doubts & Solutions
            </h1>

            <p className="text-sm sm:text-base text-white/85 font-body max-w-2xl leading-relaxed">
              Ask technical questions, resolve architectural bottlenecks, solve peer doubts, and build verified developer karma.
            </p>
          </div>

          {/* Ask a Doubt Action Button */}
          <button
            onClick={() => setIsAskModalOpen(true)}
            className="btn-primary py-3.5 px-6 sm:px-8 text-sm sm:text-base font-display font-bold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 shrink-0 cursor-pointer hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5 text-black stroke-[3]" />
            <span>Ask a Doubt</span>
          </button>
        </div>

        {/* Key Metrics Strip */}
        <div className="relative z-10 border-t border-white/[0.12] bg-black/60 px-6 sm:px-10 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/70">TOTAL DOUBTS:</span>
            <span className="font-bold text-white">{doubts.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span className="text-white/70">RESOLVED:</span>
            <span className="font-bold text-white">85%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-white" />
            <span className="text-white/70">AVG RESPONSE:</span>
            <span className="font-bold text-white">&lt; 15 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-white" />
            <span className="text-white/70">KARMA REWARDS:</span>
            <span className="font-bold text-white">Verified ✓</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & FILTER TOOLBAR                                                */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doubts, technologies, or tags (#sql, #react, #pricing, #jwt)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/[0.2] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-white/40 focus:outline-none focus:border-white shadow-inner transition-all"
            />
          </div>

          {/* Sort & Status Selectors */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <div className="inline-flex p-1 bg-black/60 rounded-xl border border-white/[0.18] text-xs font-mono">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'all' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('open')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'open' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                Open Doubts
              </button>
              <button
                onClick={() => setFilterStatus('solved')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'solved' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                Solved ✓
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0b0b0e] border border-white/[0.2] text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-white font-mono font-bold cursor-pointer"
            >
              <option value="recent">Sort: Most Recent</option>
              <option value="popular">Sort: Most Upvoted</option>
            </select>
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar font-mono text-xs">
          <span className="text-white/50 uppercase tracking-wider mr-1 text-[11px] font-bold">CATEGORY:</span>
          {[
            { id: 'all', label: 'All Fields' },
            { id: 'technical', label: 'Technical' },
            { id: 'side-hustle', label: 'Side Hustle' },
            { id: 'soft-skills', label: 'Soft Skills' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
                filterCategory === tab.id
                  ? 'bg-white text-black border-white shadow-sm'
                  : 'bg-white/[0.04] text-white/75 border-white/[0.12] hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. COMMUNITY DOUBTS LIST                                                  */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        {filteredDoubts.length === 0 ? (
          <div className="mono-card p-12 text-center space-y-4 rounded-3xl border-white/[0.2]">
            <HelpCircle className="w-10 h-10 text-white/40 mx-auto" />
            <h3 className="text-lg font-bold text-white font-display">No doubts found</h3>
            <p className="text-xs text-white/70 font-mono">Try adjusting your filters or be the first to ask a doubt!</p>
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="btn-primary py-2 px-4 text-xs font-display font-bold rounded-xl"
            >
              Ask a Doubt Now
            </button>
          </div>
        ) : (
          filteredDoubts.map(doubt => {
            const isExpanded = expandedDoubtIds.includes(doubt.id);
            const isSolved = doubt.status === 'solved';

            return (
              <div
                key={doubt.id}
                className={`mono-card p-6 sm:p-8 rounded-3xl border-2 transition-all space-y-5 ${
                  isSolved 
                    ? 'border-white/[0.25] bg-white/[0.03]' 
                    : 'border-white/[0.18] bg-white/[0.04]'
                }`}
              >
                
                {/* Doubt Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doubt.author.avatar}
                      alt={doubt.author.name}
                      className="w-10 h-10 rounded-full border border-white/30 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-display">{doubt.author.name}</span>
                        <span className="text-xs font-mono text-white/60">{doubt.author.handle}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/70">
                        <span className="mono-tag text-[9px] px-1.5 py-0.2 rounded border-white/20 bg-white/[0.06]">{doubt.author.roleBadge}</span>
                        <span>•</span>
                        <span>{doubt.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="mono-tag text-[10px] font-mono uppercase tracking-wider bg-white/[0.08] border-white/20">
                      {doubt.trackTitle}
                    </span>
                    {isSolved ? (
                      <span className="mono-tag text-[10px] font-mono bg-white text-black font-extrabold border-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-black" /> SOLVED ✓
                      </span>
                    ) : (
                      <span className="mono-tag text-[10px] font-mono text-white border-white/20 bg-white/[0.06] flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-white" /> OPEN DOUBT
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {doubt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-body leading-relaxed whitespace-pre-line">
                    {doubt.description}
                  </p>
                </div>

                {/* Code Snippet Box (If available) */}
                {doubt.codeSnippet && (
                  <div className="relative rounded-2xl bg-[#060608] border border-white/[0.18] p-4 font-mono text-xs text-white/90 overflow-x-auto custom-scrollbar group">
                    <button
                      onClick={() => copyToClipboard(doubt.codeSnippet)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white text-white hover:text-black transition-all flex items-center gap-1 text-[10px] font-bold"
                      title="Copy code"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <pre className="pt-2">{doubt.codeSnippet}</pre>
                  </div>
                )}

                {/* Tags */}
                {doubt.tags && doubt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {doubt.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.06] text-white/80 border border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Bar: Likes, Comments / Answers Count, Expand Toggle */}
                <div className="pt-3 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLikeDoubt(doubt.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                        doubt.isLiked
                          ? 'bg-white text-black border-white font-bold shadow-sm'
                          : 'bg-white/[0.04] text-white border-white/[0.14] hover:bg-white/[0.1] hover:border-white/40'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${doubt.isLiked ? 'fill-current text-black' : 'text-white'}`} />
                      <span>{doubt.likesCount}</span>
                    </button>

                    {/* Answers / Comments Count */}
                    <button
                      onClick={() => toggleExpandDoubt(doubt.id)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white border border-white/[0.14] hover:border-white/40 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                      <span>{(doubt.answers || []).length} Answers</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleExpandDoubt(doubt.id)}
                    className="text-white hover:underline flex items-center gap-1 font-bold font-display cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Discussion' : 'View Solutions & Solve'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* 4. EXPANDED SOLUTIONS & DISCUSSION THREAD                                 */}
                {/* ========================================================================= */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/[0.1] space-y-4 animate-fadeIn">
                    
                    {/* Answers List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-white/70 uppercase tracking-wider font-bold">
                        <span>SOLUTIONS & REPLIES ({(doubt.answers || []).length})</span>
                        {isSolved && <span className="text-white">Verified Resolution Available</span>}
                      </div>

                      {(doubt.answers || []).map(ans => {
                        return (
                          <div
                            key={ans.id}
                            className={`p-5 rounded-2xl border transition-all space-y-3 ${
                              ans.isAccepted
                                ? 'bg-white/[0.08] border-white ring-2 ring-white/20'
                                : 'bg-white/[0.03] border-white/[0.12]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={ans.author.avatar}
                                  alt={ans.author.name}
                                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                                />
                                <div>
                                  <div className="flex items-center gap-2 text-xs font-bold text-white font-display">
                                    <span>{ans.author.name}</span>
                                    <span className="mono-tag text-[9px] px-1.5 py-0.2 rounded border-white/20 bg-white/[0.06] font-mono">
                                      {ans.author.roleBadge}
                                    </span>
                                  </div>
                                  <div className="text-[10px] font-mono text-white/60">{ans.createdAt}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {ans.isAccepted && (
                                  <span className="mono-tag text-[10px] font-mono bg-white text-black font-extrabold border-white flex items-center gap-1">
                                    <Check className="w-3 h-3 stroke-[3]" /> VERIFIED SOLUTION
                                  </span>
                                )}

                                {!ans.isAccepted && !isSolved && (
                                  <button
                                    onClick={() => handleMarkAcceptedAnswer(doubt.id, ans.id)}
                                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white hover:text-black border border-white/20 text-white transition-colors flex items-center gap-1 cursor-pointer font-bold"
                                  >
                                    <Check className="w-3 h-3" /> Mark as Solution
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Answer Content */}
                            <p className="text-xs sm:text-sm text-white/90 font-body leading-relaxed whitespace-pre-line">
                              {ans.content}
                            </p>

                            {/* Answer Code Snippet */}
                            {ans.codeSnippet && (
                              <div className="relative rounded-xl bg-[#060608] border border-white/[0.15] p-3 font-mono text-xs text-white/90 overflow-x-auto custom-scrollbar">
                                <button
                                  onClick={() => copyToClipboard(ans.codeSnippet)}
                                  className="absolute top-2.5 right-2.5 p-1 rounded bg-white/[0.08] hover:bg-white text-white hover:text-black text-[9px] font-mono font-bold flex items-center gap-1"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                  <span>Copy</span>
                                </button>
                                <pre className="pt-1">{ans.codeSnippet}</pre>
                              </div>
                            )}

                            {/* Answer Footer / Likes */}
                            <div className="flex items-center justify-between text-xs font-mono pt-1">
                              <button
                                onClick={() => handleToggleLikeAnswer(doubt.id, ans.id)}
                                className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                                  ans.isLiked
                                    ? 'bg-white text-black border-white font-bold'
                                    : 'bg-white/[0.04] text-white/80 border-white/[0.12] hover:bg-white/[0.1]'
                                }`}
                              >
                                <Heart className={`w-3 h-3 ${ans.isLiked ? 'fill-current text-black' : 'text-white'}`} />
                                <span>{ans.likesCount} Helpful</span>
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Write an Answer / Solve Box */}
                    <div className="p-4 rounded-2xl bg-black/70 border border-white/[0.2] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-white" />
                          Contribute a Solution or Comment
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowCodeInputForDoubt(prev => ({ ...prev, [doubtId]: !prev[doubtId] }))}
                          className="text-[11px] text-white/70 hover:text-white underline cursor-pointer"
                        >
                          {showCodeInputForDoubt[doubt.id] ? '- Remove Code Box' : '+ Add Code Snippet'}
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Write your explanation or answer..."
                        value={answerDrafts[doubt.id] || ''}
                        onChange={(e) => setAnswerDrafts(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                        className="w-full bg-[#07070a] border border-white/[0.15] rounded-xl p-3 text-xs font-body text-white placeholder-white/40 focus:outline-none focus:border-white/60 resize-y"
                      />

                      {showCodeInputForDoubt[doubt.id] && (
                        <textarea
                          rows={3}
                          placeholder="// Paste solution code or SQL snippet here..."
                          value={answerCodeDrafts[doubt.id] || ''}
                          onChange={(e) => setAnswerCodeDrafts(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                          className="w-full bg-[#040406] border border-white/[0.18] rounded-xl p-3 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white/60 resize-y"
                        />
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={() => handlePostAnswer(doubt.id)}
                          className="btn-primary py-2 px-5 text-xs font-display font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Post Answer</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. ASK A DOUBT MODAL                                                      */}
      {/* ========================================================================= */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="mono-card p-6 sm:p-8 max-w-2xl w-full rounded-3xl border-2 border-white/40 bg-[#09090c] shadow-[0_0_80px_rgba(255,255,255,0.3)] space-y-5 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => setIsAskModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.08] hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="mono-tag text-[10px] font-mono uppercase tracking-widest bg-white/[0.1] border-white/30 px-2 py-0.5 mb-2">
                PEER Q&A COMMUNITY
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Ask a Doubt to the Community
              </h3>
              <p className="text-xs text-white/70 font-body mt-1">
                Get high-quality peer guidance and verified code solutions from engineers across all career tracks.
              </p>
            </div>

            <form onSubmit={handleSubmitNewDoubt} className="space-y-4 text-xs font-mono">
              
              {/* Category Picker */}
              <div className="space-y-1.5">
                <label className="text-white/80 font-bold uppercase tracking-wider text-[11px]">Field / Track</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'technical', label: 'Technical' },
                    { id: 'side-hustle', label: 'Side Hustle' },
                    { id: 'soft-skills', label: 'Soft Skills' }
                  ].map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNewDoubtForm(f => ({ ...f, category: c.id }))}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                        newDoubtForm.category === c.id
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-white/[0.04] text-white/75 border-white/[0.14] hover:bg-white/[0.08]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-white/80 font-bold uppercase tracking-wider text-[11px]">Doubt Title / Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to structure composite indexes for high-throughput Postgres tables?"
                  value={newDoubtForm.title}
                  onChange={(e) => setNewDoubtForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-black/60 border border-white/[0.2] rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-white/80 font-bold uppercase tracking-wider text-[11px]">Detailed Explanation</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain what you are trying to achieve, what you have tried, and where you are blocked..."
                  value={newDoubtForm.description}
                  onChange={(e) => setNewDoubtForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-black/60 border border-white/[0.2] rounded-xl p-3 text-xs font-body text-white placeholder-white/40 focus:outline-none focus:border-white resize-y"
                />
              </div>

              {/* Code Snippet (Optional) */}
              <div className="space-y-1.5">
                <label className="text-white/80 font-bold uppercase tracking-wider text-[11px]">Code / Query Snippet (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="// Paste your relevant SQL query, React component, or configuration..."
                  value={newDoubtForm.codeSnippet}
                  onChange={(e) => setNewDoubtForm(f => ({ ...f, codeSnippet: e.target.value }))}
                  className="w-full bg-[#040406] border border-white/[0.2] rounded-xl p-3 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white resize-y"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-white/80 font-bold uppercase tracking-wider text-[11px]">Tags (comma or space separated)</label>
                <input
                  type="text"
                  placeholder="e.g. #postgres #sql #performance #auth"
                  value={newDoubtForm.tags}
                  onChange={(e) => setNewDoubtForm(f => ({ ...f, tags: e.target.value }))}
                  className="w-full bg-black/60 border border-white/[0.2] rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white"
                />
              </div>

              {/* Modal Submit Actions */}
              <div className="pt-3 border-t border-white/[0.12] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="btn-secondary py-2 px-4 text-xs font-display cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary py-2.5 px-6 text-xs font-display font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Doubt →</span>
                </button>
              </div>

            </form>

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
