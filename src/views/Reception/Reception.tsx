import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { checkIn, checkOut, getUserBookings } from '../../services/apiCalls';
import "./Receptions.css"

interface Booking {
  id: string;
  room_name: string;
  entry_datetime: string;
  exit_datetime: string;
}

export const Reception = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const passport = JSON.parse(localStorage.getItem('passport') || '{}');
      const token = passport?.token;

      if (token) {
        const response = await getUserBookings(token);
        if (response.success) {
          setBookings(response.data);
        } else {
          alert('Failed to fetch bookings: ' + response.message);
        }
      } else {
        console.error('Token not found');
      }
    };

    fetchBookings();
  }, []);

  const handleCheckIn = async () => {
    if (!selectedBookingId) {
      alert('Please select a booking first.');
      return;
    }
    const passport = JSON.parse(localStorage.getItem('passport') || '{}');
    const token = passport?.token;
    if (token) {
      const result = await checkIn(selectedBookingId, token);
      if (result.success) {
        console.log('Checked in successfully: ', result);
        alert('Checked in successfully.');
      } else {
        alert('Failed to check in: ' + result.message);
      }
    } else {
      console.error('Authentication token not available.');
    }
  };

  const handleCheckOut = async () => {
    if (!selectedBookingId) {
      alert('Please select a booking first.');
      return;
    }
    const passport = JSON.parse(localStorage.getItem('passport') || '{}');
    const token = passport?.token;
    if (token) {
      const result = await checkOut(selectedBookingId, token);
      if (result.success) {
        console.log('Checked out successfully: ', result);
        alert('Checked out successfully.');
      } else {
        alert('Failed to check out: ' + result.message);
      }
    } else {
      console.error('Authentication token not available.');
    }
  };

  return (
    <>
    <div className='backgroundREC'>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mt: 30, mb: 2, textAlign: 'center' }}>Check-in/Check-out at your bookings with one click</Typography>
        {bookings.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="booking-select-label">Select Booking</InputLabel>
            <Select
              labelId="booking-select-label"
              value={selectedBookingId}
              label="Select Booking"
              onChange={e => setSelectedBookingId(e.target.value)}
              sx={{ backgroundColor: '#f4f4f4' }}  // Change color as needed
            >
              {bookings.map((booking) => (
                <MenuItem key={booking.id} value={booking.id}>
                  {booking.room_name} ({new Date(booking.entry_datetime).toLocaleString()} - {new Date(booking.exit_datetime).toLocaleString()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {bookings.length === 0 && <Typography sx={{ mt: 2 }}>No bookings found.</Typography>}

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleCheckIn}
          disabled={!selectedBookingId}
          sx={{ mr: 1, mt: 1 }}
        >
          Check In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCheckOut}
          disabled={!selectedBookingId}
          sx={{ mt: 1 }}
        >
          Check Out
        </Button>
      </Container>
          </div>
    </>
  );
};