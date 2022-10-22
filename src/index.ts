import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppError } from './errors/AppError';
import { routes } from './routes/index.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        error: error.message,
      });
    }

    return response.status(500).json({
      error: `Internal Server Error - ${error.message}`,
    });
  },
);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
