import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

import heroVideo from '@assets/hero-bg.mp4';
import heroAmbient from '@assets/hero-ambient.mp4';
import heroPoster from '@assets/hero-poster.jpg';

const SAVE_ALBUM_URL = 'https://streameum.bfan.link/silence-feels-louder';

export function Hero() {
  const reduce = useReducedMotion();
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [ambientVideoRef.current, heroVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (reduce || videos.length === 0) return;
    // React doesn't render the muted *attribute*; Safari checks it for autoplay.
    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
    });
    const attempt = () => videos.forEach((video) => video.play().catch(() => {}));
    attempt();
    // retry on first user interaction if autoplay was blocked
    const onInteract = () => { attempt(); window.removeEventListener('pointerdown', onInteract); };
    window.addEventListener('pointerdown', onInteract, { once: true });
    return () => window.removeEventListener('pointerdown', onInteract);
  }, [reduce]);

  const socials = [
    { icon: SiSpotify,    href: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe', label: 'Spotify' },
    { icon: SiApplemusic, href: 'https://music.apple.com/ca/artist/ksbvndz/1745377739',    label: 'Apple Music' },
    { icon: SiYoutube,    href: 'https://youtube.com/channel/UCq2MDRG4fWR7olS5nD1Ja6A',    label: 'YouTube' },
    { icon: SiInstagram,  href: 'https://instagram.com/ksbvndz/',                           label: 'Instagram' },
    { icon: SiTiktok,     href: 'https://tiktok.com/@ksbvndz',                              label: 'TikTok' },
    { icon: SiX,          href: 'https://x.com/28ville44',                                  label: 'X' },
  ];

  return (
    <section id="video" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">

      {/* ── Animated smoke background with feathered centered artwork ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.6 : 3.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={ambientVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
          src={heroAmbient}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            style={{
              width: 'min(100vw, 100vh)',
              height: 'min(100vw, 100vh)',
              maskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent), linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent), linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <video
              ref={heroVideoRef}
              className="w-full h-full object-cover"
              src={heroVideo}
              poster={heroPoster}
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />
      </motion.div>

      {/* ── Dust/grain overlay ───────────────────────────────────────── */}
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

      {/* ── Bottom-centre stack: save pill + tracklist indicator ──────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.2 : 3.6, duration: 1 }}
      >
        {/* Save album pill */}
        <motion.a
          href={SAVE_ALBUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Save album Silence Feels Louder"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/40 hover:bg-black/60 transition-all duration-300 group"
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
        >
          <span className="font-display text-[10px] tracking-[0.15em]">SAVE ALBUM</span>
        </motion.a>

        {/* Tracklist indicator */}
        <motion.a
          href="#preorder"
          aria-label="Preview tracklist"
          className="flex flex-col items-center gap-2.5 cursor-pointer"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
        >
          <span className="flex items-center font-display text-sm md:text-base tracking-[0.45em] pl-[0.45em]">
            {'PREVIEW TRACKLIST'.split('').map((ch, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', width: ch === ' ' ? '0.45em' : undefined }}
                animate={
                  reduce
                    ? { color: 'hsl(358 100% 40%)' }
                    : {
                        color: ['hsl(358 100% 32%)', 'hsl(358 100% 58%)', 'hsl(358 100% 32%)'],
                        textShadow: ['0 0 0px rgba(255,40,50,0)', '0 0 22px rgba(255,60,70,0.9)', '0 0 0px rgba(255,40,50,0)'],
                      }
                }
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, delay: i * 0.13, ease: 'easeInOut' }}
              >
                {ch}
              </motion.span>
            ))}
          </span>

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
      </motion.div>
    </section>
  );
}
