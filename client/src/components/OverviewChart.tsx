import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import axiosInstance from '../utils/axios'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const OverviewChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
  const fetchData = async () => {
    const res = await axiosInstance.get('/dashboard/monthly-stats');
    const data = res.data;

    const incomeData = Array(12).fill(0);
    const expenseData = Array(12).fill(0);

    data.forEach((item: any) => {
      incomeData[item.month] = item.income;
      expenseData[item.month] = item.expenses;
    });

    setChartData({
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: '#00e676',
          backgroundColor: '#00e67633',
          tension: 0.4,
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: '#ff9100',
          backgroundColor: '#ff910033',
          tension: 0.4,
        },
      ],
    });
  };

  fetchData();
}, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Monthly Income vs Expenses',
              color: '#fff',
              font: {
                size: 18,
              },
            },
          },
          scales: {
            x: {
              ticks: { color: '#ccc' },
              grid: { color: '#333' },
            },
            y: {
              ticks: { color: '#ccc' },
              grid: { color: '#333' },
            },
          },
        }}
      />
    </div>
  );
};

export default OverviewChart;
