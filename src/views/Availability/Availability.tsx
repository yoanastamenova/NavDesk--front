import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { getRoomStatus } from '../../services/apiCalls';
import "./Availability.css"

// Define the Room and RoomDetails interfaces
interface Room {
    room_name: string;
    room_type: string;
    capacity: number;
}

interface RoomDetails {
    room: Room;
    users: { user_id: string; username: string; check_in_time: string }[];
}

const Availability = () => {
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    const [loading, setLoading] = useState(false);

    const rooms = [
        { id: '1', name: "Madrid" },
        { id: '2', name: "Barcelona" },
        { id: '3', name: "Valencia" },
        { id: '4', name: "Malaga" },
        { id: '5', name: "Sevilla" },
    ];

    const handleChange = (event: SelectChangeEvent<string>) => {
      setSelectedRoomId(event.target.value);
    };

    async function handleCheckRoomStatus() {
        if (!selectedRoomId) {
            alert("Please select a room first!");
            return;
        }

        setLoading(true);
        const response = await getRoomStatus(selectedRoomId);
        if (response) {
          setRoomDetails(response);
        } else {
          // Handle error or unsuccessful fetching here
          alert("Failed to fetch room details.");
        }
        setLoading(false);
    }

    return (
        <>
        <div className='backgroundAVB'>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <Paper elevation={6} sx={{ my: 4, p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 4 }} align="center">
                        Check Room Availability
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="room-select-label">Room</InputLabel>
                        <Select
                            labelId="room-select-label"
                            id="room_id"
                            name="room_id"
                            value={selectedRoomId}
                            label="Room"
                            onChange={handleChange}
                        >
                            {rooms.map(room => (
                                <MenuItem key={room.id} value={room.id}>
                                    {room.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleCheckRoomStatus}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Check"}
                    </Button>
                    {roomDetails && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                            <Typography variant="h6">Room Name: {roomDetails.room.room_name}</Typography>
                            <Typography>Room Type: {roomDetails.room.room_type}</Typography>
                            <Typography>Capacity: {roomDetails.room.capacity}</Typography>
                            <Typography variant="h6">Current Occupants:</Typography>
                            {roomDetails.users.length > 0 ? roomDetails.users.map(user => (
                                <Typography key={user.user_id}>
                                    {user.username} (Checked-in at {new Date(user.check_in_time).toLocaleTimeString()})
                                </Typography>
                            )) : (
                                <Typography>No current occupants.</Typography>
                            )}
                        </Box>
                    )}
                </Paper>
            </Container>
            </div>
        </>
    );
};

export default Availability;