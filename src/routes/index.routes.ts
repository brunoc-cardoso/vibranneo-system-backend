import { Request, Response, Router } from 'express';
import { userRoute } from './user.routes';
import { applicationRoute } from './application.routes';

const routes = Router();

routes.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running and working',
  });
});

routes.use('/users', userRoute);
// routes.use('/application', applicationRoute);

export { routes };
