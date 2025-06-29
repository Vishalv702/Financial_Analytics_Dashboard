// src/middleware/recentTransactionsMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/Transaction';

export const recentTransactionsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recent = await Transaction.find({ status: 'Paid' })
      .sort({ date: -1 })
      .limit(4)
      .select('user_id user_profile category amount'); // return only needed fields

    res.locals.recentTransactions = recent;
    next();
  } catch (err) {
    console.error('Recent Transactions Middleware Error:', err);
    res.status(500).json({ message: 'Failed to fetch recent transactions' });
  }
};
