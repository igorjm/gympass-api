import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', StudentController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/students', StudentController.update);

// Plans
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// Registrations
routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.delete('/registration/:id', RegistrationController.delete);
routes.put('/registration/:id', RegistrationController.update);

export default routes;
