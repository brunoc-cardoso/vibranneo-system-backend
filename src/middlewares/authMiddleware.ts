import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

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
    return response.status(401).json({
      error: 'Token is not valid',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    console.log('[authConfig.secret]: ', authConfig.secret);
    const data = jwt.verify(token, authConfig.secret);

    const { id } = data as TokenPayload;
    request.id = id;

    console.log('[id]: ', id);

    return next();
  } catch {
    return response.status(401).json({
      error: 'Token is not valid',
    });
  }
}
