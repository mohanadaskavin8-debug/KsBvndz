import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

import heroVideo from '@assets/hero-bg.mp4';
import heroAmbient from '@assets/hero-ambient.mp4';
import heroPoster from '@assets/hero-poster.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 60]);

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

      {/* ── Pre-Save CTA ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center gap-5 px-6 text-center"
        style={reduce ? undefined : { opacity: opacityText, y: yText }}
      >
        {/* "NEW ALBUM" badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 2.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-primary"
              animate={reduce ? {} : { scale: [1, 2.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/80">
            New Album
          </span>
        </motion.div>

        {/* Album title — shimmer sweep */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: reduce ? 0 : 2.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-display uppercase leading-none select-none"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              background: 'linear-gradient(110deg, #fff 35%, #aaa 50%, #fff 65%)',
              backgroundSize: '250% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: reduce ? 'none' : 'hero-shimmer 3.5s ease-in-out infinite',
            }}
          >
            Silence Feels Louder
          </h2>
        </motion.div>

        {/* Release date */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/50"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 2.9, duration: 0.7 }}
        >
          Album · Aug 28, 2026
        </motion.p>

        {/* Pre-Save button */}
        <motion.a
          href="https://streameum.bfan.link/silence-feels-louder"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-1 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase text-white overflow-hidden"
          style={{ background: 'hsl(358 100% 40%)' }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : 3.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          {/* Shimmer sweep on button */}
          {!reduce && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'hero-btn-shimmer 2.4s ease-in-out infinite',
              }}
            />
          )}
          {/* Outer glow ring */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: '0 0 0 0 hsl(358 100% 45% / 0.7)' }}
              animate={{ boxShadow: ['0 0 0 0px hsl(358 100% 45% / 0.6)', '0 0 0 10px hsl(358 100% 45% / 0)', '0 0 0 0px hsl(358 100% 45% / 0)'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <span>Pre-Save Now</span>
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={reduce ? {} : { x: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.a>
      </motion.div>

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

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.2 : 3.6, duration: 1 }}
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
