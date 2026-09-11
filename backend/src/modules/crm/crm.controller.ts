import { Request, Response } from 'express';
import { CrmService } from './crm.service';

const crmService = new CrmService();

export class CrmController {
  async getInactiveClients(req: Request, res: Response) {
    try {
      const inactiveDays = Number(req.query.inactiveDays) || 60;
      const minSpent = Number(req.query.minSpent) || 0;
      const service = req.query.service as string | undefined;

      const clients = await crmService.getInactiveClients(inactiveDays, minSpent, service);
      res.status(200).json(clients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getVipClients(req: Request, res: Response) {
    try {
      const minSpent = Number(req.query.minSpent) || 500;
      const clients = await crmService.getVipClients(minSpent);
      res.status(200).json(clients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCampaign(req: Request, res: Response) {
    try {
      const campaign = await crmService.createCampaign(req.body);
      res.status(201).json(campaign);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async listCampaigns(req: Request, res: Response) {
    try {
      const campaigns = await crmService.listCampaigns();
      res.status(200).json(campaigns);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async triggerCampaign(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { clientIds, message, channel } = req.body;
      const result = await crmService.triggerCampaign(id, clientIds, message, channel);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async exportCsv(req: Request, res: Response) {
    try {
      const inactiveDays = Number(req.query.inactiveDays) || 60;
      const minSpent = Number(req.query.minSpent) || 0;
      
      const clients = await crmService.getInactiveClients(inactiveDays, minSpent);
      const csv = crmService.exportClientsCsv(clients);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=clientes_inativos.csv');
      res.status(200).send(csv);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
