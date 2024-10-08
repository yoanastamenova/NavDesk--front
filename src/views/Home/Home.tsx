import React from 'react';
import { Box, Typography, Button, Container, Divider } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import entrada from '/entrada.png'; 
import ramp from '/ramp.png';      
import './Home.css';
import Test from '../../components/Testimonials/Test';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <img src={entrada} alt="Entrance" className="darker-image" style={{ width: '100%', height: 'auto' }} />
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant='h2'>
          THE NAVES
        </Typography>
        <Typography variant="h5" paragraph>
          We are the social and urban innovation center of the city of València. A public entity that
          depends on the Delegation of Innovation and Knowledge Management of Valencia City Council and
          promotes urban and social innovation by putting people at the center of our actions.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          We want to bring innovation to the citizens. For this reason, we open the doors of Las Naves
          to different audiences and groups. Below you will find information about all the rooms and
          available spaces as well as the usage requirements.
        </Typography>
        <img src={ramp} alt="Additional Entrance View" style={{ width: '100%', height: 'auto' }} />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/rooms')}>Rooms</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/pricing')}>Pricing</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/register')}>Register</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.4700704600173!2d-0.340853988624151!3d39.45870801327175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048f63da49ce1%3A0x37b1bcba9ad9547a!2sLes%20Naus%20%7C%20Centre%20d&#39;innovaci%C3%B3%20social%20i%20urbana!5e0!3m2!1sen!2ses!4v1728407791855!5m2!1sen!2ses"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" paragraph sx={{ mt: 2 }}>
          Full address
        </Typography>
        <Typography paragraph>
          Calle de Joan Verdeguer, 16, Poblats Marítims 
          46024 València, Valencia
        </Typography>
        <Typography paragraph>
          Phone: 963 91 04 77
        </Typography>
        <Typography paragraph>
          Open Hours: <br />
          Tuesday to Friday: 8 AM – 8:30 PM <br />
          Saturday (National Day of Spain): Closed <br />
          Sunday: Closed <br />
          Monday: 8 AM – 8:30 PM
        </Typography>
        
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Opinions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Test/>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, mb: 2, color: "white" }}>
          © {new Date().getFullYear()} Developed by Yoana Stamenova
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Container>
    </>
  );
};

export default Home;