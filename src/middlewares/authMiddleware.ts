import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
};

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Token is not valid', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);

    const { id } = data as TokenPayload;
    request.userId = id;

    return next();
  } catch {
    throw new AppError('Token is not valid', 401);
  }
}
