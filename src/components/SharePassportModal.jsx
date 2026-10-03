import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { DEVELOPER_PASSPORT_DATA } from '../data/mockData';

export default function SharePassportModal({ isOpen, onClose }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [activeTab, setActiveTab] = useState('link');

  if (!isOpen) return null;

  const publicUrl = `https://devpath.sh/p/${DEVELOPER_PASSPORT_DATA.handle}`;
  const embedSnippet = `<iframe src="https://devpath.sh/embed/${DEVELOPER_PASSPORT_DATA.handle}" width="400" height="280" frameborder="0"></iframe>`;

  const copyUrl = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyEmbed = () => {
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#0a0a0d] border border-white/[0.14] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.12] flex items-center justify-between bg-white/[0.04]">
          <div>
            <div className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-semibold">
              PUBLIC VERIFICATION
            </div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mt-0.5">
              Share Developer Passport
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.12] bg-white/[0.03] text-xs font-mono">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === 'link' 
                ? 'border-white text-white font-bold bg-white/[0.08]' 
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            Public Link
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === 'embed' 
                ? 'border-white text-white font-bold bg-white/[0.08]' 
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            Embed Badge
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {activeTab === 'link' && (
            <div className="space-y-3.5">
              <p className="text-xs text-white/90 font-body">
                Public verifiable link to inspect skill scores, completed project test runs, and Git evidence.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicUrl}
                  className="flex-1 bg-black/50 border border-white/[0.18] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                />
                <button
                  onClick={copyUrl}
                  className="btn-primary text-xs px-3.5 py-2 font-display"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Passport Preview Card Mini */}
              <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/[0.14] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white font-display">Madhav R.</span>
                  <span className="text-white font-mono text-[10px] font-bold">72% Verified</span>
                </div>
                <div className="text-[11px] text-white/80 font-mono">
                  Backend Developer · 3 Verified Projects Attached
                </div>
              </div>
            </div>
          )}

          {activeTab === 'embed' && (
            <div className="space-y-3.5">
              <p className="text-xs text-white/90 font-body">
                Embed this verification badge in your personal portfolio or GitHub README.
              </p>

              <div className="space-y-2.5">
                <textarea
                  readOnly
                  rows={3}
                  value={embedSnippet}
                  className="w-full bg-black/50 border border-white/[0.18] rounded-xl p-3 text-xs text-white font-mono resize-none focus:outline-none"
                />
                <button
                  onClick={copyEmbed}
                  className="btn-secondary text-xs w-full py-2 font-display"
                >
                  {copiedEmbed ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                  <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed HTML'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.12] bg-white/[0.04] flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary text-xs font-display"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
