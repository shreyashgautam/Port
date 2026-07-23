import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Calendar,
  GraduationCap,
  Terminal,
  Cpu
} from 'lucide-react';
import profileMain from '../assets/profile-main.png';
import DancingHeading from './DancingHeading';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const education = [
    {
      institution: 'Vellore Institute Of Technology',
      degree: 'B.Tech Computer Science and Engineering (AIML)',
      duration: '2023 - 2027',
      score: 'CGPA: 8.94',
      location: 'Chennai, Tamil Nadu',
      color: 'from-blue-500 to-teal-500',
      description: 'Focusing on Deep Learning, NLP, Cloud Architectures, and Multi-Agent Systems.'
    },
    {
      institution: "St Joseph's Convent School",
      degree: 'CBSE Senior Secondary School Certificate',
      duration: '2010 - 2022',
      score: '10th: 93% | 12th: 93%',
      location: 'Ranchi, Jharkhand',
      color: 'from-teal-500 to-green-500',
      description: 'Completed secondary and higher secondary education with a strong foundation in Physics, Chemistry, and Mathematics.'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Matrix-like glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-gradient-to-tr from-cyan-500/5 to-teal-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
      </div>

      <div className="relative z-10 max-w-6xl mx-auto font-mono-cyber">
        
        {/* Simplified Section Header */}
        <div className="text-center mb-16">
          <DancingHeading text="About Me" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image with overlays and Humanized Bio */}
          <div className={`space-y-10 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            
            {/* Tech-Style Profile Image Card */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2 shadow-2xl">
              {/* Corner box accents */}
              <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-cyan-400 group-hover:scale-110 transition-transform duration-300 z-30" />
              <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-cyan-400 group-hover:scale-110 transition-transform duration-300 z-30" />
              <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-cyan-400 group-hover:scale-110 transition-transform duration-300 z-30" />
              <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-cyan-400 group-hover:scale-110 transition-transform duration-300 z-30" />

              {/* Image Frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/5 h-[320px] md:h-[380px] lg:h-[420px]">
                <img 
                  src={profileMain} 
                  alt="Sakshi Pandey profile" 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Visual scanning overlay line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanner opacity-40 z-20 pointer-events-none" />

                {/* Cyber HUD Text Overlays - Unique details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 font-mono-cyber text-[10px] p-4 flex flex-col justify-between z-20 select-none tracking-wider">
                  
                  {/* Top Overlay Row */}
                  <div className="flex justify-between items-center text-cyan-400/80">
                    <span className="bg-black/40 px-2 py-1 rounded border border-white/5">
                      [SYS_HOST : SAKSHI_PANDEY]
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5 font-bold">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      ONLINE : DEPLOYMENT_SECURE
                    </span>
                  </div>

                  {/* Bottom Overlay Row */}
                  <div className="flex justify-between items-center text-white/70">
                    <span className="bg-black/40 px-2 py-1 rounded border border-white/5 font-semibold">
                      CORE_STACK : REACT • NODE • PYTHON
                    </span>
                    <span className="bg-black/40 px-2 py-1 rounded border border-white/5">
                      AIML_ENGINE : MODEL_STABLE
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Philosophy quote & descriptive details */}
            <div className="space-y-6">
              
              {/* Quote Block - Unique wording */}
              <div className="border-l-2 border-cyan-500 pl-4 py-1">
                <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider block mb-1">
                  ● ARCHITECTURE MANIFESTO
                </span>
                <p className="text-white italic text-base leading-relaxed font-sans">
                  "I view software as a double-sided engine—where machine learning forms the cognitive core, and modern web architectures provide the reliable machinery to deliver it."
                </p>
              </div>

              {/* Bio details - Humanized & styled */}
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-sans">
                <p>
                  Hi, I'm <span className="text-cyan-400 font-bold">Sakshi Pandey</span>, a passionate{' '}
                  <span className="text-teal-300 font-semibold">AI/ML Engineer and Full Stack Developer</span> focused on building intelligent applications that blend modern software engineering with practical machine learning.
                </p>
                <p>
                  My work spans <span className="text-white font-medium border-b border-white/10 hover:border-cyan-400 transition-colors">Artificial Intelligence</span>,{' '}
                  <span className="text-white font-medium border-b border-white/10 hover:border-cyan-400 transition-colors">Machine Learning</span>,{' '}
                  <span className="text-white font-medium border-b border-white/10 hover:border-cyan-400 transition-colors">Deep Learning</span>, and full-stack product development using React, Node.js, Flask, and cloud-native tooling to create scalable, data-driven, and user-centered experiences.
                </p>
                <p>
                  I'm especially interested in <span className="text-cyan-300">RAG systems, NLP, explainable AI, cloud computing, and analytics</span>. I enjoy turning complex problems into practical solutions and aim to build intelligent products that create measurable impact across research, industry, and real-world workflows.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Academic Credentials */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase">
                ● EDUCATION TIMELINE
              </span>
            </div>

            {/* Timeline Cards container with timeline trace line */}
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="group relative border border-white/5 bg-slate-950/40 p-6 rounded-2xl transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-950/60"
                >
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] border border-black group-hover:scale-125 transition-transform" />

                  {/* Cyber accent highlights */}
                  <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white/10 group-hover:border-teal-400 transition-colors" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/10 group-hover:border-teal-400 transition-colors" />

                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-bold tracking-wider">
                        {edu.duration}
                      </span>
                    </div>
                    
                    {/* Education Cap Badge */}
                    <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <GraduationCap size={16} />
                    </div>
                  </div>

                  {/* Card Title & Content */}
                  <div className="space-y-3 font-sans">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {edu.institution}
                    </h3>
                    
                    <p className="text-gray-400 text-sm font-medium">
                      {edu.degree}
                    </p>

                    {/* Score badge */}
                    <div className="inline-block bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md text-cyan-400 text-xs font-bold font-mono-cyber">
                      {edu.score}
                    </div>

                    {/* Location detail */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono-cyber pt-1">
                      <MapPin size={11} className="text-teal-500" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Divider and desc */}
                    <div className="border-t border-white/5 pt-3 mt-3">
                      <p className="text-xs text-gray-400 font-mono-cyber leading-relaxed">
                        {edu.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Custom Console Monitor Widget */}
            <div className="border border-white/5 bg-slate-950/20 p-5 rounded-2xl select-none font-mono-cyber">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-teal-400 font-bold tracking-widest uppercase">SYS_CONSOLE | STACK_METRICS</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-gray-400 font-mono-cyber">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-500">&gt; pyTorch_engine</span>
                  <span className="text-cyan-400 font-bold">READY | MODEL_ACC: 94.6%</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-500">&gt; node_gateway</span>
                  <span className="text-teal-400 font-bold">STABLE | LATENCY: 12ms</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-500">&gt; aws_deployment</span>
                  <span className="text-green-400 font-bold">ACTIVE | STACK_DEPLOYED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">&gt; responsiveness</span>
                  <span className="text-white font-bold">OPTIMIZED | 100% SECURE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Local custom animations */}
      <style>{`
        @keyframes scanner {
          0% { transform: translateY(0); }
          50% { transform: translateY(380px); }
          100% { transform: translateY(0); }
        }

        .animate-scanner {
          animation: scanner 6s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
