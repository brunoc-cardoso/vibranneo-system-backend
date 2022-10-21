import { Request, Response, Router } from 'express';
import { userRoute } from '@/routes/user.routes';

const routes = Router();

routes.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running and working',
  });
});

// routes.use('/users', userRoute);

export { routes };
