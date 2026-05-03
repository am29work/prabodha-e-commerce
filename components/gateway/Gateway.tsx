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
      if (e.deltaX > 0 && index < generations.length - 1) setIndex((prev) => prev + 1);
      else if (e.deltaX < 0 && index > 0) setIndex((prev) => prev - 1);
      setTimeout(() => { isTransitioning.current = false; }, 800);
    }
  };

  const rotate = useTransform(dragX, [-200, 200], [-15, 15]);
  const opacityFront = useTransform(dragX, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 80;
    if (info.offset.x < -threshold && index < generations.length - 1) setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  return (
    <main onWheel={handleWheel} className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Brand Header */}
      <div className="absolute top-10 inset-x-0 z-[100] flex justify-center pointer-events-none">
        <div className="px-8 py-3 rounded-full bg-black/20 backdrop-blur-3xl border border-white/10">
          <h1 className="text-white text-[10px] tracking-[0.6em] font-serif uppercase">Prabodha</h1>
        </div>
      </div>

      {!isMobile ? (
        /* Desktop View: Full Height Columns */
        <div className="flex h-screen w-full">
          {generations.map((gen) => (
            <section
              key={gen.id}
              onMouseEnter={() => setHoveredId(gen.id)}
              onMouseLeave={() => setHoveredId(null)}
              /* h-screen applied here ensures columns fill the viewport height */
              className={`group relative h-screen transition-all duration-[800ms] cursor-pointer flex flex-col items-center justify-center overflow-hidden
                ${hoveredId === gen.id ? 'flex-[3]' : hoveredId === null ? 'flex-1' : 'flex-[0.6]'}
              `}
            >
              <BackgroundMedia gen={gen} />
              
              <div className="relative z-30 h-full w-full flex flex-col justify-end items-center pb-24 text-center px-10">
                <h2 className="text-white font-serif text-5xl uppercase tracking-[0.25em] mb-6">
                  {gen.title}
                </h2>
                
                <AnimatePresence>
                  {hoveredId === gen.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <p className="text-white/70 text-lg mb-10 max-w-md italic font-light">
                        {gen.subtitle}
                      </p>
                      <Link href={`/generations/${gen.id}`}>
                        <button className="px-14 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors">
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
      ) : (
        /* Mobile View: Swiper Logic */
        <div className="relative h-full w-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {generations.map((gen, i) => {
              const isFront = i === index;
              if (Math.abs(i - index) > 1) return null;
              return (
                <motion.div
                  key={gen.id}
                  style={{ x: isFront ? dragX : 0, rotate: isFront ? rotate : 0, opacity: isFront ? opacityFront : 0.45 }}
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  animate={{ 
                    scale: isFront ? 1 : 0.9, 
                    x: i === index + 1 ? 70 : i === index - 1 ? -70 : 0, 
                    zIndex: isFront ? 50 : 40 
                  }}
                  className="absolute w-[85%] h-[70vh] rounded-[3rem] overflow-hidden border border-white/10"
                >
                  <BackgroundMedia gen={gen} />
                  <div className="relative z-30 h-full flex flex-col justify-end items-center p-10 pb-16 text-center">
                    <h2 className="text-white font-serif text-3xl uppercase tracking-widest mb-4">
                      {gen.title}
                    </h2>
                    {isFront && (
                      <Link href={`/generations/${gen.id}`}>
                        <button className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                          Discover
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}

function BackgroundMedia({ gen }: { gen: any }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
      <div className={`absolute inset-0 ${gen.themeColor} opacity-50 z-10`} />
      <img 
        src={gen.image} 
        alt="" 
        className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-20" />
    </div>
  );
}