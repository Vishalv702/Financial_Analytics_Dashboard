import mongoose from 'mongoose';
import Transaction from '../models/Transaction';
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_event_planner';

    await mongoose.connect(MONGODB_URI);

    console.log('📦 Connected to MongoDB');
    const count = await Transaction.countDocuments();
    if (count === 0) {  
      console.log('🌱 Seeding mock transaction data...');
      const mockData = [ { "date": "2024-01-15T08:34:12Z", "amount": 1500.00, "category": "Revenue", "status": "Paid", "user_id": "user_001" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-02-21T11:14:38Z", "amount": 1200.50, "category": "Expense", "status": "Paid", "user_id": "user_002" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-03-03T18:22:04Z", "amount": 300.75, "category": "Revenue", "status": "Pending", "user_id": "user_003" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-04-10T05:03:11Z", "amount": 5000.00, "category": "Expense", "status": "Paid", "user_id": "user_004" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-05-20T12:01:45Z", "amount": 800.00, "category": "Revenue", "status": "Pending", "user_id": "user_001" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-06-12T03:13:09Z", "amount": 2200.25, "category": "Expense", "status": "Paid", "user_id": "user_002" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-07-14T09:45:33Z", "amount": 900.00, "category": "Revenue", "status": "Pending", "user_id": "user_003" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-08-05T17:30:23Z", "amount": 150.00, "category": "Expense", "status": "Paid", "user_id": "user_004" ,"user_profile":"https://thispersondoesnotexist.com/"},
    { "date": "2024-09-10T02:10:59Z", "amount": 650.00, "category": "Revenue", "status": "Paid", "user_id": "user_001" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-10-30T14:55:12Z", "amount": 1200.00, "category": "Expense", "status": "Pending", "user_id": "user_002" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-11-25T10:02:25Z", "amount": 1500.75, "category": "Revenue", "status": "Paid", "user_id": "user_003" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-12-05T16:48:18Z", "amount": 800.00, "category": "Expense", "status": "Paid", "user_id": "user_004" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-01-11T13:12:07Z", "amount": 700.00, "category": "Revenue", "status": "Pending", "user_id": "user_001" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-02-17T04:35:01Z", "amount": 200.00, "category": "Expense", "status": "Paid", "user_id": "user_002" ,"user_profile":"https://thispersondoesnotexist.com/"},
    {  "date": "2024-03-25T20:15:40Z", "amount": 2500.00, "category": "Revenue", "status": "Paid", "user_id": "user_003" ,"user_profile":"https://thispersondoesnotexist.com/"}]
    await Transaction.insertMany(mockData);
      console.log('✅ Mock data inserted!');
    } else {
      console.log('ℹ️ Mock data already exists. Skipping seed.');
    }
} catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
