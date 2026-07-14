import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Music', href: '#music' },
    { name: 'Journey', href: '#timeline' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Connect', href: '#connect' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: navBackground,
        backdropFilter: navBlur,
      }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-3xl font-display tracking-widest text-white hover:text-primary transition-colors">
          KSBVNDZ
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        
        <a 
          href="https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_15px_rgba(139,0,0,0.3)] hover:shadow-[0_0_25px_rgba(139,0,0,0.6)]"
        >
          Stream Now
        </a>
      </div>
    </motion.nav>
  );
}
