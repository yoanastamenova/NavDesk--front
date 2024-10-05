import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { loginUser } from '../../services/apiCalls';
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async () => {
    try {
      const response = await loginUser(credentials);
      if (response.success) {
        navigate('/bookings/new');
        console.log('Login Successful'); 
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className='background'>
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
      }}>
        <Paper elevation={12} sx={{ my: 4, p: 3, width: '100%', maxWidth: 400 }}>
          <Typography component="h1" variant="h5" textAlign="center">
            Login
          </Typography>

          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
              >
              Login
            </Button>
            <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
                Go to Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      </div>
  </>
  );
};

export default Login;