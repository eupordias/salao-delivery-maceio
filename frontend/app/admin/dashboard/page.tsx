'use client';

import React from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card } from '@/components/ui/Card';
import { 
  CircleDollarSign, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Package
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const chartData = [
  { name: 'Seg', valor: 450 },
  { name: 'Ter', valor: 380 },
  { name: 'Qua', valor: 520 },
  { name: 'Qui', valor: 610 },
  { name: 'Sex', valor: 850 },
  { name: 'Sáb', valor: 1200 },
  { name: 'Dom', valor: 400 },
];

const recentTransactions = [
  { id: 1, type: 'INCOME', desc: 'Aplicação Mega Hair - Juliana Silva', amount: 850.00, time: '10:30' },
  { id: 2, type: 'INCOME', desc: 'Manutenção Selagem - Amanda Costa', amount: 250.00, time: '11:45' },
  { id: 3, type: 'EXPENSE', desc: 'Compra Produtos Vult', amount: 150.00, time: '14:20' },
  { id: 4, type: 'INCOME', desc: 'Hidratação + Escova - Fernanda Lima', amount: 120.00, time: '15:10' },
  { id: 5, type: 'EXPENSE', desc: 'Taxa Motoboy - Entrega Centro', amount: 15.00, time: '16:00' },
];

export default function DashboardPage() {
  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Bom dia, Admin 👋</h1>
        <p className="text-gray-400 capitalize">{today}</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Hoje"
          value="R$ 1.250,00"
          icon={<CircleDollarSign size={24} />}
          trend={{ value: 12.5, direction: 'up' }}
          accentColor="cyan"
        />
        <MetricCard
          title="Receita do Mês"
          value="R$ 18.400,00"
          icon={<TrendingUp size={24} />}
          trend={{ value: 8.2, direction: 'up' }}
          accentColor="pink"
        />
        <MetricCard
          title="Ticket Médio"
          value="R$ 385,00"
          icon={<Target size={24} />}
          accentColor="cyan"
        />
        <MetricCard
          title="Alertas de Estoque"
          value="3 Itens"
          icon={<AlertTriangle size={24} />}
          subtitle="Abaixo do estoque mínimo"
          accentColor="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white">Receita dos Últimos 7 Dias</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', color: '#fff' }}
                  itemStyle={{ color: '#00E5FF' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                />
                <Area type="monotone" dataKey="valor" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#colorValor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white">Transações Recentes</h3>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#111111] transition-colors border border-transparent hover:border-[#2A2A2A]">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${tx.type === 'INCOME' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {tx.type === 'INCOME' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200 line-clamp-1">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <div className={`font-medium text-sm whitespace-nowrap ${tx.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
