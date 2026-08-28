import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';

import silenceCover from '@assets/covers/silence-feels-louder.jpg';

const PREORDER_URL = 'https://streameum.bfan.link/silence-feels-louder';
const PREVIEW_BASE = `${import.meta.env.BASE_URL}media/previews`;

const TRACKS = [
  { num: 1, preview: '01-intro.mp3', title: 'Intro', artists: 'KsBvndz, Streameum', duration: '2:06' },
  { num: 2, preview: '02-courtney.mp3', title: 'Courtney', artists: 'KsBvndz, Streameum', duration: '2:00' },
  { num: 3, preview: '03-mask-off.mp3', title: 'Mask Off', artists: 'KsBvndz, Streameum', duration: '2:06' },
  { num: 4, preview: '04-blue-green.mp3', title: 'Blue & Green', artists: 'KsBvndz, LUVEMRACKZ, Streameum', duration: '1:49' },
  { num: 5, preview: '05-ynt.mp3', title: 'YNT', artists: 'KsBvndz, Recky, Streameum', duration: '1:44' },
  { num: 6, preview: '06-r4r.mp3', title: 'R4R', artists: 'KsBvndz, Savv4x, Streameum', duration: '2:01' },
  { num: 7, preview: '07-first-button.mp3', title: 'First Button', artists: 'KsBvndz, Streameum', duration: '2:34' },
  { num: 8, preview: '08-letter-2-reemy.mp3', title: 'Letter 2 Reemy', artists: 'KsBvndz, Streameum', duration: '3:21' },
  { num: 9, preview: '09-don-t-wanna-talk.mp3', title: "Don't Wanna Talk", artists: 'KsBvndz, Streameum', duration: '2:01' },
  { num: 10, preview: '10-past-life.mp3', title: 'Past Life', artists: 'KsBvndz, Streameum', duration: '2:15' },
  { num: 11, preview: '11-don-t-want-no-company.mp3', title: "Don't Want No Company", artists: 'KsBvndz, Streameum', duration: '2:17' },
  { num: 12, preview: '12-better-off-dolo.mp3', title: 'Better Off Dolo', artists: 'KsBvndz, Streameum', duration: '2:57' },
  { num: 13, preview: '13-dnd.mp3', title: 'DND', artists: 'KsBvndz, Streameum', duration: '3:10' },
  { num: 14, preview: '14-bvnditnextdoor.mp3', title: 'BvnditNextDoor', artists: 'KsBvndz, Streameum', duration: '3:39' },
  { num: 15, preview: '15-don-t-wanna-say-goodbye.mp3', title: "Don't Wanna Say Goodbye", artists: 'KsBvndz, Streameum', duration: '3:24' },
  { num: 16, preview: '16-what-is-love.mp3', title: 'What Is Love', artists: 'KsBvndz, Streameum', duration: '2:21' },
  { num: 17, preview: '17-lost-cause.mp3', title: 'Lost Cause', artists: 'KsBvndz, Streameum', duration: '2:26' },
  { num: 18, preview: '18-picasso.mp3', title: 'Picasso', artists: 'KsBvndz, Streameum', duration: '2:37' },
  { num: 19, preview: '19-heartfelt.mp3', title: 'Heartfelt', artists: 'KsBvndz, Streameum', duration: '2:14' },
  { num: 20, preview: '20-is-what-it-is.mp3', title: 'Is What It Is', artists: 'KsBvndz, Streameum', duration: '3:16' },
] as const;

type Track = (typeof TRACKS)[number];

function formatPreviewTime(seconds: number) {
  return `0:${Math.floor(seconds).toString().padStart(2, '0')}`;
}

export function PreOrder() {
  const containerRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduce = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeTrackNumber, setActiveTrackNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [previewDuration, setPreviewDuration] = useState(30);

  const activeTrack = TRACKS.find((track) => track.num === activeTrackNumber);
  const previewTime = Math.min(currentTime, previewDuration);
  const progress = previewDuration > 0 ? (previewTime / previewDuration) * 100 : 0;

  const playTrack = (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeTrackNumber === track.num) {
      if (audio.paused) {
        void audio.play();
      } else {
        audio.pause();
      }
      return;
    }

    setActiveTrackNumber(track.num);
    setCurrentTime(0);
    audio.src = `${PREVIEW_BASE}/${track.preview}`;
    audio.load();
    void audio.play();
  };

  const closePlayer = () => {
    audioRef.current?.pause();
    setActiveTrackNumber(null);
    setCurrentTime(0);
  };

  return (
    <section
      id="preorder"
      ref={containerRef}
      className="relative overflow-hidden border-y border-white/5 bg-[#050505]"
    >
      <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className={`transition-[padding] duration-500 ease-out ${activeTrack ? 'pb-28 sm:pb-24' : 'pb-0'}`}>
        <div className="container relative z-10 mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-20 md:py-28 xl:py-32">
          <div className="mb-12 flex flex-col items-center gap-8 sm:mb-16 sm:gap-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-center gap-6 text-center sm:gap-8 md:flex-row md:text-left lg:gap-12">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={reduce || isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: reduce ? 0 : 0.8 }}
                className="group relative w-44 shrink-0 min-[380px]:w-52 sm:w-56 md:w-60 lg:w-64 xl:w-72"
              >
                <img
                  src={silenceCover}
                  alt="Silence Feels Louder — cover art"
                  className="aspect-square w-full border border-white/10 object-cover shadow-[0_0_50px_rgba(139,0,0,0.2)] transition-colors duration-500 group-hover:border-primary/50"
                />
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={reduce || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2 }}
                className="flex flex-col items-center justify-center md:items-start"
              >
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary sm:text-sm">New Album</h2>
                <h3 className="mb-4 text-4xl font-display uppercase leading-[0.9] tracking-wider text-white min-[380px]:text-5xl sm:text-6xl xl:text-7xl">
                  Silence Feels<br className="hidden md:block" /> Louder
                </h3>
                <p className="mb-8 text-xs uppercase tracking-[0.22em] text-gray-400 sm:text-sm sm:tracking-[0.25em]">
                  Out Now
                </p>
                <a
                  href={PREORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(139,0,0,0.3)] transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] sm:px-10 sm:tracking-[0.25em]"
                >
                  Save Album
                </a>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-1 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-10 xl:gap-x-12">
            {TRACKS.map((track, index) => {
              const isActive = activeTrackNumber === track.num;
              return (
                <motion.button
                  key={track.num}
                  type="button"
                  onClick={() => playTrack(track)}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={reduce || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.3 + (index % 10) * 0.05 + Math.floor(index / 10) * 0.2 }}
                  className={`group relative flex min-h-[68px] w-full items-center justify-between border p-2 text-left transition-all duration-300 sm:min-h-[74px] sm:p-3 ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(204,0,0,0.1)_inset]'
                      : 'border-transparent border-b-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                  }`}
                  aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${track.title} by ${track.artists}`}
                  aria-pressed={isActive && isPlaying}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2 min-[360px]:gap-3 sm:gap-4 xl:gap-5">
                    <span className={`w-5 shrink-0 text-center font-display text-base transition-colors min-[360px]:w-6 sm:w-8 sm:text-xl ${isActive ? 'text-primary' : 'text-white/20 group-hover:text-white/60'}`}>
                      {track.num}
                    </span>
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-white/10 bg-black/50 sm:h-12 sm:w-12">
                      <img
                        src={silenceCover}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover transition-all duration-500 ${isActive ? 'scale-110 opacity-100' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}
                      />
                      <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {isActive && isPlaying
                          ? <Pause className="h-4 w-4 fill-primary text-primary sm:h-5 sm:w-5" />
                          : <Play className={`h-4 w-4 fill-current sm:h-5 sm:w-5 ${isActive ? 'text-primary' : 'text-white'}`} />}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className={`truncate font-display text-base uppercase tracking-wide transition-colors min-[360px]:text-lg sm:text-xl sm:tracking-wider ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {track.title}
                      </span>
                      <span className={`truncate text-[8px] uppercase tracking-[0.1em] transition-colors sm:text-[10px] sm:tracking-[0.18em] ${isActive ? 'text-primary/80' : 'text-white/40 group-hover:text-white/60'}`}>
                        {track.artists}
                      </span>
                    </div>
                  </div>
                  <span className={`shrink-0 pl-2 font-mono text-[10px] tracking-widest transition-colors sm:pl-4 sm:text-xs ${isActive ? 'text-primary' : 'text-white/30 group-hover:text-white/50'}`}>
                    {track.duration}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setPreviewDuration(event.currentTarget.duration || 30)}
      />

      <motion.div
        initial={false}
        animate={{ y: activeTrack ? 0 : '100%' }}
        transition={reduce ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 200 }}
        aria-hidden={!activeTrack}
        className={`pointer-events-none fixed bottom-0 left-0 right-0 z-[100] max-w-full overflow-hidden border-t border-primary/30 bg-[#0b0708]/95 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
          activeTrack ? 'visible' : 'invisible'
        }`}
      >
        <div className="relative mx-auto flex min-h-24 w-full max-w-7xl items-center gap-2 overflow-hidden px-3 py-3 min-[360px]:px-4 sm:gap-4 sm:px-6">
          {activeTrack && (
            <>
              <img
                src={silenceCover}
                alt=""
                width="56"
                height="56"
                className="block h-14 w-14 max-w-14 shrink-0 border border-white/10 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg uppercase tracking-wider text-white sm:text-xl">{activeTrack.title}</p>
                    <p className="truncate text-[8px] uppercase tracking-[0.12em] text-white/40 sm:text-[10px] sm:tracking-[0.18em]">
                      30-second preview · {activeTrack.artists}
                    </p>
                  </div>
                  <span className="hidden shrink-0 font-mono text-[10px] text-white/40 min-[420px]:block">
                    {formatPreviewTime(previewTime)} / 0:30
                  </span>
                </div>
                <div className="mt-3 h-px overflow-hidden bg-white/15">
                  <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => playTrack(activeTrack)}
                className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-white transition-colors hover:bg-white hover:text-black sm:h-12 sm:w-12"
                aria-label={isPlaying ? `Pause ${activeTrack.title}` : `Play ${activeTrack.title}`}
              >
                {isPlaying
                  ? <Pause className="h-5 w-5 fill-current" />
                  : <Play className="ml-0.5 h-5 w-5 fill-current" />}
              </button>
              <button
                type="button"
                onClick={closePlayer}
                className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/60 transition-all hover:border-white/40 hover:text-white"
                aria-label="Close player"
              >
                <X size={17} />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}