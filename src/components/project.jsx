import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  Github, 
  Calendar,
  Brain,
  Award,
  TrendingUp,
  Database,
  Globe,
  BarChart3,
  FileSearch,
  Clock,
  Trophy
} from 'lucide-react';
import DancingHeading from './DancingHeading';

const ProjectCard = ({ project, index }) => {
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
    
    // Calculate cursor offset from card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const isEven = index % 2 === 0;

  // Maximum tilt angle of 10 degrees
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
      {/* 3D Card wrapper */}
      <div 
        className="preserve-3d relative w-full p-8 md:p-12 border border-white/5 bg-slate-950/25 hover:bg-slate-950/45 hover:border-cyan-500/25 rounded-2xl transition-all duration-300 ease-out"
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

        {/* Corner accents */}
        <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tl" />
        <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tr" />
        <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-bl" />
        <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-br" />

        {/* Alternating Row Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center preserve-3d">
          
          {/* Content Column */}
          <div className={`space-y-6 transform translate-z-20 transition-transform duration-300 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded text-cyan-400 font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded text-gray-400 font-bold flex items-center gap-1.5 uppercase">
                <Calendar size={11} className="text-teal-400" />
                {project.duration}
              </span>
            </div>

            {/* Project identity */}
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300 font-sans">
                {project.title}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed font-sans border-l-2 border-cyan-500/30 pl-4 py-0.5">
              {project.description}
            </p>

            {/* Key features bullets */}
            <div className="space-y-2.5">
              {project.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xs mt-1">●</span>
                  <p className="text-gray-300 text-xs leading-relaxed font-sans">{feature}</p>
                </div>
              ))}
            </div>

            {/* Link Action buttons */}
            <div className="flex gap-4 pt-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[150px]">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold shadow-lg hover:scale-105">
                  <Github size={14} />
                  <span>GITHUB</span>
                </div>
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[150px]">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2.5 rounded-xl hover:from-teal-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold shadow-lg hover:scale-105">
                    <ExternalLink size={14} />
                    <span>PREVIEW</span>
                  </div>
                </a>
              )}
            </div>

          </div>

          {/* Schematic Details Panel Column */}
          <div className={`space-y-6 transform translate-z-10 transition-transform duration-300 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            
            {/* Technical Blueprint Panel */}
            <div className="border border-white/5 bg-slate-950/40 p-6 md:p-8 rounded-2xl space-y-6 relative group-hover:border-cyan-500/10 transition-all duration-500">
              
              {/* Header bar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest">
                  ● SCHEMATIC | PROJECT_{project.id.toUpperCase()}
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              </div>

              {/* Tech Stack List */}
              <div className="space-y-2">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">
                  CORE_RESOURCES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2.5 py-1 text-[10px] font-bold font-mono-cyber rounded bg-cyan-500/5 border border-cyan-500/15 text-cyan-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements Stats Panel */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                {project.achievements.map((achievement, achIndex) => {
                  const AchIcon = achievement.icon;
                  return (
                    <div key={achIndex} className="bg-black/20 border border-white/5 p-3 rounded-lg text-center relative group/metric hover:border-cyan-500/20 transition-all duration-300">
                      <div className="w-8 h-8 mx-auto mb-2 rounded bg-cyan-950/40 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover/metric:scale-110 transition-transform">
                        <AchIcon size={14} />
                      </div>
                      <div className="font-bold text-sm text-white">{achievement.value}</div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mt-0.5">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

        {/* Laser Scan line on hover */}
        {isHovered && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-card-scanner opacity-40 z-20 pointer-events-none" />
        )}

        {/* Expandable bottom glow line */}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 via-teal-400 to-transparent group-hover:w-full transition-all duration-700" />

      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 'revia',
      title: 'Revia',
      subtitle: 'Serverless AI Companion Platform',
      description:
        'AI companion platform powered by LLMs and Retrieval-Augmented Generation running on a fully serverless AWS architecture supporting multiple AI personas.',
      duration: 'Jul 2026',
      technologies: ['React', 'AWS Lambda', 'DynamoDB', 'Amazon Cognito', 'API Gateway', 'RAG', 'LLMs'],
      github: 'https://github.com/Sakshi-Pandey22',
      liveUrl: 'https://revia-nine.vercel.app/login',
      category: 'AI Platform',
      icon: Brain,
      gradient: 'from-blue-500 to-teal-500',
      achievements: [
        { label: 'AI Personas', value: '12+', icon: Brain },
        { label: 'Consistency', value: '+65%', icon: TrendingUp },
        { label: 'Architecture', value: 'Serverless', icon: Award }
      ],
      features: [
        'LLM-powered companion flows with semantic retrieval and history buffering.',
        'Serverless AWS stack using Lambda, API Gateway, DynamoDB, and Cognito.',
        'Multi-agent memory and context-aware conversation engine.'
      ]
    },
    {
      id: 'ipl-dashboard',
      title: 'IPL Intelligence Dashboard',
      subtitle: 'Interactive Cricket Analytics Platform',
      description:
        'Interactive IPL analytics dashboard transforming over 250,000 deliveries into advanced cricket insights and visual analytics.',
      duration: 'Mar 2026',
      technologies: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
      github: 'https://github.com/sakshi-pandey22/ipl-intelligence-dashboard',
      liveUrl: 'https://ipl-intelligence-dashboard.streamlit.app',
      category: 'Analytics Dashboard',
      icon: BarChart3,
      gradient: 'from-blue-500 to-teal-500',
      achievements: [
        { label: 'Deliveries', value: '250K+', icon: Database },
        { label: 'Decision Speed', value: '+55%', icon: TrendingUp },
        { label: 'Insights', value: 'Interactive', icon: Globe }
      ],
      features: [
        'Custom cricket metrics including Pressure Performance Index.',
        'Interactive visual analytics built with Plotly and Streamlit.',
        'Match, chase, and death-over performance analysis.'
      ]
    },
    {
      id: 'resume-analyzer',
      title: 'AI-Powered Resume Analyzer',
      subtitle: 'NLP-Based Resume Evaluation System',
      description:
        'AI-based resume analysis platform that evaluates resumes against job descriptions and recommends missing skills using NLP.',
      duration: 'Jan 2025',
      technologies: ['Python', 'Flask', 'NLP', 'Scikit-learn'],
      github: 'https://github.com/Sakshi-Pandey22',
      liveUrl: '',
      category: 'AI Career Tool',
      icon: FileSearch,
      gradient: 'from-orange-500 to-yellow-500',
      achievements: [
        { label: 'Match Rate', value: '+70%', icon: Award },
        { label: 'Speed', value: '-60%', icon: Clock },
        { label: 'Skill Gaps', value: 'Auto', icon: Trophy }
      ],
      features: [
        'Resume-to-job relevance scores via custom NLP pipelines.',
        'Missing skill extraction and recommendations.',
        'Flask-based workflow for streamlined evaluation.'
      ]
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Matrix & Grid Details */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-teal-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
      </div>

      <div className="relative z-10 max-w-6xl mx-auto font-mono-cyber">
        {/* Section Header */}
        <div className="text-center mb-20">
          <DancingHeading text="Featured Projects" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Intellectual products bridging machine learning algorithms with reliable full-stack web architectures.
          </p>
        </div>

        {/* Alternating Projects Stack */}
        <div className="space-y-12 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Global CTA */}
        <div className={`mt-24 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="border border-white/5 bg-slate-950/40 p-8 rounded-2xl max-w-3xl mx-auto backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">
            {/* Corner accents */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tl" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-tr" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-bl" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300 rounded-br" />

            {/* Glowing sweep backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-left space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase block font-mono-cyber">
                  ● ACCESS_PORTAL | GITHUB_REPOS
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white font-sans tracking-tight">
                  Want to explore more pipelines?
                </h3>
                <p className="text-gray-400 text-xs font-sans leading-relaxed max-w-md">
                  Access the complete repository index containing model training pipelines, multi-agent frameworks, and cloud-native templates.
                </p>
              </div>

              <a
                href="https://github.com/Sakshi-Pandey22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-full md:w-auto"
              >
                <div className="relative group/btn overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/10 px-6 py-3 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2.5">
                  <Github size={16} className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-cyan-400 tracking-wider font-mono-cyber uppercase">
                    SYSTEM_INDEX
                  </span>
                  <ExternalLink size={13} className="text-cyan-400 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
              </a>
            </div>
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

export default ProjectsSection;
