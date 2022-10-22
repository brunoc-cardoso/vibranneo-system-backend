import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../errors/AppError';

const authRoutes = Router();

authRoutes.post('/login', async (request: Request, response: Response) => {
  const { login, password } = request.body;

  const user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          name: login,
        },
        {
          email: login,
        },
      ],
    },
  });

  if (!user) {
    throw new AppError('Login and/or password is incorrect', 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AppError('Login and/or password is incorrect', 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '15d',
    },
  );

  return response.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export { authRoutes };
