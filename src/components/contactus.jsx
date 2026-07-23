import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  MapPin, 
  Send,
  User,
  MessageSquare,
  Github,
  Linkedin,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import DancingHeading from "./DancingHeading";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      label: "INBOX",
      value: "sakshipandey.0322@gmail.com",
      href: "mailto:sakshipandey.0322@gmail.com",
      icon: <Mail size={16} />
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/sakshi-pandey-46b586290",
      href: "https://www.linkedin.com/in/sakshi-pandey-46b586290/",
      icon: <Linkedin size={16} />
    },
    {
      label: "REPOS",
      value: "github.com/Sakshi-Pandey22",
      href: "https://github.com/Sakshi-Pandey22",
      icon: <Github size={16} />
    },
    {
      label: "LOCATION",
      value: "Chennai, Tamil Nadu",
      href: "https://maps.google.com/?q=Chennai,Tamil+Nadu,India",
      icon: <MapPin size={16} />
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1800);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
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
          <DancingHeading text="Connect With Me" className="text-4xl md:text-5xl lg:text-6xl mb-4" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Grid: Section then Subsection Split */}
        <div className={`grid lg:grid-cols-5 gap-12 items-start w-full transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Left Side: Directory Contact Info (2/5 Width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 px-1">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">
                INBOX_ACCESS
              </span>
            </div>

            {/* List Rows */}
            <div className="space-y-1">
              {contactInfo.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between py-5 px-3 border-b border-white/5 hover:bg-slate-950/20 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 z-10">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/20 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">{item.label}</span>
                      <span className="text-white text-sm font-semibold tracking-tight group-hover:text-cyan-300 transition-colors duration-300">{item.value}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-400" />
                  
                  {/* Expanding bottom border indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 via-teal-400 to-transparent group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Message Transmitter Form (3/5 Width) */}
          <div className="lg:col-span-3">
            <div className="border border-white/5 bg-slate-950/25 p-8 md:p-10 rounded-2xl space-y-8 hover:border-cyan-500/10 transition-all duration-500">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="relative mb-6">
                    <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
                    <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 rounded-full mx-auto animate-ping" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-sans tracking-tight">
                    TRANSMISSION COMPLETE
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Data packets dispatched successfully. I will get back to your query shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Header metadata */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 select-none">
                    <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest">
                      ● MESSAGE_TRANSMITTER
                    </span>
                    <span className="text-[9px] text-gray-500">PORT: SSL_SECURE</span>
                  </div>

                  {/* Name Input */}
                  <div className="relative group/field space-y-1.5 text-left font-mono-cyber">
                    <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${
                      focusedField === 'name' ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {focusedField === 'name' ? '> ' : '  '}NAME_IDENTIFIER
                    </span>
                    <div className="relative flex items-center">
                      <User size={14} className={`absolute left-4 transition-colors ${focusedField === 'name' ? 'text-cyan-400' : 'text-gray-500'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-black/40 border border-white/5 focus:border-cyan-500/30 rounded-xl pl-11 pr-4 py-3 text-white text-xs placeholder-gray-700 focus:outline-none transition-all duration-300"
                        placeholder="ENTER FULL NAME"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative group/field space-y-1.5 text-left font-mono-cyber">
                    <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${
                      focusedField === 'email' ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {focusedField === 'email' ? '> ' : '  '}EMAIL_ROUTING
                    </span>
                    <div className="relative flex items-center">
                      <Mail size={14} className={`absolute left-4 transition-colors ${focusedField === 'email' ? 'text-cyan-400' : 'text-gray-500'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-black/40 border border-white/5 focus:border-cyan-500/30 rounded-xl pl-11 pr-4 py-3 text-white text-xs placeholder-gray-700 focus:outline-none transition-all duration-300"
                        placeholder="ROUTING_ADDRESS@HOST.COM"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative group/field space-y-1.5 text-left font-mono-cyber">
                    <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${
                      focusedField === 'message' ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {focusedField === 'message' ? '> ' : '  '}PAYLOAD_PACKET
                    </span>
                    <div className="relative flex items-start">
                      <MessageSquare size={14} className={`absolute left-4 top-3.5 transition-colors ${focusedField === 'message' ? 'text-cyan-400' : 'text-gray-500'}`} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className="w-full bg-black/40 border border-white/5 focus:border-cyan-500/30 rounded-xl pl-11 pr-4 py-3.5 text-white text-xs placeholder-gray-700 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="COMPILE PACKET CORE LOGIC..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <div className="relative group/btn overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/10 py-4.5 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2.5 cursor-pointer">
                      <Send size={15} className="text-cyan-400 group-hover/btn:scale-110 transition-all duration-300" />
                      <span className="text-xs font-bold text-cyan-400 tracking-wider font-mono-cyber uppercase">
                        {isSubmitting ? "TRANSMITTING DATA..." : "TRANSMIT MESSAGE"}
                      </span>
                    </div>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Minimalist Signature Footer (Unified Portfolio Signature) */}
        <div className="mt-28 border-t border-white/5 pt-8 text-center select-none text-[10px] text-gray-600 tracking-[0.2em] font-mono-cyber">
          <span>SAKSHI PANDEY • DESIGNED & ENGINEERED • © 2026</span>
        </div>

      </div>
    </section>
  );
}
