import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";

interface Room {
  id: number;
  room_name: string;
  capacity: number;
  room_type: string;
  image?: string
}

export const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/rooms/all")
      .then((res) => res.json())
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const updatedRooms: Room[] = response.data.map((room: Room) => ({
            ...room,
            image: `/Rooms/${room.room_name.replace(/ /g, '_')}.jpg`
          }));
          setRooms(updatedRooms);
        }
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const navigate = useNavigate();
  
  const handleClick = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <Navbar />
      <div className="backgroundR">
      <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {rooms.map((room: Room) => (
          <Card sx={{ maxWidth: 500, m: 5 }} key={room.id}>
            <CardMedia
              sx={{ height: 340, width: 400 }}
              image={room.image}
              title={room.room_name}
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {room.room_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: {room.capacity} person <br></br>
                Suitable for: {room.room_type}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleClick('/bookings')} size="small">Book</Button>
              <Button onClick={() => handleClick('/pricing')} size="small">View pricing</Button>
            </CardActions>
          </Card>
        ))}
      </div>
        </div>
    </>
  );
}