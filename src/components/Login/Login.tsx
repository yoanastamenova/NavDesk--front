import { Box, Typography } from "@mui/material";
import { SailingOutlined } from "@mui/icons-material";

const Login = () => {
  return (
    <Box>
      <Box width="100%" p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Nav Desk
          <SailingOutlined />
        </Typography>
      </Box>

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
  );
};

export default Login;
