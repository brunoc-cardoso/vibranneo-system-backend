import { Request, Response, Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
// import { applicationRoute } from './application.routes';

const router = Router();

router.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running and working',
  });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
// router.use('/application', applicationRoute);

export { router };
