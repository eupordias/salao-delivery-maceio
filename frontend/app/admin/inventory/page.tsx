'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PackageSearch, Plus, Search, Filter, Edit, ArrowRightLeft } from 'lucide-react';

const mockProducts = [
  { id: '1', name: 'Mega Hair Fita Adesiva 60cm', category: 'MEGA_HAIR', currentStock: 12, minStock: 5, status: 'OK', cost: 180.00, price: 450.00 },
  { id: '2', name: 'Tintura Igora Royal 6.0', category: 'TINTA', currentStock: 4, minStock: 10, status: 'CRITICAL', cost: 35.00, price: 80.00 },
  { id: '3', name: 'Queratina Líquida Lowell', category: 'QUERATINA', currentStock: 8, minStock: 10, status: 'LOW', cost: 45.00, price: 95.00 },
  { id: '4', name: 'Escova Progressiva Zap', category: 'TRATAMENTO', currentStock: 5, minStock: 3, status: 'OK', cost: 120.00, price: 250.00 },
  { id: '5', name: 'Shampoo L\'Oréal Absolut Repair', category: 'HOME_CARE', currentStock: 2, minStock: 5, status: 'CRITICAL', cost: 85.00, price: 160.00 },
  { id: '6', name: 'Pó Descolorante Wella', category: 'QUIMICA', currentStock: 15, minStock: 5, status: 'OK', cost: 110.00, price: 220.00 },
];

const mockMovements = [
  { id: 1, date: '10/09/2023', product: 'Tintura Igora Royal 6.0', type: 'OUT', qty: 2, reason: 'Uso em cliente (Fernanda)' },
  { id: 2, date: '10/09/2023', product: 'Pó Descolorante Wella', type: 'IN', qty: 10, reason: 'Reposição fornecedor' },
  { id: 3, date: '09/09/2023', product: 'Mega Hair Fita Adesiva 60cm', type: 'OUT', qty: 1, reason: 'Venda + Aplicação' },
  { id: 4, date: '09/09/2023', product: 'Shampoo L\'Oréal Absolut Repair', type: 'OUT', qty: 1, reason: 'Venda balcão' },
  { id: 5, date: '08/09/2023', product: 'Queratina Líquida Lowell', type: 'OUT', qty: 1, reason: 'Uso interno' },
];

export default function InventoryPage() {
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OK': return <Badge variant="success">🟢 OK</Badge>;
      case 'LOW': return <Badge variant="warning">🟡 Baixo</Badge>;
      case 'CRITICAL': return <Badge variant="danger">🔴 Crítico</Badge>;
      default: return <Badge variant="muted">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, 'cyan' | 'pink' | 'info' | 'warning' | 'success' | 'danger' | 'muted'> = {
      'MEGA_HAIR': 'cyan',
      'TINTA': 'pink',
      'QUERATINA': 'info',
      'TRATAMENTO': 'warning',
      'HOME_CARE': 'success',
      'QUIMICA': 'danger',
    };
    return <Badge variant={categories[category] || 'muted'}>{category}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <PackageSearch className="text-cyan-400" />
            Gestão de Estoque
          </h1>
        </div>
        <Button variant="primary" onClick={() => setIsNewProductModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Filters & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 md:col-span-2 flex flex-wrap gap-4 items-center bg-[#111111]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <select className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500">
            <option value="">Todas Categorias</option>
            <option value="MEGA_HAIR">Mega Hair</option>
            <option value="TINTA">Tintas</option>
          </select>
          <Button variant="outline-cyan" size="sm" className="whitespace-nowrap">
            <Filter size={16} className="mr-2" /> Filtros
          </Button>
        </Card>

        <Card className="p-4 flex flex-col justify-center">
          <p className="text-sm text-gray-400">Total Produtos</p>
          <p className="text-2xl font-bold text-white mt-1">128</p>
        </Card>

        <Card className="p-4 flex flex-col justify-center glow-pink border-pink-500/20">
          <p className="text-sm text-gray-400">Estoque Crítico</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-red-400">12</p>
            <Badge variant="danger">Atenção</Badge>
          </div>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase bg-[#111111] text-gray-300 border-b border-[#2A2A2A]">
            <tr>
              <th className="px-6 py-4 font-medium">Produto</th>
              <th className="px-6 py-4 font-medium">Categoria</th>
              <th className="px-6 py-4 font-medium text-center">Estoque Atual</th>
              <th className="px-6 py-4 font-medium text-center">Mínimo</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium">Custo (R$)</th>
              <th className="px-6 py-4 font-medium">Venda (R$)</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-[#111111] transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-200">{product.name}</td>
                <td className="px-6 py-4">{getCategoryBadge(product.category)}</td>
                <td className="px-6 py-4 text-center font-medium text-white">{product.currentStock}</td>
                <td className="px-6 py-4 text-center">{product.minStock}</td>
                <td className="px-6 py-4 text-center">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4">R$ {product.cost.toFixed(2)}</td>
                <td className="px-6 py-4 text-cyan-400">R$ {product.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setSelectedProduct(product); setIsAdjustModalOpen(true); }}
                      className="p-1.5 text-pink-400 hover:bg-pink-500/10 rounded-md"
                      title="Ajustar Estoque"
                    >
                      <ArrowRightLeft size={16} />
                    </button>
                    <button className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded-md" title="Editar">
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Movements */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Últimas Movimentações</h3>
        <Card className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#111111] text-gray-300 border-b border-[#2A2A2A]">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Produto</th>
                <th className="px-6 py-3 font-medium text-center">Tipo</th>
                <th className="px-6 py-3 font-medium text-center">Qtd</th>
                <th className="px-6 py-3 font-medium">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {mockMovements.map((mov) => (
                <tr key={mov.id}>
                  <td className="px-6 py-3">{mov.date}</td>
                  <td className="px-6 py-3 text-gray-200">{mov.product}</td>
                  <td className="px-6 py-3 text-center">
                    {mov.type === 'IN' ? (
                      <span className="text-green-400 font-medium">ENTRADA</span>
                    ) : (
                      <span className="text-red-400 font-medium">SAÍDA</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center text-white">{mov.qty}</td>
                  <td className="px-6 py-3">{mov.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* New Product Modal */}
      <Modal 
        isOpen={isNewProductModalOpen} 
        onClose={() => setIsNewProductModalOpen(false)}
        title="Novo Produto"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsNewProductModalOpen(false)}>Cancelar</Button>
            <Button variant="primary">Salvar Produto</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nome do Produto</label>
            <input type="text" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Categoria</label>
              <select className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none">
                <option>MEGA_HAIR</option>
                <option>TINTA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Unidade</label>
              <select className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none">
                <option>UN</option>
                <option>ML</option>
                <option>G</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Estoque Inicial</label>
              <input type="number" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Estoque Mínimo</label>
              <input type="number" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Custo (R$)</label>
              <input type="number" step="0.01" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Preço Venda (R$)</label>
              <input type="number" step="0.01" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>
        </div>
      </Modal>

      {/* Adjust Stock Modal */}
      <Modal 
        isOpen={isAdjustModalOpen} 
        onClose={() => setIsAdjustModalOpen(false)}
        title={`Ajustar Estoque: ${selectedProduct?.name || ''}`}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsAdjustModalOpen(false)}>Cancelar</Button>
            <Button variant="primary">Confirmar Ajuste</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex gap-4 mb-6">
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="adjustType" className="peer sr-only" defaultChecked />
              <div className="text-center p-3 rounded-lg border border-[#2A2A2A] peer-checked:border-green-500 peer-checked:bg-green-500/10 peer-checked:text-green-400 text-gray-400 transition-all">
                Entrada (+)
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="adjustType" className="peer sr-only" />
              <div className="text-center p-3 rounded-lg border border-[#2A2A2A] peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-red-400 text-gray-400 transition-all">
                Saída (-)
              </div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Quantidade</label>
            <input type="number" min="1" defaultValue="1" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Motivo</label>
            <input type="text" placeholder="Ex: Quebra, Venda, Reposição..." className="w-full bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none" />
          </div>
        </div>
      </Modal>

    </div>
  );
}
