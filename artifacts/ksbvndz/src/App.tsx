import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import Lenis from 'lenis';

const queryClient = new QueryClient();

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resolve a same-page hash target from a click, guarding against
    // modifier/middle clicks, already-handled events, and new-tab links.
    const getHashFromClick = (e: MouseEvent): string | null => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return null;
      }
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank') return null;
      const href = anchor.getAttribute('href');
      return href && href.startsWith('#') ? href : null;
    };

    // Reduced motion: no smooth-scroll engine, just native (instant) jumps.
    if (prefersReduced) {
      const handleReducedAnchor = (e: MouseEvent) => {
        const href = getHashFromClick(e);
        if (!href) return;
        e.preventDefault();
        if (href === '#') {
          window.scrollTo({ top: 0 });
          return;
        }
        const el = document.querySelector(href);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top });
      };
      document.addEventListener('click', handleReducedAnchor);
      return () => document.removeEventListener('click', handleReducedAnchor);
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis hijacks scroll, so native hash-anchor jumps are overridden by its
    // rAF loop. Intercept in-page anchor clicks and drive them through Lenis.
    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    const handleAnchorClick = (e: MouseEvent) => {
      const href = getHashFromClick(e);
      if (!href) return;
      e.preventDefault();
      if (href === '#') {
        lenis.scrollTo(0, { duration: 1.4, easing });
      } else {
        lenis.scrollTo(href, { offset: -70, duration: 1.4, easing });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScroll>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </SmoothScroll>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
