import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  MapPin, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import DancingHeading from "./DancingHeading";

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative cursor position from card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Tilt calculations (max 10 degrees)
  const rotateX = -coords.y * 12;
  const rotateY = coords.x * 12;
  const shineX = (coords.x + 0.5) * 100;
  const shineY = (coords.y + 0.5) * 100;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 w-full transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : index % 2 === 0 
            ? 'translate-x-[-120px] opacity-0' 
            : 'translate-x-[120px] opacity-0'
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms` 
      }}
    >
      {/* 3D Row Card */}
      <div 
        className="preserve-3d relative w-full py-12 px-6 md:px-10 border border-white/5 bg-slate-950/25 hover:bg-slate-950/45 hover:border-cyan-500/25 rounded-2xl transition-all duration-300 ease-out"
        style={{
          transform: isHovered 
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)` 
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          boxShadow: isHovered 
            ? '0 30px 60px rgba(6, 182, 212, 0.12)' 
            : '0 0px 0px rgba(0,0,0,0)'
        }}
      >
        
        {/* Spotlight dynamic hover background glow */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 250px at ${shineX}% ${shineY}%, rgba(34, 211, 238, 0.12), transparent 80%)`
            }}
          />
        )}

        {/* Animated Corner Accents */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tl" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tr" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-bl" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-br" />

        {/* Main responsive grid spanning the full width */}
        <div className="grid md:grid-cols-4 gap-8 relative z-10 preserve-3d">
          
          {/* Left Column: Date & Meta info (3D translate) */}
          <div className="md:col-span-1 space-y-3 transform translate-z-10 transition-transform duration-500">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" />
              <span className={`text-xs font-bold tracking-widest uppercase ${exp.accentColor} group-hover:${exp.textGlow} transition-all duration-300`}>
                {exp.duration}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={12} className="text-teal-500/80" />
              <span>{exp.location}</span>
            </div>

            <span className="inline-block text-[10px] bg-cyan-500/5 border border-cyan-500/20 px-3 py-1 rounded text-cyan-400 uppercase tracking-widest font-mono-cyber">
              {exp.type}
            </span>
          </div>

          {/* Right Column: Title, Company, Description & Achievements (3D translate) */}
          <div className="md:col-span-3 space-y-4 transform translate-z-20 transition-transform duration-500">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300 font-sans tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">
                  {exp.company}
                </p>
              </div>
              
              {/* Arrow Indicator */}
              <div className="p-3 border border-white/10 rounded-full group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0 bg-black/40">
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed font-sans border-l-2 border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500 pl-4 py-0.5">
              {exp.description}
            </p>

            {/* Highlights Points List */}
            <div className="space-y-3 pt-2">
              {exp.highlights.map((highlight, hIndex) => (
                <div key={hIndex} className="flex items-start gap-3">
                  <span className={`text-[10px] ${exp.accentColor} mt-1.5 animate-pulse`}>●</span>
                  <p className="text-gray-300 text-xs leading-relaxed font-sans">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Laser Scan line on hover */}
        {isHovered && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-card-scanner opacity-40 z-20 pointer-events-none" />
        )}

        {/* Bottom line filling sweep animation */}
        <div className={`absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r ${exp.borderGlow} group-hover:w-full transition-all duration-700`} />

      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      role: "Agentic AI Intern",
      company: "Jharkhand Police Headquarters",
      duration: "May 2026 - Jul 2026",
      type: "Internship",
      location: "Ranchi, Jharkhand",
      description: "Architected an Agentic AI case intelligence platform leveraging large language models (LLMs) and advanced retrieval systems.",
      highlights: [
        "Built a modular case analysis system implementing OCR pipeline, semantic FAISS index search, and multi-agent consensus networks, increasing investigative document processing speed by 70%.",
        "Created real-time automated case timeline generators and conversational search bots, cutting overall manual tracking overhead by 60%."
      ],
      color: "from-cyan-400 to-teal-400",
      accentColor: "text-cyan-400",
      borderGlow: "from-cyan-400 via-teal-400 to-transparent",
      textGlow: "text-shadow-cyan"
    },
    {
      role: "Summer Research Intern",
      company: "Vellore Institute of Technology",
      duration: "May 2025 - Jul 2025",
      type: "Research Internship",
      location: "Remote, India",
      description: "Engineered deep learning architectures for speech emotion modeling and developed uncertainty metrics for model explanations.",
      highlights: [
        "Designed a PyTorch-based Speech Emotion Recognition (SER) architecture with attention pooling layers and custom MFCC feature extraction workflows.",
        "Integrated Monte Carlo Dropout and Captum Integrated Gradients to implement explainable AI (XAI) confidence limits and feature saliency maps."
      ],
      color: "from-teal-400 to-blue-500",
      accentColor: "text-teal-400",
      borderGlow: "from-teal-400 via-blue-400 to-transparent",
      textGlow: "text-shadow-teal"
    }
  ];

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Matrix & Grid Details */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/10 w-80 h-80 bg-gradient-to-tr from-teal-500/5 to-cyan-500/5 rounded-full blur-[110px] animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/10 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-full blur-[130px] animate-pulse delay-1000"></div>
        
      </div>

      <div className="relative z-10 max-w-6xl mx-auto font-mono-cyber">
        
        {/* Centered Heading */}
        <div className="text-center mb-20">
          <DancingHeading text="Experience" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* 3D-Interactive Timeline Stack (Full page width) */}
        <div className="space-y-8 w-full max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            return (
              <ExperienceCard key={index} exp={exp} index={index} />
            );
          })}
        </div>

        {/* Collaborative footer */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/10" />
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors duration-300"
            >
              <span className="text-xs font-bold tracking-widest uppercase">Let's collaborate</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </div>

      </div>

      {/* Local 3D animations and scanner styling */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .translate-z-10 {
          transform: translateZ(10px);
        }

        .translate-z-20 {
          transform: translateZ(20px);
        }

        @keyframes card-scanner {
          0% { transform: translateY(0); }
          50% { transform: translateY(240px); }
          100% { transform: translateY(0); }
        }

        .animate-card-scanner {
          animation: card-scanner 5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
