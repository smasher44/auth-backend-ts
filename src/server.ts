import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import authRoutes from './routes/auth-routes';
import testRoutes from './routes/test-routes';
import { errorHandler } from './middleware/error-middleware';

const app = express();

//middleware configuration
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route configuration
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use(errorHandler);

//server configuration
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
