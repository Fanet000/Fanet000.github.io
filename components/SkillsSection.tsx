
'use client';

import { useState, useEffect } from 'react';

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({});

  const skillCategories = [
    {
      title: 'Programming Languages',
      gradient: 'from-blue-600 to-cyan-600',
      skills: [
        { name: 'Python', level: 40, icon: 'ri-terminal-line' },
        { name: 'Java', level: 30, icon: 'ri-code-s-slash-line' },
        { name: 'C#', level: 25, icon: 'ri-code-s-slash-line' },
        { name: 'JavaScript', level: 0, icon: 'ri-javascript-line' }
      ]
    },
    {
      title: 'Game Engines',
      gradient: 'from-purple-600 to-pink-600',
      skills: [
        { name: 'Unity', level: 25, icon: 'ri-gamepad-line' },
        { name: 'Unreal Engine', level: 0, icon: 'ri-gamepad-line' },
        { name: 'Godot', level: 0, icon: 'ri-gamepad-line' }
      ]
    },
    {
      title: 'Design Tools',
      gradient: 'from-green-600 to-emerald-600',
      skills: [
        { name: 'Figma UI/UX', level: 45, icon: 'ri-pencil-ruler-2-line' },
        { name: 'Photoshop', level: 0, icon: 'ri-image-edit-line' },
        { name: 'Blender', level: 0, icon: 'ri-3d-view-line' }
      ]
    },
    {
      title: 'Computer Science',
      gradient: 'from-orange-600 to-red-600',
      skills: [
        { name: 'Data Structures & Algorithms', level: 35, icon: 'ri-flowchart-line' },
        { name: 'HTML/CSS', level: 0, icon: 'ri-html5-line' },
        { name: 'React', level: 0, icon: 'ri-reactjs-line' },
        { name: 'Node.js', level: 0, icon: 'ri-nodejs-line' }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill levels
          setTimeout(() => {
            const levels: {[key: string]: number} = {};
            skillCategories.forEach(category => {
              category.skills.forEach(skill => {
                levels[skill.name] = skill.level;
              });
            });
            setAnimatedLevels(levels);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="skill-bg-animation">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-code-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-skills-title-in' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-white mb-4">
            My <span className="text-purple-400 animate-rainbow-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 animate-skill-line-grow"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-up">
            Constantly learning and growing in the exciting world of game development and design
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className={`bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 transition-all duration-1000 hover:border-purple-400/60 animate-skill-card-appear ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center animate-icon-glow`}>
                  <i className="ri-star-line text-white text-sm animate-star-twinkle"></i>
                </div>
                <span className="animate-text-wave">{category.title}</span>
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="group relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                          hoveredSkill === skill.name ? 'animate-skill-icon-spin' : ''
                        }`}>
                          <i className={`${skill.icon} text-purple-400 transition-colors duration-300 ${
                            hoveredSkill === skill.name ? 'text-pink-400' : ''
                          }`}></i>
                        </div>
                        <span className={`text-white font-medium transition-all duration-300 ${
                          hoveredSkill === skill.name ? 'text-purple-300 animate-text-glow-soft' : ''
                        }`}>{skill.name}</span>
                      </div>
                      <span className={`text-purple-400 text-sm font-medium transition-all duration-300 ${
                        hoveredSkill === skill.name ? 'text-pink-400 animate-number-bounce' : ''
                      }`}>{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden relative">
                      <div 
                        className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 ease-out relative ${
                          hoveredSkill === skill.name ? 'animate-skill-bar-glow' : ''
                        }`}
                        style={{ 
                          width: `${animatedLevels[skill.name] || 0}%`,
                          transitionDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                        }}
                      >
                        {hoveredSkill === skill.name && (
                          <div className="absolute inset-0 bg-white/20 animate-progress-shine"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20 animate-learning-card-float">
            <h3 className="text-xl font-semibold text-white mb-4 animate-learning-title">Currently Learning</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[ 'Advanced Python', 'Game Development', 'UI/UX Design', 'Problem Solving'].map((skill, index) => (
                <span 
                  key={index}
                  className={`bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer animate-learning-tag-${index + 1}`}
                  style={{ animationDelay: `${1.5 + index * 0.2}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes skills-title-in {
          from { opacity: 0; transform: translateY(-50px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes rainbow-text {
          0% { color: #a855f7; }
          16% { color: #ec4899; }
          32% { color: #06b6d4; }
          48% { color: #10b981; }
          64% { color: #f59e0b; }
          80% { color: #ef4444; }
          100% { color: #a855f7; }
        }
        
        @keyframes skill-line-grow {
          from { width: 0; transform: scaleX(0); }
          to { width: 6rem; transform: scaleX(1); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes skill-card-appear {
          from { 
            opacity: 0; 
            transform: translateY(50px) rotateX(-15deg); 
            filter: blur(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg); 
            filter: blur(0px);
          }
        }
        
        @keyframes icon-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6), 0 0 30px rgba(236, 72, 153, 0.3); }
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes text-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes skill-icon-spin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.2); }
        }
        
        @keyframes text-glow-soft {
          0%, 100% { text-shadow: 0 0 5px rgba(196, 181, 253, 0.5); }
          50% { text-shadow: 0 0 10px rgba(196, 181, 253, 0.8); }
        }
        
        @keyframes number-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.1); }
        }
        
        @keyframes skill-bar-glow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
            filter: brightness(1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(236, 72, 153, 0.4);
            filter: brightness(1.2);
          }
        }
        
        @keyframes progress-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes code-rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes learning-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes learning-title {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes learning-tag-1 {
          from { opacity: 0; transform: translateY(20px) rotate(-5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes learning-tag-2 {
          from { opacity: 0; transform: translateY(20px) rotate(5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes learning-tag-3 {
          from { opacity: 0; transform: translateY(20px) rotate(-3deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes learning-tag-4 {
          from { opacity: 0; transform: translateY(20px) rotate(3deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        
        .animate-skills-title-in { animation: skills-title-in 1.2s ease-out; }
        .animate-rainbow-text { animation: rainbow-text 4s linear infinite; }
        .animate-skill-line-grow { animation: skill-line-grow 1.5s ease-out 0.8s both; }
        .animate-fade-up { animation: fade-up 1s ease-out 1s both; }
        .animate-skill-card-appear { animation: skill-card-appear 1s ease-out both; }
        .animate-icon-glow { animation: icon-glow 3s ease-in-out infinite; }
        .animate-star-twinkle { animation: star-twinkle 2s ease-in-out infinite; }
        .animate-text-wave { animation: text-wave 2s ease-in-out infinite; }
        .animate-skill-icon-spin { animation: skill-icon-spin 0.8s ease-in-out; }
        .animate-text-glow-soft { animation: text-glow-soft 1.5s ease-in-out infinite; }
        .animate-number-bounce { animation: number-bounce 0.6s ease-in-out; }
        .animate-skill-bar-glow { animation: skill-bar-glow 2s ease-in-out infinite; }
        .animate-progress-shine { animation: progress-shine 1.5s ease-in-out infinite; }
        .animate-code-rain { animation: code-rain linear infinite; }
        .animate-learning-card-float { animation: learning-card-float 6s ease-in-out infinite; }
        .animate-learning-title { animation: learning-title 0.8s ease-out; }
        .animate-learning-tag-1 { animation: learning-tag-1 0.8s ease-out both; }
        .animate-learning-tag-2 { animation: learning-tag-2 0.8s ease-out both; }
        .animate-learning-tag-3 { animation: learning-tag-3 0.8s ease-out both; }
        .animate-learning-tag-4 { animation: learning-tag-4 0.8s ease-out both; }
      `}</style>
    </section>
  );
}
