import { Badge } from "../components/ui/badge";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdAutoAwesome } from "react-icons/md";
import { useState, useEffect } from "react";

import profileDetail from "../assets/profile-detail.png"
import profileMain from "../assets/profile-main.png"


export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [titleIndex, setTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const titles = ["AI/ML Engineer", "Researcher", "Full Stack Developer", "Problem Solver"];
    const currentTitle = titles[titleIndex];
    
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(prev => prev.substring(0, prev.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, typedText.length + 1));
      }, 80);
    }

    if (!isDeleting && typedText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTitleIndex(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIndex]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-500/10 to-cyan-400/10 rounded-full animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-teal-400/10 to-blue-500/10 rounded-full animate-pulse"></div>

        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left - Image Gallery */}
          <div className={`flex-1 flex items-center justify-center relative transform transition-all duration-1200 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}>
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-green-400/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-700 animate-pulse-slow"></div>

                <div className="absolute -inset-8 border border-blue-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute -inset-12 border border-green-500/10 rounded-full animate-spin-reverse"></div>

                <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-gradient-to-r from-blue-500/50 to-green-500/50 shadow-2xl shadow-blue-500/30 group-hover:shadow-teal-500/40 transition-all duration-700 group-hover:scale-105 animate-float-subtle">
                  <img
                    src={profileMain}
                    alt="Sakshi Pandey portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-bounce"></div>
                </div>
              </div>

              <div className="absolute -top-6 -left-8 z-20">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-blue-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden border-2 border-teal-500/40 shadow-lg shadow-blue-500/20 group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-110 rotate-12 group-hover:rotate-6">
                    <img
                      src={profileDetail}
                      alt="Sakshi Pandey profile detail"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-6 z-15">
                <div className="relative group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-cyan-400/20 to-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-teal-500/30 group-hover:scale-110 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`flex-1 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>

            {/* Status Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 rounded-full opacity-20 group-hover:opacity-30 blur animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 border border-teal-500/30 text-teal-300 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-full animate-ping"></div>
                <span className="bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">Available for Work</span>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-4 flex flex-col items-center lg:items-end">
              <div className="relative">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  <span className="block text-gray-100 mb-2">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 bg-clip-text text-transparent animate-gradient-x font-extrabold">
                    SAKSHI PANDEY
                  </span>
                </h1>
                <div className="absolute -bottom-2 right-0 w-full h-1 bg-gradient-to-l from-blue-500 via-teal-500 to-green-400 animate-expand-right opacity-80 rounded-full"></div>
              </div>

              {/* Typing Animation Loop */}
              <div className="h-8 flex items-center font-mono text-[#7C5CFF] text-sm md:text-base font-bold tracking-widest mt-1 select-none">
                <span>{`[ `}</span>
                <span className="text-[#F472B6]">{typedText}</span>
                <span className="w-1.5 h-4 bg-[#F472B6] ml-1 animate-pulse" />
                <span>{` ]`}</span>
              </div>

              {/* Developer Titles — AI/ML instead of Kotlin */}
              <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-end">
                <div className="relative inline-block order-2 sm:order-1">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-400/20 to-fuchsia-500/20 blur-sm animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm px-4 py-2 rounded-2xl font-bold shadow-lg flex items-center gap-2">

                    AI / ML ENGINEER
                  </div>
                </div>

                <div className="relative inline-block order-1 sm:order-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-sm animate-pulse delay-300"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm px-4 py-2 rounded-2xl font-bold shadow-lg">
                    FULL STACK DEVELOPER
                  </div>
                </div>
              </div>
            </div>

            {/* Description — updated with AI/ML/AWS */}
            <div className="relative max-w-xl">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Building{" "}
                <span className="text-violet-400 font-bold">intelligent AI & ML systems</span>,{" "}
                scalable{" "}
                <span className="text-teal-400 font-bold">full-stack applications</span>, and{" "}
                cloud-powered solutions on{" "}
                <span className="text-orange-400 font-bold">AWS</span> using{" "}
                <span className="text-cyan-300 font-bold">React.js</span>, <span className="text-emerald-400 font-bold">Node.js</span>, and{" "}
                <span className="text-fuchsia-400 font-bold">Python</span>.{" "}
                <span className="bg-gradient-to-r from-violet-400 via-teal-400 to-green-400 bg-clip-text text-transparent font-bold">
                  Turning data into decisions, one model at a time.
                </span>
              </p>
            </div>

            {/* Social Links — GitHub, LinkedIn, LeetCode */}
            <div className="flex items-center justify-center lg:justify-end gap-4 pt-2">
              {[
                { icon: FaGithub, color: "text-gray-300", name: "GitHub", link: "https://github.com/Sakshi-Pandey22" },
                { icon: FaLinkedin, color: "text-blue-400", name: "LinkedIn", link: "https://www.linkedin.com/in/sakshi-pandey-46b586290/" },
                { icon: SiLeetcode, color: "text-yellow-400", name: "Email", link: "mailto:sakshipandey.0322@gmail.com" },
              ].map(({ icon: Icon, color, name, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={name}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                  <div className="relative p-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-full group-hover:border-teal-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className={`${color} text-xl transition-all duration-300 group-hover:text-teal-300`} />
                  </div>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-center lg:justify-end pt-4">
              <a
                href="/Sakshi_Pandey_Resume.pdf"
                download="Sakshi_Pandey_Resume.pdf"
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 rounded-2xl opacity-70 group-hover:opacity-100 blur-sm transition-all duration-300 animate-gradient-x"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 via-teal-600 to-green-500 text-white font-bold rounded-2xl flex items-center gap-3 transition-all duration-300 group-hover:scale-105 shadow-2xl backdrop-blur-sm">
                  <FaCode className="group-hover:rotate-180 transition-transform duration-500" />
                  <span className="tracking-wide">DOWNLOAD RESUME</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator — moved further down (hidden on mobile) */}
        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1500 hidden sm:block ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="flex flex-col items-center space-y-3 cursor-pointer group">
            <span className="text-gray-400 text-xs font-bold group-hover:text-teal-400 transition-colors tracking-widest">EXPLORE</span>
            <div className="relative">
              <div className="w-6 h-12 border-2 border-gray-400 rounded-full group-hover:border-teal-400 transition-colors flex justify-center relative overflow-hidden">
                <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-green-400 rounded-full mt-2 animate-scroll-bounce"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes expand-right {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-180deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-expand-right {
          animation: expand-right 1.2s ease-out forwards;
        }
        .animate-scroll-bounce {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
        .animate-float-subtle {
          animation: float-subtle 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
      `}</style>
    </section>
  );
}
