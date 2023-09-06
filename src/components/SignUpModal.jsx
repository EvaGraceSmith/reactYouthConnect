import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Box,
  Alert,
  Text,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
} from '@mui/material';
import { UserContext, ThemeContext } from '../App';
import { useRef } from 'react';
import { KeyboardAvoidingView } from '@mui/material';

export default function SignUpModal({ visible, onClose }) {
  const passwordRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { themeInputStyle, themeTextStyle, themeButtonStyle, themeContainerStyle } = useContext(
    ThemeContext
  );

  const handleSubmit = async () => {
    // Perform validation, e.g., check if the fields are not empty
    if (!username || !password) {
      setAlert(true);
      return;
    }
    console.log('username password', username, password);

    const method = 'POST';
    const url = 'https://youth-connect-backend.onrender.com/signup';
    const action = 'CREATING USER';
    let headers = new Headers();
    const body = {
      username: username,
      password: password,
      DOB: '12/01/1090',
    };
    headers.set('Content-Type', 'application/json');

    try {
      fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data);
          setUser(data.user);
        });
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
    setShowModal(false);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          style={themeButtonStyle}
          onClick={() => setShowModal(true)}
        >
          Sign Up
        </Button>
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle>Sign Up For Youth Connect</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField
                fullWidth
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl>
              <TextField
                fullWidth
                label="Password"
                type="password"
                inputRef={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            {alert && (
              <Alert severity="error" mt={2}>
                <Text>Error, Please enter all required fields</Text>
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} variant="text">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </KeyboardAvoidingView>
  );
}
