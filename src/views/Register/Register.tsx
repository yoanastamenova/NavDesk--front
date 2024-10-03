import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import Form from '../Login/Form'
import "./Register.css"
import { Box, Typography } from '@mui/material'
import "./Register.css"

export const Register = () => {
  return (
    <>
    <Box className='background' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>      
      <Navbar />
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          We are happy to see you!
        </Typography>
        <Form />
      </Box>
    </Box>
    </>
  )
}
