import { Request, Response, Router } from 'express';
import { prisma } from '../config/prisma';
import { AppError } from '../errors/AppError';

const channelsRoutes = Router();

channelsRoutes.post('/', async (request: Request, response: Response) => {
  const { app_id, channels } = request.body;

  const isAppExists = await prisma.applications.findFirst({
    where: {
      app_id,
    },
  });

  if (!isAppExists) {
    throw new AppError('Application not found');
  }

  const newChannels = await prisma.activeChannels.create({
    data: {
      ...channels,
      application_id: app_id,
    },
  });

  return response.status(201).json({
    message: 'Active channels created successfully',
    data: {
      id: newChannels.id,
    },
  });
});

export { channelsRoutes };
