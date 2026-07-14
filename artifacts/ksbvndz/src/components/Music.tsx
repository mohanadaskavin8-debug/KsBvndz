import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

import daysGoneImg from '@assets/generated_images/days_gone.jpg';
import villiansImg from '@assets/generated_images/villians.jpg';
import blackSheepImg from '@assets/generated_images/black_sheep.jpg';
import albumAestheticImg from '@assets/generated_images/album_aesthetic.jpg';

const tracks = [
  {
    title: 'Villians',
    type: 'Single ft. Savv4x, 100 OTD',
    streams: '1.8M+',
    image: villiansImg,
    featured: true,
    link: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe'
  },
  {
    title: 'Days Gone',
    type: 'Debut Album',
    streams: '91.7K',
    image: daysGoneImg,
    featured: false,
    link: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe'
  },
  {
    title: 'Black Sheep',
    type: 'Single',
    streams: '728+',
    image: blackSheepImg,
    featured: false,
    link: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe'
  },
  {
    title: 'Insomnia',
    type: 'Single',
    streams: '166K',
    image: albumAestheticImg,
    featured: false,
    link: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe'
  }
];

export function Music() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
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
            View All Releases
          </a>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tracks.map((track, idx) => (
            <motion.a
              key={idx}
              href={track.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`group relative block ${track.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
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
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {track.featured && (
                    <span className="inline-block px-2 py-1 bg-primary text-white text-xs uppercase tracking-widest mb-3">
                      Most Streamed
                    </span>
                  )}
                  <h4 className={`font-display uppercase text-white ${track.featured ? 'text-4xl md:text-5xl' : 'text-3xl'} mb-1`}>
                    {track.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-gray-400">
                      {track.type}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">
                      {track.streams}
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
