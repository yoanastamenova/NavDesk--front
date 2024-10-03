import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import Form from '../Login/Form'
import "./Register.css"
import { Box, Typography } from '@mui/material'
import { SailingOutlined } from '@mui/icons-material'

export const Register = () => {
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>      
      <Navbar />
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Nav Desk, we are happy to have you!
        </Typography>
        <Form />
      </Box>
    </Box>
    </>
  )
}
