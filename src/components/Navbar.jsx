import React, { useState } from 'react';
import { Sparkles, Search, User, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

export default function Navbar({ 
  activeCategory = 'technical', 
  setActiveCategory, 
  onOpenSearch, 
  onOpenProfile,
  onOpenOnboarding,
  userState,
  setView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'technical', label: 'Technical' },
    { id: 'side-hustle', label: 'Side Hustle' },
    { id: 'soft-skills', label: 'Soft Skills' }
  ];

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full navbar-glass relative transition-all duration-300">
      
      {/* Dynamic Animated Flowing Border Beam */}
      <div className="navbar-flowing-border" />

      {/* Ambient Internal Light Pulse */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[550px] h-14 bg-white/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        
        {/* Brand Logo - Left */}
        <div 
          onClick={() => {
            setActiveCategory('technical');
            if (setView) setView('landing');
          }} 
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black font-mono font-bold text-base logo-pulse-glow group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300">
            /
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white font-display flex items-center gap-2 leading-none">
              DEVPATH
            </span>
          </div>
        </div>

        {/* Center Category Switcher - Desktop */}
        <nav className="hidden md:flex items-center justify-center flex-1 max-w-xl mx-6">
          <div className="flex items-center gap-1 p-1.5 rounded-full nav-glass-capsule border border-white/[0.14] bg-black/60 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Ambient subtle light sweep */}
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-sm pointer-events-none" />

            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`relative px-5 py-2 rounded-full text-sm font-display tracking-tight transition-all duration-200 select-none cursor-pointer flex items-center justify-center ${
                    isActive 
                      ? 'text-white font-bold bg-white/[0.14] shadow-[0_0_20px_rgba(255,255,255,0.18)] border border-white/30' 
                      : 'text-[#888888] hover:text-white hover:bg-white/[0.06] border border-transparent font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Action Controls - Right: Community | Search | Profile */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          
          {/* Community Q&A Link Button */}
          <button
            onClick={() => {
              if (setView) setView('community');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.14] border border-white/[0.14] hover:border-white/40 text-white/90 hover:text-white transition-all text-sm font-display cursor-pointer group shadow-sm"
            title="Community Doubts & Solutions Hub"
          >
            <MessageSquare className="w-4 h-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
            <span>Community</span>
            <span className="mono-tag text-[9px] px-1.5 py-0.5 rounded bg-white text-black font-extrabold border-white">
              Q&A
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.14] text-white/80 hover:text-white transition-all text-sm font-display cursor-pointer group shadow-sm"
            title="Quick Search (⌘K / Ctrl+K)"
          >
            <Search className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            <span>Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.08] text-white/50 rounded border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Profile / Account Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.14] text-white transition-all text-sm font-display cursor-pointer group shadow-sm"
            title={userState?.isLoggedIn ? `Logged in as ${userState.name}` : 'Sign In / Profile'}
          >
            <div className="w-6 h-6 rounded-lg bg-white/[0.12] flex items-center justify-center text-white text-xs font-mono font-bold border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
              {userState?.isLoggedIn ? userState.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="font-medium">
              {userState?.isLoggedIn ? userState.name.split(' ')[0] : 'Profile'}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              if (setView) setView('community');
            }}
            className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.14] text-white"
            title="Community"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.14] text-white"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.14] text-white"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.12] bg-[#09090b]/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-fadeIn relative z-30">
          <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest px-3 py-1">
            Categories
          </div>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-display flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-white/[0.15] text-white font-bold border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/[0.1] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (setView) setView('community');
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-display text-white/90 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Community Doubts & Solutions</span>
              </div>
              <span className="mono-tag text-[9px] px-1.5 py-0.5 rounded bg-white text-black font-extrabold">Q&A</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-display text-white/90 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-white/70" />
              <span>Search Categories & Paths</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-display text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center gap-3"
            >
              <User className="w-4 h-4 text-white" />
              <span>{userState?.isLoggedIn ? `Profile (${userState.name})` : 'Profile / Sign In'}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}

