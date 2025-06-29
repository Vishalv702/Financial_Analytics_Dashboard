import { Request, Response, NextFunction } from 'express';
import { calculateStats } from '../utils/statCalculator';

export const statMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await calculateStats();
    res.locals.stats = stats; // pass data to next handler
    next();
  } catch (err) {
    console.error('Stat Middleware Error:', err);
    res.status(500).json({ message: 'Failed to calculate stats' });
  }
};
