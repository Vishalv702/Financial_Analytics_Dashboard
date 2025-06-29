import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import {
    Box,
    Typography,
    Stack,
    Avatar,
    TextField,
    Paper,
    Chip,
    IconButton,
    CircularProgress,
    Select,
    MenuItem,
    Pagination
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';
import DownloadCSVButton from './DownloadCSVButton';

interface Transaction {
    _id: string;
    user_id: number;
    amount: number;
    status: string;
    date: string;
    user_profile: string;
    category?: string;
}

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [search, setSearch] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortBy] = useState('date');
    const [order] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (fromDate) params.append('from', fromDate);
            if (toDate) params.append('to', toDate);
            if (statusFilter) params.append('status', statusFilter);
            if (categoryFilter) params.append('category', categoryFilter);
            params.append('sortBy', sortBy);
            params.append('order', order);
            params.append('page', String(page));
            params.append('limit', String(limit));

            const res = await axios.get(`/dashboard/transactions?${params.toString()}`);
            if (Array.isArray(res.data.data)) {
                setTransactions(res.data.data);
                setTotalPages(Math.ceil(res.data.total / limit));
            } else {
                console.error('Unexpected response format:', res.data);
            }
        } catch (err) {
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTransactions();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [search, fromDate, toDate, page, statusFilter, categoryFilter]);

    return (
        <Box p={3} sx={{ backgroundColor: '#0f111a', minHeight: '100vh' }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>Transactions</Typography>

<Paper sx={{ backgroundColor: '#1c1e27', borderRadius: 3, p: 2, mb: 3 }}>
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={2}
    alignItems="center"
    flexWrap={{ xs: 'wrap', md: 'nowrap' }} // Wrap on small screens, not on medium and up
  >
    {/* Search Input */}
    <TextField
      placeholder="Search for anything...."
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{
        input: { color: 'white' },
        width: { xs: '100%', md: 200 },
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          backgroundColor: '#2a2d3e',
          '& fieldset': { borderColor: 'transparent' },
          '&:hover fieldset': { borderColor: '#444' },
        },
      }}
    />

    {/* Status Filter */}
    <Select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      displayEmpty
      sx={{
        color: 'white',
        width: { xs: '100%', md: 150 },
        backgroundColor: '#2a2d3e',
        borderRadius: '12px',
        '& .MuiSelect-icon': { color: 'white' },
      }}
    >
      <MenuItem value="">All Status</MenuItem>
      <MenuItem value="Paid">Completed</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
    </Select>

    {/* Category Filter */}
    <Select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      displayEmpty
      sx={{
        color: 'white',
        width: { xs: '100%', md: 150 },
        backgroundColor: '#2a2d3e',
        borderRadius: '12px',
        '& .MuiSelect-icon': { color: 'white' },
      }}
    >
      <MenuItem value="">All Categories</MenuItem>
      <MenuItem value="Revenue">Revenue</MenuItem>
      <MenuItem value="Expense">Expense</MenuItem>
    </Select>

    {/* Date Pickers and Download */}
    <Box display="flex" alignItems="center" gap={2} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
      <TextField
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        sx={{
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#2a2d3e',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: '#444' },
          },
        }}
      />
      <TextField
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        sx={{
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#2a2d3e',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: '#444' },
          },
        }}
      />
      <IconButton>
        <CalendarMonthIcon sx={{ color: 'white' }} />
      </IconButton>
      <DownloadCSVButton
        filters={{
          search,
          fromDate,
          toDate,
          statusFilter,
          categoryFilter
        }}
      />
    </Box>
  </Stack>
</Paper>




            <Paper sx={{ backgroundColor: '#1c1e27', borderRadius: 3 }}>
                <Box display="grid" gridTemplateColumns="1.5fr 1.5fr 1fr 1fr" p={2} sx={{ color: '#888', fontWeight: 600, fontSize: '14px' }}>
                    <Typography>User</Typography>
                    <Typography>Date</Typography>
                    <Typography>Amount</Typography>
                    <Typography>Status</Typography>
                </Box>

                {loading ? (
                    <Box p={4} display="flex" justifyContent="center">
                        <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                ) : (
                    transactions.map((tx) => (
                        <Box
                            key={tx._id}
                            display="grid"
                            gridTemplateColumns="1.5fr 1.5fr 1fr 1fr"
                            alignItems="center"
                            p={2}
                            borderTop="1px solid #2f313e"
                            sx={{ color: 'white', backgroundColor: '#1c1e27' }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar src={tx.user_profile} alt={tx.user_profile} sx={{ width: 32, height: 32 }} />
                                <Typography variant="body2">{tx.user_id || 'Unknown'}</Typography>
                            </Stack>
                            <Typography variant="body2">
                                {tx.date ? format(new Date(tx.date), 'EEE, dd MMM yyyy') : 'Invalid Date'}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: tx.category === 'Expense' ? '#FFA726' : '#4CAF50',
                                    fontWeight: 600,
                                }}
                            >
                                {tx.amount < 0 ? `-₹${Math.abs(tx.amount).toFixed(2)}` : `₹${tx.amount.toFixed(2)}`}
                            </Typography>
                            <Chip
                                label={tx.status}
                                sx={{
                                    bgcolor: tx.status.toLowerCase() === 'paid' ? '#388e3c' : '#f9a825',
                                    color: 'white',
                                    px: 0.5,
                                    py: 0.5,
                                    fontWeight: 600,
                                    fontSize: '12px',
                                    borderRadius: '8px',
                                }}
                            />
                        </Box>
                    ))
                )}

                <Box display="flex" justifyContent="center" py={3}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        sx={{
                            '.MuiPaginationItem-root': {
                                color: 'white',
                                borderColor: '#444',
                            },
                            '.Mui-selected': {
                                backgroundColor: '#2a2d3e',
                            },
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default TransactionsPage;
