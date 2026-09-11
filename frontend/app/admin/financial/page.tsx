'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { 
  CircleDollarSign, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  PiggyBank
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const areaData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/09`,
  receita: Math.floor(Math.random() * 600) + 200,
  despesa: Math.floor(Math.random() * 300) + 50,
}));

const pieData = [
  { name: 'Serviços', value: 12500, color: '#00E5FF' },
  { name: 'Produtos', value: 4200, color: '#EC4899' },
  { name: 'Taxas Delivery', value: 850, color: '#8B5CF6' },
  { name: 'Cursos', value: 1500, color: '#10B981' },
];

const mockTransactions = [
  { id: 1, date: '11/09/2023', category: 'Serviços', desc: 'Aplicação Mega Hair', client: 'Juliana Silva', type: 'INCOME', amount: 850.00 },
  { id: 2, date: '11/09/2023', category: 'Fornecedores', desc: 'Compra Produtos Vult', client: '-', type: 'EXPENSE', amount: 150.00 },
  { id: 3, date: '10/09/2023', category: 'Serviços', desc: 'Manutenção Selagem', client: 'Amanda Costa', type: 'INCOME', amount: 250.00 },
  { id: 4, date: '10/09/2023', category: 'Produtos', desc: 'Venda Shampoo Lowell', client: 'Beatriz Santos', type: 'INCOME', amount: 95.00 },
  { id: 5, date: '10/09/2023', category: 'Comissões', desc: 'Repasse Manicure', client: 'Carla', type: 'EXPENSE', amount: 45.00 },
  { id: 6, date: '09/09/2023', category: 'Serviços', desc: 'Hidratação + Escova', client: 'Fernanda Lima', type: 'INCOME', amount: 120.00 },
  { id: 7, date: '09/09/2023', category: 'Delivery', desc: 'Taxa Motoboy - Centro', client: '-', type: 'EXPENSE', amount: 15.00 },
];

export default function FinancialPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CircleDollarSign className="text-pink-400" />
            Painel Financeiro
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#111111] p-1 rounded-lg border border-[#2A2A2A] flex text-sm">
            <button className="px-3 py-1 rounded-md text-gray-400 hover:text-white transition-colors">Hoje</button>
            <button className="px-3 py-1 rounded-md text-gray-400 hover:text-white transition-colors">Semana</button>
            <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-white font-medium">Mês</button>
            <button className="px-3 py-1 rounded-md text-gray-400 hover:text-white transition-colors">Pers.</button>
          </div>
          <Button variant="outline-pink">
            <Download size={18} className="mr-2" /> Exportar CSV
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value="R$ 19.050,00"
          icon={<ArrowUpRight size={24} />}
          trend={{ value: 15.2, direction: 'up' }}
          accentColor="cyan"
        />
        <MetricCard
          title="Despesas Totais"
          value="R$ 4.230,00"
          icon={<ArrowDownRight size={24} />}
          trend={{ value: 2.4, direction: 'down' }}
          accentColor="pink"
        />
        <MetricCard
          title="Lucro Líquido"
          value="R$ 14.820,00"
          icon={<PiggyBank size={24} />}
          accentColor="cyan"
        />
        <MetricCard
          title="Repasses Profissionais"
          value="R$ 3.450,00"
          icon={<Wallet size={24} />}
          accentColor="pink"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-medium text-white mb-6">Evolução de Receita vs Despesas (30 dias)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDesp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="date" stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A' }} />
                <Area type="monotone" dataKey="receita" stroke="#00E5FF" fillOpacity={1} fill="url(#colorRec)" />
                <Area type="monotone" dataKey="despesa" stroke="#EC4899" fillOpacity={1} fill="url(#colorDesp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6">Receita por Categoria</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  content={(props) => {
                    const { payload } = props;
                    return (
                      <ul className="flex flex-wrap justify-center gap-3">
                        {payload?.map((entry, index) => (
                          <li key={`item-${index}`} className="flex items-center text-xs text-gray-300">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                            {entry.value}
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Extrato de Transações</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#111111] text-gray-300 border-b border-[#2A2A2A]">
              <tr>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Descrição</th>
                <th className="px-6 py-4 font-medium">Cliente/Fornecedor</th>
                <th className="px-6 py-4 font-medium text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#111111] transition-colors">
                  <td className="px-6 py-4">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-[#2A2A2A] text-xs">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-200">{tx.desc}</td>
                  <td className="px-6 py-4">{tx.client}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    <div className={`flex items-center justify-end gap-2 ${tx.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'INCOME' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#2A2A2A] flex justify-between items-center bg-[#111111]">
          <span className="text-sm text-gray-500">Mostrando 7 de 142 transações</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" disabled>Anterior</Button>
            <Button variant="ghost" size="sm">Próxima</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
