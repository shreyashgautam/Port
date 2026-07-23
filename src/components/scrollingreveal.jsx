import React, { useRef, useState, useEffect } from 'react';

const ManifestoLine = ({ text, highlight, index }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once a line is revealed, it stays revealed (doesn't disappear as you scroll down)
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-25% 0px -25% 0px"
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const renderText = () => {
    if (!highlight) {
      return (
        <span 
          className="transition-colors duration-700"
          style={{ color: isActive ? '#ffffff' : '#1e293b' }}
        >
          {text}
        </span>
      );
    }
    
    const parts = text.split(highlight);
    return (
      <span className="transition-colors duration-700">
        <span style={{ color: isActive ? '#ffffff' : '#1e293b' }}>{parts[0]}</span>
        <span 
          className="transition-all duration-700 font-serif italic"
          style={{ 
            color: isActive ? '#22d3ee' : '#103b42',
            textShadow: isActive ? '0 0 25px rgba(34, 211, 238, 0.3)' : 'none'
          }}
        >
          {highlight}
        </span>
        <span style={{ color: isActive ? '#ffffff' : '#1e293b' }}>{parts[1]}</span>
      </span>
    );
  };

  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className="py-5 md:py-7 transition-all duration-1000 ease-out text-center"
      style={{
        transform: isActive 
          ? 'translateX(0) scale(1)' 
          : isLeft 
            ? 'translateX(-60px) scale(0.96)' 
            : 'translateX(60px) scale(0.96)',
        opacity: isActive ? 1 : 0.22
      }}
    >
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight select-none">
        {renderText()}
      </h3>
    </div>
  );
};

const ScrollRevealBanner = () => {
  const lines = [
    { text: "We carve intelligence into", highlight: "" },
    { text: "cold silicon,", highlight: "cold silicon," },
    { text: "weaving sight, reasoning &", highlight: "sight, reasoning" },
    { text: "physical agency", highlight: "" },
    { text: "into systems that master the", highlight: "" },
    { text: "physical world.", highlight: "physical world." }
  ];

  return (
    <section 
      className="relative min-h-[110vh] flex flex-col justify-center py-32 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden border-y border-white/5"
    >
      {/* Concentric radar circles in background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute border border-white/[0.04] rounded-full"
            style={{
              width: `${(i + 1) * 240}px`,
              height: `${(i + 1) * 240}px`,
            }}
          />
        ))}
      </div>

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Left-top tiny header label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 select-none">
        <span className="text-[10px] text-gray-600 font-medium tracking-[0.4em] uppercase font-mono">
          THE PHILOSOPHICAL THROUGH-LINE
        </span>
      </div>

      {/* Right side vertical metadata */}
      <div 
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center text-[9px] text-gray-500 tracking-[0.2em] font-mono select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span>SP_ARCHITECT | [v1.0.1_STABLE] | S. PANDEY | CHENNAI (76)</span>
        <span className="w-px h-12 bg-white/10 my-4" />
        <span className="text-cyan-400 font-bold">AVAILABLE_FOR_WORK</span>
      </div>

      {/* Main Content Reveal List */}
      <div className="relative z-10 w-full max-w-5xl mx-auto py-12 space-y-2">
        {lines.map((line, index) => (
          <ManifestoLine 
            key={index} 
            text={line.text} 
            highlight={line.highlight} 
            index={index} 
          />
        ))}
      </div>

    </section>
  );
};

export default ScrollRevealBanner;
