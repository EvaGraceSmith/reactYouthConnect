import React, { useState, useContext, useRef } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Alert,
  Center,
  Stack,
} from '@mui/material';
import { UserContext, ThemeContext } from '../App';
import base64 from 'base-64';

export default function LoginModal({ visible, onClose }) {
  const passwordRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const {
    themeInputStyle,
    themeContainerStyle,
    themeButtonStyle,
  } = useContext(ThemeContext);

  const handleSubmit = async () => {
    // Perform validation, e.g., check if the fields are not empty
    if (!username || !password) {
      setAlert(true);
      return;
    }
    console.log('username password', username, password);

    try {
      let headers = new Headers();
      let userCredentials = base64.encode(`${username}:${password}`);
      headers.set('Authorization', `Basic ${userCredentials}`);
      fetch('https://youth-connect-backend.onrender.com/signin', {
        method: 'POST',
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('login success');
          console.log(data.user);
          setUser(data.user);
        });
    } catch (error) {
      console.error('ERROR SIGNING IN: ', error);
    }
    setShowModal(false);
  };

  return (
    <Center style={themeContainerStyle}>
      <Button
        testID="LOGIN BUTTON"
        style={themeButtonStyle}
        onClick={() => setShowModal(true)}
      >
        Log in
      </Button>
      <Modal
        testID="LOGIN"
        style={themeContainerStyle}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Stack style={{ maxWidth: '400px' }}>
          <Stack>
            <FormControl testID="LOGIN FORM">
              <FormControl.Label>Username</FormControl.Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                autoFocus
                variant="outlined"
                margin="normal"
                returnKeyType="next"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    passwordRef.current.focus();
                  }
                }}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                inputRef={passwordRef}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                returnKeyType="send"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            </FormControl>
          </Stack>
          <Stack mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={themeButtonStyle}
              disabled={user?.username ? true : false}
            >
              Submit
            </Button>
            {alert && (
              <Alert variant="standard" severity="error" mt={2}>
                Error, Please enter all required fields
              </Alert>
            )}
          </Stack>
        </Stack>
      </Modal>
    </Center>
  );
}
