import { Box, Typography } from "@mui/material";
import Form from "./Form";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Login.css"

const Login = () => {
  return (
    <Box className='background' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>      
    <Navbar />
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Let's sail to new lands together
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
