import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import "./Register.css"
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import "./Register.css"
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/apiCalls'

export const Register = () => {
  const navigate = useNavigate();    
  const [credentials, setCredentials] = useState({        
    email: "",
    password: "",
  });

  const handleChange = (e:any) => {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async () => {
    try {
      const response = await registerUser(credentials); 
      if(response.success){
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
    }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
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
        </Box>
      </Paper>
    </Container>
              </div>
     </>
  );
}