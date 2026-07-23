import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const [isHoveredButton, setIsHoveredButton] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.35 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on coarse pointer devices (mobiles/tablets)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink = target.closest('a');
      const isBtn = target.closest('button');

      setIsHoveredLink(!!isLink);
      setIsHoveredButton(!!isBtn);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#7C5CFF] rounded-full pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#7c5cff]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Outer Follow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
        style={{
          x: ringX,
          y: ringY,
          borderColor: isHoveredButton ? '#F472B6' : '#7C5CFF',
          backgroundColor: isHoveredLink ? 'rgba(124, 92, 255, 0.08)' : 'rgba(124, 92, 255, 0)',
          scale: isHoveredLink || isHoveredButton ? 1.4 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;
