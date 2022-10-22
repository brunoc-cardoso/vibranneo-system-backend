import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import authMiddleware from '../middlewares/authMiddleware';
import { AppError } from '../errors/AppError';

const userRoutes = Router();

userRoutes.get(
  '/:id',
  authMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    response.status(200).json({
      user,
    });
  },
);

userRoutes.post('/create', async (request: Request, response: Response) => {
  const { user } = request.body;

  const isAlreadyExist = await prisma.users.findFirst({
    where: {
      OR: [
        {
          name: user.name,
        },
        {
          email: user.email,
        },
      ],
    },
  });

  if (isAlreadyExist) {
    throw new AppError('User already exists');
  }

  user.password = bcrypt.hashSync(user.password, 8);

  const newUser = await prisma.users.create({
    data: {
      ...user,
    },
  });

  return response.status(201).json({
    message: 'user created successfully',
    data: {
      id: newUser.id,
    },
  });
});

export { userRoutes };
