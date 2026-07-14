import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CursorGlow } from '@/components/CursorGlow';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Music } from '@/components/Music';
import { Timeline } from '@/components/Timeline';
import { Gallery } from '@/components/Gallery';
import { Connect, Footer } from '@/components/Connect';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className={`min-h-screen bg-black text-white ${!loadingComplete ? 'overflow-hidden h-screen' : ''}`}>
      <AnimatePresence>
        {!loadingComplete && (
          <LoadingScreen key="loading" onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {/* Background Grain */}
      <div className="bg-grain" />

      {/* Interactive Cursor */}
      <div className="hidden lg:block">
        <CursorGlow />
      </div>

      <Navigation />

      <main>
        <Hero />
        <About />
        <Music />
        <Timeline />
        <Gallery />
        <Connect />
      </main>

      <Footer />
    </div>
  );
}
