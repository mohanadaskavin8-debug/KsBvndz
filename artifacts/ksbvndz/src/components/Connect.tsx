import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube, SiTiktok, SiX } from 'react-icons/si';

const socials = [
  { name: 'Spotify', icon: SiSpotify, href: 'https://open.spotify.com/artist/2DhpGOseQQqPEbYr9mBiwe', color: 'hover:bg-[#1DB954]' },
  { name: 'Apple Music', icon: SiApplemusic, href: 'https://music.apple.com/ca/artist/ksbvndz/1745377739', color: 'hover:bg-[#FA243C]' },
  { name: 'Instagram', icon: SiInstagram, href: 'https://www.instagram.com/ksbvndz/', color: 'hover:bg-[#E1306C]' },
  { name: 'YouTube', icon: SiYoutube, href: 'https://www.youtube.com/channel/UCq2MDRG4fWR7olS5nD1Ja6A', color: 'hover:bg-[#FF0000]' },
  { name: 'TikTok', icon: SiTiktok, href: 'https://www.tiktok.com/@ksbvndz', color: 'hover:bg-[#000000] hover:border-white' },
  { name: 'X / Twitter', icon: SiX, href: 'https://x.com/28ville44', color: 'hover:bg-[#000000] hover:border-white' },
];

export function Connect() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="connect" className="py-32 bg-black relative border-t border-white/5" ref={containerRef}>
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-white mb-6">
            Stream the Music.<br/>
            <span className="text-primary">Follow the Journey.</span>
          </h2>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-sm mb-10">
            Streameum Entertainment // Toronto
          </p>

          <motion.a
            href="mailto:Ksbvndz@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex flex-col items-center gap-2 mb-16 group"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 group-hover:text-gray-400 transition-colors">
              For Booking &amp; Inquiries
            </span>
            <span className="text-lg md:text-2xl font-display uppercase tracking-widest text-white border-b border-primary pb-1 group-hover:text-primary transition-colors">
              Ksbvndz@gmail.com
            </span>
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socials.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 hover:border-transparent rounded-sm transition-all duration-300 group ${social.color}`}
            >
              <social.icon size={32} className="text-gray-400 group-hover:text-white transition-colors mb-4" />
              <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 text-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          KsBvndz © {new Date().getFullYear()} · Streameum Entertainment
        </p>
        
        <div className="flex gap-6">
          {socials.slice(0, 3).map((social, idx) => (
            <a 
              key={idx} 
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
