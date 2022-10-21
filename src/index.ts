import 'module-alias/register';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes/index.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
