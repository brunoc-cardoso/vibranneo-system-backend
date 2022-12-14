import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { applicationRoutes } from './application.routes';
import { channelsRoutes } from './channels.routes';

const routes = Router();

routes.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running and working',
  });
});

routes.use('/', authRoutes);
routes.use('/users', userRoutes);
routes.use('/apps', authMiddleware, applicationRoutes);
routes.use('/channels', authMiddleware, channelsRoutes);

export { routes };
