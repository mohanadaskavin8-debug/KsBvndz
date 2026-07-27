import { motion, useReducedMotion } from 'framer-motion';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

import heroVideo from '@assets/hero-bg.mp4';
import heroAmbient from '@assets/hero-ambient.mp4';
import heroPoster from '@assets/hero-poster.jpg';

export function Hero() {
  const reduce = useReducedMotion();

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

      {/* ── Video layer ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.6 : 3.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient smoke fill */}
        <video
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
          style={{ filter: 'brightness(0.7)' }}
          src={heroAmbient}
          autoPlay={!reduce}
          muted loop playsInline preload="auto"
          tabIndex={-1} aria-hidden="true"
        />

        {/* Sharp hero at true 960×960 resolution, edges melting into smoke */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            style={{
              width:  'min(960px, 100vw, 100svh)',
              height: 'min(960px, 100vw, 100svh)',
              maskImage:
                'linear-gradient(to right, transparent, black 7%, black 93%, transparent), linear-gradient(to bottom, transparent, black 7%, black 93%, transparent)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 7%, black 93%, transparent), linear-gradient(to bottom, transparent, black 7%, black 93%, transparent)',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <video
              className="w-full h-full object-cover"
              src={heroVideo}
              poster={heroPoster}
              autoPlay={!reduce}
              muted loop playsInline preload="auto"
              tabIndex={-1} aria-hidden="true"
            />
          </div>
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10 pointer-events-none" />
      </motion.div>

      {/* ── Grain overlay ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat" />

      {/* ── Floating Socials ─────────────────────────────────────────── */}
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
            <social.icon size={22} />
          </motion.a>
        ))}
      </div>

      {/* ── Pre-Save Below indicator ─────────────────────────────────── */}
      <motion.a
        href="#preorder"
        aria-label="Pre-save Silence Feels Louder — jump to the pre-save section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.2 : 3.6, duration: 1 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        {/* PRE-SAVE — big Bebas Neue, red glow wave letter by letter */}
        <span className="flex items-center font-display text-3xl md:text-4xl tracking-[0.2em] pl-[0.2em]">
          {'PRE-SAVE'.split('').map((ch, i) => (
            <motion.span
              key={i}
              animate={
                reduce
                  ? { color: 'hsl(358 100% 40%)' }
                  : {
                      color: ['hsl(358 100% 32%)', 'hsl(358 100% 58%)', 'hsl(358 100% 32%)'],
                      textShadow: [
                        '0 0 0px rgba(255,40,50,0)',
                        '0 0 22px rgba(255,60,70,0.9)',
                        '0 0 0px rgba(255,40,50,0)',
                      ],
                    }
              }
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, delay: i * 0.13, ease: 'easeInOut' }}
            >
              {ch}
            </motion.span>
          ))}
        </span>

        {/* Beam with a falling red comet */}
        <span className="relative block w-[1px] h-10 overflow-hidden bg-white/10 rounded-full">
          {reduce ? (
            <span className="absolute inset-0 bg-gradient-to-b from-primary/70 to-transparent" />
          ) : (
            <motion.span
              className="absolute left-0 top-0 w-full h-4 bg-gradient-to-b from-transparent via-red-500 to-primary"
              style={{ boxShadow: '0 0 8px rgba(255,50,60,0.8)' }}
              animate={{ y: [-16, 44] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.35, ease: 'easeIn' }}
            />
          )}
        </span>

        {/* Cascading chevrons */}
        <span className="flex flex-col items-center -space-y-[5px] text-primary">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              animate={reduce ? { opacity: 0.35 + i * 0.2 } : { opacity: [0.08, 1, 0.08], y: [-1.5, 1.5, -1.5] }}
              transition={reduce ? undefined : { duration: 1.4, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
            >
              <path d="M1 1l5.5 5L12 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}
        </span>
      </motion.a>
    </section>
  );
}
