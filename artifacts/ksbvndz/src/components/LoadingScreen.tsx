import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lettersRevealed, setLettersRevealed] = useState(0);
  const [showBlood, setShowBlood] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const name = "KsBvndz";

  useEffect(() => {
    const interval = setInterval(() => {
      setLettersRevealed(prev => {
        if (prev < name.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 150);

    const bloodTimeout = setTimeout(() => {
      setShowBlood(true);
    }, 1500);

    const wipeTimeout = setTimeout(() => {
      setIsWiping(true);
    }, 3000);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(bloodTimeout);
      clearTimeout(wipeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [name.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Blood Wipe Effect */}
      <motion.div
        className="absolute inset-0 bg-primary z-10 origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isWiping ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      />

      <div className="relative z-20 flex">
        {name.split('').map((char, index) => (
          <div key={index} className="relative">
            <motion.span
              className="text-6xl md:text-8xl lg:text-9xl font-display uppercase tracking-widest text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index < lettersRevealed ? 1 : 0,
                y: index < lettersRevealed ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              {char}
            </motion.span>

            {/* Blood Drip */}
            {showBlood && index < lettersRevealed && (
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 w-1 sm:w-2 bg-primary blur-[1px]"
                initial={{ height: 0 }}
                animate={{ height: "100vh" }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: "easeIn",
                }}
                style={{
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
