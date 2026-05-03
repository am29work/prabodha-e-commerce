'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { generations, Generation } from '../../../lib/data';
import Link from 'next/link';

export default function GenerationPage() {
  const params = useParams() as { id: string };
  const data = generations.find((g: Generation) => g.id === params.id);

  if (!data) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-serif uppercase tracking-[0.5em]">
        Archive Missing
      </div>
    );
  }

  return (
    /* pt-24 ensures the sticky Navbar doesn't cover the title on load */
    <main className={`min-h-screen w-full ${data.themeColor} text-white selection:bg-white selection:text-black pt-24 transition-colors duration-1000`}>
      
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 md:py-20">
        
        <div className="max-w-6xl w-full">
          {/* Headline Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif uppercase tracking-tight leading-[0.8] mb-6">
              {data.title}
            </h1>
            <p className="text-[10px] md:text-xs italic font-light text-white/40 tracking-[0.4em] uppercase">
              {data.subtitle}
            </p>
          </motion.div>
          
          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative aspect-[4/5] max-h-[60vh] mx-auto w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl"
            >
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Narrative Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col space-y-8 text-center lg:text-left"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="h-[1px] w-12 bg-white/20" />
                  <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">The Philosophy</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-base md:text-lg font-light max-w-md mx-auto lg:mx-0 font-serif">
                  Exploring the unique identity of the {data.title} era. 
                  This collection focuses on how the spirit of this generation 
                  influences modern design and cultural heritage.
                </p>
              </div>
              
              <div className="pt-4">
                <a 
                  href="#collection" 
                  className="group relative px-10 py-5 bg-white text-black uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-zinc-200 transition-all inline-block shadow-2xl"
                >
                  View Collection
                  <span className="block absolute -bottom-2 -right-2 w-full h-full border border-white/20 -z-10 group-hover:bottom-0 group-hover:right-0 transition-all" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section id="collection" className="min-h-screen py-32 px-6 md:px-12 bg-black/30 backdrop-blur-2xl border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col items-center mb-24 space-y-4">
             <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.4em] opacity-90">
              The Archive
            </h2>
            <div className="h-[1px] w-24 bg-white/20" />
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-white/5 border border-white/5 flex flex-col items-center justify-center overflow-hidden relative">
                    <span className="uppercase tracking-[0.5em] text-[9px] text-white/20 group-hover:text-white/40 transition-colors">
                      Entry Pending
                    </span>
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 m-4" />
                  </div>
                  <div className="mt-6 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] tracking-widest uppercase">Item_{i.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] tracking-widest uppercase">Coming Soon</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}