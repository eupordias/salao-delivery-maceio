'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, Filter, Send, Download, Crown, MessageSquare, Mail } from 'lucide-react';
import clsx from 'clsx';

const mockClients = [
  { id: 1, name: 'Juliana Silva', phone: '82 99911-2233', lastService: 'Mega Hair Fita', lastDate: '15/06/2023', daysInactive: 88, totalSpent: 1250, vip: true },
  { id: 2, name: 'Amanda Costa', phone: '82 99822-3344', lastService: 'Selagem', lastDate: '10/05/2023', daysInactive: 124, totalSpent: 450, vip: false },
  { id: 3, name: 'Fernanda Lima', phone: '82 99733-4455', lastService: 'Corte + Hidratação', lastDate: '01/08/2023', daysInactive: 41, totalSpent: 180, vip: false },
  { id: 4, name: 'Beatriz Santos', phone: '82 99644-5566', lastService: 'Coloração', lastDate: '20/04/2023', daysInactive: 144, totalSpent: 620, vip: true },
  { id: 5, name: 'Carla Oliveira', phone: '82 99555-6677', lastService: 'Manutenção Mega', lastDate: '30/07/2023', daysInactive: 43, totalSpent: 890, vip: true },
];

const mockHistory = [
  { id: 1, name: 'Promoção Mega Hair Inverno', segment: 'Mega Hair +90 dias', channel: 'WhatsApp', status: 'SENT', sent: 45, date: '10/08/2023' },
  { id: 2, name: 'Resgate Clientes VIP', segment: 'VIPs Inativos', channel: 'WhatsApp + Email', status: 'SENT', sent: 12, date: '01/08/2023' },
  { id: 3, name: 'Desconto Aniversariantes Mês', segment: 'Aniversariantes Setembro', channel: 'Email', status: 'DRAFT', sent: 0, date: '-' },
];

export default function CRMPage() {
  const [activeSegment, setActiveSegment] = useState<string | null>('inativos_60');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [message, setMessage] = useState('Olá {{clientName}}, faz tempo que não nos vemos! Que tal agendar sua manutenção de {{lastService}}? Temos um mimo para você 🎁');
  
  const toggleSelectAll = () => {
    if (selectedClients.length === mockClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(mockClients.map(c => c.id));
    }
  };

  const toggleSelectClient = (id: number) => {
    setSelectedClients(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Users className="text-cyan-400" />
          CRM & Campanhas de Resgate
        </h1>
        <p className="text-gray-400">Identifique clientes inativos e dispare campanhas personalizadas</p>
      </div>

      {/* Segments */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setActiveSegment('inativos_60')}
          className={clsx(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all",
            activeSegment === 'inativos_60' 
              ? "bg-cyan-500 text-white border-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.3)]" 
              : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          )}
        >
          ⏱️ Inativos há 60 dias
        </button>
        <button 
          onClick={() => setActiveSegment('mega_90')}
          className={clsx(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all",
            activeSegment === 'mega_90' 
              ? "bg-cyan-500 text-white border-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.3)]" 
              : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          )}
        >
          💅 Mega Hair +90 dias
        </button>
        <button 
          onClick={() => setActiveSegment('vip')}
          className={clsx(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all",
            activeSegment === 'vip' 
              ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
              : "border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
          )}
        >
          ⭐ Clientes VIP (+R$ 500)
        </button>
        <button 
          onClick={() => setActiveSegment('custom')}
          className={clsx(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
            activeSegment === 'custom' 
              ? "bg-gray-700 text-white border-gray-700" 
              : "border-gray-600 text-gray-300 hover:bg-gray-800"
          )}
        >
          <Filter size={14} /> Personalizar
        </button>
      </div>

      {/* Filter Panel (Custom) */}
      {activeSegment === 'custom' && (
        <Card className="p-6 bg-[#111111]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Inatividade Mínima (dias)</label>
              <input type="number" defaultValue="30" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gasto Mínimo (R$)</label>
              <input type="number" defaultValue="0" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Serviço Realizado</label>
              <select className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none">
                <option>Todos</option>
                <option>Mega Hair</option>
                <option>Selagem</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline-cyan" size="sm">Buscar Clientes</Button>
          </div>
        </Card>
      )}

      {/* Results Stats */}
      <div className="flex items-center gap-4 text-sm bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-lg text-cyan-100">
        <span className="font-semibold text-cyan-400">5 clientes encontrados</span>
        <span className="text-cyan-500/50">|</span>
        <span>Valor total histórico: R$ 3.390,00</span>
        <span className="text-cyan-500/50">|</span>
        <span>Ticket médio: R$ 678,00</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Table */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="text-xs uppercase bg-[#111111] text-gray-300 border-b border-[#2A2A2A]">
                <tr>
                  <th className="px-4 py-3 font-medium w-10">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-600 bg-[#1A1A1A] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-[#0B0B0B]"
                      checked={selectedClients.length === mockClients.length && mockClients.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Último Serviço</th>
                  <th className="px-4 py-3 font-medium text-center">Dias Inativo</th>
                  <th className="px-4 py-3 font-medium text-right">Total Gasto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {mockClients.map((client) => (
                  <tr key={client.id} className={clsx("transition-colors", selectedClients.includes(client.id) ? "bg-cyan-500/5" : "hover:bg-[#111111]")}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-600 bg-[#1A1A1A] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-[#0B0B0B]"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleSelectClient(client.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-200">{client.name}</span>
                        {client.vip && <Crown size={14} className="text-pink-400" title="VIP" />}
                      </div>
                      <div className="text-xs text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-300">{client.lastService}</div>
                      <div className="text-xs text-gray-500">{client.lastDate}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx(
                        "px-2 py-1 rounded-md text-xs font-bold",
                        client.daysInactive >= 90 ? "bg-red-500/10 text-red-400" :
                        client.daysInactive >= 60 ? "bg-yellow-500/10 text-yellow-400" :
                        "text-gray-400"
                      )}>
                        {client.daysInactive} dias
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-300">
                      R$ {client.totalSpent.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Campaign Composer */}
        <Card className="flex flex-col h-full bg-[#111111] border-[#2A2A2A]">
          <div className="p-4 border-b border-[#2A2A2A]">
            <h3 className="font-medium text-white flex items-center gap-2">
              <Send size={18} className="text-cyan-400" />
              Disparar Campanha
            </h3>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Selecionados: <strong className="text-cyan-400">{selectedClients.length}</strong> clientes</span>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Mensagem</label>
              <textarea 
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-cyan-500 focus:outline-none resize-none"
              />
              <div className="flex gap-2 mt-2">
                <button className="text-xs bg-[#2A2A2A] text-gray-300 px-2 py-1 rounded hover:bg-gray-700">{"{{clientName}}"}</button>
                <button className="text-xs bg-[#2A2A2A] text-gray-300 px-2 py-1 rounded hover:bg-gray-700">{"{{lastService}}"}</button>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-[#2A2A2A]">
              <label className="block text-sm text-gray-400 mb-2">Canal de Envio</label>
              <div className="flex gap-3 mb-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="channel" className="peer sr-only" defaultChecked />
                  <div className="flex items-center justify-center gap-2 p-2 rounded-lg border border-[#2A2A2A] peer-checked:border-green-500 peer-checked:text-green-400 text-gray-500 text-sm">
                    <MessageSquare size={16} /> WhatsApp
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="channel" className="peer sr-only" />
                  <div className="flex items-center justify-center gap-2 p-2 rounded-lg border border-[#2A2A2A] peer-checked:border-cyan-500 peer-checked:text-cyan-400 text-gray-500 text-sm">
                    <Mail size={16} /> E-mail
                  </div>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline-cyan" className="flex-1 px-0">
                  <Download size={16} className="mr-2" /> CSV
                </Button>
                <Button variant="primary" className="flex-[2]" disabled={selectedClients.length === 0}>
                  <Send size={16} className="mr-2" /> Enviar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* History */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Histórico de Campanhas</h3>
        <Card className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#111111] text-gray-300 border-b border-[#2A2A2A]">
              <tr>
                <th className="px-6 py-3 font-medium">Nome / Descrição</th>
                <th className="px-6 py-3 font-medium">Segmento</th>
                <th className="px-6 py-3 font-medium">Canal</th>
                <th className="px-6 py-3 font-medium text-center">Enviados</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
                <th className="px-6 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {mockHistory.map((item) => (
                <tr key={item.id} className="hover:bg-[#111111]">
                  <td className="px-6 py-3 text-gray-200 font-medium">{item.name}</td>
                  <td className="px-6 py-3">{item.segment}</td>
                  <td className="px-6 py-3 text-xs">{item.channel}</td>
                  <td className="px-6 py-3 text-center">{item.sent > 0 ? item.sent : '-'}</td>
                  <td className="px-6 py-3 text-center">
                    {item.status === 'SENT' ? <Badge variant="success">Enviada</Badge> : 
                     item.status === 'DRAFT' ? <Badge variant="muted">Rascunho</Badge> : 
                     <Badge variant="warning">{item.status}</Badge>}
                  </td>
                  <td className="px-6 py-3">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
