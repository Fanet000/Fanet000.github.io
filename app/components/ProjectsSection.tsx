'use client';

import { useState } from 'react';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Unity', 'Web Games', 'Mobile', 'Prototypes'];

  const projects: any[] = [];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const geometricShapes = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full"
      style={{
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        background: `rgba(255, 255, 255, ${Math.random()})`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random(),
        transform: `scale(${Math.random()})`,
      }}
    />
  ));

  return (
    <section id="projects" className="py-20 bg-black/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            My <span className="text-purple-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 animate-pulse"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Showcasing my journey through game development with various projects and experiments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap animate-fade-in-up ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white transform scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="min-h-96 flex flex-col items-center justify-center">
          <div className="text-center space-y-8 animate-bounce-gentle">
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <i className="ri-code-s-slash-line text-4xl text-white animate-pulse"></i>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white animate-fade-in-up">
                Coming Soon!
              </h3>
              <p className="text-gray-300 text-lg max-w-md mx-auto animate-fade-in-up animation-delay-300">
                I'm currently working on some exciting projects. Check back soon to see my latest creations!
              </p>
            </div>

            <div className="flex justify-center space-x-2 animate-fade-in-up animation-delay-500">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 200}ms` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {['Unity Games', 'Web Development', 'Mobile Apps'].map((skill, index) => (
              <div
                key={skill}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 animate-fade-in-up hover:transform hover:scale-105"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <i className={`${
                      index === 0 ? 'ri-gamepad-line' : 
                      index === 1 ? 'ri-code-line' : 'ri-smartphone-line'
                    } text-2xl text-white`}></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{skill}</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-progress-fill"
                      style={{ 
                        width: `${(index + 1) * 25}%`,
                        animationDelay: `${1000 + index * 300}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in-up animation-delay-1000">
          <a
            href="https://github.com/Fanet000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap hover:transform hover:scale-105 animate-pulse inline-block"
          >
            Follow My Progress on GitHub
          </a>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {geometricShapes}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes progress-fill {
          from {
            width: 0%;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-progress-fill {
          animation: progress-fill 1.5s ease-out forwards;
          width: 0%;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
