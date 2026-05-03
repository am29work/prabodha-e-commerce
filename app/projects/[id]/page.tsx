'use client';
import { use } from 'react';

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <main className="min-h-screen bg-black text-white p-20">
      <h1 className="text-4xl font-serif uppercase">{id}</h1>
      <p className="mt-4 text-white/60">Project details coming soon...</p>
    </main>
  );
}