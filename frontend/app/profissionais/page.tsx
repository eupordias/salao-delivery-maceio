'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scissors, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  MessageCircle, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Filter
} from 'lucide-react';

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  neighborhoods: string[];
  weekDays: string[];
  pricePerHour: number;
  whatsapp: string;
  featured?: boolean;
}

const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Jéssica Medeiros',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    specialty: 'Mega Hair Fita & Microcápsulas',
    rating: 5.0,
    reviewsCount: 142,
    bio: 'Especialista em Mega Hair há mais de 8 anos em Maceió. Certificada internacionalmente nas técnicas Nano Slim e Microcápsulas invisíveis com gramatura perfeita.',
    neighborhoods: ['Ponta Verde', 'Pajuçara', 'Jatiúca', 'Cruz das Almas', 'Stella Maris'],
    weekDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    pricePerHour: 350,
    whatsapp: '5582999990001',
    featured: true
  },
  {
    id: '2',
    name: 'Carlos Henrique',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    specialty: 'Colorimetria & Morena Iluminada',
    rating: 4.9,
    reviewsCount: 98,
    bio: 'Colorista de renome formado pela LOréal Academy. Criador da técnica Sunset Maceió com nuances quentes de avelã e caramelo sem danificar os fios.',
    neighborhoods: ['Ponta Verde', 'Jatiúca', 'Mangabeiras', 'Farol', 'Serraria'],
    weekDays: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    pricePerHour: 280,
    whatsapp: '5582999990002',
    featured: true
  },
  {
    id: '3',
    name: 'Larissa Vasconcelos',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    specialty: 'Selagem Orgânica & Terapias Capilares',
    rating: 4.9,
    reviewsCount: 115,
    bio: 'Especialista em saúde capilar, cronograma reconstrutor para fios de praia e alinhamento orgânico livre de formol. Atendimento no seu condomínio ou residência.',
    neighborhoods: ['Pajuçara', 'Ponta Verde', 'Jatiúca', 'Guaxuma', 'Ipioca'],
    weekDays: ['Segunda', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    pricePerHour: 200,
    whatsapp: '5582999990003'
  },
  {
    id: '4',
    name: 'Amanda Silveira',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    specialty: 'Penteados, Maquiagem & Noivas Delivery',
    rating: 5.0,
    reviewsCount: 87,
    bio: 'Produção completa para noivas, formandas e convidadas em hotéis e pousadas da orla de Alagoas. Pontualidade britânica e acabamento fotográfico.',
    neighborhoods: ['Ponta Verde', 'Pajuçara', 'Cruz das Almas', 'Ipioca', 'Marechal Deodoro'],
    weekDays: ['Quinta', 'Sexta', 'Sábado', 'Domingo'],
    pricePerHour: 400,
    whatsapp: '5582999990004'
  }
];

export default function ProfissionaisPage() {
  const [specialty, setSpecialty] = useState<string>('todos');
  const [neighborhood, setNeighborhood] = useState<string>('todos');
  const [weekDay, setWeekDay] = useState<string>('todos');
  const [professionals] = useState<Professional[]>(INITIAL_PROFESSIONALS);

  const filtered = professionals.filter(pro => {
    const matchSpecialty = specialty === 'todos' || pro.specialty.toLowerCase().includes(specialty.toLowerCase());
    const matchNeighborhood = neighborhood === 'todos' || pro.neighborhoods.includes(neighborhood);
    const matchWeekDay = weekDay === 'todos' || pro.weekDays.includes(weekDay);
    return matchSpecialty && matchNeighborhood && matchWeekDay;
  });

  const handleContactWhatsApp = (pro: Professional) => {
    const msg = encodeURIComponent(
      `Olá ${pro.name}! Encontrei seu perfil no *Salão Delivery Maceió* e gostaria de consultar sua disponibilidade para atendimento em domicílio!`
    );
    window.open(`https://wa.me/${pro.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F9FAFB] selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#111111]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft size={18} />
            <span>Voltar ao Início</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
              <Scissors className="h-4 w-4 text-black" />
            </div>
            <span className="font-bold font-['Syne'] text-white tracking-wide">SALÃO DELIVERY MCZ</span>
          </div>

          <Link 
            href="/cadastro-profissional" 
            className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
          >
            Sou Profissional
          </Link>
        </div>
      </header>

      {/* Page Title & Search Bar */}
      <section className="py-12 bg-[#0E0E0E] border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Especialistas Renomados em Maceió</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne'] mt-1">
              Profissionais Disponíveis para Atendimento Delivery
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Escolha o profissional ideal pelo tipo de procedimento, bairro em Maceió ou dia da semana.
            </p>
          </div>

          {/* Filter Bar (Inspired by LaBelle / TeacherList) */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-4 uppercase tracking-wider">
              <Filter size={14} />
              <span>Filtrar Profissionais</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Especialidade / Serviço
                </label>
                <select 
                  value={specialty}
                  onChange={e => setSpecialty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="todos">Todos os Serviços</option>
                  <option value="mega">Mega Hair (Fita / Queratina)</option>
                  <option value="colorimetria">Coloração & Morena Iluminada</option>
                  <option value="selagem">Selagem & Terapias Capilares</option>
                  <option value="penteados">Penteados & Noivas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Bairro em Maceió
                </label>
                <select 
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="todos">Todos os Bairros</option>
                  <option value="Ponta Verde">Ponta Verde</option>
                  <option value="Pajuçara">Pajuçara</option>
                  <option value="Jatiúca">Jatiúca</option>
                  <option value="Cruz das Almas">Cruz das Almas</option>
                  <option value="Farol">Farol</option>
                  <option value="Mangabeiras">Mangabeiras</option>
                  <option value="Ipioca">Ipioca</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Dia da Semana
                </label>
                <select 
                  value={weekDay}
                  onChange={e => setWeekDay(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="todos">Qualquer Dia</option>
                  <option value="Segunda">Segunda-feira</option>
                  <option value="Terça">Terça-feira</option>
                  <option value="Quarta">Quarta-feira</option>
                  <option value="Quinta">Quinta-feira</option>
                  <option value="Sexta">Sexta-feira</option>
                  <option value="Sábado">Sábado</option>
                  <option value="Domingo">Domingo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white">
              {filtered.length} profissional(is) encontrado(s)
            </h2>
            <Link href="/cadastro-profissional" className="text-xs text-cyan-400 hover:underline">
              Quer atender pelo Salão Delivery? Cadastre-se aqui →
            </Link>
          </div>

          <div className="space-y-6">
            {filtered.map(pro => (
              <article 
                key={pro.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#242424] hover:border-cyan-500/40 transition-all shadow-xl relative"
              >
                {pro.featured && (
                  <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-pink-500 to-cyan-400 text-black uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>Destaque Maceió</span>
                  </span>
                )}

                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <img 
                    src={pro.avatar} 
                    alt={pro.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#2A2A2A] shrink-0" 
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white font-['Syne']">{pro.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Star size={14} fill="#FACC15" />
                        <span className="font-bold text-white">{pro.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({pro.reviewsCount} avaliações)</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-cyan-400 mb-3">{pro.specialty}</p>

                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {pro.bio}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2 border-t border-[#222222]">
                      <div className="flex items-center gap-1">
                        <MapPin size={13} className="text-pink-400" />
                        <span>Bairros: {pro.neighborhoods.slice(0, 3).join(', ')}...</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-cyan-400" />
                        <span>Dias: {pro.weekDays.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Price & WhatsApp Button (Style LaBelle) */}
                <div className="mt-6 pt-6 border-t border-[#222222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs text-gray-400">Atendimento Base Delivery</span>
                    <p className="text-2xl font-black text-white font-['Syne']">
                      R$ {pro.pricePerHour.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ procedimento médio</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href="/#agendamento"
                      className="px-5 py-3 rounded-xl text-xs font-bold bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200 transition-all text-center flex-1 sm:flex-none"
                    >
                      Agendar no Site
                    </Link>
                    <button
                      onClick={() => handleContactWhatsApp(pro)}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none"
                    >
                      <MessageCircle size={16} />
                      <span>Entrar em Contato</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
