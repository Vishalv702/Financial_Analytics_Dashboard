// DownloadCSVButton.tsx
import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, FormGroup,
  FormControlLabel, Checkbox, DialogActions
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from '../utils/axios';

interface Transaction {
  _id: string;
  user_id: number;
  amount: number;
  status: string;
  date: string;
  user_profile: string;
  category?: string;
}

interface Props {
  filters: {
    search: string;
    fromDate: string;
    toDate: string;
    statusFilter: string;
    categoryFilter: string;
  };
}

const allFields = {
  user_id: 'User ID',
  date: 'Date',
  amount: 'Amount',
  status: 'Status',
  category: 'Category',
};

const DownloadCSVButton: React.FC<Props> = ({ filters }) => {
  const [open, setOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>(Object.keys(allFields));

  const handleToggle = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleDownload = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.fromDate) params.append('from', filters.fromDate);
      if (filters.toDate) params.append('to', filters.toDate);
      if (filters.statusFilter) params.append('status', filters.statusFilter);
      if (filters.categoryFilter) params.append('category', filters.categoryFilter);
      params.append('sortBy', 'date');
      params.append('order', 'desc');
      params.append('limit', '10000'); // a large number to fetch all
      params.append('page', '1');

      const res = await axios.get(`/dashboard/transactions?${params.toString()}`);
      const data: Transaction[] = res.data.data;

      const csvRows = [];

      // Header
      csvRows.push(selectedFields.map((key) => allFields[key as keyof typeof allFields]).join(','));

      // Rows
      data.forEach((tx) => {
        const row = selectedFields.map((key) => {
          if (key === 'date') return new Date(tx.date).toLocaleDateString();
          return `"${(tx as any)[key] ?? ''}"`;
        });
        csvRows.push(row.join(','));
      });

      // Blob and download
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setOpen(false);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<FileDownloadIcon />}
        sx={{ backgroundColor: '#4CAF50', borderRadius: '12px', color: 'white' }}
      >
        Download
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Columns to Export</DialogTitle>
        <DialogContent>
          <FormGroup>
            {Object.entries(allFields).map(([key, label]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={selectedFields.includes(key)}
                    onChange={() => handleToggle(key)}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDownload} variant="contained">Export</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DownloadCSVButton;
