import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  amount: number;
  category: 'Revenue' | 'Expense';
  status: 'Paid' | 'Pending';
  user_id: string;
  user_profile: string;
}

const TransactionSchema: Schema = new Schema<ITransaction>({
  date: { type: Date, required: true, index:true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['Revenue', 'Expense'], required: true },
  status: { type: String, enum: ['Paid', 'Pending'], required: true },
  user_id: { type: String, required: true },
  user_profile: { type: String, required: true },
});

TransactionSchema.index({ status: 1, category: 1, user_id: 1, date: -1 });
const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
