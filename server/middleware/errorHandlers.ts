import { Request, Response, NextFunction } from 'express';

export const handleErrors = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

export const handleNotFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
};