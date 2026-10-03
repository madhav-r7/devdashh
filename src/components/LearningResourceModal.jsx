import React, { useState } from 'react';
import { 
  X, 
  Play, 
  ExternalLink, 
  Check, 
  Bookmark, 
  Clock, 
  Sparkles, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  Star,
  Award,
  Video
} from 'lucide-react';

export default function LearningResourceModal({
  material,
  isOpen,
  onClose,
  isBookmarked,
  isCompleted,
  onToggleBookmark,
  onToggleCompleted
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !material) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(material.url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      <div 
        className="relative w-full max-w-4xl bg-[#09090b] border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">
              {material.type === 'youtube' ? <Video className="w-4 h-4 text-black" /> : <BookOpen className="w-4 h-4 text-black" />}
            </span>
            <div>
              <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-semibold">
                {material.type === 'youtube' ? 'YOUTUBE REFERENCE MASTERCLASS' : 'CURATED REFERENCE MATERIAL'}
              </div>
              <div className="text-xs font-mono text-white font-medium">
                {material.creator} · {material.duration}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark && onToggleBookmark(material.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/[0.06] text-white hover:bg-white/[0.12] border-white/10'
              }`}
              title={isBookmarked ? 'Saved in Bookmarks' : 'Save Reference'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition-all cursor-pointer"
              title="Copy Material Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-white transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 custom-scrollbar">

          {/* Embedded YouTube Player or Reference Hero */}
          {material.type === 'youtube' && material.embedId ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${material.embedId}?autoplay=1&rel=0&modestbranding=1`}
                title={material.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/20 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${material.thumbnail})` }}>
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <div className="relative z-10 text-center p-6 space-y-3">
                <BookOpen className="w-12 h-12 text-white mx-auto stroke-[1.5]" />
                <h3 className="text-xl font-bold font-display text-white">{material.title}</h3>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-display"
                >
                  <span>Open Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Title & Metadata Pills */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono-tag text-xs font-mono bg-white text-black font-bold border-white">
                {material.difficulty}
              </span>
              <span className="mono-tag text-xs font-mono text-white/90 border-white/20 bg-white/[0.08] flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {material.duration}
              </span>
              {material.views && (
                <span className="mono-tag text-xs font-mono text-white/80 border-white/10 bg-white/[0.04]">
                  {material.views}
                </span>
              )}
              {material.rating && (
                <span className="mono-tag text-xs font-mono text-white border-white/20 bg-white/[0.08] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white text-white" />
                  {material.rating}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              {material.title}
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-body">
              {material.description}
            </p>
          </div>

          {/* Key Topics & Takeaways */}
          {material.topics && material.topics.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="text-xs font-mono text-white/70 uppercase tracking-wider font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Key Architectural Takeaways & Concepts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {material.topics.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-mono text-white/90 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links & Direct Watch Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
            <span className="text-white/70">
              Prefer watching directly on YouTube? Open in a full browser tab.
            </span>
            <a
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white font-bold hover:underline shrink-0"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#050505]">
          <div className="text-xs font-mono text-white/70">
            {isCompleted ? (
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" /> Marked as Studied & Verified
              </span>
            ) : (
              <span>Unverified milestone study material</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onToggleCompleted && onToggleCompleted(material.id)}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isCompleted 
                  ? 'bg-white/[0.1] text-white border border-white/30 hover:bg-white/[0.18]' 
                  : 'bg-white text-black font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCompleted ? 'Mark Incomplete' : 'Mark as Watched ✓'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-display text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
