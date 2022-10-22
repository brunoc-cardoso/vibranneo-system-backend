import { Request, Response, Router } from 'express';
import { prisma } from '../config/prisma';
import { AppError } from '../errors/AppError';

const applicationRoutes = Router();

applicationRoutes.get('/', async (request: Request, response: Response) => {
  const applications = await prisma.applications.findMany({
    where: {
      user_id: request.userId,
    },
    include: {
      ActiveChannels: true,
    },
  });

  return response.status(200).json({
    data: {
      applications,
    },
  });
});

applicationRoutes.post('/', async (request: Request, response: Response) => {
  const { app_name } = request.body;

  const isAlreadyExist = await prisma.applications.findFirst({
    where: {
      app_name,
    },
  });

  if (isAlreadyExist) {
    throw new AppError('Application already exists');
  }

  const newApplication = await prisma.applications.create({
    data: {
      app_name,
      user_id: request.userId,
    },
  });

  return response.status(201).json({
    message: 'Application created successfully',
    data: {
      app_id: newApplication.app_id,
      app_token: newApplication.app_token,
    },
  });
});

export { applicationRoutes };
