import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const WORD = 'KSBVNDZ'.split('');

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const startExit = setTimeout(() => setExit(true), 2200);
    const done = setTimeout(onComplete, 3300);
    return () => {
      clearTimeout(startExit);
      clearTimeout(done);
    };
  }, [onComplete]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
  };

  const letter: Variants = {
    hidden: { y: 60, opacity: 0, filter: 'blur(12px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const panelTransition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.12 };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Split panels (curtain reveal) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[50.5%] bg-background will-change-transform"
        animate={{ y: exit ? '-100%' : '0%' }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-background will-change-transform"
        animate={{ y: exit ? '100%' : '0%' }}
        transition={panelTransition}
      />

      {/* Red bloom */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 46%, rgba(179,0,0,0.16), transparent 55%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: exit ? 0.4 : 1.4 }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
        animate={{
          opacity: exit ? 0 : 1,
          scale: exit ? 1.12 : 1,
          filter: exit ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: exit ? 0.55 : 0.01, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="flex"
          variants={container}
          initial="hidden"
          animate="visible"
          aria-label="KsBvndz"
        >
          {WORD.map((ch, i) => (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block font-display text-6xl sm:text-8xl md:text-9xl tracking-[0.06em] text-foreground uppercase text-glow leading-none"
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="h-[2px] bg-primary mt-8 box-glow"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'min(240px, 62vw)', opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
        />

        <motion.span
          className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.55em] text-gray-500 pl-[0.55em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          Toronto
        </motion.span>
      </motion.div>
    </div>
  );
}
