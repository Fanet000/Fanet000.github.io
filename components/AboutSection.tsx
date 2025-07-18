
'use client';

import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { label: 'Year of Study', value: '2nd', icon: 'ri-graduation-cap-line', color: 'from-blue-500 to-cyan-500' },
    { label: 'Projects Completed', value: '8+', icon: 'ri-code-s-slash-line', color: 'from-purple-500 to-pink-500' },
    { label: 'Skills Learned', value: '5+', icon: 'ri-lightbulb-line', color: 'from-green-500 to-emerald-500' },
    { label: 'Coffee Consumed', value: '∞', icon: 'ri-cup-line', color: 'from-orange-500 to-red-500' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-black/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="geometric-shapes">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-geometric-float-${i % 3 + 1}`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`
              }}
            >
              <div className={`w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 ${
                i % 2 === 0 ? 'rounded-full' : 'rotate-45'
              }`} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-title-reveal' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="text-purple-400 animate-text-glow">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-line-expand"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="w-full h-80 rounded-2xl overflow-hidden relative group">
              <img 
                src="https://readdy.ai/api/search-image?query=Young%20Indian%20student%20in%20casual%20clothes%20standing%20in%20university%20campus%2C%20Alliance%20University%20Bangalore%20background%2C%20confident%20pose%2C%20bright%20natural%20lighting%2C%20modern%20educational%20environment%2C%20friendly%20atmosphere%2C%20vibrant%20campus%20life&width=500&height=400&seq=about-student&orientation=portrait"
                alt="Bhuvan at Alliance University"
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating particles around image */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-purple-400 rounded-full animate-particle-float-${i + 1}`}
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${15 + i * 15}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`text-white space-y-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-semibold text-purple-400 animate-text-shimmer">My Journey</h3>
            <p className="text-gray-300 leading-relaxed animate-text-reveal">
              Hi I'm Bhuvan B Krishna, currently pursuing my Bachelor of Computer Applications (BCA) in Game Development & Design 
              at Alliance University, Bangalore. Having completed my first year, I've discovered my true 
              passion lies in creating immersive gaming experiences that captivate and engage players.
            </p>
            
            <p className="text-gray-300 leading-relaxed animate-text-reveal animation-delay-200">
              My journey in game development has been filled with exciting challenges and creative breakthroughs. 
              I love experimenting with new technologies, learning different programming languages, and 
              exploring innovative design patterns that push the boundaries of interactive entertainment.
            </p>
            <p className="text-gray-300 leading-relaxed animate-text-reveal animation-delay-400">
              As I continue my studies, I'm eager to collaborate with like-minded individuals, 
              contribute to open-source projects, and build a portfolio that showcases my skills and creativity.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 rounded-xl border border-purple-500/20 transition-all duration-500 cursor-pointer animate-card-float ${
                    hoveredStat === index ? 'transform scale-110 border-purple-400/60' : 'hover:scale-105'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center transition-transform duration-300 ${
                      hoveredStat === index ? 'animate-icon-bounce' : ''
                    }`}>
                      <i className={`${stat.icon} text-white text-sm`}></i>
                    </div>
                    <div className="text-2xl font-bold text-purple-400 animate-counter-up">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                  
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-300 ${
                    hoveredStat === index ? 'opacity-10' : ''
                  }`}></div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap animate-button-pulse hover:animate-button-wiggle"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes title-reveal {
          from { opacity: 0; transform: translateY(-30px) rotate(-5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes line-expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px) rotate(-10deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px) rotate(10deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(196, 181, 253, 0.5); }
          50% { text-shadow: 0 0 20px rgba(196, 181, 253, 0.8), 0 0 30px rgba(244, 114, 182, 0.3); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes text-reveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        
        @keyframes geometric-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes geometric-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-20px) rotate(-180deg) scale(1.2); }
        }
        
        @keyframes geometric-float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes particle-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        
        @keyframes particle-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(-10px); opacity: 0.8; }
        }
        
        @keyframes particle-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-25px) translateX(5px); opacity: 1; }
        }
        
        @keyframes particle-float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-18px) translateX(-8px); opacity: 0.7; }
        }
        
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(10deg); }
        }
        
        @keyframes counter-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes button-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 181, 253, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(196, 181, 253, 0); }
        }
        
        @keyframes button-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        
        .animate-title-reveal { animation: title-reveal 1s ease-out; }
        .animate-line-expand { animation: line-expand 1.5s ease-out 0.5s both; }
        .animate-slide-in-left { animation: slide-in-left 1s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        
        .animate-text-shimmer {
          background: linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7);
          background-size: 400% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
        
        .animate-text-reveal { animation: text-reveal 0.8s ease-out; }
        .animate-geometric-float-1 { animation: geometric-float-1 8s ease-in-out infinite; }
        .animate-geometric-float-2 { animation: geometric-float-2 6s ease-in-out infinite; }
        .animate-geometric-float-3 { animation: geometric-float-3 7s ease-in-out infinite; }
        
        .animate-particle-float-1 { animation: particle-float-1 4s ease-in-out infinite; }
        .animate-particle-float-2 { animation: particle-float-2 5s ease-in-out infinite; }
        .animate-particle-float-3 { animation: particle-float-3 4.5s ease-in-out infinite; }
        .animate-particle-float-4 { animation: particle-float-4 5.5s ease-in-out infinite; }
        
        .animate-card-float { animation: card-float 6s ease-in-out infinite; }
        .animate-icon-bounce { animation: icon-bounce 0.6s ease-in-out; }
        .animate-counter-up { animation: counter-up 0.8s ease-out; }
        .animate-button-pulse { animation: button-pulse 2s infinite; }
        .animate-button-wiggle { animation: button-wiggle 0.5s ease-in-out; }
        
        .animation-delay-200 { animation-delay: 200ms; }
      `}</style>
    </section>
  );
}