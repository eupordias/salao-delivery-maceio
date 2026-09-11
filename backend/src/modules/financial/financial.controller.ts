import { Request, Response } from 'express';
import { FinancialService } from './financial.service';

const financialService = new FinancialService();

export class FinancialController {
  async getCashFlow(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate and endDate are required' });
      }

      const flow = await financialService.getCashFlow(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(flow);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReports(req: Request, res: Response) {
    try {
      const { period, startDate, endDate } = req.query;
      
      const reports = await financialService.getReports(
        (period as any) || 'monthly',
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );
      res.status(200).json(reports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMetrics(req: Request, res: Response) {
    try {
      const metrics = await financialService.getMetrics();
      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await financialService.createManualTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
