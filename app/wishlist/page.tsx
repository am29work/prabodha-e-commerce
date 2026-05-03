'use client';

import { useRouter } from 'next/navigation';

// Notice: No <html> or <body> tags here!
export default function WishlistPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-black text-white p-6 md:p-20">
      <header className="flex justify-between items-center border-b border-white/10 pb-8 mb-12">
        <button 
          onClick={() => router.back()} 
          className="text-[10px] tracking-widest uppercase hover:text-white/70"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-serif uppercase tracking-widest text-white">Wishlist</h1>
        <span className="text-sm text-white/50">0 Items</span>
      </header>

      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <p className="text-white/30 italic font-light text-lg">Your heart list is currently empty.</p>
      </div>
    </main>
  );
}