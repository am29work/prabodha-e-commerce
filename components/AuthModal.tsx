'use client';

import { signIn } from 'next-auth/react';
import { FiX } from 'react-icons/fi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-md border border-white/10 bg-[#0A0A0A] p-10 text-white shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white/40 hover:text-white transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="space-y-8 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-serif uppercase tracking-[0.3em]">
              Join Prabodha
            </h1>

            <p className="text-sm italic text-white/40">
              Access your archive, wishlist, and cart.
            </p>
          </div>

          <button
            onClick={() =>
              signIn('google', {
                callbackUrl: window.location.href,
              })
            }
            className="w-full bg-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-200"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}