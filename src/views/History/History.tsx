import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getHistories, getRoomHistory } from "../../services/apiCalls";
import { Navbar } from "../../components/Navbar/Navbar";

const History = () => {
  const navigate = useNavigate();
  const [historyType, setHistoryType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const passport = JSON.parse(localStorage.getItem("passport") || "{}");
    if (!passport.token) navigate("/login");
  }, [navigate]);

  const handleHistoryTypeChange = (event: any) => {
    setHistoryType(event.target.value);
    setHistoryData([]);
  };

  const fetchHistory = async () => {
    const passport = JSON.parse(localStorage.getItem('passport') || '{}');
    try {
        if (historyType === 'period') {
            if (!startDate || !endDate) {
                alert('Please fill both start and end dates.');
                return;
            }
            const startDateTime = new Date(startDate);
            const endDateTime = new Date(endDate);
            const response = await getHistories(startDateTime, endDateTime, passport.token);
            setHistoryData(response.data);
        } else if (historyType === 'room') {
            if (!roomId) {
                alert('Please enter a room ID.');
                return;
            }
            const response = await getRoomHistory(Number(roomId), passport.token);
            setHistoryData(response.data);
        }
    } catch (error) {
        console.error('Failed to fetch history:', error);
        alert('Failed to fetch history');
    }
};
return (
    <>
        <div className="backgroundCUR">
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Box
                    width="100%"
                    maxWidth="500px"
                    p={3}
                    borderRadius={2}
                    boxShadow={3}
                    bgcolor="white"
                    color="black"
                >
                    <FormControl fullWidth>
                        <InputLabel>History Type</InputLabel>
                        <Select
                            value={historyType}
                            label="History Type"
                            onChange={handleHistoryTypeChange}
                        >
                            <MenuItem value="period">Date Period History</MenuItem>
                            <MenuItem value="room">Room History</MenuItem>
                        </Select>
                    </FormControl>

                    {historyType === "period" && (
                        <>
                            <TextField
                                label="Start DateTime"
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="End DateTime"
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                        </>
                    )}

                    {historyType === "room" && (
                        <TextField
                            label="Room ID"
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    )}

                    <Button onClick={fetchHistory} variant="contained" sx={{ mt: 2 }}>
                        Search
                    </Button>

                    {historyData && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">History Details:</Typography>
                            <Divider sx={{ my: 1 }} />
                            {historyType === "period" && historyData && Array.isArray(historyData) && (
                                <Box>
                                    {historyData.length > 0 ? (
                                        historyData.map((history, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography>User ID: {history.user_id}</Typography>
                                                <Typography>Room ID: {history.room_id}</Typography>
                                                <Typography>
                                                    Entry Time: 
                                                    {new Date(history.entry_datetime).toLocaleString()}
                                                </Typography>
                                                <Typography>
                                                    Exit Time: 
                                                    {new Date(history.exit_datetime).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="subtitle1">No data available for this period.</Typography>
                                    )}
                                </Box>
                            )}
                            {historyType === "room" && historyData && Array.isArray(historyData) && (
                                <Box>
                                    {historyData.map((history, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography>User ID: {history.user_id}</Typography>
                                            <Typography>Room ID: {history.room_id}</Typography>
                                            <Typography>
                                                Entry Time: 
                                                {new Date(history.entry_datetime).toLocaleString()}
                                            </Typography>
                                            <Typography>
                                                Exit Time: 
                                                {new Date(history.exit_datetime).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    </>
);
}

export default History;
