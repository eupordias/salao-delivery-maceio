import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <header className="bg-[#BE42C2] text-white flex flex-col pt-6 pb-16 md:pb-24 px-4">
      <div className="w-full max-w-[1100px] mx-auto flex justify-between items-center pb-8 border-b border-white/10">
        <Link href="/" className="h-8 transition-opacity hover:opacity-75 flex items-center gap-2 text-white font-medium text-sm">
          <img src="/assets/images/icons/back.svg" alt="Voltar" className="h-6 w-6" />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <Link href="/" className="flex items-center">
          <img src="/assets/images/logo.svg" alt="LaBelle" className="h-8 md:h-10" />
        </Link>
        <Link href="/admin/dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          Admin Gestão
        </Link>
      </div>

      <div className="w-full max-w-[740px] mx-auto pt-8 md:pt-12">
        <h1 className="font-['Archivo'] font-bold text-3xl md:text-4xl leading-tight text-white max-w-lg">
          {title}
        </h1>
        {description && (
          <p className="text-[#D4C2FF] text-base mt-4 max-w-md font-light leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
