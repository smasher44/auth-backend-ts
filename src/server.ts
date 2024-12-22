// File: src/server.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import authRoutes from './routes/auth-routes';
import { errorHandler } from './middleware/error-middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
