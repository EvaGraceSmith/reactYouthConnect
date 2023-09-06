import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  CssBaseline,
  Grid,
  Paper,
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const backImage = require("../assets/backImage.png");

export default function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Signup success');
          history.push('/'); // Redirect to the desired page after signup
        })
        .catch((err) => alert("Login error: " + err.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" style={{ color: 'orange', fontWeight: 'bold', paddingBottom: 24 }}>
          Sign Up
        </Typography>
        <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#f57c00', color: '#fff', fontWeight: 'bold' }}
              onClick={onHandleSignup}
            >
              Sign Up
            </Button>
            <Grid container justify="center" style={{ marginTop: 20 }}>
              <Grid item>
                <Typography variant="body2" style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
                  Don't have an account? <Link href="/login" style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}>Log In</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
      <CssBaseline />
      <img src={backImage} alt="Background" style={{ width: '100%', height: 340, position: 'absolute', top: 0, objectFit: 'cover' }} />
    </Container>
  );
}
