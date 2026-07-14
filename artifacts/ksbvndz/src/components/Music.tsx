import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

import oceanPt2Img from '@assets/covers/ocean-pt2.jpg';
import ghostImg from '@assets/covers/ghost.jpg';
import lifeOfDaPartyImg from '@assets/covers/life-of-da-party.jpg';
import voicesInMyHeadImg from '@assets/covers/voices-in-my-head.jpg';
import blackSheepImg from '@assets/covers/black-sheep.jpg';
import fullaPillsImg from '@assets/covers/fulla-pills.jpg';
import closeToYouImg from '@assets/covers/close-to-you.jpg';
import warImg from '@assets/covers/war.jpg';
import freestyleOpenMicImg from '@assets/covers/freestyle-open-mic.jpg';
import pushImg from '@assets/covers/push.jpg';
import insomniaImg from '@assets/covers/insomnia.jpg';
import greatnessOpenMicImg from '@assets/covers/greatness-open-mic.jpg';
import noRestImg from '@assets/covers/no-rest.jpg';
import villainsImg from '@assets/covers/villains.jpg';
import darksideImg from '@assets/covers/darkside.jpg';
import daysGoneImg from '@assets/covers/days-gone.jpg';

const tracks = [
  { title: 'Ocean, Pt. 2', date: '2026-03-30', image: oceanPt2Img, featured: true },
  { title: 'Ghost', date: '2026-03-08', image: ghostImg, featured: false },
  { title: 'Life Of Da Party', date: '2025-12-19', image: lifeOfDaPartyImg, featured: false },
  { title: 'Voices in My Head', date: '2025-10-22', image: voicesInMyHeadImg, featured: false },
  { title: 'Black Sheep', date: '2025-10-09', image: blackSheepImg, featured: false },
  { title: 'Fulla Pills', date: '2025-09-05', image: fullaPillsImg, featured: false },
  { title: 'Close to You', date: '2025-06-26', image: closeToYouImg, featured: false },
  { title: 'War', date: '2025-05-16', image: warImg, featured: false },
  { title: 'Freestyle (Open Mic)', date: '2025-04-02', image: freestyleOpenMicImg, featured: false },
  { title: 'PUSH', date: '2025-03-06', image: pushImg, featured: false },
  { title: 'Insomnia', date: '2025-02-22', image: insomniaImg, featured: false },
  { title: 'Greatness (Open Mic)', date: '2024-12-27', image: greatnessOpenMicImg, featured: false },
  { title: 'No Rest', date: '2024-10-29', image: noRestImg, featured: false },
  { title: 'Villains (feat. KsBvndz)', date: '2024-10-19', image: villainsImg, featured: true },
  { title: 'Darkside', date: '2024-06-15', image: darksideImg, featured: false },
  { title: 'Days Gone', date: '2024-05-03', image: daysGoneImg, featured: true }
];

export function Music() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="music" className="py-32 bg-[#050505] relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary">Discography</h2>
            <h3 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-white">
              The Sound
            </h3>
          </div>
          <a 
            href="https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-primary/50 hover:border-primary pb-1 inline-block"
          >
            Listen on Spotify
          </a>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tracks.map((track, idx) => (
            <motion.a
              key={idx}
              href="https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`group relative block ${track.featured ? 'col-span-2 row-span-2' : ''}`}
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-full aspect-square overflow-hidden bg-black/50 transition-all duration-500 transform-gpu group-hover:rotate-x-2 group-hover:-rotate-y-2 group-hover:scale-[1.02] border border-white/5 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(139,0,0,0.3)]">
                
                <img 
                  src={track.image} 
                  alt={track.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,0,0,0.8)] backdrop-blur-sm">
                    <Play size={24} className="ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h4 className={`font-display uppercase text-white ${track.featured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} mb-1`}>
                    {track.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">
                      {track.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
