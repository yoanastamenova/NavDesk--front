import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Error } from '../Error/Error'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { New } from '../Bookings/New/New.tsx'
import { Users } from '../Users/Users.tsx'
import { Rooms } from '../Rooms/Rooms.tsx'
import { Pricing } from '../Pricing/Pricing.tsx'
import Login from '../Login/Login.tsx'
import { Reception } from '../Reception/Reception.tsx'
import Current from '../Bookings/Current/Current.tsx'
import Availability from '../Availability/Availability.tsx'
import Profile from '../Profile/Profile.tsx'
import Reports from '../Reports/Reports.tsx'

export const Body = () => {
  const passportStr = localStorage.getItem("passport");
  const passport = passportStr ? JSON.parse(passportStr) : null;
  let role = null;
  
  if (passport && passport.tokenData && typeof passport.tokenData.role === 'string') {
    role = passport.tokenData.role;
  }

  return (
    <>
      <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/bookings/new" element={<New />} />
          <Route path="/bookings" element={<Current />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/profile" element={<Profile />} />
          { role === "admin" && 
            <Route path='/reports' element={<Reports />}/>
          }
      </Routes>
    </>
  )
}