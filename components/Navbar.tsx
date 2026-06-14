'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#why', label: 'Why Excel' },
    { href: '#curriculum', label: 'Curriculum' },
    { href: '#examples', label: 'Examples' },
    { href: '#quizzes', label: 'Quizzes' },
    { 
      href: '#playground', 
      label: 'Playground', 
      extra: <span className="text-[10px] px-1.5 py-px bg-teal-100 text-teal-700 rounded">Full View</span>,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('playground');
        el?.scrollIntoView({ behavior: 'smooth' });
        // Trigger focus mode hint after scroll
        setTimeout(() => {
          const pg = document.getElementById('playground');
          if (pg) {
            // The Playground component will handle its own full mode button
          }
        }, 900);
      }
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">📊</span>
            </div>
            <div>
              <span className="font-display text-2xl font-semibold tracking-tighter">MBA Excel</span>
              <span className="font-display text-2xl font-semibold tracking-tighter text-teal-600">Mastery</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={link.onClick}
                className="nav-link px-3 py-1.5 text-slate-600 hover:text-teal-600 flex items-center gap-x-1"
              >
                {link.label}
                {link.extra}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-x-3">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-3 py-1 text-xs font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
              <span className="text-slate-600">Prototype v1.0 • Fully Interactive</span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('playground');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 transition-colors text-white text-sm font-semibold rounded-xl flex items-center gap-x-2"
            >
              <span>Open Playground</span>
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden px-8 pb-4 flex flex-col gap-y-1 text-sm border-t bg-white">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => { link.onClick?.(e); setMobileOpen(false); }}
                className="py-2 text-slate-600 hover:text-teal-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
