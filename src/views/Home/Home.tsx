import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import entrada from '/entrada.png';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <img src={entrada} alt="Entrance" className="darker-image" style={{ width: '100%', height: 'auto' }} />
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" paragraph>
          We are the social and urban innovation center of the city of València. A public entity that depends on the 
          Delegation of Innovation and Knowledge Management of Valencia City Council and promotes urban and social innovation 
          by centering people in our actions.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          We want to bring innovation to the citizens. For this reason, we open the doors of Las Naves 
          to different audiences and groups. Below you will find information about all the rooms and 
          available spaces as well as the usage requirements.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/rooms')}>Rooms</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/pricing')}>Pricing</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/register')}>Register</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;