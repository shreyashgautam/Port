import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to trigger state update correctly
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Track scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'STACK', href: '#skills', id: 'skills' },
    { name: 'AWARDS', href: '#achievements', id: 'achievements' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href, id) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      // Find element top offset, subtracting navbar height
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Scroll Progress Bar Line */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#7C5CFF] to-[#F472B6] z-[9999] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Backdrop blur effect */}
      <div className={`fixed top-0 left-0 right-0 h-20 z-40 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-black/40' : 'bg-transparent'
      }`} />
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-black/90 border-teal-500/20 shadow-[0_4px_30px_rgba(20,184,166,0.03)]' 
          : 'bg-transparent border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo box and title */}
            <a
              href="#home"
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home', 'home');
              }}
            >
              {/* SP Box */}
              <div className="relative border border-white/60 px-3 py-1.5 font-mono-cyber font-extrabold text-white text-xl tracking-wider bg-transparent">
                {/* Cyan indicator dot at top-left corner */}
                <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 bg-cyan-400 rounded-full border border-black shadow-[0_0_8px_#22d3ee] animate-pulse" />
                SP
              </div>
              
              {/* Side Info Panel */}
              <div className="flex flex-col items-start font-mono-cyber">
                {/* AI_ENGINEER with SVG overlay circle */}
                <div className="relative py-0.5 px-2">
                  <span className="text-[11px] font-black text-cyan-400 tracking-[0.15em] relative z-10 text-shadow-cyan">
                    AI_ENGINEER
                  </span>
                  {/* Animated target lock vector */}
                  <svg className="absolute -inset-x-1 -inset-y-1.5 w-[calc(100%+8px)] h-[calc(100%+12px)] text-cyan-400/50 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <ellipse
                      cx="50"
                      cy="15"
                      rx="48"
                      ry="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4, 4"
                      className="animate-draw-ellipse"
                    />
                    <ellipse
                      cx="50"
                      cy="15"
                      rx="48"
                      ry="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="animate-radar-pulse"
                    />
                  </svg>
                </div>
                
                {/* Subtitle PORTFOLIO */}
                <span className="text-[9px] font-bold text-gray-400/80 tracking-[0.25em] pl-2">
                  PORTFOLIO
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.id);
                    }}
                    className={`relative px-4 py-2 font-mono-cyber text-[13px] font-bold tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-cyan-400 text-shadow-cyan' : 'text-gray-400 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    {/* Gradient active line indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 box-shadow-teal-glow animate-pulse" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="relative p-2.5 border border-white/20 rounded-none bg-transparent text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="absolute -top-[1px] -left-[1px] w-1 h-1 border-t border-l border-white/40" />
                <span className="absolute -bottom-[1px] -right-[1px] w-1 h-1 border-b border-r border-white/40" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`xl:hidden absolute left-0 right-0 top-20 transition-all duration-300 origin-top bg-black/95 border-b border-teal-500/20 backdrop-blur-xl ${
          isOpen 
            ? 'opacity-100 scale-y-100 visible' 
            : 'opacity-0 scale-y-0 invisible'
        }`}>
          <div className="p-6 space-y-4 font-mono-cyber flex flex-col">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                  className={`flex items-center justify-between py-2 border-b border-white/5 text-sm font-bold tracking-widest ${
                    isActive ? 'text-cyan-400 text-shadow-cyan' : 'text-gray-400'
                  }`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="text-cyan-400">◀</span>}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
