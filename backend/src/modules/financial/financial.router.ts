import { Router } from 'express';
import { FinancialController } from './financial.controller';
import { requireAdmin } from '../../middlewares/auth';

export const financialRouter = Router();
const controller = new FinancialController();

financialRouter.use(requireAdmin);

financialRouter.get('/cash-flow', controller.getCashFlow);
financialRouter.get('/reports', controller.getReports);
financialRouter.get('/metrics', controller.getMetrics);
financialRouter.post('/transactions', controller.createTransaction);
