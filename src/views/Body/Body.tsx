import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Error } from '../Error/Error'

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path="*" element={<Error />} />
    </Routes>
    </>
  )
}
