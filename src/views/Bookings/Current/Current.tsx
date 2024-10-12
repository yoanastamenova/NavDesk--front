import { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserBookings, updateBooking, deleteBooking } from '../../../services/apiCalls';
import { Navbar } from '../../../components/Navbar/Navbar';
import "./Current.css"

type Booking = {
  id: string;
  room_id: string;
  entry_datetime: string;
  exit_datetime: string;
  state: string;
};

const Current = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<string | null>(null);

  // Function to fetch bookings
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

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDialog = () => {
    setSelectedBooking(null);
  };

  const handleUpdateBooking = async () => {
    if (selectedBooking) {
      const token = JSON.parse(localStorage.getItem('passport') || '{}')?.token;
      if (token) {
        try {
          await updateBooking(selectedBooking.id, selectedBooking.entry_datetime, selectedBooking.exit_datetime, token);
          alert('Booking updated successfully.');
          handleCloseDialog();
          fetchBookings(); // Call fetchBookings to refresh the list
        } catch (error) {
          console.error('Error updating booking:', error);
          alert('Failed to update booking.');
        }
      }
    }
  };

  const handleDeleteClick = async (bookingId: string) => {
    const token = JSON.parse(localStorage.getItem('passport') || '{}')?.token;
    if (token) {
      try {
        await deleteBooking(bookingId, token);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        alert('Booking deleted successfully.');
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking.');
      }
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toISOString().slice(0, 16);
  };
  
  return (
    <>
      <div className='backgroundCUR'>
        <Navbar />
        <Container component="main" maxWidth="md" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5 }}>
          <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
            Your Current Bookings
          </Typography>
          
          {bookings.length > 0 ? bookings.map((booking) => (
            <Paper key={booking.id} elevation={6} sx={{ my: 2, p: 3, width: '100%' }}>
              <Typography variant="body1">Room ID: {booking.room_id}</Typography>
              <Typography variant="body1">Entry Date: {new Date(booking.entry_datetime).toLocaleString()}</Typography>
              <Typography variant="body1">Exit Date: {new Date(booking.exit_datetime).toLocaleString()}</Typography>
              <Typography variant="body1">Status: {booking.state}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => handleEditClick(booking)} sx={{ mr: 2 }}>
                  Edit Booking
                </Button>
                <Button variant="contained" color="error" onClick={() => setOpenDeleteConfirm(booking.id)}>
                  Delete Booking
                </Button>
              </Box>
            </Paper>
          )) : (
            <Typography variant="body2" sx={{ mt: 3 }}>
              You don't have any current bookings.
            </Typography>
          )}

          <Button type="button" variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/bookings/new')}>
            Make a New Reservation
          </Button>
        </Container>
      </div>

      {/* Dialog for Editing Reservation Dates */}
      <Dialog open={Boolean(selectedBooking)} onClose={handleCloseDialog}>
        <DialogTitle>Update Your Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the entry or exit times for your booking:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="entry_datetime"
            label="New Entry Date and Time"
            type="datetime-local"
            fullWidth
            variant="standard"
            defaultValue={selectedBooking ? formatDateTime(selectedBooking.entry_datetime) : ""}
            onChange={(e) => setSelectedBooking({ ...selectedBooking, entry_datetime: e.target.value } as Booking)}
          />
          <TextField
            margin="dense"
            id="exit_datetime"
            label="New Exit Date and Time"
            type="datetime-local"
            fullWidth
            variant="standard"
            defaultValue={selectedBooking ? formatDateTime(selectedBooking.exit_datetime) : ""}
            onChange={(e) => setSelectedBooking({ ...selectedBooking, exit_datetime: e.target.value } as Booking)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateBooking}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={Boolean(openDeleteConfirm)}
        onClose={() => setOpenDeleteConfirm(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this booking?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={() => {
            handleDeleteClick(openDeleteConfirm as string);
            setOpenDeleteConfirm(null);
          }} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Current;