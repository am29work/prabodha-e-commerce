'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
// 1. We import both the data and the Type definition
import { generations, Generation } from '../../../lib/data';

export default function GenerationPage() {
  // 2. We tell TypeScript that params contains a string called 'id'
  const params = useParams() as { id: string };
  const router = useRouter();
  
  // 3. We tell the find function that 'g' is of type 'Generation'
  const data = generations.find((g: Generation) => g.id === params.id);

  if (!data) return <div className="text-white bg-black h-screen flex items-center justify-center">Generation not found.</div>;

  return (
    <main className={`min-h-screen w-full ${data.themeColor} text-white p-10 flex flex-col items-center justify-center`}>
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-10 left-10 text-[10px] tracking-widest uppercase border-b border-white/20 pb-1 z-50"
      >
        ← Back to Gateway
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-7xl font-serif uppercase tracking-tighter mb-4">
          {data.title}
        </h1>
        <p className="text-xl italic font-light text-white/60 mb-12">
          {data.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Note: changed h-[500px] to h-125 or similar to resolve Tailwind warnings if needed */}
          <div className="h-[500px] overflow-hidden rounded-2xl border border-white/10">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center text-left space-y-6">
            <h3 className="text-2xl uppercase tracking-widest">The Philosophy</h3>
            <p className="text-white/70 leading-relaxed">
              Exploring the unique identity of the {data.title} era. 
              This collection focuses on how the spirit of this generation 
              influences modern design and cultural heritage.
            </p>
            <button className="w-fit px-8 py-3 border border-white/30 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
               View Collection
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}