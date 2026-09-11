'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scissors, 
  ArrowLeft, 
  User, 
  Phone, 
  Image as ImageIcon, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2,
  ShieldCheck
} from 'lucide-react';

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

export default function CadastroProfissionalPage() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('Mega Hair (Fita / Queratina)');
  const [cost, setCost] = useState('');
  const [neighborhoods, setNeighborhoods] = useState('Ponta Verde, Pajuçara, Jatiúca, Cruz das Almas');
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 'Segunda-feira', from: '08:00', to: '18:00' },
    { week_day: 'Sexta-feira', from: '08:00', to: '19:00' }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 'Sábado', from: '09:00', to: '17:00' }
    ]);
  };

  const removeScheduleItem = (index: number) => {
    if (scheduleItems.length > 1) {
      setScheduleItems(scheduleItems.filter((_, i) => i !== index));
    }
  };

  const updateScheduleValue = (index: number, field: keyof ScheduleItem, value: string) => {
    const updated = scheduleItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setScheduleItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !cost || !bio) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setIsSuccess(true);
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

          <Link href="/profissionais" className="text-xs text-gray-400 hover:text-cyan-400">
            Ver Especialistas
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-12 bg-gradient-to-b from-[#111111] to-[#0B0B0B] border-b border-[#1F1F1F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold text-pink-400 tracking-widest uppercase">Parceria Profissional em Maceió</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Syne'] mt-2">
            Que incrível que você quer atender pelo Salão Delivery!
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-4 font-light">
            O primeiro passo é preencher esse formulário de inscrição. Você terá gestão de agenda, controle financeiro automático e novos clientes de alto padrão em Maceió.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-2xl">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-white font-['Syne']">Cadastro Realizado com Sucesso!</h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Parabéns, <strong className="text-cyan-400">{name}</strong>! Seus dados foram salvos no ecossistema digital do Salão Delivery Maceió. Nossa coordenação entrará em contato via WhatsApp no número <strong className="text-white">{whatsapp}</strong> para homologação.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Link 
                  href="/profissionais" 
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-pink-500 text-black"
                >
                  Ver Lista de Profissionais
                </Link>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#222222] text-gray-300 hover:text-white"
                >
                  Novo Cadastro
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Seção 1: Seus Dados */}
              <div>
                <h3 className="text-lg font-bold text-white font-['Syne'] pb-3 border-b border-[#2A2A2A] flex items-center gap-2">
                  <User size={18} className="text-cyan-400" />
                  <span>1. Seus Dados Pessoais</span>
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ex: Amanda Albuquerque"
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <Phone size={13} className="text-cyan-400" />
                        <span>WhatsApp com DDD *</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="(82) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <ImageIcon size={13} className="text-pink-400" />
                        <span>Link da sua Foto / Avatar</span>
                      </label>
                      <input 
                        type="url" 
                        value={avatar}
                        onChange={e => setAvatar(e.target.value)}
                        placeholder="https://exemplo.com/sua-foto.jpg"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <FileText size={13} className="text-cyan-400" />
                      <span>Biografia & Experiência Profissional *</span>
                    </label>
                    <textarea 
                      rows={3}
                      required
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Conte sobre sua trajetória, cursos, certificados e técnicas de especialidade..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Seção 2: Sobre o Serviço */}
              <div>
                <h3 className="text-lg font-bold text-white font-['Syne'] pb-3 border-b border-[#2A2A2A] flex items-center gap-2">
                  <Scissors size={18} className="text-pink-400" />
                  <span>2. Especialidades & Valores</span>
                </h3>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Especialidade Principal *
                    </label>
                    <select 
                      value={specialty}
                      onChange={e => setSpecialty(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Mega Hair (Fita / Queratina)">Mega Hair (Fita / Queratina / Nano Slim)</option>
                      <option value="Coloração & Morena Iluminada">Coloração & Morena Iluminada</option>
                      <option value="Loiro dos Sonhos & Babylights">Loiro dos Sonhos & Babylights</option>
                      <option value="Selagem Orgânica & Terapias">Selagem Orgânica & Terapias Capilares</option>
                      <option value="Penteados & Noivas">Penteados & Noivas Delivery</option>
                      <option value="Design de Sobrancelhas & Estética">Design de Sobrancelhas & Estética</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <DollarSign size={13} className="text-green-400" />
                      <span>Custo Base por Atendimento (R$) *</span>
                    </label>
                    <input 
                      type="number" 
                      required
                      value={cost}
                      onChange={e => setCost(e.target.value)}
                      placeholder="Ex: 250"
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Bairros de Atendimento em Maceió
                  </label>
                  <input 
                    type="text" 
                    value={neighborhoods}
                    onChange={e => setNeighborhoods(e.target.value)}
                    placeholder="Ex: Ponta Verde, Pajuçara, Jatiúca, Cruz das Almas"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Seção 3: Horários Disponíveis */}
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2A]">
                  <h3 className="text-lg font-bold text-white font-['Syne'] flex items-center gap-2">
                    <Clock size={18} className="text-cyan-400" />
                    <span>3. Horários Disponíveis na Semana</span>
                  </h3>
                  <button 
                    type="button" 
                    onClick={addNewScheduleItem}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ Novo Horário</span>
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {scheduleItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center bg-[#0B0B0B] p-3 rounded-xl border border-[#222222]">
                      <div className="col-span-12 sm:col-span-5">
                        <select 
                          value={item.week_day}
                          onChange={e => updateScheduleValue(index, 'week_day', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Segunda-feira">Segunda-feira</option>
                          <option value="Terça-feira">Terça-feira</option>
                          <option value="Quarta-feira">Quarta-feira</option>
                          <option value="Quinta-feira">Quinta-feira</option>
                          <option value="Sexta-feira">Sexta-feira</option>
                          <option value="Sábado">Sábado</option>
                          <option value="Domingo">Domingo</option>
                        </select>
                      </div>

                      <div className="col-span-5 sm:col-span-3">
                        <input 
                          type="time" 
                          value={item.from}
                          onChange={e => updateScheduleValue(index, 'from', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="col-span-5 sm:col-span-3">
                        <input 
                          type="time" 
                          value={item.to}
                          onChange={e => updateScheduleValue(index, 'to', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1 text-right">
                        <button 
                          type="button" 
                          onClick={() => removeScheduleItem(index)}
                          className="p-2 text-gray-500 hover:text-red-400"
                          title="Remover"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Termos & Submit */}
              <div className="pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
                  <span>Seus dados são protegidos e homologados pela equipe técnica em Maceió.</span>
                </div>

                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-pink-500 text-black shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Salvar Cadastro de Profissional</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
