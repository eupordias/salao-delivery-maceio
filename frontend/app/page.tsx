'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
        <p className="text-sm text-gray-400">Carregando painel...</p>
      </div>
    </div>
  );
}
