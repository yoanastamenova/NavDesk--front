import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import entrada from "/entrada.png"
import "./Home.css"

export const Home = () => {
  return (
    <>
      <Navbar />
      <img src={entrada} alt="Entrada" className="darker-image" height="600" width="1710"/>
    </>
  );
}
