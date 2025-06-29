import { Router } from 'express';
import { statMiddleware } from '../middleware/statMiddleware';
import { getMonthlyStats } from '../controllers/dashboardController';
import { recentTransactionsMiddleware } from '../middleware/recentTransactionMiddleware';
import { transactionsMiddleware } from '../middleware/transactionMiddleware';
import {  Response } from 'express';
const router = Router();

router.get('/stats', statMiddleware, (req, res:Response) => {
  res.json(res.locals.stats); 
});

router.get('/monthly-stats', getMonthlyStats,(req, res) => {
  res.json(res.locals.monthlyData)});

router.get('/recent-transactions', recentTransactionsMiddleware, (req, res) => {
  res.json(res.locals.recentTransactions);
});

router.get('/transactions', transactionsMiddleware, (req, res) => {
  res.json(res.locals.transactions); 
});

export default router;
