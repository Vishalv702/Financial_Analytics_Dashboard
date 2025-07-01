import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database';
import routes from './routes/index';
import { handleErrors, handleNotFound } from './middleware/errorHandlers';
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const app: Application = express();

// middlewares
app.use(cookieParser());

// setup CORS
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api', routes);
app.get('/', (_req: Request, res: Response): void => {res.send('API Running 🚀');});

app.use(handleNotFound);
app.use(handleErrors);

// start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, (): void => {
      console.log(`🌤️  Financial Dashboard App running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

// graceful shutdown
process.on('SIGINT', async (): Promise<void> => {
  console.log('\n🔄 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('📦 MongoDB connection closed');
  process.exit(0);
});
