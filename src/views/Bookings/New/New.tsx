import React, { useState } from 'react';
import { Navbar } from '../../../components/Navbar/Navbar';
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createBooking } from '../../../services/apiCalls';
import "./New.css"

export const New = () => {
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState({
    room_id: "",
    entry_datetime: "",
    exit_datetime: ""
  });

  const passportString = localStorage.getItem("passport");
  const passport = passportString ? JSON.parse(passportString) : null;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const rooms = [
    { id: 1, name: "Madrid" },
    { id: 2, name: "Barcelona" },
    { id: 3, name: "Valencia" },
    { id: 4, name: "Malaga" },
    { id: 5, name: "Sevilla" },
  ];

  const handleDateTimeChange = (e:any) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSendBooking = async () => {
    try {
      const payload = {
        ...bookingDetails,
        user_id: passport.id
      };
      const result = await createBooking(payload, passport.token);
      if (result.success) {
        console.log("Booking Created", result);
        navigate('/bookings');
      }
    } catch (error) {
      console.error("Creating Booking Failed", error);
    }
  };

  const todayFullTimeString = new Date()
    .toISOString()
    .slice(0, new Date().toISOString().lastIndexOf(":"));

  return (
    <>
    <div className='backgroundSea'>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Paper elevation={6} sx={{ my: 4, p: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 4 }} align="center">
            Create New Booking
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="room-label">Room</InputLabel>
              <Select
                labelId="room-label"
                id="room_id"
                name="room_id"
                value={bookingDetails.room_id}
                label="Room"
                onChange={handleChange}
                >
                {rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="entry_datetime"
              label="Entry Time"
              name="entry_datetime"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={bookingDetails.entry_datetime}
              onChange={handleDateTimeChange}
              inputProps={{ min: todayFullTimeString }}
              />

            <TextField
              margin="normal"
              required
              fullWidth
              id="exit_datetime"
              label="Exit Time"
              name="exit_datetime"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={bookingDetails.exit_datetime}
              onChange={handleDateTimeChange}
              inputProps={{ min: bookingDetails.entry_datetime }}
              />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSendBooking}
              >
              Create Booking
            </Button>
          </Box>
        </Paper>
        <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
              Not sure which room to choose? Go check our room info here {' '}
              <Button onClick={() => navigate('/rooms')} sx={{ cursor: 'pointer' }}>
                Rooms
              </Button>
            </Typography>
      </Container>
      </div>
    </>
  );
};

export default New;