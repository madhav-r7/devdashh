import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BackgroundSystem from './components/BackgroundSystem';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import ProjectsView from './components/ProjectsView';
import SkillsMatrixView from './components/SkillsMatrixView';
import EvidenceGraphView from './components/EvidenceGraphView';
import DeveloperPassport from './components/DeveloperPassport';
import LoginPage from './components/LoginPage';
import RainingBallsBackground from './components/RainingBallsBackground';
import OnboardingModal from './components/OnboardingModal';
import ProjectEvidenceModal from './components/ProjectEvidenceModal';
import DiagnosticQuizModal from './components/DiagnosticQuizModal';
import SharePassportModal from './components/SharePassportModal';
import QuickSearchModal from './components/QuickSearchModal';
import MaterialsView from './components/MaterialsView';
import LearningResourceModal from './components/LearningResourceModal';
import CommunityView from './components/CommunityView';
import { 
  INITIAL_USER_STATE, 
  BACKEND_ROADMAP_NODES, 
  ROLES_LIST, 
  FEATURED_PROJECT_WORKSPACE,
  LEARNING_MATERIALS
} from './data/mockData';
import { Sparkles, ArrowLeft, PanelLeftOpen } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'dashboard' | 'roadmap' | 'materials' | 'projects' | 'skills' | 'evidence' | 'passport'
  const [landingCategory, setLandingCategory] = useState('technical'); // 'technical' | 'side-hustle' | 'soft-skills'
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [viewHistory, setViewHistory] = useState(['landing']);
  const [userState, setUserState] = useState(INITIAL_USER_STATE);
  const [roadmapNodes, setRoadmapNodes] = useState(BACKEND_ROADMAP_NODES);
  const [learningMaterials, setLearningMaterials] = useState(LEARNING_MATERIALS);
  const [activeResourceMaterial, setActiveResourceMaterial] = useState(null);
  const [bookmarkedMaterialIds, setBookmarkedMaterialIds] = useState(['mat-rest-api-2', 'mat-sql-2', 'mat-hustle-1', 'mat-soft-1']);
  const [completedMaterialIds, setCompletedMaterialIds] = useState(['mat-rest-api-3', 'mat-sql-1', 'mat-sql-2', 'mat-git-1']);

  // Navigation with history tracking
  const handleSetView = (newView) => {
    if (newView !== currentView) {
      setViewHistory(prev => [...prev, currentView]);
      setCurrentView(newView);
    }
  };

  const handleGoBack = () => {
    if (viewHistory.length > 0) {
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory(h => (h.length > 1 ? h.slice(0, -1) : ['landing']));
      setCurrentView(prev || 'landing');
    } else {
      setCurrentView('landing');
    }
  };

  // Materials Handlers
  const handleOpenMaterial = (mat) => {
    setActiveResourceMaterial(mat);
  };

  const handleToggleBookmarkMaterial = (matId) => {
    setBookmarkedMaterialIds(prev => {
      const isSaved = prev.includes(matId);
      const next = isSaved ? prev.filter(id => id !== matId) : [...prev, matId];
      showToast(isSaved ? 'Removed Bookmark' : 'Saved to Bookmarks', 'Your study materials list has been updated.');
      return next;
    });
  };

  const handleToggleCompleteMaterial = (matId) => {
    setCompletedMaterialIds(prev => {
      const isDone = prev.includes(matId);
      const next = isDone ? prev.filter(id => id !== matId) : [...prev, matId];
      showToast(isDone ? 'Marked Incomplete' : 'Studied & Verified ✓', 'Knowledge check updated in your study profile.');
      return next;
    });
  };
  
  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [diagnosticSkillId, setDiagnosticSkillId] = useState('sql');
  const [isSharePassportOpen, setIsSharePassportOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState('rest-api');
  const [selectedEvidenceSkill, setSelectedEvidenceSkill] = useState('all');
  const [activeProject, setActiveProject] = useState(FEATURED_PROJECT_WORKSPACE);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, desc) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Handle Login & Identity Sync
  const handleLoginSuccess = (user) => {
    setUserState(prev => ({
      ...prev,
      name: user.name,
      handle: user.username.startsWith('@') ? user.username : `@${user.username}`,
      email: user.email,
      targetRoleId: user.roleId || prev.targetRoleId,
      targetRoleTitle: user.roleTitle || prev.targetRoleTitle,
      experienceLevel: user.level || prev.experienceLevel,
      knownSkills: user.knownSkills || prev.knownSkills,
      overallProgress: user.overallProgress || 70,
      isLoggedIn: true
    }));

    // Re-calibrate roadmap nodes for the logged-in role
    setRoadmapNodes(prev => prev.map(node => {
      const isKnown = (user.knownSkills || []).includes(node.id);
      return {
        ...node,
        isKnown: isKnown,
        status: isKnown ? 'mastered' : node.id === 'rest-api' ? 'in-focus' : 'up-next',
        progress: isKnown ? 100 : node.id === 'rest-api' ? 65 : 0
      };
    }));

    setCurrentView('dashboard');
    showToast(
      'Authenticated!', 
      `Welcome, ${user.name}! Track set to ${user.roleTitle || 'Developer'}.`
    );
  };

  // Complete onboarding
  const handleCompleteOnboarding = (data) => {
    setUserState(prev => ({
      ...prev,
      targetRoleId: data.targetRoleId,
      targetRoleTitle: data.targetRoleTitle,
      knownSkills: data.knownSkills,
      experienceLevel: data.experienceLevel,
      weeklyHours: data.weeklyHours,
      overallProgress: Math.min(85, Math.max(40, Math.round((data.knownSkills.length / 14) * 100))),
      currentFocusSkillId: 'rest-api',
      currentFocusSkillName: 'REST APIs'
    }));

    // Update roadmap nodes based on known skills
    setRoadmapNodes(prev => prev.map(node => {
      const isKnown = data.knownSkills.includes(node.id);
      return {
        ...node,
        isKnown: isKnown,
        status: isKnown ? 'mastered' : node.id === 'rest-api' ? 'in-focus' : node.status
      };
    }));

    setCurrentView('roadmap');
    showToast('Path Synthesized!', `Visual career roadmap generated for ${data.targetRoleTitle}. ${data.knownSkills.length} known competencies pruned.`);
  };

  // Trigger Adaptive Path Recalibration (Section 6)
  const handleAdaptPath = () => {
    setRoadmapNodes(prev => prev.map(node => {
      if (node.id === 'sql') {
        return {
          ...node,
          status: 'in-focus',
          progress: 60,
          whyLearn: 'ADAPTIVE INTERVENTION: Remediation path injected for multi-table JOINs and query optimization.'
        };
      }
      return node;
    }));

    setUserState(prev => ({
      ...prev,
      currentFocusSkillId: 'sql',
      currentFocusSkillName: 'SQL & Relational DBs (JOIN Remediation)',
      adaptedScenarioActive: false
    }));

    setCurrentView('roadmap');
    setSelectedNodeId('sql');
    showToast('Path Recalibrated!', 'Targeted SQL JOIN remediation module has been injected into your active milestone.');
  };

  // Toggle Known Skill
  const handleToggleKnownSkill = (skillId) => {
    const isCurrentlyKnown = userState.knownSkills.includes(skillId);
    const updatedKnown = isCurrentlyKnown 
      ? userState.knownSkills.filter(id => id !== skillId)
      : [...userState.knownSkills, skillId];

    setUserState(prev => ({
      ...prev,
      knownSkills: updatedKnown,
      overallProgress: Math.min(100, Math.round((updatedKnown.length / 11) * 100))
    }));

    setRoadmapNodes(prev => prev.map(node => {
      if (node.id === skillId) {
        return {
          ...node,
          isKnown: !isCurrentlyKnown,
          status: !isCurrentlyKnown ? 'mastered' : 'up-next',
          progress: !isCurrentlyKnown ? 100 : 0
        };
      }
      return node;
    }));

    showToast(
      isCurrentlyKnown ? 'Skill Marked Incomplete' : 'Skill Marked as Mastered',
      `Roadmap dependency tree updated for ${skillId.toUpperCase()}.`
    );
  };

  // Switch Role (Technical Track)
  const handleSwitchRole = (roleId) => {
    const roleObj = ROLES_LIST.find(r => r.id === roleId) || ROLES_LIST[0];
    setUserState(prev => ({
      ...prev,
      targetRoleId: roleId,
      targetRoleTitle: roleObj.title
    }));
    showToast('Role Switched', `Previewing adaptive curriculum for ${roleObj.title}`);
  };

  // Switch Side Hustle Track (Isolated from Technical)
  const handleSelectSideHustleTrack = (path) => {
    const total = path.requiredSkillsCount || 6;
    const completed = Math.max(1, Math.min(total - 1, 2));
    const pct = Math.round((completed / total) * 100);

    setUserState(prev => ({
      ...prev,
      sideHustle: {
        ...prev.sideHustle,
        activeTrackId: path.id,
        activeTrackTitle: path.title,
        focusMilestone: path.skills[0] || 'Client Proposals & Pricing',
        totalModules: total,
        completedModules: completed,
        progress: pct
      }
    }));
    showToast('Side Hustle Calibrated', `Active track set to ${path.title} (${pct}% field progress).`);
  };

  // Switch Soft Skills Track (Isolated from Technical)
  const handleSelectSoftSkillsTrack = (path) => {
    const total = path.requiredSkillsCount || 5;
    const completed = Math.max(1, Math.min(total - 1, 2));
    const pct = Math.round((completed / total) * 100);

    setUserState(prev => ({
      ...prev,
      softSkills: {
        ...prev.softSkills,
        activeTrackId: path.id,
        activeTrackTitle: path.title,
        focusMilestone: path.skills[0] || 'Technical RFCs & Narratives',
        totalDrills: total,
        completedDrills: completed,
        progress: pct
      }
    }));
    showToast('Soft Skills Calibrated', `Active track set to ${path.title} (${pct}% field progress).`);
  };

  // Open Diagnostic Quiz
  const handleOpenDiagnosticQuiz = (skillId) => {
    setDiagnosticSkillId(skillId);
    setIsDiagnosticOpen(true);
  };

  // Quiz completed
  const handleQuizCompleted = ({ skillId, score }) => {
    setRoadmapNodes(prev => prev.map(node => {
      if (node.id === skillId) {
        return {
          ...node,
          progress: score,
          status: score >= 80 ? 'mastered' : 'in-focus'
        };
      }
      return node;
    }));

    showToast('Diagnostic Recorded!', `Score of ${score}% stamped to your evidence profile.`);
  };

  // Open Project Workspace
  const handleOpenProject = (projectId) => {
    setCurrentView('projects');
  };

  // View Project Evidence
  const handleViewEvidence = (proj) => {
    setActiveProject(proj);
    setIsEvidenceModalOpen(true);
  };

  // Commit evidence to passport
  const handleCommitToPassport = () => {
    showToast('Evidence Committed!', 'URL Shortener API metrics cryptographically stamped to Developer Passport.');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] flex flex-col font-sans relative selection:bg-white selection:text-black">
      
      {/* Animated Multi-Layer Monochrome Background */}
      <BackgroundSystem />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar: only on intro / landing page */}
        {currentView === 'landing' && (
          <Navbar
            activeCategory={landingCategory}
            setActiveCategory={setLandingCategory}
            onOpenSearch={() => setIsQuickSearchOpen(true)}
            onOpenProfile={() => handleSetView(userState.isLoggedIn ? 'passport' : 'login')}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            userState={userState}
            setView={handleSetView}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-x-hidden relative">
          
          {/* Persistent Sidebar in Inner Application Views */}
          {currentView !== 'landing' && currentView !== 'login' && !isSidebarClosed && (
            <div className="hidden md:block">
              <Sidebar
                category={landingCategory}
                currentView={currentView}
                setView={handleSetView}
                userState={userState}
                onSwitchRole={handleSwitchRole}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
                onClose={() => setIsSidebarClosed(true)}
              />
            </div>
          )}

          {/* Floating Re-Open Sidebar Button when closed in Inner Application Views */}
          {isSidebarClosed && currentView !== 'landing' && currentView !== 'login' && (
            <button
              onClick={() => setIsSidebarClosed(false)}
              className="fixed top-24 left-4 z-40 px-3.5 py-2 rounded-xl bg-black/90 hover:bg-black border border-white/25 hover:border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all flex items-center gap-2 cursor-pointer font-display text-xs group"
              title="Open Navigation Sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Menu</span>
            </button>
          )}

          {/* View Switcher with smooth page transitions */}
          <main className="flex-1 min-w-0 overflow-y-auto relative">
            {/* Downward falling white balls in background behind right side of sidebar across all views */}
            <RainingBallsBackground />

            {/* Top-Left Back Button in White BG (All pages except the first landing page) */}
            {currentView !== 'landing' && (
              <div className="pt-6 sm:pt-8 px-6 sm:px-10 lg:px-12 relative z-30">
                <button
                  onClick={handleGoBack}
                  className="bg-white text-black font-display font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:bg-white/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white group select-none"
                  title="Go back to previous page"
                >
                  <ArrowLeft className="w-4 h-4 text-black stroke-[3] group-hover:-translate-x-1 transition-transform" />
                  <span>Back</span>
                </button>
              </div>
            )}

            <div key={currentView} className="page-transition relative z-10">
              {currentView === 'landing' && (
                <LandingPage
                  activeCategory={landingCategory}
                  setActiveCategory={setLandingCategory}
                  onOpenOnboarding={() => setIsOnboardingOpen(true)}
                  setView={handleSetView}
                  onSelectRole={handleSwitchRole}
                  onSelectSideHustleTrack={handleSelectSideHustleTrack}
                  onSelectSoftSkillsTrack={handleSelectSoftSkillsTrack}
                  userState={userState}
                  currentView={currentView}
                  isSidebarCollapsed={isSidebarCollapsed}
                  setIsSidebarCollapsed={setIsSidebarCollapsed}
                />
              )}

              {currentView === 'login' && (
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  setView={handleSetView}
                  currentUser={userState}
                />
              )}

              {currentView === 'materials' && (
                <MaterialsView
                  learningMaterials={learningMaterials}
                  onOpenMaterial={handleOpenMaterial}
                  bookmarkedIds={bookmarkedMaterialIds}
                  completedIds={completedMaterialIds}
                  onToggleBookmark={handleToggleBookmarkMaterial}
                  onToggleCompleted={handleToggleCompleteMaterial}
                  userState={userState}
                  setView={handleSetView}
                />
              )}

              {currentView === 'dashboard' && (
                <DashboardView
                  userState={userState}
                  setView={handleSetView}
                  onAdaptPath={handleAdaptPath}
                  onOpenProject={handleOpenProject}
                  onOpenDiagnosticQuiz={handleOpenDiagnosticQuiz}
                  onOpenMaterial={handleOpenMaterial}
                  learningMaterials={learningMaterials}
                  onOpenNodeDetails={(nodeId) => {
                    setSelectedNodeId(nodeId);
                    setCurrentView('roadmap');
                  }}
                />
              )}

              {currentView === 'roadmap' && (
                <RoadmapView
                  userState={userState}
                  roadmapNodes={roadmapNodes}
                  selectedNodeId={selectedNodeId}
                  setSelectedNodeId={setSelectedNodeId}
                  onOpenProject={handleOpenProject}
                  onOpenDiagnosticQuiz={handleOpenDiagnosticQuiz}
                  onAdaptPath={handleAdaptPath}
                  onOpenMaterial={handleOpenMaterial}
                  learningMaterials={learningMaterials}
                  onToggleKnownSkill={handleToggleKnownSkill}
                  setView={handleSetView}
                  initialCategory={landingCategory}
                  initialPathId={
                    landingCategory === 'side-hustle' 
                      ? (userState.sideHustle?.activeTrackId || 'freelancing')
                      : landingCategory === 'soft-skills'
                      ? (userState.softSkills?.activeTrackId || 'leadership')
                      : (userState.targetRoleId || 'backend')
                  }
                />
              )}

              {currentView === 'community' && (
                <CommunityView
                  userState={userState}
                  setView={handleSetView}
                  initialCategory={landingCategory}
                />
              )}

              {currentView === 'projects' && (
                <ProjectsView
                  onViewEvidence={handleViewEvidence}
                  onOpenDiagnosticQuiz={handleOpenDiagnosticQuiz}
                  activeProjectId={userState.activeProjectId}
                />
              )}

              {currentView === 'skills' && (
                <SkillsMatrixView
                  userState={userState}
                  onOpenDiagnosticQuiz={handleOpenDiagnosticQuiz}
                  onToggleKnownSkill={handleToggleKnownSkill}
                  onOpenMaterial={handleOpenMaterial}
                  setView={handleSetView}
                />
              )}

              {currentView === 'evidence' && (
                <EvidenceGraphView
                  selectedSkillFilter={selectedEvidenceSkill}
                />
              )}

              {currentView === 'passport' && (
                <DeveloperPassport
                  userState={userState}
                  setView={handleSetView}
                  onSelectSkillForEvidence={(skillName) => {
                    setSelectedEvidenceSkill(skillName);
                    handleSetView('evidence');
                  }}
                  onOpenShareModal={() => setIsSharePassportOpen(true)}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* MODALS */}

      {/* 1. Onboarding Multi-step Wizard */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompleteOnboarding={handleCompleteOnboarding}
        initialRole={userState.targetRoleId}
      />

      {/* 2. Project Evidence Inspector */}
      <ProjectEvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        project={activeProject}
        onCommitToPassport={handleCommitToPassport}
        setView={setCurrentView}
      />

      {/* 3. Diagnostic Quiz Simulator */}
      <DiagnosticQuizModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        skillId={diagnosticSkillId}
        onQuizCompleted={handleQuizCompleted}
      />

      {/* 4. Share Passport Modal */}
      <SharePassportModal
        isOpen={isSharePassportOpen}
        onClose={() => setIsSharePassportOpen(false)}
      />

      {/* 5. Fast Indexer Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onOpenMaterial={handleOpenMaterial}
        setView={handleSetView}
        onSelectCategory={(cat) => {
          setLandingCategory(cat);
          handleSetView('landing');
        }}
        onSelectPath={(pathId, cat) => {
          setLandingCategory(cat);
          handleSwitchRole(pathId);
        }}
      />

      {/* 6. Learning Video & Reference Modal */}
      <LearningResourceModal
        material={activeResourceMaterial}
        isOpen={!!activeResourceMaterial}
        onClose={() => setActiveResourceMaterial(null)}
        isBookmarked={activeResourceMaterial ? bookmarkedMaterialIds.includes(activeResourceMaterial.id) : false}
        isCompleted={activeResourceMaterial ? completedMaterialIds.includes(activeResourceMaterial.id) : false}
        onToggleBookmark={handleToggleBookmarkMaterial}
        onToggleCompleted={handleToggleCompleteMaterial}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-3.5 rounded-md bg-[#111111] border border-[#2e2e2e] shadow-xl flex items-start gap-2.5 max-w-sm animate-fadeIn">
          <div className="p-1 rounded bg-[#1c1c1c] text-white shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white font-mono">{toastMessage.title}</div>
            <p className="text-[11px] text-[#888888] mt-0.5 leading-snug">{toastMessage.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}
