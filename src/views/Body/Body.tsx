import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Error } from '../Error/Error'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { New } from '../Bookings/New/New.tsx'
import { Current } from '../Bookings/Current/Current.tsx'
import { Reports } from '../Reports/Reports.tsx'
import { Users } from '../Users/Users.tsx'
import { Rooms } from '../Rooms/Rooms.tsx'
import { Pricing } from '../Pricing/Pricing.tsx'
import Login from '../Login/Login.tsx'

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Current />} />
        <Route path="/bookings/new" element={<New />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/pricing" element={<Pricing />} />
    </Routes>
    </>
  )
}
