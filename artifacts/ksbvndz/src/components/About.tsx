import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import studioImg from '@assets/generated_images/studio.jpg';
import streetwearImg from '@assets/generated_images/streetwear.jpg';

export function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-sm uppercase tracking-[0.3em] text-primary">Identity</h2>
              <h3 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-white leading-none">
                Untold <br/><span className="text-gray-500">Corners</span>
              </h3>
            </div>
            
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              KsBvndz is a Toronto-based rapper whose music maps the grey zones between ambition and survival. Raised in the city's east end, his sound fuses raw drill energy with confessional storytelling — each track a dispatch from the city's untold corners.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-4xl font-display text-white">1.8M+</div>
                <div className="text-sm uppercase tracking-wider text-gray-500 mt-1">Streams on Villians</div>
              </div>
              <div>
                <div className="text-4xl font-display text-white">2024</div>
                <div className="text-sm uppercase tracking-wider text-gray-500 mt-1">Debut Album</div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 aspect-[3/4] max-w-md mx-auto"
            >
              <img 
                src={studioImg} 
                alt="KsBvndz in Studio" 
                className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-sm pointer-events-none" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -bottom-12 -right-6 lg:-right-12 w-1/2 aspect-[4/5] z-20 hidden md:block"
            >
              <img 
                src={streetwearImg} 
                alt="KsBvndz Streetwear" 
                className="w-full h-full object-cover rounded-sm border-4 border-black"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
