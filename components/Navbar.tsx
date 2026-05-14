'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiArrowLeft,
  FiChevronDown,
} from 'react-icons/fi';

import AuthModal from './AuthModal';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { cartCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Hide navbar on homepage
  if (pathname === '/') return null;

  const isEraPage = pathname.startsWith('/generations/');

  const userName =
    session?.user?.name || session?.user?.email || 'User';

  const initials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleProtectedAction = () => {
    if (!session) {
      setAuthModalOpen(true);
      return false;
    }

    return true;
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-[110] w-full px-6 py-5 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-white/5">

        {/* Left Side */}
        <div className="flex-1">
          {isEraPage && (
            <Link
              href="/"
              className="group flex items-center gap-2 text-[10px] tracking-[0.4em] text-white/60 hover:text-white transition-all uppercase font-serif"
            >
              <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />

              <span>Archive</span>
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">

          {/* Wishlist */}
          <button
            onClick={() => {
              if (!handleProtectedAction()) return;
            }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <FiHeart className="w-5 h-5" />
          </button>

          {/* User */}
          {!session ? (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <FiUser className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setProfileDropdownOpen(!profileDropdownOpen)
                }
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-bold tracking-widest text-white">
                  {initials}
                </div>

                <FiChevronDown className="h-4 w-4 text-white/50" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-14 w-52 border border-white/10 bg-black/90 backdrop-blur-xl">

                  <div className="border-b border-white/5 px-5 py-4">
                    <p className="text-sm text-white">
                      {session.user?.name}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {session.user?.email}
                    </p>
                  </div>

                  <div className="flex flex-col">

                    <button className="px-5 py-4 text-left text-xs uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                      Wishlist
                    </button>

                    <button className="px-5 py-4 text-left text-xs uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                      Orders
                    </button>

                    <button
                      onClick={() => signOut()}
                      className="px-5 py-4 text-left text-xs uppercase tracking-[0.25em] text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <button
            onClick={() => {
              if (!handleProtectedAction()) return;
            }}
            className="relative text-white/60 hover:text-white transition-colors"
          >
            <FiShoppingBag className="w-5 h-5" />

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}