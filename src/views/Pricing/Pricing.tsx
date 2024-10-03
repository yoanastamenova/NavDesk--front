import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import plan from "/floor_plan.jpg";
import "./Pricing.css";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const Pricing = () => {
  function createData(name: string, price: number, extend_time: number, extend_day: number, hours: string) {
    return { name, price, extend_time, extend_day, hours };
  }
  
  const rows = [
    createData('Event', 500, 100, 900, "4h"),
    createData('Workshop', 70, 25, 100, "2h"),
    createData('Office', 100, 25, 100, "2h"),
    createData('Meetup', 200, 30, 100, "2h"),
  ];

  return (
    <>
      <Navbar />
      <Box className='background-img'>
        <div className="content-container">
          <div className='price-section'>
            <div className="price-overlay">Our Prices</div>
        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption className='caption'>Prices may vary due to high demand</caption>
            <TableHead>
              <TableRow>
                <TableCell>Ocassion type</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Extend price for hour</TableCell>
                <TableCell align="right">Extend price for a day</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price} €</TableCell>
                  <TableCell align="right">{row.extend_time} €</TableCell>
                  <TableCell align="right">{row.extend_day} €</TableCell>
                  <TableCell align="right">{row.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              </div>
        <div className='plan-section'>
        <div className="plan-overlay">Floor Plan</div>
        <div className="image-container">
          <img src={plan} alt="plan" height="400" width="auto" className='title'/>
        </div>
        </div>
      </div>
      </Box>
    </>
  )
}