import { prisma } from '../../lib/prisma';
import { ProductCategory, StockMovementType, TransactionType, TransactionCategory } from '@prisma/client';

export interface CreateProductDto {
  name: string;
  category: ProductCategory;
  barcode?: string;
  currentStock: number;
  minStock: number;
  unit: string;
  costPrice: number;
  sellPrice?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export class InventoryService {
  /**
   * List all products with computed low stock indicator
   */
  async listProducts(filters?: { category?: ProductCategory; lowStock?: boolean }) {
    const where: any = { isActive: true };
    
    if (filters?.category) {
      where.category = filters.category;
    }

    const products = await prisma.product.findMany({ where });

    let mappedProducts = products.map((product) => {
      const currentStock = Number(product.currentStock);
      const minStock = Number(product.minStock);
      let stockStatus: 'OK' | 'LOW' | 'CRITICAL' = 'OK';
      
      if (currentStock === 0) stockStatus = 'CRITICAL';
      else if (currentStock <= minStock) stockStatus = 'LOW';

      return {
        ...product,
        isLowStock: stockStatus !== 'OK',
        stockStatus,
      };
    });

    if (filters?.lowStock) {
      mappedProducts = mappedProducts.filter(p => p.isLowStock);
    }

    return mappedProducts;
  }

  /**
   * Create a new product
   */
  async createProduct(data: CreateProductDto) {
    return prisma.product.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, data: UpdateProductDto) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  /**
   * Soft delete a product
   */
  async deleteProduct(id: string) {
    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * List stock movements
   */
  async listMovements(filters?: { productId?: string; type?: StockMovementType; startDate?: Date; endDate?: Date }) {
    const where: any = {};
    if (filters?.productId) where.productId = filters.productId;
    if (filters?.type) where.type = filters.type;
    
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    return prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Adjust stock manually
   */
  async adjustStock(productId: string, quantity: number, type: 'IN' | 'OUT', reason: string, appointmentId?: string) {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });
      
      if (!product) {
        throw new Error('Product not found');
      }

      const currentStock = Number(product.currentStock);
      let newStock = currentStock;

      if (type === 'IN') {
        newStock += quantity;
      } else if (type === 'OUT') {
        newStock -= quantity;
        if (newStock < 0) {
          throw new Error(`Insufficient stock for product ${product.name}. Required: ${quantity}, Available: ${currentStock}`);
        }
      }

      await tx.product.update({
        where: { id: productId },
        data: { currentStock: newStock },
      });

      return tx.stockMovement.create({
        data: {
          productId,
          type,
          quantity,
          reason,
          appointmentId
        },
      });
    });
  }

  /**
   * Handle appointment completion logic
   */
  async handleAppointmentCompletion(appointmentId: string, serviceId: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new Error('Appointment not found');

    const usages = await prisma.serviceProductUsage.findMany({
      where: { serviceId },
    });

    // 1. Deduct stock for each used product
    for (const usage of usages) {
      await this.adjustStock(
        usage.productId,
        Number(usage.quantityUsed),
        'OUT',
        `Agendamento #${appointmentId} concluído`,
        appointmentId
      );
    }

    // 2. Create financial transactions
    await prisma.$transaction(async (tx) => {
      // Income from service
      await tx.transaction.create({
        data: {
          type: TransactionType.INCOME,
          category: TransactionCategory.SERVICE,
          amount: appointment.totalAmount,
          description: `Pagamento Agendamento #${appointmentId}`,
          appointmentId: appointment.id,
          clientId: appointment.clientId,
          staffId: appointment.staffId,
        }
      });

      // Staff split (assuming 50% split for example, if staffId exists)
      if (appointment.staffId) {
        const staffSplitAmount = Number(appointment.totalAmount) * 0.5; // Custom business logic goes here
        await tx.transaction.create({
          data: {
            type: TransactionType.EXPENSE,
            category: TransactionCategory.STAFF_SPLIT,
            amount: staffSplitAmount,
            description: `Comissão Agendamento #${appointmentId}`,
            appointmentId: appointment.id,
            clientId: appointment.clientId,
            staffId: appointment.staffId,
          }
        });
      }
    });

    // Mark appointment as COMPLETED
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'COMPLETED' }
    });
  }
}
