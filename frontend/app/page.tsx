'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Scissors, 
  ArrowRight, 
  MessageCircle, 
  User, 
  Mail, 
  Home, 
  Check, 
  ChevronRight,
  Award
} from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  name: string;
  category: 'mega-hair' | 'coloracao' | 'tratamento' | 'escova' | 'pacotes';
  description: string;
  duration: string;
  price: number;
  highlight?: string;
  details: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'mega-fita',
    name: 'Mega Hair Fita Adesiva / Nano Slim',
    category: 'mega-hair',
    description: 'Técnica invisível e ultraconfortável. Cabelos 100% humanos brasileiros selecionados.',
    duration: '2h30',
    price: 850,
    highlight: 'Mais Pedido em Maceió',
    details: ['Gramatura personalizada', 'Incluso lavagem e escovação', 'Acabamento natural e imperceptível']
  },
  {
    id: 'mega-queratina',
    name: 'Mega Hair Microcápsulas de Queratina',
    category: 'mega-hair',
    description: 'Fixação duradoura e mobilidade máxima para penteados e curtir as praias de Alagoas.',
    duration: '3h30',
    price: 950,
    highlight: 'Duração Prolongada',
    details: ['Cápsulas ultrafinas', 'Distribuição anatômica', 'Zero tração no couro cabeludo']
  },
  {
    id: 'morena-iluminada',
    name: 'Morena Iluminada / Mechas Sunset MCZ',
    category: 'coloracao',
    description: 'Tons quentes como mel, caramelo e avelã inspirados no pôr do sol de Maceió.',
    duration: '3h00',
    price: 450,
    highlight: 'Tendência 2026',
    details: ['Teste de mecha incluso', 'Tonalização personalizada', 'Tratamento pós-química imediato']
  },
  {
    id: 'loiro-dos-sonhos',
    name: 'Loiro dos Sonhos (Global / Babylights)',
    category: 'coloracao',
    description: 'Clareamento saudável com proteção Plex para manter os fios íntegros e brilhantes.',
    duration: '4h00',
    price: 580,
    highlight: 'Especialidade Renomada',
    details: ['Proteção anti-emborrachamento', 'Matização premium', 'Tratamento lipídico reconstrutor']
  },
  {
    id: 'selagem-organica',
    name: 'Selagem Orgânica & Alinhamento Sem Formol',
    category: 'tratamento',
    description: 'Brilho espelhado, redução de frizz e fios 100% disciplinados resistentes à umidade da orla.',
    duration: '2h00',
    price: 280,
    highlight: 'Zero Fumaça / Zero Odor',
    details: ['Compatível com qualquer química', 'Ação termoativada', 'Duração de até 3 meses']
  },
  {
    id: 'cronograma-luxo',
    name: 'Terapia Capilar & Nutrição Profunda',
    category: 'tratamento',
    description: 'Tratamento intensivo para recuperar fios danificados pelo sol, mar e piscina.',
    duration: '1h15',
    price: 180,
    details: ['Higienização detox com massagem', 'Máscara de nutrição concentrada', 'Selagem de cutículas a laser frio']
  },
  {
    id: 'escova-modelada',
    name: 'Escova Glamour & Babyliss Modelado',
    category: 'escova',
    description: 'Finalização impecável para eventos, jantares e ocasiões especiais em Maceió.',
    duration: '1h00',
    price: 120,
    details: ['Lavagem com produtos de alta gama', 'Proteção térmica avançada', 'Fixação natural de longa duração']
  },
  {
    id: 'combo-noiva-festa',
    name: 'Pacote VIP Delivery: Eventos & Noivas',
    category: 'pacotes',
    description: 'Atendimento exclusivo no hotel ou residência para produção completa com equipe dedicada.',
    duration: '4h00',
    price: 1200,
    highlight: 'Experiência 5 Estrelas',
    details: ['Penteado de noiva/festa', 'Mega Hair temporário ou modelagem', 'Assistência até a saída para o evento']
  }
];

const NEIGHBORHOODS = [
  { name: 'Ponta Verde', fee: 0, time: '20-30 min' },
  { name: 'Pajuçara', fee: 0, time: '20-30 min' },
  { name: 'Jatiúca', fee: 0, time: '20-30 min' },
  { name: 'Cruz das Almas', fee: 0, time: '25-35 min' },
  { name: 'Mangabeiras', fee: 0, time: '25-35 min' },
  { name: 'Stella Maris', fee: 0, time: '25-35 min' },
  { name: 'Farol / Pinheiro', fee: 15, time: '30-40 min' },
  { name: 'Gruta de Lourdes / Serraria', fee: 20, time: '35-45 min' },
  { name: 'Jacarecica / Guaxuma', fee: 20, time: '30-40 min' },
  { name: 'Garça Torta / Riacho Doce', fee: 30, time: '40-50 min' },
  { name: 'Ipioca / Pratagy', fee: 40, time: '45-60 min' },
  { name: 'Marechal Deodoro / Francês', fee: 50, time: '50-60 min' }
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([SERVICES[0]]);
  
  // Booking Form State
  const [neighborhood, setNeighborhood] = useState<string>(NEIGHBORHOODS[0].name);
  const [date, setDate] = useState<string>('');
  const [period, setPeriod] = useState<string>('Tarde (13h às 18h)');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const filteredServices = selectedCategory === 'todos' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const toggleService = (service: ServiceItem) => {
    if (selectedServices.some(s => s.id === service.id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const selectedNeighborhoodObj = NEIGHBORHOODS.find(n => n.name === neighborhood) || NEIGHBORHOODS[0];
  const servicesTotal = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const totalAmount = servicesTotal + selectedNeighborhoodObj.fee;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !address) {
      alert('Por favor, preencha os campos obrigatórios (Nome, WhatsApp, Data e Endereço).');
      return;
    }

    setIsSuccess(true);

    const servicesListText = selectedServices.map(s => `• ${s.name} (R$ ${s.price.toFixed(2)})`).join('%0A');
    const msg = `✦ *NOVO AGENDAMENTO - SALÃO DELIVERY MACEIÓ*%0A%0A` +
      `👤 *Cliente:* ${encodeURIComponent(name)}%0A` +
      `📱 *WhatsApp:* ${encodeURIComponent(phone)}%0A` +
      `📧 *E-mail:* ${encodeURIComponent(email || 'Não informado')}%0A%0A` +
      `📍 *Endereço / Bairro:* ${encodeURIComponent(address)} - ${encodeURIComponent(neighborhood)}%0A` +
      `📅 *Data Desejada:* ${encodeURIComponent(date)}%0A` +
      `⏰ *Turno:* ${encodeURIComponent(period)}%0A%0A` +
      `✂️ *Serviços Selecionados:*%0A${servicesListText}%0A%0A` +
      `🚗 *Taxa de Deslocamento:* R$ ${selectedNeighborhoodObj.fee.toFixed(2)}%0A` +
      `💰 *Total Estimado:* R$ ${totalAmount.toFixed(2)}%0A%0A` +
      `💬 *Observações:* ${encodeURIComponent(notes || 'Nenhuma')}`;

    setTimeout(() => {
      window.open(`https://wa.me/5582999999999?text=${msg}`, '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F9FAFB] selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-[#111111] to-pink-950/60 border-b border-[#2A2A2A] py-2 px-4 text-center text-xs text-gray-300">
        <span className="font-semibold text-cyan-400">🌴 Atendendo Maceió e Região:</span> Ponta Verde, Pajuçara, Jatiúca, Cruz das Almas e Condomínios Fechados. <span className="text-pink-400 font-bold underline ml-1 cursor-pointer">Taxa Zero para a Orla!</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0B0B]/90 border-b border-[#2A2A2A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Scissors className="h-5 w-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider font-['Syne'] bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                SALÃO DELIVERY
              </span>
              <span className="block text-[10px] text-gray-400 font-medium tracking-[0.25em]">MACEIÓ • ALAGOAS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <Link href="/profissionais" className="hover:text-cyan-400 transition-colors text-cyan-300 font-semibold flex items-center gap-1">
              <Sparkles size={14} />
              <span>Especialistas</span>
            </Link>
            <a href="#servicos" className="hover:text-cyan-400 transition-colors">Serviços</a>
            <a href="#como-funciona" className="hover:text-cyan-400 transition-colors">Como Funciona</a>
            <a href="#depoimentos" className="hover:text-cyan-400 transition-colors">Depoimentos</a>
            <Link href="/cadastro-profissional" className="hover:text-pink-400 transition-colors">Sou Profissional</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/admin/dashboard" 
              className="text-xs text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1 border border-[#2A2A2A] px-3 py-1.5 rounded-lg hover:border-cyan-500/50"
            >
              <span>Painel Gestão</span>
            </Link>
            <a 
              href="#agendamento" 
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:from-cyan-300 hover:to-cyan-400 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Agendar Agora</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-8">
            <Award className="h-4 w-4 text-pink-400" />
            <span>O Ecossistema de Beleza Delivery Mais Exclusivo de Maceió</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Syne'] max-w-5xl mx-auto leading-[1.15]">
            A Experiência de um <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-[#00E5FF] to-pink-500 bg-clip-text text-transparent">
              Salão de Alto Padrão
            </span><br />
            Onde Você Estiver.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Especialistas renomados em <strong className="text-cyan-300 font-semibold">Mega Hair</strong>, <strong className="text-pink-300 font-semibold">Coloração & Mechas</strong> e <strong className="text-white font-semibold">Alinhamento Capilar</strong> atendendo no conforto do seu lar, condomínio ou hotel à beira-mar em Maceió.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <Link 
              href="/profissionais" 
              className="w-full sm:w-1/2 px-8 py-5 rounded-2xl text-base font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-300 to-pink-500 text-black shadow-2xl shadow-cyan-500/25 hover:opacity-95 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-center"
            >
              <Sparkles className="h-5 w-5" />
              <span>Quero Agendar</span>
            </Link>
            <Link 
              href="/cadastro-profissional" 
              className="w-full sm:w-1/2 px-8 py-5 rounded-2xl text-base font-extrabold bg-[#1A1A1A] hover:bg-[#222222] text-white border-2 border-[#2A2A2A] hover:border-pink-500/50 shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-center"
            >
              <Scissors className="h-5 w-5 text-pink-400" />
              <span>Sou Profissional</span>
            </Link>
          </div>

          {/* LaBelle Connection Counter */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <span>Total de <strong className="text-cyan-400 font-bold">1.847 conexões</strong> de beleza já realizadas em Maceió</span>
            <span className="text-pink-400 text-base">💜</span>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#2A2A2A]/60">
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#2A2A2A]">
              <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FACC15" />
                ))}
              </div>
              <p className="text-xs text-gray-400">Nota 4.9/5 em Maceió</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#2A2A2A]">
              <p className="text-xl font-bold text-cyan-400 font-['Syne']">+1.800</p>
              <p className="text-xs text-gray-400">Atendimentos Domiciliares</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#2A2A2A]">
              <div className="flex items-center justify-center gap-1.5 text-pink-400 mb-1">
                <ShieldCheck size={18} />
                <span className="font-bold text-xs">100% Seguro</span>
              </div>
              <p className="text-xs text-gray-400">Esterilização Hospitalar</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#2A2A2A]">
              <p className="text-xl font-bold text-pink-400 font-['Syne']">12x</p>
              <p className="text-xs text-gray-400">Sem Juros no Cartão</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-[#0E0E0E] border-y border-[#1F1F1F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase mb-2">Menu de Especialidades</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne']">
              Serviços Exclusivos Feitos no Seu Espaço
            </p>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Nossa equipe leva lavatório móvel portátil, iluminação profissional e produtos importados lacrados.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                { id: 'todos', label: 'Todos os Serviços' },
                { id: 'mega-hair', label: 'Mega Hair de Luxo' },
                { id: 'coloracao', label: 'Coloração & Mechas' },
                { id: 'tratamento', label: 'Tratamentos & Selagem' },
                { id: 'escova', label: 'Penteados & Escovas' },
                { id: 'pacotes', label: 'Noivas & Eventos' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-cyan-500/20' 
                      : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map(service => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <div 
                  key={service.id}
                  className={`rounded-2xl bg-[#141414] border p-6 flex flex-col justify-between transition-all duration-300 relative group hover:border-cyan-500/50 ${
                    isSelected ? 'border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400' : 'border-[#242424]'
                  }`}
                >
                  {service.highlight && (
                    <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-pink-500 to-cyan-400 text-black uppercase tracking-wider">
                      {service.highlight}
                    </span>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                        <Clock size={12} className="text-cyan-400" />
                        {service.duration}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1F1F1F] text-cyan-300">
                        Delivery VIP
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mb-6 text-xs text-gray-300">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#222222]">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs text-gray-400">A partir de</span>
                      <span className="text-2xl font-black text-white font-['Syne']">
                        R$ {service.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleService(service)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isSelected 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30' 
                          : 'bg-[#1F1F1F] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 text-gray-200 hover:text-black'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 size={16} className="text-cyan-400" />
                          <span>Selecionado</span>
                        </>
                      ) : (
                        <>
                          <span>Selecionar Serviço</span>
                          <ChevronRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="#agendamento" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              <span>{selectedServices.length} serviço(s) selecionado(s) • Clique para prosseguir com o agendamento</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-pink-400 tracking-[0.2em] uppercase mb-2">Comodidade Absoluta</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne']">
              Como Funciona o Salão Delivery em 3 Passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#141414] border border-[#242424] relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xl font-['Syne'] mb-6 border border-cyan-500/20">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Você Escolhe & Agenda</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Selecione os procedimentos desejados, informe seu bairro em Maceió e escolha o melhor dia e turno para o seu atendimento.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-[#242424] relative">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-xl font-['Syne'] mb-6 border border-pink-500/20">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Levamos a Estrutura Completa</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Nossos profissionais chegam com lavatório portátil, toalhas higienizadas, iluminação especial e todos os cosméticos premium lacrados.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-[#242424] relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xl font-['Syne'] mb-6 border border-cyan-500/20">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Resultado de Salão Renomado</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Você relaxa com a sua playlist favorita, sem trânsito, sem espera e com um resultado impecável de nível internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Engine & Client Registration Section */}
      <section id="agendamento" className="py-20 bg-gradient-to-b from-[#0E0E0E] to-[#0B0B0B] border-t border-[#1F1F1F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest mb-3">
              Agendamento Direto Online
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Syne']">
              Reserve Seu Horário Exclusivo
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Preencha seus dados para garantir sua vaga na agenda dos nossos especialistas em Maceió.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Summary & Selected Services */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#141414] border border-[#2A2A2A] p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                  <span>Resumo do Agendamento</span>
                  <span className="text-xs font-normal text-cyan-400">{selectedServices.length} item(ns)</span>
                </h3>

                <div className="space-y-3 divide-y divide-[#222222]">
                  {selectedServices.map(s => (
                    <div key={s.id} className="pt-3 first:pt-0 flex justify-between items-center text-sm">
                      <div>
                        <p className="font-semibold text-gray-200">{s.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {s.duration}
                        </p>
                      </div>
                      <span className="font-bold text-cyan-300">R$ {s.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#2A2A2A] space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal Serviços:</span>
                    <span>R$ {servicesTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Deslocamento ({neighborhood}):</span>
                    <span>{selectedNeighborhoodObj.fee === 0 ? <strong className="text-green-400">Grátis</strong> : `R$ ${selectedNeighborhoodObj.fee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-white pt-2 border-t border-[#2A2A2A]">
                    <span>Total Estimado:</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                      R$ {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-gray-300 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Pagamento realizado apenas no final do atendimento via Pix, Cartão de Crédito em até 12x ou Débito.</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#141414] border border-[#2A2A2A] p-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <MapPin className="text-pink-400" size={16} />
                  <span>Bairros com Atendimento Imediato</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {NEIGHBORHOODS.slice(0, 8).map(n => (
                    <span key={n.name} className="px-2 py-1 rounded bg-[#1F1F1F] text-gray-300 text-[11px]">
                      {n.name} {n.fee === 0 ? '✨' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#141414] border border-[#2A2A2A] p-6 sm:p-8 shadow-2xl">
                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-16 w-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-['Syne']">Agendamento Pré-Confirmado!</h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Obrigado, <strong className="text-cyan-300">{name}</strong>! Seus dados foram registrados com sucesso no sistema. Estamos abrindo o WhatsApp oficial para confirmar o horário final.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#222222] text-gray-300 hover:text-white"
                    >
                      Fazer outro agendamento
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">Dados de Agendamento & Contato</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <User size={13} className="text-cyan-400" />
                          <span>Seu Nome Completo *</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Ex: Mariana Costa"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <Phone size={13} className="text-cyan-400" />
                          <span>WhatsApp / Celular *</span>
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="(82) 99999-9999"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <Mail size={13} className="text-cyan-400" />
                          <span>E-mail</span>
                        </label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="mariana@exemplo.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <MapPin size={13} className="text-pink-400" />
                          <span>Bairro em Maceió *</span>
                        </label>
                        <select 
                          value={neighborhood}
                          onChange={e => setNeighborhood(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        >
                          {NEIGHBORHOODS.map(n => (
                            <option key={n.name} value={n.name}>
                              {n.name} {n.fee === 0 ? '(Deslocamento Grátis)' : `(+R$ ${n.fee})`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <Home size={13} className="text-cyan-400" />
                        <span>Endereço Completo (Rua, Número, Condomínio / Apto / Hotel) *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Ex: Av. Silvio Carlos Viana, Edf. Ocean Blue, Apto 802"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <Calendar size={13} className="text-cyan-400" />
                          <span>Data Preferencial *</span>
                        </label>
                        <input 
                          type="date" 
                          required
                          value={date}
                          onChange={e => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                          <Clock size={13} className="text-cyan-400" />
                          <span>Melhor Turno *</span>
                        </label>
                        <select 
                          value={period}
                          onChange={e => setPeriod(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        >
                          <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                          <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                          <option value="Noite VIP (18h às 21h)">Noite VIP (18h às 21h)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Observações sobre seu cabelo ou preferências
                      </label>
                      <textarea 
                        rows={2}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Ex: Cabelo com mechas recentes, prefiro tom mais frio..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-600"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-extrabold text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-pink-500 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5 text-base flex items-center justify-center gap-2"
                    >
                      <Sparkles size={18} />
                      <span>Confirmar Agendamento VIP em Maceió</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase mb-2">Depoimentos de Clientes</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne']">
              Clientes Apaixonadas em Maceió
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FACC15" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-6 leading-relaxed">
                "Fazer meu Mega Hair na varanda do meu apartamento na Ponta Verde com vista para o mar e sem pegar trânsito foi surreal. O acabamento ficou perfeito e imperceptível!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center text-black font-bold text-sm">
                  CL
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Camila Lins</p>
                  <p className="text-xs text-gray-500">Ponta Verde, Maceió</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FACC15" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-6 leading-relaxed">
                "Minha morena iluminada ficou exatamente no tom que eu queria. O lavatório portátil que trouxeram é super confortável e não molhou nada do chão. Recomendo de olhos fechados!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 flex items-center justify-center text-black font-bold text-sm">
                  BA
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Beatriz Albuquerque</p>
                  <p className="text-xs text-gray-500">Jatiúca, Maceió</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FACC15" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-6 leading-relaxed">
                "Contratei para a produção do meu casamento no hotel em Ipioca. A pontualidade e o profissionalismo de toda a equipe foram impecáveis do início ao fim."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center text-black font-bold text-sm">
                  RO
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Renata Oliveira</p>
                  <p className="text-xs text-gray-500">Ipioca, Maceió</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/5582999999999?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20atendimento%20delivery%20em%20Macei%C3%B3!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-2xl hover:bg-green-400 transition-all transform hover:scale-110 flex items-center gap-2"
        title="Falar no WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline font-bold text-xs pr-1">Falar com Especialista</span>
      </a>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-[#1C1C1C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                <Scissors className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold font-['Syne'] text-white">SALÃO DELIVERY MCZ</span>
            </div>

            <p className="text-xs text-gray-500 text-center">
              © 2026 Salão de Beleza Delivery Maceió. Todos os direitos reservados.
              <br />Desenvolvido para revolucionar o mercado alagoano por <strong className="text-cyan-400">Éverson Dias</strong>.
            </p>

            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <Link href="/admin/dashboard" className="hover:text-cyan-400">Acesso Gestão</Link>
              <a href="#servicos" className="hover:text-cyan-400">Serviços</a>
              <a href="#agendamento" className="hover:text-cyan-400">Agendar</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
