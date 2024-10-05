import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiCalls';
import "./Register.css"

export const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async () => {
    try {
      const response = await registerUser(credentials); 
      if (response.success) {
        navigate('/login');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
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
        <Paper elevation={10} sx={{ my: 4, p: 3, width: '100%', maxWidth: 400 }}>
          <Typography component="h1" variant="h5" align="center">
            Register
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
              onClick={register}
            >
              Register
            </Button>
            <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link href="#" underline="hover" onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
                Go to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      </div>
    </>
  );
};