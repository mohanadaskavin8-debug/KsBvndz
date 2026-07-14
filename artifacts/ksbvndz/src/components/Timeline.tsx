import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    date: 'May 2024',
    title: 'Days Gone',
    subtitle: 'Debut Album',
    description: 'Tracks: Intro, VilleSide, Franchise, No Return, Last Mention, Inner Demons, Confessions',
    stats: '91.7K plays on Audiomack'
  },
  {
    date: 'October 2024',
    title: 'Villians',
    subtitle: 'ft. Savv4x, 100 OTD',
    description: 'Breakthrough collab record that put the city on notice.',
    stats: '1.8M total streams'
  },
  {
    date: 'Nov–Dec 2024',
    title: 'Insomnia',
    subtitle: 'Single',
    description: 'Dark introspective solo record exploring the late-night mindset.',
    stats: '166K streams'
  },
  {
    date: 'March 2025',
    title: 'PUSH',
    subtitle: 'with 100 OTD',
    description: 'Street anthem collaboration delivering raw energy.',
    stats: '545K streams'
  },
  {
    date: 'April 2025',
    title: 'Freestyle (Open Mic)',
    subtitle: 'Single',
    description: 'Raw unfiltered performance record showing pure lyrical ability.',
    stats: 'Live Recording'
  },
  {
    date: 'Oct 2025',
    title: 'Black Sheep',
    subtitle: 'Single',
    description: 'Latest release continuing the dark, melodic drill evolution.',
    stats: '728+ plays'
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 bg-black relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-5xl relative">
        <div className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-2">The Journey</h2>
          <h3 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-white">
            Timeline
          </h3>
        </div>

        <div className="relative">
          {/* Center Line Container */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated Center Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary to-transparent -translate-x-1/2 origin-top"
            style={{ scaleY: lineHeight }}
          />

          <div className="space-y-24">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(139,0,0,0.8)]" />

                  {/* Content Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto text-left'}`}
                  >
                    <div className="group hover:bg-white/[0.02] p-6 rounded-lg transition-colors border border-transparent hover:border-white/5">
                      <div className="text-primary font-display text-2xl md:text-3xl mb-1">{item.date}</div>
                      <h4 className="text-3xl md:text-4xl font-display text-white uppercase mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      <div className="text-sm uppercase tracking-widest text-gray-400 mb-4">{item.subtitle}</div>
                      <p className="text-gray-500 font-light mb-4">{item.description}</p>
                      <div className="inline-block px-3 py-1 bg-white/5 text-xs uppercase tracking-widest text-gray-300">
                        {item.stats}
                      </div>
                    </div>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
