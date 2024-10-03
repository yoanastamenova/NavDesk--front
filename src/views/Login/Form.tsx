import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material"; 
import { useNavigate } from "react-router-dom"; 

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
});

const initialValuesRegister = {
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }, onSubmitProps: any) => {
    const url = loginMode 
      ? "http://localhost:3000/auth/login" 
      : "http://localhost:3000/auth/register";
    const method = loginMode ? "POST" : "POST";

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(values);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await response.json();
    onSubmitProps.setSubmitting(false);

    if (response.ok) {
      navigate("/bookings");
    } else {
      console.error('Error:', data);
    }
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={loginMode ? initialValuesLogin : initialValuesRegister}
      validationSchema={loginMode ? loginSchema : registerSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2,  width: '25ch'}}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              margin="normal"
              color="info" focused/>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              margin="normal"
              color="info" focused
            />
            <Button type="submit" variant="contained">
              {loginMode ? "Login" : "Register"}
            </Button>
            <Typography style={{ color: '#fff', margin: 20}}>
              {loginMode
                ? "Don't have an account? Register here."
                : "Already have an account? Login here."}
            </Typography>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setLoginMode(!loginMode);
                resetForm();
              }}
            >
              {loginMode ? "Switch to Register" : "Switch to Login"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;