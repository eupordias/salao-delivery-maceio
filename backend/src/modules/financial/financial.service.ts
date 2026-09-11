import { prisma } from '../../lib/prisma';
import { TransactionType, TransactionCategory } from '@prisma/client';

export interface CreateTransactionDto {
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  date?: Date;
}

export class FinancialService {
  /**
   * Calculate Cash Flow for a specific period
   */
  async getCashFlow(startDate: Date, endDate: Date) {
    const transactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' }
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    let staffSplitTotal = 0;

    const dailyMap = new Map<string, { date: string; income: number; expenses: number; profit: number }>();

    transactions.forEach(t => {
      const amount = Number(t.amount);
      const dateStr = t.date.toISOString().split('T')[0];

      if (!dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, { date: dateStr, income: 0, expenses: 0, profit: 0 });
      }

      const dayData = dailyMap.get(dateStr)!;

      if (t.type === 'INCOME') {
        totalIncome += amount;
        dayData.income += amount;
      } else {
        totalExpenses += amount;
        dayData.expenses += amount;
        if (t.category === 'STAFF_SPLIT') {
          staffSplitTotal += amount;
        }
      }

      dayData.profit = dayData.income - dayData.expenses;
    });

    const netProfit = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      staffSplitTotal,
      transactions,
      dailySeries: Array.from(dailyMap.values()),
    };
  }

  /**
   * Get detailed financial reports
   */
  async getReports(period: 'daily' | 'weekly' | 'monthly', startDate?: Date, endDate?: Date) {
    // Default to last 30 days if no dates provided
    const end = endDate || new Date();
    const start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    const transactions = await prisma.transaction.findMany({
      where: {
        date: { gte: start, lte: end },
        type: 'INCOME',
      },
      include: {
        appointment: {
          include: { service: true }
        }
      }
    });

    let totalRevenue = 0;
    let megaHairRevenue = 0;
    const uniqueClients = new Set<string>();
    const categoryMap = new Map<string, number>();
    const serviceMap = new Map<string, { count: number; revenue: number }>();

    transactions.forEach(t => {
      const amount = Number(t.amount);
      totalRevenue += amount;
      
      if (t.clientId) uniqueClients.add(t.clientId);

      // Revenue by Category
      const cat = t.category;
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + amount);

      // Service Specific Metrics
      if (t.appointment?.service) {
        const sName = t.appointment.service.name;
        if (sName.toLowerCase().includes('mega hair')) {
          megaHairRevenue += amount;
        }

        const sData = serviceMap.get(sName) || { count: 0, revenue: 0 };
        sData.count += 1;
        sData.revenue += amount;
        serviceMap.set(sName, sData);
      }
    });

    const averageTicket = uniqueClients.size > 0 ? totalRevenue / uniqueClients.size : 0;

    const revenueByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalRevenue > 0 ? (amount / totalRevenue) * 100 : 0
    }));

    const topServices = Array.from(serviceMap.entries())
      .map(([serviceName, data]) => ({ serviceName, count: data.count, revenue: data.revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalRevenue,
      uniquePayingClients: uniqueClients.size,
      averageTicket,
      megaHairRevenue,
      revenueByCategory,
      topServices
    };
  }

  /**
   * Get basic dashboard metrics
   */
  async getMetrics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [todayTransactions, monthTransactions, pendingAppointments] = await Promise.all([
      prisma.transaction.findMany({ where: { date: { gte: today }, type: 'INCOME' } }),
      prisma.transaction.findMany({ where: { date: { gte: startOfMonth }, type: 'INCOME' } }),
      prisma.appointment.count({ where: { status: 'PENDING' } })
    ]);

    const todayRevenue = todayTransactions.reduce((acc, t) => acc + Number(t.amount), 0);
    const monthRevenue = monthTransactions.reduce((acc, t) => acc + Number(t.amount), 0);
    
    const uniqueClientsMonth = new Set(monthTransactions.map(t => t.clientId).filter(Boolean)).size;
    const averageTicketThisMonth = uniqueClientsMonth > 0 ? monthRevenue / uniqueClientsMonth : 0;

    return {
      todayRevenue,
      monthRevenue,
      averageTicketThisMonth,
      pendingPayments: pendingAppointments
    };
  }

  /**
   * Create a manual transaction
   */
  async createManualTransaction(data: CreateTransactionDto) {
    return prisma.transaction.create({
      data: {
        ...data,
      },
    });
  }
}
