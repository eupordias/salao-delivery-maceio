import { Request, Response } from 'express';
import { InventoryService } from './inventory.service';
import { ProductCategory, StockMovementType } from '@prisma/client';

const inventoryService = new InventoryService();

export class InventoryController {
  async getInventory(req: Request, res: Response) {
    try {
      const { category, lowStock } = req.query;
      
      const products = await inventoryService.listProducts({
        category: category as ProductCategory,
        lowStock: lowStock === 'true',
      });
      
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await inventoryService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await inventoryService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await inventoryService.deleteProduct(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMovements(req: Request, res: Response) {
    try {
      const { productId, type, startDate, endDate } = req.query;
      
      const movements = await inventoryService.listMovements({
        productId: productId as string,
        type: type as StockMovementType,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });
      
      res.status(200).json(movements);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async adjustStock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity, type, reason, appointmentId } = req.body;
      
      const movement = await inventoryService.adjustStock(id, quantity, type, reason, appointmentId);
      res.status(201).json(movement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async completeAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { serviceId } = req.body;
      
      const appointment = await inventoryService.handleAppointmentCompletion(id, serviceId);
      res.status(200).json(appointment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
