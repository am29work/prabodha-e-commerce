'use client';

import Gateway from '@/components/gateway/Gateway';

export default function Home() {
  return (
    /* We add h-screen and overflow-hidden to the root main 
       to ensure the Gateway has a solid 100vh container to fill */
    <main className="h-screen w-full overflow-hidden bg-black">
      <Gateway />
    </main>
  );
}