import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#video', label: 'Video' },
  { href: '#about', label: 'Bio' },
  { href: '#music', label: 'Music' },
  { href: '#gallery', label: 'Visuals' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-background/90 backdrop-blur-md border-b border-border/50 py-4' : 'bg-transparent py-6 md:py-8'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="font-display text-2xl md:text-3xl tracking-[0.2em] text-primary font-bold text-glow"
        >
          KSBVNDZ
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-[0.2em] uppercase">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2 -mr-2 relative z-50"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/50"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="text-3xl font-display uppercase tracking-[0.15em] text-white hover:text-primary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
