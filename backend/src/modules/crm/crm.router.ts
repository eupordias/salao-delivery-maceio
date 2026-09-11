import { Router } from 'express';
import { CrmController } from './crm.controller';
import { requireAdmin } from '../../middlewares/auth';

export const crmRouter = Router();
const controller = new CrmController();

crmRouter.use(requireAdmin);

crmRouter.get('/inactive-clients', controller.getInactiveClients);
crmRouter.get('/vip-clients', controller.getVipClients);
crmRouter.get('/inactive-clients/export-csv', controller.exportCsv);

crmRouter.post('/campaigns', controller.createCampaign);
crmRouter.get('/campaigns', controller.listCampaigns);
crmRouter.post('/campaigns/:id/trigger', controller.triggerCampaign);
