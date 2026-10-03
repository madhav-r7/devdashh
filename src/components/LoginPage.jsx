import React, { useState, useEffect } from 'react';
import { 
  User, 
  AtSign, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Layers, 
  Server, 
  Layout, 
  Cloud, 
  Cpu, 
  Shield, 
  Smartphone, 
  Zap, 
  ChevronRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { ROLES_LIST } from '../data/mockData';
import CareerDiagnosticModal from './CareerDiagnosticModal';

const DEFAULT_ACCOUNTS = [
  {
    name: 'V S Raveendran',
    username: 'raveendran',
    email: 'raveendran@nova.dev',
    password: 'password123',
    roleId: 'fullstack',
    roleTitle: 'Full Stack Developer',
    level: 'Intermediate',
    knownSkills: ['html', 'css', 'javascript', 'typescript', 'react', 'node', 'git', 'sql', 'rest-api'],
    overallProgress: 78
  },
  {
    name: 'Alex Rivera',
    username: 'alexrivera',
    email: 'alex@devpath.io',
    password: 'password123',
    roleId: 'backend',
    roleTitle: 'Backend Developer',
    level: 'Intermediate',
    knownSkills: ['html', 'css', 'javascript', 'python', 'git', 'sql', 'rest-api', 'auth'],
    overallProgress: 72
  },
  {
    name: 'Elena Rostova',
    username: 'elena_ai',
    email: 'elena@ai-labs.org',
    password: 'password123',
    roleId: 'data-ai',
    roleTitle: 'Data & AI Engineer',
    level: 'Advanced',
    knownSkills: ['python', 'sql', 'git', 'pandas', 'math-stats', 'ml-fundamentals', 'vector-db'],
    overallProgress: 85
  },
  {
    name: 'Marcus Chen',
    username: 'marcus_devops',
    email: 'marcus@cloudops.net',
    password: 'password123',
    roleId: 'devops',
    roleTitle: 'DevOps Engineer',
    level: 'Advanced',
    knownSkills: ['linux', 'git', 'python', 'bash', 'docker', 'kubernetes', 'terraform'],
    overallProgress: 80
  }
];

export default function LoginPage({ onLoginSuccess, setView, currentUser }) {
  const [activeTab, setActiveTab] = useState('register'); // 'login' | 'register'
  
  // Registration Form State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('fullstack');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCareerDiagnosticOpen, setIsCareerDiagnosticOpen] = useState(false);
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem('devpath_registered_users');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ACCOUNTS;
  });

  // Save users db to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('devpath_registered_users', JSON.stringify(usersDb));
    } catch (e) {
      console.error(e);
    }
  }, [usersDb]);

  // Username validation helper
  const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const isUsernameTaken = usersDb.some(u => u.username.toLowerCase() === cleanUsername);

  const getRoleIcon = (iconName) => {
    switch (iconName) {
      case 'Server': return <Server className="w-5 h-5 text-white" />;
      case 'Layout': return <Layout className="w-5 h-5 text-white" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-white" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-white" />;
      case 'Shield': return <Shield className="w-5 h-5 text-white" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-white" />;
      default: return <Briefcase className="w-5 h-5 text-white" />;
    }
  };

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!cleanUsername || cleanUsername.length < 3) {
      setErrorMessage('Please enter a valid unique username (minimum 3 characters).');
      return;
    }

    if (isUsernameTaken) {
      setErrorMessage(`Username "@${cleanUsername}" is already taken. Please choose another.`);
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const roleObj = ROLES_LIST.find(r => r.id === selectedRole) || ROLES_LIST[0];

    const newUser = {
      name: name.trim(),
      username: cleanUsername,
      email: email.trim().toLowerCase(),
      password,
      roleId: selectedRole,
      roleTitle: roleObj.title,
      level: experienceLevel,
      knownSkills: ['html', 'css', 'javascript', 'git'],
      overallProgress: 45
    };

    setUsersDb(prev => [...prev, newUser]);
    setSuccessMessage(`Account created successfully! Welcome, ${newUser.name}.`);

    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 600);
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const query = loginIdentifier.trim().toLowerCase().replace('@', '');
    if (!query) {
      setErrorMessage('Please enter your username or email.');
      return;
    }

    if (!loginPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const matchedUser = usersDb.find(u => 
      u.username.toLowerCase() === query || 
      u.email.toLowerCase() === query
    );

    if (!matchedUser) {
      setErrorMessage('No user account found with that username or email.');
      return;
    }

    if (matchedUser.password !== loginPassword) {
      setErrorMessage('Incorrect password. Please verify your credentials.');
      return;
    }

    setSuccessMessage(`Welcome back, ${matchedUser.name}! Logging you in...`);
    setTimeout(() => {
      onLoginSuccess(matchedUser);
    }, 600);
  };

  // Quick 1-Click Demo Login
  const handleQuickLogin = (demoAccount) => {
    setSuccessMessage(`Logging in as ${demoAccount.name}...`);
    setTimeout(() => {
      onLoginSuccess(demoAccount);
    }, 400);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Back to Home Button */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 z-10">
        <button
          onClick={() => setView('landing')}
          className="btn-secondary text-sm py-2.5 px-4 font-mono flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-mono font-bold text-sm logo-pulse-glow">
            /
          </div>
          <span className="font-display font-black text-white text-lg tracking-tight">DEVPATH OS</span>
        </div>
      </div>

      {/* Main Glass Card Container */}
      <div className="w-full max-w-4xl bg-[#09090f]/95 border-2 border-white/[0.22] rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col relative z-10 transition-all">
        
        {/* Top luminous flow accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 shadow-[0_0_20px_#ffffff]" />

        {/* Card Header & Tab Switcher */}
        <div className="p-8 sm:p-12 pb-6 border-b border-white/[0.12] bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="mono-tag text-xs sm:text-sm font-bold text-white border-white/40 bg-white/[0.12] px-3.5 py-1">
                  ✦ AUTHENTICATION GATEWAY
                </span>
                <span className="text-xs font-mono text-white/80 uppercase tracking-wider">
                  IDENT & CAREER ENGINE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight mt-3">
                {activeTab === 'register' ? 'Create Developer Identity' : 'Welcome Back, Engineer'}
              </h1>
              <p className="text-base sm:text-lg text-white/80 font-display mt-2">
                {activeTab === 'register' 
                  ? 'Set up your personalized name, unique username handle, credentials, and target career.' 
                  : 'Log in with your username or email to restore your personalized roadmap and career stats.'}
              </p>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="flex items-center p-1.5 rounded-2xl bg-white/[0.06] border border-white/[0.15] shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                }}
                className={`px-6 py-3 rounded-xl text-sm font-display font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.35)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
                className={`px-6 py-3 rounded-xl text-sm font-display font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.35)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="mx-8 sm:mx-12 mt-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-200 text-sm font-mono flex items-center gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-8 sm:mx-12 mt-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-sm font-mono flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-8 sm:p-12 space-y-8 flex-1">

          {/* TAB 1: REGISTRATION / CREATE ACCOUNT */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-8">
              
              {/* Row 1: Full Name & Unique Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Person's Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-bold text-white font-display">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. V S Raveendran"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/[0.2] rounded-2xl pl-12 pr-4 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-display shadow-inner transition-all"
                    />
                  </div>
                  <span className="text-xs font-mono text-white/60">Displayed on Passport, Dashboard & Proofs</span>
                </div>

                {/* Unique Username */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm sm:text-base font-bold text-white font-display">
                      Unique Username <span className="text-red-400">*</span>
                    </label>
                    {cleanUsername && (
                      <span className={`text-xs font-mono font-bold ${
                        isUsernameTaken ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {isUsernameTaken ? '✕ Already Taken' : '✓ Available'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <AtSign className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. raveendran"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full bg-black/60 border-2 rounded-2xl pl-12 pr-4 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none font-mono shadow-inner transition-all ${
                        isUsernameTaken 
                          ? 'border-red-500/80 focus:border-red-500' 
                          : cleanUsername 
                            ? 'border-emerald-400/80 focus:border-emerald-400' 
                            : 'border-white/[0.2] focus:border-white'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-mono text-white/60">Your unique handle: @{cleanUsername || 'username'}</span>
                </div>

              </div>

              {/* Row 2: Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-bold text-white font-display">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. raveendran@nova.dev"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/[0.2] rounded-2xl pl-12 pr-4 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-mono shadow-inner transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-bold text-white font-display">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/[0.2] rounded-2xl pl-12 pr-12 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-mono shadow-inner transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Row 3: Target Career Selection */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-base sm:text-lg font-bold text-white font-display">
                    Select Target Career Specialization <span className="text-red-400">*</span>
                  </label>
                  <span className="mono-tag text-xs font-bold text-white border-white/30 bg-white/[0.1] px-3 py-1">
                    ROADMAP WILL SYNC AUTOMATICALLY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {ROLES_LIST.map((role) => {
                    const isSelected = selectedRole === role.id;
                    return (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-[1.02]'
                            : 'bg-white/[0.04] border-white/[0.14] text-white hover:border-white/60 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-black text-white' : 'bg-white/[0.1] text-white border border-white/20'
                          }`}>
                            {getRoleIcon(role.icon)}
                          </div>
                          <div>
                            <div className="font-bold font-display text-sm leading-tight">{role.title}</div>
                            <div className={`text-xs font-mono mt-0.5 ${isSelected ? 'text-black/75 font-semibold' : 'text-white/60'}`}>
                              {role.requiredSkillsCount} Milestones
                            </div>
                          </div>
                        </div>

                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-black text-white' : 'border border-white/30'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Option Below Career Options: "I don't know what to learn — Diagnose" */}
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/[0.06] border border-white/[0.22] hover:border-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_#ffffff]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white font-display">
                        I don't know what to learn — Diagnose
                      </div>
                      <p className="text-xs text-white/70">Take a 3-question diagnostic to calculate and auto-select your ideal engineering role.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCareerDiagnosticOpen(true)}
                    className="btn-secondary text-xs sm:text-sm py-2.5 px-4 font-mono font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Diagnose Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Submit Registration Button */}
              <div className="pt-4 border-t border-white/[0.12] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-white/70">
                  By creating an account, your passport will be minted immediately.
                </div>

                <button
                  type="submit"
                  className="btn-primary text-base sm:text-lg py-4 px-10 font-display font-extrabold rounded-2xl shadow-[0_0_35px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>Create Account & Enter OS</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: SIGN IN (LOGIN) */}
          {activeTab === 'login' && (
            <div className="space-y-8">
              
              <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Username or Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-bold text-white font-display">
                    Username or Email Address
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. raveendran or raveendran@nova.dev"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/[0.2] rounded-2xl pl-12 pr-4 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-mono shadow-inner transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-bold text-white font-display">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/[0.2] rounded-2xl pl-12 pr-12 py-4 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-mono shadow-inner transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  className="btn-primary w-full text-base sm:text-lg py-4.5 px-8 font-display font-extrabold rounded-2xl shadow-[0_0_35px_rgba(255,255,255,0.35)] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <LogIn className="w-5 h-5 text-black" />
                  <span>Sign In & Restore My Roadmap</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>

              </form>

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-6 border-t border-white/[0.12] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono text-white/80 font-bold uppercase tracking-wider">
                    ⚡ Quick 1-Click Demo Profiles
                  </span>
                  <span className="text-xs font-mono text-white/50">Instant profile switch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {usersDb.slice(0, 4).map((acc) => (
                    <div
                      key={acc.username}
                      onClick={() => handleQuickLogin(acc)}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.16] hover:border-white hover:bg-white/[0.12] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.1] border border-white/20 flex items-center justify-center text-sm font-bold font-mono text-white group-hover:bg-white group-hover:text-black transition-all">
                          {acc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-white font-display text-base group-hover:text-white flex items-center gap-2">
                            <span>{acc.name}</span>
                            <span className="text-xs font-mono text-white/60 font-normal">@{acc.username}</span>
                          </div>
                          <div className="text-xs font-mono text-white/80 mt-0.5">
                            {acc.roleTitle} · <span className="text-white font-bold">{acc.overallProgress}%</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Career Diagnostic Modal */}
      <CareerDiagnosticModal
        isOpen={isCareerDiagnosticOpen}
        onClose={() => setIsCareerDiagnosticOpen(false)}
        onSelectRole={(roleId) => setSelectedRole(roleId)}
      />

    </div>
  );
}
