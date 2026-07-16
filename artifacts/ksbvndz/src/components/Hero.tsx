import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

import heroVideo from '@assets/hero-bg.mp4';
import heroPoster from '@assets/hero-poster.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 500], [1, 1.2]);
  const letterSpacing = useTransform(scrollY, [0, 500], ['0.1em', '0.5em']);

  const socials = [
    { icon: SiSpotify, href: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe', label: 'Spotify' },
    { icon: SiApplemusic, href: 'https://music.apple.com/ca/artist/ksbvndz/1745377739', label: 'Apple Music' },
    { icon: SiYoutube, href: 'https://youtube.com/channel/UCq2MDRG4fWR7olS5nD1Ja6A', label: 'YouTube' },
    { icon: SiInstagram, href: 'https://instagram.com/ksbvndz/', label: 'Instagram' },
    { icon: SiTiktok, href: 'https://tiktok.com/@ksbvndz', label: 'TikTok' },
    { icon: SiX, href: 'https://x.com/28ville44', label: 'X' },
  ];

  return (
    <section id="video" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.6 : 3.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80 z-10 pointer-events-none" />
        <video
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        <img
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover absolute inset-0 pointer-events-none -z-10"
        />
      </motion.div>

      {/* Particles/Dust effect overlay */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center pt-20 pointer-events-none">
        <motion.div
          style={reduce ? undefined : { opacity: opacityText, scale: scaleText }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: reduce ? 0 : 2.2, duration: reduce ? 0.4 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              style={reduce ? undefined : { letterSpacing }}
              className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-display uppercase text-white font-bold mb-4 drop-shadow-2xl"
            >
              KsBvndz
            </motion.h1>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 text-sm md:text-lg tracking-[0.3em] uppercase text-gray-300"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0.1 : 2.7, duration: reduce ? 0.4 : 0.9 }}
          >
            <span>Black Sheep</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Out Now</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Socials */}
      <div className="absolute bottom-12 right-12 z-30 hidden md:flex flex-col gap-6">
        {socials.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
            whileHover={reduce ? undefined : { x: -5 }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduce ? 0.1 : 2.9 + idx * 0.12, duration: 0.6 }}
          >
            <social.icon size={24} />
          </motion.a>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.2 : 3.2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          animate={reduce ? { height: '100%', opacity: 0.6 } : { height: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </section>
  );
}
