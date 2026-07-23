import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Sparkles,
  Calendar,
  Terminal,
  Cpu
} from 'lucide-react';
import DancingHeading from './DancingHeading';

const SegmentedProgress = ({ level, activeColor }) => {
  const totalSegments = 10;
  const activeSegments = Math.round(level / 10);
  
  return (
    <div className="flex gap-1 items-center h-4">
      {[...Array(totalSegments)].map((_, idx) => {
        const isActive = idx < activeSegments;
        return (
          <div 
            key={idx}
            className={`w-1.5 h-3 rounded-[1px] transition-all duration-500 ${
              isActive 
                ? `${activeColor} shadow-[0_0_6px_var(--glow-color)]` 
                : 'bg-gray-800'
            }`}
            style={{
              '--glow-color': activeColor.includes('cyan') ? '#22d3ee' : activeColor.includes('emerald') ? '#34d399' : activeColor.includes('purple') ? '#a78bfa' : '#fb923c'
            }}
          />
        );
      })}
    </div>
  );
};

const SkillCard = ({ skill, activeColor, index }) => {
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
        className="preserve-3d relative w-full p-5 border border-white/5 bg-slate-950/20 hover:bg-slate-950/40 rounded-xl transition-all duration-300 ease-out hover:border-cyan-500/25"
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
            className="absolute inset-0 pointer-events-none rounded-xl opacity-30"
            style={{
              background: `radial-gradient(circle 180px at ${shineX}% ${shineY}%, rgba(34, 211, 238, 0.1), transparent 80%)`
            }}
          />
        )}

        {/* Framing corner accents */}
        <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white/10 group-hover:border-cyan-400 transition-all rounded-tl" />
        <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/10 group-hover:border-cyan-400 transition-all rounded-br" />

        <div className="relative z-10 space-y-3 transform translate-z-10">
          <div>
            <h4 className="text-white font-bold text-sm font-sans tracking-tight">{skill.name}</h4>
            <p className="text-gray-400 text-xs font-sans mt-0.5 leading-relaxed">{skill.description}</p>
          </div>

          <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
            <SegmentedProgress level={skill.level} activeColor={activeColor} />
            <span className="text-[10px] text-gray-400 font-bold font-mono-cyber">
              {skill.level}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeOrbit, setActiveOrbit] = useState(0);
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

  const skillsData = [
    {
      category: "Frontend Interface",
      shortName: "Frontend",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      activeColor: "bg-cyan-400",
      skills: [
        { name: "React.js", level: 95, description: "Building dynamic modular UIs" },
        { name: "Next.js", level: 90, description: "Server-side rendering frameworks" },
        { name: "JavaScript", level: 93, description: "Modern ES6+ package integrations" },
        { name: "HTML5", level: 98, description: "Semantic, structured layouts" },
        { name: "CSS3", level: 92, description: "Advanced layouts and animations" },
        { name: "Bootstrap", level: 87, description: "Rapid UI grid assemblies" },
        { name: "Tailwind CSS", level: 88, description: "Utility-first clean architectures" }
      ]
    },
    {
      category: "Backend Power",
      shortName: "Backend",
      color: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      activeColor: "bg-emerald-400",
      skills: [
        { name: "Node.js", level: 90, description: "Event-driven runtime engines" },
        { name: "Express.js", level: 87, description: "REST gateway pipelines" },
        { name: "REST APIs", level: 92, description: "Structured endpoint integrations" },
        { name: "Flask", level: 89, description: "Python web services and utilities" },
        { name: "MongoDB", level: 85, description: "Document-oriented storage grids" },
        { name: "PostgreSQL", level: 84, description: "Structured relational models" },
        { name: "MySQL", level: 82, description: "Relational query optimizations" },
        { name: "Firebase", level: 88, description: "Cloud computing configurations" }
      ]
    },
    {
      category: "ML Intelligence",
      shortName: "ML Engine",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      activeColor: "bg-purple-400",
      skills: [
        { name: "TensorFlow", level: 90, description: "Model graph training and testing" },
        { name: "PyTorch", level: 92, description: "Dynamic neural networks and research" },
        { name: "Scikit-learn", level: 89, description: "Data classification algorithms" },
        { name: "XGBoost", level: 84, description: "Ensemble learning classifications" },
        { name: "CNN", level: 87, description: "Computer vision structures" },
        { name: "LSTM", level: 85, description: "Sequence modeling pipelines" },
        { name: "NLP", level: 88, description: "Text analysis and vector metrics" }
      ]
    },
    {
      category: "Core Architecture",
      shortName: "Core Stack",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      activeColor: "bg-orange-400",
      skills: [
        { name: "Python", level: 94, description: "Cognitive logic and data modeling" },
        { name: "C++", level: 88, description: "Algorithmic computational speed" },
        { name: "Java", level: 86, description: "Structured software logic models" },
        { name: "Pandas", level: 91, description: "Data cleaning and aggregations" },
        { name: "NumPy", level: 89, description: "Matrix computing configurations" },
        { name: "Feature Engineering", level: 87, description: "Data normalization pipelines" },
        { name: "Dashboarding", level: 84, description: "Visual metric representation" }
      ]
    }
  ];

  const currentSkillSet = skillsData[activeOrbit];
  
  // Calculate average mastery level for active set
  const avgMastery = Math.round(
    currentSkillSet.skills.reduce((acc, skill) => acc + skill.level, 0) / currentSkillSet.skills.length
  );

  return (
    <section 
      ref={sectionRef}
      id="skills" 
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
          <DancingHeading text="Tech Arsenal" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Section/Subsection Command Grid */}
        <div className={`grid lg:grid-cols-3 gap-8 items-start w-full transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Left Column: Category Index (Section Selector) */}
          <div className="lg:col-span-1 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Terminal size={15} className="text-cyan-400" />
              <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">
                SYSTEM_DIRECTORY
              </span>
            </div>

            {skillsData.map((category, index) => {
              const isActive = activeOrbit === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveOrbit(index)}
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
                      {category.category}
                    </span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />}
                </button>
              );
            })}

            {/* Category Stats Display Panel */}
            <div className="mt-4 border border-white/5 bg-slate-950/25 p-5 rounded-2xl space-y-4 select-none">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-teal-400" />
                <span className="text-[9px] text-teal-400 font-bold tracking-wider uppercase">CORE_TELEMETRY</span>
              </div>
              <div className="space-y-2 text-[10px] text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>SYS_CATEGORY</span>
                  <span className="text-white font-bold">{currentSkillSet.shortName.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>DEPLOYED_UTILITIES</span>
                  <span className="text-white font-bold">{currentSkillSet.skills.length} MODULES</span>
                </div>
                <div className="flex justify-between">
                  <span>AVG_MASTERY_SCORE</span>
                  <span className="text-cyan-400 font-bold">{avgMastery}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Skills Grid (Subsection Panel) */}
          <div className="lg:col-span-2">
            {/* Key is required on the parent grid to trigger animations on category switch */}
            <div 
              key={activeOrbit}
              className="grid sm:grid-cols-2 gap-4 w-full"
            >
              {currentSkillSet.skills.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  activeColor={currentSkillSet.activeColor} 
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

export default SkillsSection;
