'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

// Lazy load heavy sections
const ProjectsSection = dynamic(() => import('./components/ProjectsSection'), { ssr: false });
const MiniGamesSection = dynamic(() => import('./components/MiniGamesSection'), { ssr: false });

// Theme toggle
function ThemeToggle({ onToggle, theme }: { onToggle: () => void; theme: string }) {
  return (
    <button
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-gray-800 text-white shadow-lg"
      onClick={onToggle}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}

// Toast notification
function Toast({ message, show }: { message: string; show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-8 right-8 bg-pink-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-up z-50">
      {message}
    </div>
  );
}

// Progress bar
function ProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScroll(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // <-- Fix: empty dependency array

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50">
      <div style={{ width: `${scroll * 100}%` }} className="h-full bg-white transition-all duration-200" />
    </div>
  );
}

// Animated background (SVG)
function AnimatedSVGBackground() {
  return (
    <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true">
      <circle cx="20%" cy="30%" r="120" fill="purple" opacity="0.1">
        <animate attributeName="r" values="120;140;120" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="70%" r="100" fill="cyan" opacity="0.1">
        <animate attributeName="r" values="100;120;100" dur="8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Theme toggle logic
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Example toast on form submit
  function handleContactSubmit() {
    setToast({ show: true, message: 'Message sent!' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="A modern, animated, accessible portfolio." />
        <meta property="og:title" content="My Portfolio" />
        <meta property="og:description" content="A modern, animated, accessible portfolio." />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <ThemeToggle onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} theme={theme} />
      <ProgressBar />
      <Toast message={toast.message} show={toast.show} />
      <AnimatedSVGBackground />
      <Navigation />
      <main className="relative z-10 focus:outline-none" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <MiniGamesSection />
        <ContactSection onSubmit={handleContactSubmit} />
      </main>
      <style jsx global>{`
        html.dark {
          background: linear-gradient(135deg, #000, #222 80%);
          color: #fff;
        }
        html.light {
          background: linear-gradient(135deg, #fff, #f0f0f0 80%);
          color: #222;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        button:focus, a:focus {
          outline: 2px solid #f0c;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
