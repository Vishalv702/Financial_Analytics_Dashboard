import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin ? '/auth/login' : '/auth/register';

      const res = await axiosInstance.post(url, formData); 

      if (isLogin) {
        navigate('/dashboard');
      } else {
        alert('Registered successfully! Now login.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }

  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(_, val: number) => setIsLogin(val === 0)}
          sx={{ mb: 2 }}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />
          )}
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
