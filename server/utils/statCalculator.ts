import Transaction from '../models/Transaction';

export const calculateStats = async () => {
  const result = await Transaction.aggregate([
    { $match: { status: 'Paid' } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
      },
    },
  ]);

  let revenue = 0;
  let expenses = 0;

  result.forEach((item) => {
    if (item._id === 'Revenue') revenue = item.total;
    if (item._id === 'Expense') expenses = item.total;
  });

  let grossBalance = revenue - expenses;
const savings = Math.round(Math.max(grossBalance * 0.1, 0) * 100) / 100;
  const balance = grossBalance - savings; 

  return { balance, revenue, expenses, savings };
};
