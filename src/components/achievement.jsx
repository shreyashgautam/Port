import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Calendar,
  Terminal,
  Cpu,
  Star,
  Award,
  Users
} from 'lucide-react';
import DancingHeading from './DancingHeading';

const AchievementCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

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
      className={`perspective-1000 w-full transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div 
        className="preserve-3d relative w-full p-6 border border-white/5 bg-slate-950/20 hover:bg-slate-950/40 rounded-xl transition-all duration-300 ease-out hover:border-cyan-500/25"
        style={{
          transform: isHovered 
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)` 
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          boxShadow: isHovered 
            ? '0 15px 30px rgba(6, 182, 212, 0.08)' 
            : '0 0px 0px rgba(0,0,0,0)'
        }}
      >
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl opacity-35"
            style={{
              background: `radial-gradient(circle 200px at ${shineX}% ${shineY}%, rgba(34, 211, 238, 0.12), transparent 80%)`
            }}
          />
        )}

        {/* Framing corner accents */}
        <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t border-l border-white/10 group-hover:border-cyan-400 transition-all rounded-tl" />
        <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b border-r border-white/10 group-hover:border-cyan-400 transition-all rounded-br" />

        <div className="relative z-10 space-y-4 transform translate-z-10">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h4 className="text-white font-black text-lg font-sans tracking-tight leading-snug">
                {item.title}
              </h4>
              <p className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                {item.subtitle}
              </p>
            </div>
            
            {/* Round Icon container */}
            <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              {item.cardIcon}
            </div>
          </div>

          <p className="text-gray-400 text-xs font-sans leading-relaxed border-l-2 border-white/5 pl-3 py-0.5">
            {item.description}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono-cyber border-t border-white/5 pt-3">
            <Calendar size={11} className="text-teal-500/80" />
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      name: "Hackathons",
      label: "Competitions",
      icon: Trophy,
      items: [
        {
          title: "Smart India Hackathon 2025",
          subtitle: "Top 50 Finalist",
          description: "Recognized as a Top 50 project at the national scale for architecting and building an entrepreneurship support portal.",
          date: "Sept 2025",
          cardIcon: <Trophy size={14} />
        },
        {
          title: "HackFest 2024",
          subtitle: "Top 15 Finalist",
          description: "Finished in the Top 15 teams globally for engineering a real-time Tsunami Simulation application.",
          date: "Sep 2024",
          cardIcon: <Star size={14} />
        }
      ]
    },
    {
      name: "Credentials",
      label: "Certificates",
      icon: Award,
      items: [
        {
          title: "Machine Learning Crash Course",
          subtitle: "Google Certification",
          description: "Completed Google's intensive crash course covering neural networks, deep model parameters, and optimization frameworks.",
          date: "May 2025",
          cardIcon: <Award size={14} />
        }
      ]
    },
    {
      name: "Leadership",
      label: "Extracurriculars",
      icon: Users,
      items: [
        {
          title: "Enactus & Event Managers",
          subtitle: "Club Member - VIT Chennai",
          description: "Managed technical execution, event schedules, and coordinated social entrepreneurship drives.",
          date: "Jul 2024",
          cardIcon: <Users size={14} />
        }
      ]
    }
  ];

  const currentTab = categories[activeTab];

  return (
    <section 
      ref={sectionRef}
      id="achievements" 
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Matrix & Grid Details */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-gradient-to-tr from-cyan-500/5 to-teal-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
      </div>

      <div className="relative z-10 max-w-6xl mx-auto font-mono-cyber">
        
        {/* Centered Heading */}
        <div className="text-center mb-20">
          <DancingHeading text="Awards & Credentials" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Section/Subsection Command Grid */}
        <div className={`grid lg:grid-cols-3 gap-8 items-start w-full transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Left Column: Category Index Menu */}
          <div className="lg:col-span-1 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Terminal size={15} className="text-cyan-400" />
              <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">
                AWARDS_DIRECTORY
              </span>
            </div>

            {categories.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    isActive 
                      ? 'border-cyan-500/30 bg-cyan-950/15 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.05)]' 
                      : 'border-white/5 bg-slate-950/20 text-gray-500 hover:text-white hover:border-white/10 hover:bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {category.name}
                    </span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />}
                </button>
              );
            })}

            {/* Sub-panel Directory Stats */}
            <div className="mt-4 border border-white/5 bg-slate-950/25 p-5 rounded-2xl space-y-4 select-none">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-teal-400" />
                <span className="text-[9px] text-teal-400 font-bold tracking-wider uppercase">REGISTRY_TELEMETRY</span>
              </div>
              <div className="space-y-2 text-[10px] text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>DIRECTORY</span>
                  <span className="text-white font-bold">{currentTab.label.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>RECORDED_NODES</span>
                  <span className="text-cyan-400 font-bold">{currentTab.items.length} ARCHIVES</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Achievements Grid (remounts on activeTab change to trigger stagger entries) */}
          <div className="lg:col-span-2">
            <div 
              key={activeTab}
              className="grid sm:grid-cols-2 gap-4 w-full"
            >
              {currentTab.items.map((item, index) => (
                <AchievementCard 
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AchievementsPage;
