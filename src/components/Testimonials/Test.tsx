import { Card, CardContent, Typography, Grid, Box, Rating } from '@mui/material';

const testimonials = [
  {
    name: "John Doe",
    text: "Participating in the innovation challenges here has opened up so many opportunities for me!",
    rating: 5
  },
  {
    name: "Jane Smith",
    text: "The facilities and mentorship available have helped my startup pivot to success.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={2}>
        {testimonials.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card raised sx={{ maxWidth: 345, mx: "auto" }}>
              <CardContent>
                <Typography variant="h6" component="div">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    mt: 2
                  }}
                >
                  <Rating name="read-only" value={item.rating} readOnly />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;