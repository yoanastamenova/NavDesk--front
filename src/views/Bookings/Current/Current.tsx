import { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserBookings } from '../../../services/apiCalls';
import { Navbar } from '../../../components/Navbar/Navbar';
import "./Current.css"

type Booking = {
  id: string;
  room_id: string;
  entry_datetime: string;
  exit_datetime: string;
  state: string;
};

const CurrentBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const passport = JSON.parse(localStorage.getItem('passport') || '{}');
      const token = passport?.token;

      if (typeof token === 'string') {
        try {
          const bookingsResponse = await getUserBookings(token);
          if (bookingsResponse.success) {
            setBookings(bookingsResponse.data);
          } else {
            alert(bookingsResponse.message);
          }
        } catch (error) {
          console.error('Error retrieving bookings:', error);
        }
      } else {
        console.log('No token found, redirecting to login');
        navigate('/login');
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <>
      <div className='backgroundCUR'>
        <Navbar />
        <Container component="main" maxWidth="md" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        }}>
          <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
            Your Current Bookings
          </Typography>

          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <Paper key={index} elevation={5} sx={{ my: 2, p: 2, width: '100%' }}>
                <Typography variant="body1">Room ID: {booking.room_id}</Typography>
                <Typography variant="body1">Entry Date: {new Date(booking.entry_datetime).toLocaleString()}</Typography>
                <Typography variant="body1">Exit Date: {new Date(booking.exit_datetime).toLocaleString()}</Typography>
                <Typography variant="body1">Status: {booking.state}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={() => navigate(`/bookings/edit/${booking.id}`)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => navigate(`/bookings/delete/${booking.id}`)}>
                    Delete
                  </Button>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 3 }}>
              You don't have any current bookings.
            </Typography>
          )}

          <Button
            type="button"
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => navigate('/bookings/new')}
            >
            Make a New Reservation
          </Button>
        </Container>
      </div>
    </>
  );
};

export default CurrentBookings;