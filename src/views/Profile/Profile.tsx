import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Paper, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { getProfile, updateProfile } from '../../services/apiCalls';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, [navigate]);

  const fetchData = async () => {
    const passport = JSON.parse(localStorage.getItem('passport') || '{}');
    const token = passport?.token;
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const profileResponse = await getProfile(token);
      if (profileResponse.success) {
        setProfileData(profileResponse.data.userDetails); 
        setLoading(false);
      } else {
        alert(profileResponse.message);
      }
    } catch (error) {
      console.error('Error retrieving profile:', error);
      setLoading(false);
    }
  };

  const handleChange = (prop: keyof typeof profileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'id') return;
    setProfileData({ ...profileData, [prop]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('passport') || '{}').token;
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const updateResponse = await updateProfile(token, profileData);
      if (updateResponse.success) {
        alert('Profile updated successfully!');
        setEditMode(false);
      } else {
        alert(updateResponse.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
    <div className='backgroundAVB'>
      <Navbar />
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        {loading ? (
            <CircularProgress />
        ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
              {editMode ? 'Edit Your Profile' : 'Your Profile'}
            </Typography>
            {Object.keys(profileData).map(key => (
                <TextField
                key={key}
                margin="normal"
                required
                fullWidth
                id={key}
                label={key[0].toUpperCase() + key.slice(1)}
                name={key}
                autoComplete={key}
                autoFocus
                onChange={handleChange(key)}
                value={profileData[key]}
                disabled={!editMode}
                />
            ))}
            
            {editMode ? (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save Changes
              </Button>
            ) : (
                <Button onClick={() => setEditMode(true)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Edit Profile
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
        </div>
        </>
  );
};

export default Profile;