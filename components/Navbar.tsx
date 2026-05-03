'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Added this
import { FiShoppingBag, FiHeart, FiUser, FiArrowLeft } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const cartItems = [1, 2]; 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // CRITICAL FIX: If we are on the Gateway (Home), don't render anything
  if (pathname === '/') return null;

  const isEraPage = pathname.startsWith('/generations/');

  return (
    <nav className="fixed top-0 inset-x-0 z-[110] w-full px-6 py-5 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-white/5">
      <div className="flex-1">
        {isEraPage && (
          <Link href="/" className="group flex items-center gap-2 text-[10px] tracking-[0.4em] text-white/60 hover:text-white transition-all uppercase font-serif">
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Gateway</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-8">
        <Link href="/wishlist" className="text-white/60 hover:text-white transition-colors">
          <FiHeart className="w-5 h-5" />
        </Link>
        <Link href="/auth" className="text-white/60 hover:text-white transition-colors">
          <FiUser className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="relative text-white/60 hover:text-white transition-colors">
          <FiShoppingBag className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}