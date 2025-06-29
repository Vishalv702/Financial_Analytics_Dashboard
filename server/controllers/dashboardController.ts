import Transaction from '../models/Transaction';
import { Request, Response, NextFunction } from 'express';
export const getMonthlyStats = async (req:Request, res:Response,next: NextFunction) => {
  try {
    const allTransactions = await Transaction.find({ status: 'Paid' });

    // Group by month
    const monthlyData = Array(12).fill(null).map((_, i) => ({
      month: i, // 0 to 11
      income: 0,
      expenses: 0,
    }));

    allTransactions.forEach(tx => {
      const month = new Date(tx.date).getMonth();
      if (tx.category === 'Revenue') {
        monthlyData[month].income += tx.amount;
      } else {
        monthlyData[month].expenses += tx.amount;
      }
    });

    res.locals.monthlyData=monthlyData;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching monthly stats' });
  }
};
