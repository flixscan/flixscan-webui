import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://flixscan.de/">
        Flixscan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  // 
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async () => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(data.get('userFirstName'))

    console.log(formData);
    try {
      const response = await axios.post(`${apiUrl}/users/`, formData);
      if(response === 200){
        console.log("Success");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card sx={{ minWidth: 375 }}>
            <CardContent>
              <Stack alignItems="center" justifyContent="center" spacing={3}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                  Enter your credentials to continue
                </Typography>
              </Stack>
              <Box  sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="userFirstName"
                      value={formData.userFirstName || ''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="userFirstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="userLastName"
                      label="Last Name"
                      value={formData.userLastName || ''}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="userEmail"
                      value={formData.userEmail || ''}
                      id="userEmail"
                      label="Email Address"
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="userPass"
                      value={formData.userPass || ''}
                      onChange={handleChange}
                      label="Password"
                      type="password"
                      id="userPass"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox name="conditonAccept" value="true" />}
                      label="Agree with Terms & Condition."
                    />
                  </Grid>
                </Grid>
                <Button onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Divider />
                <Box
                  sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <NavLink to={'/'} sx={{ textDecoration: 'none' }} >
                    {"Already have an account?"}
                  </NavLink>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Register