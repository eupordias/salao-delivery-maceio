'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(1847);

  useEffect(() => {
    // Simulating initial connections fetch
    const stored = localStorage.getItem('labelle_connections');
    if (stored) {
      setTotalConnections(Number(stored));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[#BE42C2] text-[#D4C2FF] font-['Poppins'] p-4 relative">
      {/* Top Admin Quick Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <Link 
          href="/admin/dashboard" 
          className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 border border-white/20"
        >
          <span>Painel Gestão Salão</span>
        </Link>
      </div>

      <div className="w-full max-w-[1100px] flex flex-col lg:grid lg:grid-rows-[350px_1fr] lg:grid-cols-[2fr_1fr_1fr] items-center lg:items-start py-8">
        
        {/* Logo Container */}
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:self-center lg:col-start-1 lg:row-start-1">
          <img 
            src="/assets/images/logo.svg" 
            alt="LaBelle" 
            className="h-20 lg:h-28 mx-auto lg:mx-0 object-contain"
          />
          <h2 className="font-medium text-2xl lg:text-4xl text-white mt-2 lg:mt-3 leading-snug">
            Seu salão digital de beleza!
          </h2>
        </div>

        {/* Hero Illustration */}
        <div className="w-full max-w-md lg:max-w-none lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:justify-self-end flex justify-center mb-8 lg:mb-0">
          <img 
            src="/assets/images/landing.svg" 
            alt="LaBelle Plataforma de Beleza" 
            className="w-full max-h-[320px] lg:max-h-[350px] object-contain"
          />    
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto my-6 lg:col-span-2 lg:col-start-1 lg:row-start-2">
          <Link 
            href="/study" 
            className="w-full sm:w-72 h-24 lg:h-28 rounded-lg font-['Archivo'] font-bold text-xl lg:text-2xl flex items-center justify-center text-white bg-[#C2425C] hover:bg-[#C2429C] transition-colors shadow-lg px-6"
          >
            <img src="/assets/images/icons/study.svg" alt="Agendar" className="w-10 mr-6" />
            <span>Quero agendar</span>
          </Link>

          <Link 
            href="/give-classes" 
            className="w-full sm:w-72 h-24 lg:h-28 rounded-lg font-['Archivo'] font-bold text-xl lg:text-2xl flex items-center justify-center text-white bg-[#42C269] hover:bg-[#71C242] transition-colors shadow-lg px-6"
          >
            <img src="/assets/images/icons/give-classes.svg" alt="Sou profissional" className="w-10 mr-6" />
            <span>Sou Profissa</span>
          </Link>
        </div>

        {/* Total Connections */}
        <div className="text-xs lg:text-sm text-[#D4C2FF] flex items-center justify-center lg:justify-end mt-4 lg:mt-0 lg:col-start-3 lg:row-start-2 lg:self-center">
          <span>Total de {totalConnections} conexões já realizadas</span>
          <img src="/assets/images/icons/purple-heart.svg" alt="Coração roxo" className="ml-2 w-4 h-4 inline" />
        </div>
      </div> 
    </div>
  );
}
