'use client';

import React, { useEffect, useRef, useState } from 'react';

type Particle = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[] | null>(null);
  const [isHolographic, setIsHolographic] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const text = "I am a Game Developer and a Game Designer";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only run on client
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  if (!particles) return null; // Don't render until client

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Interactive Neural Network Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Quantum Field Effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-quantum-field"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Holographic Distortion Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isHolographic ? 'animate-holographic-distortion' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(168, 85, 247, 0.2) 0%, 
            rgba(236, 72, 153, 0.1) 25%, 
            transparent 50%)
          `
        }}
      />

      {/* Reality Glitch Overlay */}
      <div className="absolute inset-0 animate-reality-glitch opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform skew-x-12"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <p className="text-purple-400 text-lg animate-quantum-emergence">Initialize.Protocol</p>
              <h1 className="text-5xl lg:text-7xl font-bold animate-matrix-text">
                <span className={`bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-color-spectrum ${
                  isHolographic ? 'animate-holographic-text' : ''
                }`}>
                  BHUVAN.EXE
                </span>
              </h1>
              <div className="text-2xl lg:text-3xl text-gray-300 h-16 relative">
                <span className="absolute inset-0 animate-code-stream opacity-30">
                  {'>'} {Array(20).fill('█').join('')}
                </span>
                <span className="relative z-10">
                  {'>'} <span className="text-purple-400 font-mono animate-neural-pulse">{text}</span>
                  <span className="animate-cursor-matrix">▋</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed animate-data-stream">
                <span className="text-cyan-400 font-mono">LOADING: </span>
                Next-gen game development protocols initialized. 
                Reality.js framework active. Quantum creativity algorithms engaged.
              </p>
              
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/30 font-mono text-sm animate-terminal-boot">
                <div className="text-green-400">root@future:~$ ./initialize_portfolio.sh</div>
                <div className="text-yellow-400">Loading consciousness matrix...</div>
                <div className="text-cyan-400">Creativity level: MAXIMUM</div>
                <div className="text-purple-400">Innovation status: REVOLUTIONARY</div>
                <div className="text-green-400">System ready. Welcome to the future.</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-quantum-buttons">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10">ENTER_MATRIX</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 animate-button-scan"></div>
              </button>
              <button 
                onClick={() => scrollToSection('games')}
                className="group relative border-2 border-purple-500 hover:border-cyan-400 bg-transparent hover:bg-purple-500/20 px-8 py-4 rounded-full text-white font-semibold transition-all duration-500 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10">PLAY_GAMES</span>
                <div className="absolute inset-0 animate-border-flow"></div>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden animate-dimensional-shift">
              {/* Holographic frame */}
              <div className="absolute inset-0 border-4 border-purple-500/50 rounded-2xl animate-holographic-border"></div>
              <div className="absolute inset-2 border-2 border-cyan-400/30 rounded-xl animate-pulse"></div>
              
              <img 
                src="https://readdy.ai/api/search-image?query=Futuristic%20holographic%20workspace%20with%20floating%20screens%20displaying%20colorful%20code%20and%20game%20development%20interfaces%2C%20cyberpunk%20aesthetic%2C%20neon%20purple%20and%20cyan%20lighting%2C%20advanced%20technology%20setup%2C%20multiple%20floating%20displays%2C%20digital%20particle%20effects%2C%20sci-fi%20atmosphere&width=600&height=400&seq=hero-futuristic&orientation=landscape"
                alt="Futuristic Development Environment"
                className="w-full h-full object-cover object-top transition-all duration-1000 hover:scale-110"
                style={{
                  filter: isHolographic ? 'hue-rotate(90deg) contrast(1.2) brightness(1.1)' : 'none'
                }}
              />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 animate-scanlines pointer-events-none"></div>
              
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-cyan-900/30 animate-holographic-overlay"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 animate-float-complex">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin-3d opacity-80"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-counter-spin opacity-60"></div>
                <div className="absolute inset-8 bg-white rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xl">∞</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-24 h-24 animate-geometric-morph">
              <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 transform rotate-45 animate-shape-shift"></div>
            </div>
            
            <div className="absolute top-1/2 -left-12 w-16 h-16 animate-energy-orb">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes quantum-field {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.5);
            opacity: 1;
          }
          50% { 
            transform: translateY(-60px) translateX(-10px) rotate(180deg) scale(0.8);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(-30px) translateX(-25px) rotate(270deg) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes holographic-distortion {
          0%, 100% { 
            transform: scaleX(1) skewY(0deg);
            filter: hue-rotate(0deg);
          }
          33% { 
            transform: scaleX(1.02) skewY(0.5deg);
            filter: hue-rotate(120deg);
          }
          66% { 
            transform: scaleX(0.98) skewY(-0.5deg);
            filter: hue-rotate(240deg);
          }
        }
        
        @keyframes reality-glitch {
          0%, 90%, 100% { 
            transform: translateX(0) scaleX(1);
            opacity: 0;
          }
          95% { 
            transform: translateX(5px) scaleX(1.01);
            opacity: 0.3;
          }
          97% { 
            transform: translateX(-3px) scaleX(0.99);
            opacity: 0.2;
          }
        }
        
        @keyframes matrix-text {
          0% { 
            transform: translateY(50px) rotateX(-15deg);
            opacity: 0;
            filter: blur(5px);
          }
          100% { 
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }
        
        @keyframes holographic-text {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.8),
                        2px 2px 0px rgba(236, 72, 153, 0.3),
                        -2px -2px 0px rgba(6, 182, 212, 0.3);
          }
          50% { 
            text-shadow: 0 0 30px rgba(6, 182, 212, 1),
                        3px 3px 0px rgba(168, 85, 247, 0.4),
                        -3px -3px 0px rgba(236, 72, 153, 0.4);
          }
        }
        
        @keyframes color-spectrum {
          0% { filter: hue-rotate(0deg) saturate(1); }
          25% { filter: hue-rotate(90deg) saturate(1.2); }
          50% { filter: hue-rotate(180deg) saturate(1.5); }
          75% { filter: hue-rotate(270deg) saturate(1.2); }
          100% { filter: hue-rotate(360deg) saturate(1); }
        }
        
        @keyframes quantum-emergence {
          0% { 
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
            filter: blur(10px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes code-stream {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes neural-pulse {
          0%, 100% { 
            color: #a855f7;
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          }
          50% { 
            color: #06b6d4;
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
          }
        }
        
        @keyframes cursor-matrix {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes data-stream {
          0% { 
            opacity: 0;
            transform: translateX(-30px);
            filter: blur(3px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
        }
        
        @keyframes terminal-boot {
          0% { 
            opacity: 0;
            transform: scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes quantum-buttons {
          0% { 
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes button-scan {
          0% { 
            transform: translateX(-100%) skewX(-45deg);
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          }
          100% { 
            transform: translateX(200%) skewX(-45deg);
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          }
        }
        
        @keyframes border-flow {
          0% { 
            background: linear-gradient(0deg, transparent, transparent);
          }
          25% { 
            background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
          }
          50% { 
            background: linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.3), transparent);
          }
          75% { 
            background: linear-gradient(270deg, transparent, rgba(236, 72, 153, 0.3), transparent);
          }
          100% { 
            background: linear-gradient(360deg, transparent, transparent);
          }
        }
        
        @keyframes dimensional-shift {
          0% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
          }
          100% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
          }
        }
        
        @keyframes holographic-border {
          0%, 100% { 
            border-color: rgba(168, 85, 247, 0.5);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          25% { 
            border-color: rgba(6, 182, 212, 0.5);
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);
          }
          50% { 
            border-color: rgba(236, 72, 153, 0.5);
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
          }
          75% { 
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.4);
          }
        }
        
        @keyframes scanlines {
          0% { 
            background: linear-gradient(0deg, transparent 98%, rgba(6, 182, 212, 0.2) 100%);
            transform: translateY(-100%);
          }
          100% { 
            background: linear-gradient(0deg, transparent 98%, rgba(6, 182, 212, 0.2) 100%);
            transform: translateY(100vh);
          }
        }
        
        @keyframes holographic-overlay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% { 
            transform: translateY(-40px) translateX(-5px) rotate(180deg);
          }
          75% { 
            transform: translateY(-20px) translateX(-15px) rotate(270deg);
          }
        }
        
        @keyframes spin-3d {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }
        
        @keyframes counter-spin {
          0% { transform: rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateY(-360deg) rotateZ(-360deg); }
        }
        
        @keyframes geometric-morph {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
            border-radius: 0%;
          }
          25% { 
            transform: rotate(90deg) scale(1.2);
            border-radius: 25%;
          }
          50% { 
            transform: rotate(180deg) scale(0.8);
            border-radius: 50%;
          }
          75% { 
            transform: rotate(270deg) scale(1.1);
            border-radius: 25%;
          }
        }
        
        @keyframes shape-shift {
          0%, 100% { 
            transform: rotate(45deg) scale(1);
            border-radius: 0%;
          }
          50% { 
            transform: rotate(225deg) scale(1.3);
            border-radius: 50%;
          }
        }
        
        @keyframes energy-orb {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            filter: hue-rotate(0deg);
          }
          50% { 
            transform: translateY(-25px) scale(1.2);
            filter: hue-rotate(180deg);
          }
        }
        
        .animate-quantum-field { animation: quantum-field linear infinite; }
        .animate-holographic-distortion { animation: holographic-distortion 2s ease-in-out infinite; }
        .animate-reality-glitch { animation: reality-glitch 3s infinite; }
        .animate-matrix-text { animation: matrix-text 1.5s ease-out; }
        .animate-holographic-text { animation: holographic-text 2s ease-in-out infinite; }
        .animate-color-spectrum { animation: color-spectrum 8s linear infinite; }
        .animate-quantum-emergence { animation: quantum-emergence 1.2s ease-out 0.3s both; }
        .animate-code-stream { animation: code-stream 3s linear infinite; }
        .animate-neural-pulse { animation: neural-pulse 2s ease-in-out infinite; }
        .animate-cursor-matrix { animation: cursor-matrix 1s infinite; }
        .animate-data-stream { animation: data-stream 1s ease-out 0.8s both; }
        .animate-terminal-boot { animation: terminal-boot 1s ease-out 1.2s both; }
        .animate-quantum-buttons { animation: quantum-buttons 1s ease-out 1.8s both; }
        .animate-button-scan { animation: button-scan 2s ease-in-out infinite; }
        .animate-border-flow { animation: border-flow 3s linear infinite; }
        .animate-dimensional-shift { animation: dimensional-shift 1.8s ease-out 0.5s both; }
        .animate-holographic-border { animation: holographic-border 4s ease-in-out infinite; }
        .animate-scanlines { animation: scanlines 3s linear infinite; }
        .animate-holographic-overlay { animation: holographic-overlay 2s ease-in-out infinite; }
        .animate-float-complex { animation: float-complex 8s ease-in-out infinite; }
        .animate-spin-3d { animation: spin-3d 20s linear infinite; }
        .animate-counter-spin { animation: counter-spin 15s linear infinite; }
        .animate-geometric-morph { animation: geometric-morph 6s ease-in-out infinite; }
        .animate-shape-shift { animation: shape-shift 4s ease-in-out infinite; }
        .animate-energy-orb { animation: energy-orb 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}