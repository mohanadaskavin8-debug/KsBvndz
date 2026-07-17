import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import silenceCover from '@assets/covers/silence-feels-louder.jpg';

const PREORDER_URL = 'https://streameum.bfan.link/silence-feels-louder';

export function PreOrder() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="preorder" className="relative bg-[#050505] border-y border-white/5 overflow-hidden" ref={containerRef}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 py-20 md:py-28 relative">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
          <motion.a
            href={PREORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 sm:w-72 md:w-80 shrink-0 group"
          >
            <img
              src={silenceCover}
              alt="Silence Feels Louder — cover art"
              className="w-full aspect-square object-cover border border-white/10 group-hover:border-primary/50 transition-colors duration-300 shadow-[0_0_40px_rgba(139,0,0,0.25)]"
            />
            <span className="absolute top-3 left-3 bg-primary text-white text-[10px] md:text-xs uppercase tracking-[0.2em] px-2.5 py-1 shadow-[0_0_15px_rgba(139,0,0,0.6)]">
              Pre-Save
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-center md:text-left"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-3">New Album</h2>
            <h3 className="text-4xl md:text-6xl font-display uppercase tracking-wider text-white mb-4">
              Silence Feels Louder
            </h3>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-xs md:text-sm mb-10">
              Drops August 28, 2026
            </p>
            <a
              href={PREORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/80 text-white uppercase tracking-[0.25em] text-xs md:text-sm px-10 py-4 transition-colors duration-300 shadow-[0_0_25px_rgba(139,0,0,0.4)]"
            >
              Pre-Save Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
