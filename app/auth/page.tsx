'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // 1. Import the logic

export default function AuthPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6">
      <button 
        onClick={() => router.back()} 
        className="absolute top-10 left-10 text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
      >
        ← Back
      </button>
      
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-serif uppercase tracking-[0.3em]">Join Prabodha</h1>
        <p className="text-white/40 font-light italic">Access your personal archive and orders.</p>
        
        <div className="space-y-4 pt-10">
          {/* 2. Add the onClick handler here */}
          <button 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            Continue with Google
          </button>
          
          <button className="w-full py-4 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            Continue with Email
          </button>
        </div>
      </div>
    </main>
  );
}