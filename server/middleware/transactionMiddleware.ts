import { Router } from 'express';
import Transaction from '../models/Transaction';
import { Request, Response, NextFunction } from 'express';
export const transactionsMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      category,
      status,
      user_id,
      from,
      to,
      search,
      sortBy = 'date',
      order = 'desc',
      page = '1',
      limit = '10',
    } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (user_id) query.user_id = user_id;

    if (search) {
      query.$or = [
        { user_id: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
      ];
    }

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from as string);
      if (to) query.date.$lte = new Date(to as string);
    }

    const sort: any = { [sortBy as string]: order === 'asc' ? 1 : -1 };

    const total = await Transaction.countDocuments(query);
    const data = await Transaction.find(query)
      .sort(sort)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json({ total, data });
  } catch (err) {
    console.error('Transaction Fetch Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

