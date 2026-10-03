import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  FolderKanban, 
  Layers, 
  Network, 
  Award, 
  ChevronRight,
  ChevronLeft,
  Settings,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  User,
  LogIn,
  Briefcase,
  TrendingUp,
  Compass,
  MessageSquare,
  DollarSign,
  Target,
  Sparkles,
  Video,
  BookOpen
} from 'lucide-react';
import { ROLES_LIST } from '../data/mockData';

export default function Sidebar({ 
  category = 'technical',
  currentView, 
  setView, 
  userState, 
  onSwitchRole, 
  onOpenOnboarding,
  isCollapsed,
  setIsCollapsed,
  onClose,
  isEmbedded = false
}) {
  // Category-specific configurations with strictly isolated field progress
  const categoryConfigs = {
    'technical': {
      systemSubtitle: 'Developer OS',
      targetLabel: 'Target Role',
      targetTitle: userState?.targetRoleTitle || 'Backend Developer',
      progressPercent: userState?.overallProgress || 72,
      focusLabel: 'Focus Milestone',
      focusValue: userState?.currentFocusSkillName || 'REST APIs',
      stats: [
        { label: 'Mastered', value: `${(userState?.knownSkills || []).length || 5}/14 Skills` },
        { label: 'Active Project', value: 'URL Shortener' },
      ],
      mainNav: [
        { id: 'landing', label: 'Overview', icon: Home },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'roadmap', label: 'My Roadmap', icon: Map, badge: 'Adaptive' },
        { id: 'community', label: 'Community', icon: MessageSquare, badge: 'Q&A' },
        { id: 'materials', label: 'Study Materials', icon: Video, badge: 'Videos' },
        { id: 'projects', label: 'Projects', icon: FolderKanban, badge: '1 Active' },
        { id: 'skills', label: 'Skill Matrix', icon: Layers },
        { id: 'evidence', label: 'Evidence Graph', icon: Network },
      ],
      bottomNav: [
        { id: 'passport', label: 'Developer Passport', icon: Award },
        { id: 'login', label: userState?.isLoggedIn ? 'Switch Profile' : 'Sign In / Register', icon: User },
        { id: 'settings', label: 'Adaptive Settings', icon: Settings, action: onOpenOnboarding },
      ]
    },
    'side-hustle': {
      systemSubtitle: 'Side Hustle OS',
      targetLabel: 'Monetization Track',
      targetTitle: userState?.sideHustle?.activeTrackTitle || 'Web Freelancing',
      progressPercent: userState?.sideHustle?.progress || 35, // Field-specific progress (strictly isolated)
      focusLabel: 'Focus Milestone',
      focusValue: userState?.sideHustle?.focusMilestone || 'Client Proposals & Pricing',
      stats: [
        { label: 'Modules', value: `${userState?.sideHustle?.completedModules || 3}/${userState?.sideHustle?.totalModules || 6} Ready` },
        { label: 'Pipeline', value: `${userState?.sideHustle?.activeLeads || 2} Active Leads` },
      ],
      mainNav: [
        { id: 'landing', label: 'Overview', icon: Home },
        { id: 'dashboard', label: 'Income Hub', icon: TrendingUp },
        { id: 'roadmap', label: 'Monetize Roadmap', icon: Map, badge: 'High ROI' },
        { id: 'community', label: 'Community', icon: MessageSquare, badge: 'Doubts' },
        { id: 'materials', label: 'Income Guides', icon: Video, badge: 'Guides' },
        { id: 'projects', label: 'Client Pipeline', icon: FolderKanban, badge: `${userState?.sideHustle?.activeLeads || 2} Leads` },
        { id: 'skills', label: 'Income Modules', icon: Layers },
        { id: 'evidence', label: 'Proof of Delivery', icon: Network },
      ],
      bottomNav: [
        { id: 'passport', label: 'Creator Passport', icon: Award },
        { id: 'login', label: userState?.isLoggedIn ? 'Switch Profile' : 'Sign In / Register', icon: User },
        { id: 'settings', label: 'Monetization Settings', icon: Settings, action: onOpenOnboarding },
      ]
    },
    'soft-skills': {
      systemSubtitle: 'Leadership OS',
      targetLabel: 'Leadership Track',
      targetTitle: userState?.softSkills?.activeTrackTitle || 'Engineering Leadership',
      progressPercent: userState?.softSkills?.progress || 45, // Field-specific progress (strictly isolated)
      focusLabel: 'Active Drill',
      focusValue: userState?.softSkills?.focusMilestone || 'Technical RFCs & Narratives',
      stats: [
        { label: 'Drills', value: `${userState?.softSkills?.completedDrills || 4}/${userState?.softSkills?.totalDrills || 5} Mastered` },
        { label: 'Influence', value: userState?.softSkills?.influenceScore || '85/100' },
      ],
      mainNav: [
        { id: 'landing', label: 'Overview', icon: Home },
        { id: 'dashboard', label: 'Leadership Hub', icon: Compass },
        { id: 'roadmap', label: 'Growth Roadmap', icon: Map, badge: 'Essential' },
        { id: 'community', label: 'Community', icon: MessageSquare, badge: 'Q&A' },
        { id: 'materials', label: 'Leadership Media', icon: Video, badge: 'RFCs' },
        { id: 'projects', label: 'Case Scenarios', icon: FolderKanban, badge: `${userState?.softSkills?.scenariosMastered || 2} Mastered` },
        { id: 'skills', label: 'Behavioral Matrix', icon: Layers },
        { id: 'evidence', label: 'Influence Graph', icon: Network },
      ],
      bottomNav: [
        { id: 'passport', label: 'Leadership Passport', icon: Award },
        { id: 'login', label: userState?.isLoggedIn ? 'Switch Profile' : 'Sign In / Register', icon: User },
        { id: 'settings', label: 'Growth Settings', icon: Settings, action: onOpenOnboarding },
      ]
    }
  };

  const config = categoryConfigs[category] || categoryConfigs['technical'];
  const mainNav = config.mainNav;
  const bottomNav = config.bottomNav;

  return (
    <aside 
      className={
        isEmbedded
          ? `border border-white/[0.14] bg-[#09090b]/90 backdrop-blur-2xl rounded-3xl flex flex-col justify-between shrink-0 select-none shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-300 z-20 ${
              isCollapsed ? 'w-20' : 'w-full lg:w-72'
            }`
          : `border-r border-white/[0.08] bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between shrink-0 select-none min-h-screen sticky top-0 h-screen overflow-y-auto custom-scrollbar transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-30 ${
              isCollapsed ? 'w-20' : 'w-72'
            }`
      }
    >
      
      {/* Top Nav Section */}
      <div className={`space-y-6 ${isCollapsed ? 'p-3' : 'p-5'}`}>
        
        {/* Brand Header with Collapse/Expand & Close Toggle */}
        <div className={`flex items-center pb-4 border-b border-white/[0.08] ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed ? (
            <>
              <div 
                onClick={() => setView('landing')} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black font-mono font-bold text-sm logo-pulse-glow group-hover:scale-105 transition-transform">
                  /
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold tracking-tight text-white font-display leading-none">
                    DEVPATH
                  </span>
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider mt-1 leading-none">
                    {config.systemSubtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={onClose ? onClose : () => setIsCollapsed(true)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#a1a1aa] hover:text-white transition-all cursor-pointer"
                  title="Close Sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div 
                onClick={() => setView('landing')} 
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-mono font-bold text-sm logo-pulse-glow hover:scale-105 cursor-pointer transition-transform"
                title="DEVPATH Overview"
              >
                /
              </div>
              
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-white transition-all shadow-md cursor-pointer"
                title="Expand Sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Field-Specific Target Command Card (Full vs Compact) */}
        {!isCollapsed ? (
          <div className="mono-card p-5 border-white/[0.16] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-white mb-2 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-white/70" />
                {config.targetLabel}
              </span>
              <span className="text-white font-bold font-mono text-xs px-2 py-0.5 rounded bg-white/[0.1] border border-white/20 shadow-sm">
                {config.progressPercent}%
              </span>
            </div>
            
            <div className="font-bold text-white text-lg font-display truncate">
              {config.targetTitle}
            </div>

            <div className="w-full bg-white/[0.12] h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.45)]"
                style={{ width: `${config.progressPercent}%` }}
              />
            </div>

            {/* Field-Specific Mini Stats Row */}
            {config.stats && (
              <div className="mt-3 grid grid-cols-2 gap-2 pt-2.5 border-t border-white/[0.08] text-[11px] font-mono">
                {config.stats.map((st, sIdx) => (
                  <div key={sIdx} className="bg-white/[0.04] p-1.5 rounded-lg border border-white/[0.06]">
                    <div className="text-white/50 text-[10px] uppercase font-semibold">{st.label}</div>
                    <div className="text-white font-semibold truncate">{st.value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/90">
              <span className="truncate pr-1 text-[11px]"><span className="text-white/60">{config.focusLabel}:</span> <strong className="text-white font-medium">{config.focusValue}</strong></span>
              <button 
                onClick={onOpenOnboarding}
                className="text-white hover:underline font-mono text-xs font-bold shrink-0 cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={onOpenOnboarding}
            className="flex flex-col items-center p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.16] cursor-pointer hover:bg-white/[0.12] transition-all"
            title={`${config.targetTitle} (${config.progressPercent}%) - ${config.targetLabel}`}
          >
            <span className="text-[11px] font-mono font-bold text-white">{config.progressPercent}%</span>
            <div className="w-8 bg-white/[0.15] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-white h-full shadow-[0_0_6px_#ffffff]" style={{ width: `${config.progressPercent}%` }} />
            </div>
          </div>
        )}

        {/* Main Navigation Items */}
        <div className="space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 pb-1 text-xs font-mono text-white/80 uppercase tracking-widest font-semibold">
              Navigation
            </div>
          )}
          
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-base font-semibold font-display transition-all duration-200 group ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3'
                } ${
                  isActive 
                    ? 'bg-white/[0.15] text-white border border-white/[0.3] shadow-[0_0_18px_rgba(255,255,255,0.15)]' 
                    : 'text-white/80 hover:text-white hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'}`}>
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md ${
                    isActive 
                      ? 'bg-white text-black font-bold border border-white shadow-sm' 
                      : 'bg-white/[0.08] text-white border border-white/[0.16]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Profile & Settings Section */}
      <div className={`border-t border-white/[0.08] space-y-1.5 ${isCollapsed ? 'p-3' : 'p-5'}`}>
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => item.action ? item.action() : setView(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-xl text-sm font-semibold font-display transition-all ${
                isCollapsed ? 'justify-center p-2.5' : 'justify-between px-4 py-2.5'
              } ${
                isActive 
                  ? 'bg-white/[0.15] text-white border border-white/[0.3] shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'text-white/80 hover:text-white hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Icon className="w-4 h-4 shrink-0 text-white" />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            </button>
          );
        })}
      </div>

    </aside>
  );
}

