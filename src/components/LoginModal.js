import React, { useState, useContext, useRef } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Alert,
  Text,
  Center,
} from 'native-base';
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
    if (!username || !password) {
      setAlert(true);
      return;
    }

    try {
      let headers = new Headers();
      let userCredentials = base64.encode(`${username}:${password}`);
      headers.set('Authorization', `Basic ${userCredentials}`);
      const response = await fetch(
        'https://youth-connect-backend.onrender.com/signin',
        {
          method: 'POST',
          headers: headers,
        }
      );
      const data = await response.json();
      console.log('login success');
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error);
    }
    setShowModal(false);
  };

  return (
    <Center style={themeContainerStyle}>
      <Button
        testID='LOGIN BUTTON'
        style={themeButtonStyle}
        onClick={() => setShowModal(true)}
      >
        Log in
      </Button>
      <Modal
        testID='LOGIN'
        style={themeContainerStyle}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content maxWidth='400px'>
          <Modal.CloseButton />
          <Modal.Header>Log in to Youth Connect</Modal.Header>
          <Modal.Body>
            <FormControl testID='LOGIN FORM'>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                ref={passwordRef}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                returnKeyType='send'
                onSubmitEditing={() => {
                  handleSubmit();
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                style={themeButtonStyle}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                style={themeButtonStyle}
                disabled={user?.username ? true : false}
              >
                Submit
              </Button>
              {alert && (
                <Alert variant='subtle' status='error' mt={2}>
                  <Text>Error, Please enter all required fields</Text>
                </Alert>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
