'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { generations } from '../../lib/data';


export default function Gateway() {
  const [index, setIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dragX = useMotionValue(0);
  
  const isTransitioning = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioning.current || !isMobile) return;

    if (Math.abs(e.deltaX) > 40) {
      isTransitioning.current = true;
      if (e.deltaX > 0 && index < generations.length - 1) {
        setIndex((prev) => prev + 1);
      } else if (e.deltaX < 0 && index > 0) {
        setIndex((prev) => prev - 1);
      }
      setTimeout(() => { isTransitioning.current = false; }, 800);
    }
  };

  const rotate = useTransform(dragX, [-200, 200], [-15, 15]);
  const opacityFront = useTransform(dragX, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 80;
    if (info.offset.x < -threshold && index < generations.length - 1) {
      setIndex(index + 1);
    } else if (info.offset.x > threshold && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <main 
      onWheel={handleWheel}
      className="relative h-screen w-full overflow-hidden bg-black font-sans selection:bg-white/20"
    >
      {/* BRANDING */}
      <div className="absolute top-10 inset-x-0 z-[100] flex justify-center pointer-events-none">
        <div className="px-8 py-3 rounded-full bg-black/20 backdrop-blur-3xl border border-white/10 shadow-2xl">
          <h1 className="text-white text-[10px] tracking-[0.6em] font-serif uppercase">Prabodha</h1>
        </div>
      </div>

      {/* DESKTOP RENDER */}
      {!isMobile && (
        <div className="flex h-full w-full">
          {generations.map((gen) => (
            <section
              key={gen.id}
              onMouseEnter={() => setHoveredId(gen.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative h-full transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex flex-col items-center justify-center overflow-hidden
                ${hoveredId === gen.id ? 'flex-[3]' : hoveredId === null ? 'flex-1' : 'flex-[0.6]'}
              `}
            >
              <BackgroundMedia gen={gen} />
              <div className="relative z-30 h-full w-full flex flex-col justify-end items-center pb-24 text-center px-10">
                <h2 className="text-white font-serif text-5xl uppercase tracking-[0.25em] mb-6 drop-shadow-lg">
                  {gen.title}
                </h2>
                <AnimatePresence>
                  {hoveredId === gen.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex flex-col items-center"
                    >
                      <p className="text-white/70 text-lg mb-10 max-w-md italic font-light tracking-wide">
                        {gen.subtitle}
                      </p>
                    <Link href={`/generations/${gen.id}`}>
                      <button className="px-14 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-200 transition-colors">
                        Discover
                      </button>
                    </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* MOBILE RENDER */}
      {isMobile && (
        <div className="relative h-full w-full flex items-center justify-center touch-pan-y">
          <div className="relative w-full h-[70vh] flex items-center justify-center px-6">
            <AnimatePresence mode="popLayout">
              {generations.map((gen, i) => {
                const isFront = i === index;
                if (Math.abs(i - index) > 1) return null;

                return (
                  <motion.div
                    key={gen.id}
                    style={{
                      x: isFront ? dragX : 0,
                      rotate: isFront ? rotate : 0,
                      opacity: isFront ? opacityFront : 0.45,
                    }}
                    drag={isFront ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    animate={{
                      // Scale and X values updated to fix the "lost peek"
                      scale: isFront ? 1 : 0.9,
                      x: i === index + 1 ? 70 : i === index - 1 ? -70 : 0,
                      y: isFront ? 0 : 10, // Slight vertical stack effect
                      zIndex: isFront ? 50 : 40,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    // Width set to 85% to allow background cards to peek from the sides
                    className="absolute w-[85%] h-full rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10 origin-bottom"
                  >
                    <BackgroundMedia gen={gen} />
                    <div className="relative z-30 h-full flex flex-col justify-end items-center p-10 pb-16 text-center">
                      <h2 className="text-white font-serif text-3xl uppercase tracking-widest mb-4">{gen.title}</h2>
                      {isFront && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <p className="text-white/50 text-[10px] mb-10 tracking-[0.2em] uppercase italic px-4">
                            {gen.subtitle}
                          </p>
                        <Link href={`/generations/${gen.id}`}>
                          <button className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                            Discover
                          </button>
                        </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {generations.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[1px] transition-all duration-700 ${index === i ? 'w-12 bg-white' : 'w-3 bg-white/20'}`} 
                />
              ))}
            </div>
            <span className="text-white/30 text-[9px] tracking-[0.5em] font-light">0{index + 1} / 0{generations.length}</span>
          </div>
        </div>
      )}
    </main>
  );
}

function BackgroundMedia({ gen }: { gen: any }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
      <div className={`absolute inset-0 ${gen.themeColor} opacity-50 z-10 transition-opacity duration-1000 group-hover:opacity-20`} />
      <img
        src={gen.image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 z-20" />
    </div>
  );
}