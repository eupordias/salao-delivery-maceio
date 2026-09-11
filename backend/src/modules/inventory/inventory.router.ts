import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { requireAdmin } from '../../middlewares/auth';

export const inventoryRouter = Router();
const controller = new InventoryController();

// All routes require admin
inventoryRouter.use(requireAdmin);

inventoryRouter.get('/', controller.getInventory);
inventoryRouter.post('/', controller.createProduct);
inventoryRouter.put('/:id', controller.updateProduct);
inventoryRouter.delete('/:id', controller.deleteProduct);

inventoryRouter.get('/movements', controller.getMovements);
inventoryRouter.post('/:id/adjust', controller.adjustStock);
inventoryRouter.post('/appointments/:id/complete', controller.completeAppointment);
