import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-40 blur-[100px] opacity-20"
      style={{
        background: 'radial-gradient(circle, rgba(139,0,0,1) 0%, rgba(0,0,0,0) 70%)',
      }}
      animate={{
        x: mousePosition.x - 192,
        y: mousePosition.y - 192,
      }}
      transition={{
        type: 'tween',
        ease: 'backOut',
        duration: 0.5,
      }}
    />
  );
}
