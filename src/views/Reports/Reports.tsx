import { useState, useEffect } from 'react';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { getDailyReport, getDateReport, getRoomReport } from '../../services/apiCalls';


type ReportData = {
    total_entries: number;
    total_absences: number;
    frequent_users: string;
    infrequent_users: string;
};

const Reports = () => {
    const navigate = useNavigate(); 
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [roomId, setRoomId] = useState('');
    const [reportData, setReportData] = useState<ReportData | null>(null); 

    useEffect(() => {
        const passport = JSON.parse(localStorage.getItem('passport') || '{}');
        const token = passport?.token;
        
        if (!token) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleReportTypeChange = (event: any) => {
        setReportType(event.target.value);
        setReportData(null); // Clear previous report when switching types
    };

    const createReport = async () => {
        const passport = JSON.parse(localStorage.getItem('passport') || '{}');
        const token = passport?.token;

        try {
            if (reportType === 'daily') {
                const response = await getDailyReport(token);
                setReportData(response.data);
            } else if (reportType === 'date') {
                if (!startDate || !endDate) {
                    alert('Please fill in both start and end dates');
                    return;
                }
                const response = await getDateReport(new Date(startDate), new Date(endDate), token);
                setReportData(response.data);
            } else if (reportType === 'room') {
                if (!roomId) {
                    alert('Please enter a room ID');
                    return;
                }
                const response = await getRoomReport(Number(roomId), token);
                setReportData(response.data);
            }
        } catch (error) {
            console.error('Failed to create report:', error);
            alert('Failed to create report');
        }
    };

    return (
        <>
            <Navbar />
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="backgroundAVB">
                <Box width="100%" maxWidth="500px" bgcolor="background.paper" p={3} borderRadius={2} boxShadow={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="report-type-select-label">Report Type</InputLabel>
                        <Select
                            labelId="report-type-select-label"
                            value={reportType}
                            label="Report Type"
                            onChange={handleReportTypeChange}
                            sx={{ bgcolor: 'common.white' }}
                        >
                            <MenuItem value="daily">Daily Report</MenuItem>
                            <MenuItem value="date">Date Period Report</MenuItem>
                            <MenuItem value="room">Room Report</MenuItem>
                        </Select>
                    </FormControl>

                    {reportType === 'date' && (
                        <Box mt={2}>
                            <TextField
                                label="Start Date"
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="End Date"
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                    )}

                    {reportType === 'room' && (
                        <TextField
                            label="Room ID"
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    )}

                    <Button variant="contained" onClick={createReport} sx={{ mt: 3 }}>
                        Create Report
                    </Button>

                    {reportData && (
                        <Box sx={{ color: "black"}}>
                            <Typography variant="h6">Report Details:</Typography>
                            <Divider sx={{ mb: 2 }} />
                            {reportType === 'room' && reportData && Array.isArray(reportData) ? ( 
                                reportData.map((entry, index) => (
                                    <Box key={index}>
                                        <Typography>Entry ID: {entry.id}</Typography>
                                        <Typography>User ID: {entry.user_id}</Typography>
                                        <Typography>Room ID: {entry.room_id}</Typography>
                                        <Typography>Entry Time: {new Date(entry.entry_datetime).toLocaleString()}</Typography>
                                        <Typography>Exit Time: {new Date(entry.exit_datetime).toLocaleString()}</Typography>                                        
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                ))
                            ) : (
                                <>
                                    {reportData.total_entries !== undefined && (
                                        <>
                                            <Typography>Total Entries: {reportData.total_entries}</Typography>
                                            <Typography>Total Absences: {reportData.total_absences}</Typography>
                                            <Typography>Frequent Users: {reportData.frequent_users}</Typography>
                                            <Typography>Infrequent Users: {reportData.infrequent_users}</Typography>
                                        </>
                                    )}
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Reports;