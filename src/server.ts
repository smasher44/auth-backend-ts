import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import authRoutes from './routes/auth-routes';
import testRoutes from './routes/test-routes';
import userRoutes from './routes/user-routes';
import { errorHandler } from './middleware/error-middleware';

import Database from './config/db';


const app = express();

// Initialize database
const db = Database.getInstance();

// Test database connection on startup
async function initializeServer() {
  try {
    await db.testConnection();

    //server configuration
    // server should only call app.listen inside the initializeServer function, 
    // ensuring it starts after the database connection is successfully tested.
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

initializeServer();

//middleware configuration
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route configuration
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler);

//server configuration
// app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });
