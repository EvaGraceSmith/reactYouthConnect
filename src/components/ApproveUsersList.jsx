import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Text, Box, Stack } from '@mui/material';
import { ThemeContext, UserContext } from '../App';
import ThemedText from './ThemedText';

export default function ApproveUsersList() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const { themeButtonStyle, themeTextStyle, themeContainerStyle, colorScheme } =
    useContext(ThemeContext);

  const getUsers = async () => {
    try {
      let headers = new Headers();

      headers.set('Authorization', `Bearer ${user.token}`);
      fetch('https://youth-connect-backend.onrender.com/users/unapproved', {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } catch (error) {
      console.log('ERROR GETTING USERS: ', error);
    }
  };

  const approveUser = async (userId) => {
    console.log(userId);
    try {
      let headers = new Headers();

      headers.set('Authorization', `Bearer ${user.token}`);
      fetch(
        `https://youth-connect-backend.onrender.com/users/${userId}/approve`,
        {
          method: 'PUT',
          headers: headers,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          getUsers();
        });
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Stack direction="column" alignItems="center">
      <Button style={themeButtonStyle} onClick={() => setShowModal(true)}>
        Approve Users
      </Button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        BackdropProps={{
          sx: {
            backgroundColor: colorScheme === 'dark' ? '#1a202c' : '#f8f8f8',
          },
        }}
      >
        <Box
          sx={{
            maxWidth: '350px',
            maxHeight: '500px',
            p: 2,
            backgroundColor: colorScheme === 'dark' ? '#1a202c' : '#f8f8f8',
          }}
        >
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Text variant="h6">Unapproved Users</Text>
          <Stack spacing={2}>
            {users.length > 0 &&
              users.map((user, i) => (
                <Box key={i}>
                  <Button
                    style={themeButtonStyle}
                    onClick={() => {
                      approveUser(user.id);
                    }}
                  >
                    <Text color={'white'}>
                      {user.username} | {user.role} ✔️{' '}
                    </Text>
                  </Button>
                </Box>
              ))}
          </Stack>
          <Button.Group sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                getUsers();
              }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Box>
      </Modal>
    </Stack>
  );
}
