import React, { useRef, useState, useEffect } from 'react';

const DancingHeading = ({ text, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 
      ref={ref} 
      className={`flex justify-center items-center flex-wrap select-none font-sans font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent ${className}`}
    >
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index} className="mx-2">&nbsp;</span>;
        return (
          <span
            key={index}
            className={`inline-block transition-all duration-700 ease-out transform ${
              isVisible 
                ? 'translate-y-0 rotate-0 opacity-100' 
                : 'translate-y-6 -rotate-12 opacity-0'
            } hover:text-cyan-300 hover:-translate-y-2.5 hover:rotate-6 hover:scale-105 duration-300 cursor-pointer`}
            style={{
              transitionDelay: isVisible ? `${index * 35}ms` : '0ms',
              textShadow: '0 0 20px rgba(34, 211, 238, 0)'
            }}
          >
            {char}
          </span>
        );
      })}
    </h2>
  );
};

export default DancingHeading;
