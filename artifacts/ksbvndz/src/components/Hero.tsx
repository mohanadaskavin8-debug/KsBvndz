import { motion, useScroll, useTransform } from 'framer-motion';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

import heroImg from '@assets/generated_images/hero.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  
  const yImage = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 500], [1, 1.2]);
  const letterSpacing = useTransform(scrollY, [0, 500], ['0.1em', '0.5em']);

  const socials = [
    { icon: SiSpotify, href: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe' },
    { icon: SiApplemusic, href: 'https://music.apple.com/ca/artist/ksbvndz/1745377739' },
    { icon: SiInstagram, href: 'https://www.instagram.com/ksbvndz/' },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yImage }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={heroImg} 
          alt="KsBvndz" 
          className="w-full h-full object-cover object-top opacity-70"
        />
      </motion.div>

      {/* Particles/Dust effect overlay */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center pt-20">
        <motion.div
          style={{ opacity: opacityText, scale: scaleText }}
          className="flex flex-col items-center"
        >
          <motion.h1 
            style={{ letterSpacing }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-display uppercase text-white font-bold mb-4 drop-shadow-2xl"
          >
            KsBvndz
          </motion.h1>
          
          <motion.div 
            className="flex items-center gap-4 text-sm md:text-lg tracking-[0.3em] uppercase text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span>Toronto</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Streameum Entertainment</span>
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
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
            whileHover={{ x: -5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + idx * 0.2 }}
          >
            <social.icon size={24} />
          </motion.a>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          animate={{ height: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
