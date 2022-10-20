import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
