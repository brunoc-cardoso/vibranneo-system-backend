import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthy', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Server is running',
  });
});

// app.use(routes)

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
