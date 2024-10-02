import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import entrada from "../../../public/entrada.png"
import logo from "../../../public/icon.png"
import "./Home.css"
import { Typography } from '@mui/material'

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="logo-container">
        <Typography variant="h6" fontSize="20px">
          Welcome to NavDesk!
        </Typography>
        <img src={logo} alt="Logo" height="100" width="100"/>
      </div>
      <img src={entrada} alt="Entrada" className="darker-image" height="600" width="1710"/>
    </>
  );
}
