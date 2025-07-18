'use client';

import { useState, useEffect, useRef } from 'react';
import NumberGuessingGame from './games/NumberGuessingGame';
import MemoryCardGame from './games/MemoryCardGame';
import SnakeGame from './games/SnakeGame';

const newParticles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  vx: Math.random() * 2 - 1,
  vy: Math.random() * 2 - 1,
  hue: Math.random() * 360,
  size: Math.random() * 10 + 5,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  animationDelay: Math.random() * 1000,
  animationDuration: Math.random() * 3000 + 2000,
}));
interface QuantumParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  size?: number;
  color?: string;
  animationDelay?: string;
  animationDuration?: string;
}


export default function MiniGamesSection() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [quantumParticles, setQuantumParticles] = useState<QuantumParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const games = [
    {
      id: 'number-guess',
      title: 'Quantum Number Matrix',
      description: 'Navigate through dimensional probability fields to discover the hidden numerical sequence!',
      icon: 'ri-hashtag',
      color: 'from-blue-500 via-cyan-400 to-purple-500',
      component: NumberGuessingGame,
      glowColor: 'rgba(59, 130, 246, 0.8)',
      theme: 'cyber-blue'
    },
    {
      id: 'memory-cards',
      title: 'Neural Memory Protocol',
      description: 'Synchronize your cognitive patterns with the holographic memory matrix interface!',
      icon: 'ri-brain-line',
      color: 'from-purple-500 via-pink-400 to-red-500',
      component: MemoryCardGame,
      glowColor: 'rgba(168, 85, 247, 0.8)',
      theme: 'cyber-purple'
    },
    {
      id: 'snake',
      title: 'Digital Serpent Evolution',
      description: 'Guide the bio-digital entity through the neon-lit data streams of cyberspace!',
      icon: 'ri-gamepad-line',
      color: 'from-green-500 via-emerald-400 to-teal-500',
      component: SnakeGame,
      glowColor: 'rgba(16, 185, 129, 0.8)',
      theme: 'cyber-green'
    }
  ];

  // Quantum particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createQuantumField = () => {
      const newParticles = Array.from({length: 80}, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.random() * 360
      }));
      setQuantumParticles(newParticles);
    };

    createQuantumField();

    const animateQuantumField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      quantumParticles.forEach((particle, i) => {
        // Draw quantum connections
        quantumParticles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.4;
            const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y);
            gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${otherParticle.hue}, 80%, 60%, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
        
        // Draw quantum particles
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 12);
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, 0.9)`);
        gradient.addColorStop(0.7, `hsla(${particle.hue}, 100%, 50%, 0.6)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 30%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.hue += 1;
        
        // Boundary conditions
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
      
      requestAnimationFrame(animateQuantumField);
    };

    animateQuantumField();
  }, [quantumParticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('games');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const closeGame = () => {
    setActiveGame(null);
  };

  const ActiveGameComponent = games.find(game => game.id === activeGame)?.component;

  // Reduce number of animated elements for performance
  useEffect(() => {
    // Only run once on mount
    // Reduce complexity: fewer particles, simpler logic
    const particles: QuantumParticle[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      hue: Math.floor(Math.random() * 360),
      size: 8 + Math.random() * 8,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 3}s`,
    }));
    setQuantumParticles(particles);
  }, []);

  return (
    <section id="games" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Quantum Field Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }}></div>
      </div>

      {/* Reality Distortion Fields */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-reality-distortion"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
              background: `radial-gradient(circle, rgba(168, 85, 247, ${0.1 - i * 0.01}) 0%, transparent 70%)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-cyber-title-emergence' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold text-white mb-4 font-mono">
              <span className="relative">
                {'<'}<span className="text-purple-400 animate-cyber-text-glow">SIMULATION</span>{'/>'}
                <span className="text-cyan-400 animate-cyber-text-glow-alt">PROTOCOLS</span>
                <div className="absolute inset-0 animate-text-hologram"></div>
              </span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 blur-xl animate-title-aura"></div>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 mx-auto mb-6 animate-cyber-line-expand"></div>
          
          <p className="text-gray-300 text-xl max-w-3xl mx-auto font-mono animate-data-stream-text">
            <span className="text-green-400">{'>'}</span> ACCESSING NEURAL GAMING INTERFACES...
            <br />
            <span className="text-cyan-400">{'>'}</span> REALITY.JS LOADED • QUANTUM ENTERTAINMENT PROTOCOLS ACTIVE
          </p>
        </div>

        {!activeGame ? (
          <div className="grid md:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`group relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all duration-700 cursor-pointer overflow-hidden animate-game-card-matrix ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } ${hoveredGame === game.id ? 'border-purple-400/80 transform scale-105' : 'border-purple-500/30 hover:border-cyan-400/60'}`}
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => setActiveGame(game.id)}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Scanning Lines */}
                <div className="absolute inset-0 animate-scan-lines pointer-events-none"></div>
                
                {/* Game Icon */}
                <div className="relative mb-6 mx-auto w-20 h-20">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${game.color} animate-icon-quantum-field`}></div>
                  <div className="relative w-full h-full rounded-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
                    <i className={`${game.icon} text-3xl text-white transition-all duration-500 ${
                      hoveredGame === game.id ? 'animate-icon-cyber-pulse' : ''
                    }`}></i>
                  </div>
                  
                  {/* Quantum Particles */}
                  {hoveredGame === game.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-quantum-particles"
                          style={{
                            left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 35}%`,
                            top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 35}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Game Title */}
                <h3 className={`text-xl font-bold text-white text-center mb-4 font-mono transition-all duration-500 ${
                  hoveredGame === game.id ? 'animate-title-cyber-glow' : ''
                }`}>
                  {game.title}
                </h3>
                
                {/* Game Description */}
                <p className={`text-gray-300 text-center mb-6 leading-relaxed transition-all duration-500 ${
                  hoveredGame === game.id ? 'text-gray-200 animate-description-cyber-pulse' : ''
                }`}>
                  {game.description}
                </p>
                
                {/* Launch Button */}
                <div className="text-center">
                  <button className={`relative bg-gradient-to-r ${game.color} hover:shadow-xl px-8 py-3 rounded-full text-white font-bold font-mono transition-all duration-500 whitespace-nowrap overflow-hidden group-hover:animate-button-cyber-pulse`}>
                    <span className="relative z-10">INITIALIZE_PROTOCOL</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-button-cyber-shine transition-opacity duration-500"></div>
                  </button>
                </div>
                
                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/40 animate-game-modal-cyber-appear relative overflow-hidden">
            {/* Modal Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 animate-modal-bg-flow"></div>
            <div className="absolute inset-0 animate-modal-scan-lines pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-3xl font-bold text-white font-mono animate-modal-title-cyber">
                <span className="text-cyan-400">{'>'}</span> {games.find(game => game.id === activeGame)?.title}
                <span className="text-purple-400">.exe</span>
              </h3>
              <button
                onClick={closeGame}
                className="relative w-12 h-12 bg-red-500/20 hover:bg-red-500/40 border-2 border-red-500/50 hover:border-red-400 rounded-lg flex items-center justify-center text-white transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <i className="ri-close-line text-2xl relative z-10 transition-transform duration-300 group-hover:rotate-90"></i>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-close-button-pulse"></div>
              </button>
            </div>
            
            <div className="animate-game-content-cyber-fade relative z-10">
              {ActiveGameComponent && <ActiveGameComponent />}
            </div>
          </div>
        )}

        {/* Cyber Stats Dashboard */}
        <div className={`mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 animate-stats-hologram"></div>
            
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono">
              <span className="text-green-400">{'>'}</span> DEVELOPMENT_STATISTICS.LOG
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {[
                { label: 'NEURAL_NETWORKS', value: '∞', icon: 'ri-brain-line', color: 'text-purple-400' },
                { label: 'CODE_FRAGMENTS', value: '9999+', icon: 'ri-code-line', color: 'text-cyan-400' },
                { label: 'QUANTUM_HOURS', value: '∞', icon: 'ri-time-line', color: 'text-green-400' },
                { label: 'BUGS_ELIMINATED', value: 'NaN', icon: 'ri-bug-line', color: 'text-pink-400' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group animate-stat-cyber-emerge relative"
                  style={{ animationDelay: `${1.5 + index * 0.2}s` }}
                >
                  <div className="relative mb-3">
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center group-hover:animate-stat-icon-cyber-spin transition-all duration-500 border border-purple-500/30 group-hover:border-cyan-400/60`}>
                      <i className={`${stat.icon} text-xl ${stat.color} group-hover:animate-stat-icon-pulse`}></i>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-stat-glow"></div>
                  </div>
                  
                  <div className={`text-2xl font-bold ${stat.color} mb-2 font-mono group-hover:animate-stat-value-cyber-pulse`}>
                    {stat.value}
                  </div>
                  
                  <div className="text-sm text-gray-400 font-mono group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reduce number of animated elements for performance */}
      <div className="relative h-64 w-full overflow-hidden">
        {quantumParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              filter: 'blur(2px)',
              opacity: 0.7,
              animationName: 'quantum-float',
              animationDuration: particle.animationDuration,
              animationDelay: particle.animationDelay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes grid-flow {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        
        @keyframes reality-distortion {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.5) rotate(180deg);
            opacity: 0.1;
          }
        }
        
        @keyframes cyber-title-emergence {
          0% { 
            opacity: 0;
            transform: translateY(-100px) scale(0.5) rotateX(-90deg);
            filter: blur(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes cyber-text-glow {
          0%, 100% { 
            color: #a855f7;
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4);
          }
          50% { 
            color: #06b6d4;
            text-shadow: 0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(6, 182, 212, 0.6);
          }
        }
        
        @keyframes cyber-text-glow-alt {
          0%, 100% { 
            color: #06b6d4;
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4);
          }
          50% { 
            color: #ec4899;
            text-shadow: 0 0 30px rgba(236, 72, 153, 1), 0 0 60px rgba(236, 72, 153, 0.6);
          }
        }
        
        @keyframes text-hologram {
          0%, 90%, 100% { 
            background: transparent;
          }
          95% { 
            background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
          }
        }
        
        @keyframes title-aura {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes cyber-line-expand {
          0% { 
            width: 0;
            filter: hue-rotate(0deg);
          }
          100% { 
            width: 8rem;
            filter: hue-rotate(360deg);
          }
        }
        
        @keyframes data-stream-text {
          0% { 
            opacity: 0;
            transform: translateX(-50px);
            filter: blur(5px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
        }
        
        @keyframes game-card-matrix {
          0% { 
            opacity: 0;
            transform: translateY(100px) rotateX(-30deg) scale(0.8);
            filter: blur(10px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes scan-lines {
          0% { 
            background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%);
            transform: translateY(-100%);
          }
          100% { 
            background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%);
            transform: translateY(200%);
          }
        }
        
        @keyframes icon-quantum-field {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(236, 72, 153, 0.4);
          }
        }
        
        @keyframes icon-cyber-pulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% { 
            transform: scale(1.3) rotate(180deg);
            filter: hue-rotate(180deg);
          }
        }
        
        @keyframes quantum-particles {
          0% { 
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% { 
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes title-cyber-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          50% { 
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(168, 85, 247, 0.6);
          }
        }
        
        @keyframes description-cyber-pulse {
          0%, 100% { 
            color: #d1d5db;
          }
          50% { 
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
        }
        
        @keyframes button-cyber-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(168, 85, 247, 0.6);
          }
        }
        
        @keyframes button-cyber-shine {
          0% { 
            transform: translateX(-100%) skewX(-20deg);
          }
          100% { 
            transform: translateX(200%) skewX(-20deg);
          }
        }
        
        @keyframes game-modal-cyber-appear {
          0% { 
            opacity: 0;
            transform: scale(0.3) rotateY(-90deg);
            filter: blur(20px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) rotateY(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes modal-bg-flow {
          0% { 
            background-position: 0% 0%;
          }
          100% { 
            background-position: 100% 100%;
          }
        }
        
        @keyframes modal-scan-lines {
          0% { 
            background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%);
            transform: translateX(-100%);
          }
          100% { 
            background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%);
            transform: translateX(100%);
          }
        }
        
        @keyframes modal-title-cyber {
          0% { 
            opacity: 0;
            transform: translateX(-50px);
            filter: blur(5px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
        }
        
        @keyframes close-button-pulse {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.8;
          }
        }
        
        @keyframes game-content-cyber-fade {
          0% { 
            opacity: 0;
            transform: translateY(30px);
            filter: blur(3px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        
        @keyframes stats-hologram {
          0%, 90%, 100% { 
            background: transparent;
          }
          95% { 
            background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
          }
        }
        
        @keyframes stat-cyber-emerge {
          0% { 
            opacity: 0;
            transform: translateY(50px) scale(0.5);
            filter: blur(10px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes stat-icon-cyber-spin {
          0% { 
            transform: rotateY(0deg) scale(1);
          }
          100% { 
            transform: rotateY(360deg) scale(1.1);
          }
        }
        
        @keyframes stat-icon-pulse {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.2);
          }
        }
        
        @keyframes stat-glow {
          0%, 100% { 
            opacity: 0.2;
          }
          50% { 
            opacity: 0.6;
          }
        }
        
        @keyframes stat-value-cyber-pulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.1);
            filter: brightness(1.3);
          }
        }
        
        .animate-reality-distortion { animation: reality-distortion ease-in-out infinite; }
        .animate-cyber-title-emergence { animation: cyber-title-emergence 2s ease-out; }
        .animate-cyber-text-glow { animation: cyber-text-glow 3s ease-in-out infinite; }
        .animate-cyber-text-glow-alt { animation: cyber-text-glow-alt 3s ease-in-out infinite 1.5s; }
        .animate-text-hologram { animation: text-hologram 5s linear infinite; }
        .animate-title-aura { animation: title-aura 4s ease-in-out infinite; }
        .animate-cyber-line-expand { animation: cyber-line-expand 2s ease-out 1s both; }
        .animate-data-stream-text { animation: data-stream-text 1.5s ease-out 1.5s both; }
        .animate-game-card-matrix { animation: game-card-matrix 1s ease-out both; }
        .animate-scan-lines { animation: scan-lines 4s linear infinite; }
        .animate-icon-quantum-field { animation: icon-quantum-field 3s ease-in-out infinite; }
        .animate-icon-cyber-pulse { animation: icon-cyber-pulse 1s ease-in-out; }
        .animate-quantum-particles { animation: quantum-particles 2s ease-in-out infinite; }
        .animate-title-cyber-glow { animation: title-cyber-glow 2s ease-in-out infinite; }
        .animate-description-cyber-pulse { animation: description-cyber-pulse 2s ease-in-out infinite; }
        .animate-button-cyber-pulse { animation: button-cyber-pulse 3s ease-in-out infinite; }
        .animate-button-cyber-shine { animation: button-cyber-shine 2s ease-in-out infinite; }
        .animate-game-modal-cyber-appear { animation: game-modal-cyber-appear 1s ease-out; }
        .animate-modal-bg-flow { 
          background-size: 200% 200%;
          animation: modal-bg-flow 10s linear infinite;
        }
        .animate-modal-scan-lines { animation: modal-scan-lines 6s linear infinite; }
        .animate-modal-title-cyber { animation: modal-title-cyber 0.8s ease-out 0.3s both; }
        .animate-close-button-pulse { animation: close-button-pulse 2s ease-in-out infinite; }
        .animate-game-content-cyber-fade { animation: game-content-cyber-fade 1s ease-out 0.5s both; }
        .animate-stats-hologram { animation: stats-hologram 6s linear infinite; }
        .animate-stat-cyber-emerge { animation: stat-cyber-emerge 1s ease-out both; }
        .animate-stat-icon-cyber-spin { animation: stat-icon-cyber-spin 1s ease-in-out; }
        .animate-stat-icon-pulse { animation: stat-icon-pulse 0.6s ease-in-out; }
        .animate-stat-glow { animation: stat-glow 3s ease-in-out infinite; }
        .animate-stat-value-cyber-pulse { animation: stat-value-cyber-pulse 0.8s ease-in-out; }
      `}</style>
    </section>
  );
}