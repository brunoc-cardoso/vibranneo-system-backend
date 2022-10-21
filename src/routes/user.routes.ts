import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';

const userRoute = Router();

userRoute.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    response.status(400).json({
      error: 'User not found',
    });
  }

  response.status(200).json({
    message: 'user created successfully',
    data: {
      user,
    },
  });
});

userRoute.post('/create', async (request: Request, response: Response) => {
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
    response.status(400).json({
      error: 'User already exists',
    });
  }

  user.password = bcrypt.hashSync(user.password, 8);

  const newUser = await prisma.users.create({
    data: {
      ...user,
    },
  });

  response.status(201).json({
    message: 'user created successfully',
    data: {
      id: newUser.id,
    },
  });
});

export { userRoute };
