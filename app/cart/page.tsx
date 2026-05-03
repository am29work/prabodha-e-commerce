'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  const cartItems = [
    { id: 1, name: 'The Heritage Silk Scarf', price: '$120', generation: 'Millennial' },
    { id: 2, name: 'Disruptor Cargo Pants', price: '$250', generation: 'Gen-Z' },
  ];

  return (
    <main className="min-h-screen w-full bg-[#1A1A1A] text-white p-6 md:p-20 font-sans">
      <header className="flex justify-between items-center border-b border-white/10 pb-8 mb-12">
        <button onClick={() => router.back()} className="text-[10px] tracking-widest uppercase hover:text-white/70 transition-colors">
          ← Continue Shopping
        </button>
        <h1 className="text-3xl font-serif uppercase tracking-widest">Your Bag</h1>
        <span className="text-sm text-white/50">{cartItems.length} Items</span>
      </header>

      {/* ... Rest of your CartPage JSX here ... */}
    </main>
  );
}