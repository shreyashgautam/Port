import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import './App.css';
import Navbar from './components/navbar';
import HeroSection from './components/herosection';
import ExperienceSection from './components/experience';
import ScrollRevealBanner from './components/scrollingreveal';
import ProjectsSection from './components/project';
import SkillsSection from './components/skill';
import AchievementsPage from './components/achievement';
import ContactPage from './components/contactus';
import AboutSection from './components/about';
import Preloader from './components/preloader';
import CustomCursor from './components/customcursor';
import FramerWrapper from './components/framerwrapper';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      <CustomCursor />
      
      <main className="relative min-h-screen bg-black overflow-hidden">
        {/* Content Container (fades in once preloader completes) */}
        {!isLoading && (
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <FramerWrapper>
              <HeroSection />
            </FramerWrapper>
            
            <FramerWrapper>
              <AboutSection />
            </FramerWrapper>
            
            <FramerWrapper>
              <ExperienceSection />
            </FramerWrapper>
            
            <ScrollRevealBanner />
            
            <FramerWrapper>
              <ProjectsSection />
            </FramerWrapper>
            
            <FramerWrapper>
              <SkillsSection />
            </FramerWrapper>
            
            <FramerWrapper>
              <AchievementsPage />
            </FramerWrapper>
            
            <FramerWrapper>
              <ContactPage />
            </FramerWrapper>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
