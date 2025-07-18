
'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const navItems = [
    { id: 'hero', label: 'INIT', icon: 'ri-home-line', color: 'from-purple-500 to-pink-500' },
    { id: 'about', label: 'PROFILE', icon: 'ri-user-line', color: 'from-blue-500 to-cyan-500' },
    { id: 'skills', label: 'ABILITIES', icon: 'ri-tools-line', color: 'from-green-500 to-emerald-500' },
    { id: 'projects', label: 'ARCHIVES', icon: 'ri-folder-line', color: 'from-orange-500 to-red-500' },
    { id: 'games', label: 'SIMULATIONS', icon: 'ri-gamepad-line', color: 'from-yellow-500 to-orange-500' },
    { id: 'contact', label: 'CONNECT', icon: 'ri-mail-line', color: 'from-pink-500 to-purple-500' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(glitchInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/20' 
          : 'bg-gradient-to-b from-black/50 to-transparent'
      } ${glitchActive ? 'animate-nav-glitch' : ''}`}>
        
        {/* Holographic scanline */}
        <div className="absolute inset-0 animate-nav-scanline pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
              className="text-2xl font-bold cursor-pointer relative group animate-logo-matrix"
              onClick={() => scrollToSection('hero')}
            >
              <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-logo-spectrum font-mono">
                {'<BHUVAN B KRISHNA>'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-lg group-hover:blur-xl transition-all duration-300 animate-logo-aura"></div>
              
              {/* Glitch effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-200">
                <span className="absolute inset-0 text-purple-400 transform translate-x-1 animate-glitch-1">{'<BHUVAN/>'}</span>
                <span className="absolute inset-0 text-cyan-400 transform -translate-x-1 animate-glitch-2">{'<BHUVAN/>'}</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 cursor-pointer whitespace-nowrap overflow-hidden ${
                    activeSection === item.id
                      ? 'text-white animate-nav-active'
                      : 'text-gray-300 hover:text-white animate-nav-hover'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <div className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                      activeSection === item.id ? 'animate-icon-matrix' : ''
                    }`}>
                      <i className={`${item.icon} text-sm transition-transform duration-300 ${
                        activeSection === item.id ? 'animate-icon-pulse' : 'group-hover:animate-icon-bounce'
                      }`}></i>
                    </div>
                    <span className="font-mono">{item.label}</span>
                  </div>
                  
                  {/* Active background */}
                  {activeSection === item.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 animate-nav-bg-flow`}>
                      <div className="absolute inset-0 animate-nav-energy-pulse"></div>
                    </div>
                  )}
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Border animation */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 rounded-lg transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center text-white hover:bg-purple-500/20 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="relative z-10">
                <i className={`text-xl transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'ri-close-line animate-mobile-close' 
                    : 'ri-menu-line animate-mobile-menu'
                }`}></i>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-mobile-bg-pulse"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 animate-mobile-menu-expand' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/98 backdrop-blur-xl border-t border-purple-500/30">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg text-left transition-all duration-500 cursor-pointer group overflow-hidden ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center transition-all duration-300 ${
                      activeSection === item.id ? 'animate-mobile-icon-active' : 'group-hover:animate-mobile-icon-hover'
                    }`}>
                      <i className={`${item.icon} text-lg text-white`}></i>
                    </div>
                    {activeSection === item.id && (
                      <div className="absolute inset-0 bg-white/20 rounded-lg animate-mobile-active-glow"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-mono font-medium">{item.label}</span>
                    <div className="text-xs text-gray-400 font-mono">{item.id}.exe</div>
                  </div>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Quantum Navigation Dots */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="space-y-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
              title={item.label}
            >
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 relative ${
                activeSection === item.id
                  ? 'bg-gradient-to-r ' + item.color + ' border-transparent animate-dot-quantum-active'
                  : 'bg-transparent border-gray-500 hover:border-purple-400 animate-dot-quantum-idle'
              }`}>
                {/* Quantum field effect */}
                <div className="absolute inset-0 rounded-full animate-dot-quantum-field"></div>
                
                {/* Active pulse */}
                {activeSection === item.id && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} animate-dot-energy-burst`}></div>
                )}
              </div>
              
              {/* Holographic tooltip */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono border border-purple-500/30 animate-tooltip-holographic">
                <span className="text-purple-400">{'>'}</span> {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-purple-500/30"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes nav-glitch {
          0%, 90%, 100% { transform: translateX(0); }
          92% { transform: translateX(2px); }
          94% { transform: translateX(-2px); }
          96% { transform: translateX(1px); }
        }
        
        @keyframes nav-scanline {
          0% { background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); transform: translateX(-100%); }
          100% { background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); transform: translateX(100%); }
        }
        
        @keyframes logo-matrix {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes logo-spectrum {
          0% { filter: hue-rotate(0deg) brightness(1); }
          25% { filter: hue-rotate(90deg) brightness(1.2); }
          50% { filter: hue-rotate(180deg) brightness(1.5); }
          75% { filter: hue-rotate(270deg) brightness(1.2); }
          100% { filter: hue-rotate(360deg) brightness(1); }
        }
        
        @keyframes logo-aura {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(2px, 1px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(-1px, -2px); }
        }
        
        @keyframes nav-active {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes nav-hover {
          0% { transform: translateY(5px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes icon-matrix {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes nav-bg-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes nav-energy-pulse {
          0%, 100% { 
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            transform: scale(1);
          }
          50% { 
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
            transform: scale(1.1);
          }
        }
        
        @keyframes mobile-close {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(180deg); }
        }
        
        @keyframes mobile-menu {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes mobile-bg-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes mobile-menu-expand {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes mobile-icon-active {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes mobile-icon-hover {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes mobile-active-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes dot-quantum-active {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          }
          50% { 
            transform: scale(1.3);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(6, 182, 212, 0.4);
          }
        }
        
        @keyframes dot-quantum-idle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes dot-quantum-field {
          0%, 100% { 
            background: radial-gradient(circle, transparent 0%, rgba(168, 85, 247, 0.1) 100%);
            transform: scale(1);
          }
          50% { 
            background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 100%);
            transform: scale(2);
          }
        }
        
        @keyframes dot-energy-burst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes tooltip-holographic {
          0% { 
            transform: translate(10px, -50%) scale(0.8);
            opacity: 0;
            filter: blur(2px);
          }
          100% { 
            transform: translate(0, -50%) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
        }
        
        .animate-nav-glitch { animation: nav-glitch 0.2s ease-in-out; }
        .animate-nav-scanline { animation: nav-scanline 8s linear infinite; }
        .animate-logo-matrix { animation: logo-matrix 2s ease-out; }
        .animate-logo-spectrum { animation: logo-spectrum 6s linear infinite; }
        .animate-logo-aura { animation: logo-aura 3s ease-in-out infinite; }
        .animate-glitch-1 { animation: glitch-1 0.3s ease-in-out infinite; }
        .animate-glitch-2 { animation: glitch-2 0.3s ease-in-out infinite reverse; }
        .animate-nav-active { animation: nav-active 0.3s ease-out; }
        .animate-nav-hover { animation: nav-hover 0.3s ease-out; }
        .animate-icon-matrix { animation: icon-matrix 1s ease-in-out; }
        .animate-icon-pulse { animation: icon-pulse 0.6s ease-in-out; }
        .animate-icon-bounce { animation: icon-bounce 0.5s ease-in-out; }
        .animate-nav-bg-flow { 
          background-size: 200% 100%;
          animation: nav-bg-flow 3s linear infinite;
        }
        .animate-nav-energy-pulse { animation: nav-energy-pulse 2s ease-in-out infinite; }
        .animate-mobile-close { animation: mobile-close 0.3s ease-in-out; }
        .animate-mobile-menu { animation: mobile-menu 2s ease-in-out infinite; }
        .animate-mobile-bg-pulse { animation: mobile-bg-pulse 2s ease-in-out infinite; }
        .animate-mobile-menu-expand { animation: mobile-menu-expand 0.4s ease-out; }
        .animate-mobile-icon-active { animation: mobile-icon-active 1s ease-in-out; }
        .animate-mobile-icon-hover { animation: mobile-icon-hover 0.5s ease-in-out; }
        .animate-mobile-active-glow { animation: mobile-active-glow 2s ease-in-out infinite; }
        .animate-dot-quantum-active { animation: dot-quantum-active 2s ease-in-out infinite; }
        .animate-dot-quantum-idle { animation: dot-quantum-idle 4s ease-in-out infinite; }
        .animate-dot-quantum-field { animation: dot-quantum-field 3s ease-in-out infinite; }
        .animate-dot-energy-burst { animation: dot-energy-burst 0.8s ease-out infinite; }
        .animate-tooltip-holographic { animation: tooltip-holographic 0.3s ease-out; }
      `}</style>
    </>
  );
}