import { Box, Typography } from "@mui/material";
import Form from "./Form";
import { Navbar } from "../../components/Navbar/Navbar";
import { SailingOutlined } from "@mui/icons-material";

const Login = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>      
    <Navbar />
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        <SailingOutlined sx={{ p:1}}/>
            Let's sail to new lands together
            <SailingOutlined sx={{ p:1}}/>
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
