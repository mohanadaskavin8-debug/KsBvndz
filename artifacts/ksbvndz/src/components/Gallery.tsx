import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import galleryImg1 from '@assets/Image_1_1784064592828.jpeg';
import galleryImg2 from '@assets/IMG_2619_1784064629615.jpg';
import galleryImg3 from '@assets/IMG_2620_1784064629615.jpg';
import galleryImg4 from '@assets/IMG_2622_1784064629615.jpg';

const images = [
  { src: galleryImg1, alt: "KsBvndz", className: "md:col-span-2 md:row-span-2" },
  { src: galleryImg2, alt: "KsBvndz", className: "md:col-span-1 md:row-span-1" },
  { src: galleryImg3, alt: "KsBvndz", className: "md:col-span-1 md:row-span-2" },
  { src: galleryImg4, alt: "KsBvndz", className: "md:col-span-1 md:row-span-1" }
];

export function Gallery() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="gallery" className="py-32 bg-[#050505] relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Visuals</h2>
          <h3 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-white">
            Gallery
          </h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative group overflow-hidden bg-black ${img.className}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="w-8 h-[2px] bg-primary mb-2" />
                <span className="text-xs uppercase tracking-widest text-white">0{idx + 1} // Archive</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
