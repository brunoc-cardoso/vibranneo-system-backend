import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { authConfig } from '../config/auth';

const authRouter = Router();

authRouter.post('/login', async (request: Request, response: Response) => {
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
    return response.status(401).json({
      error: 'Login and/or password is incorrect',
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return response.status(401).json({
      error: 'Login and/or password is incorrect',
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    authConfig.secret,
    {
      expiresIn: '15d',
    },
  );

  response.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export { authRouter };
