import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Alert,
  Stack,
  TextField,
} from '@mui/material';
import { createRoom } from '../utils/APIFunctions';
import { UserContext, ThemeContext } from '../App';
import { fetchRooms } from '../App';

export default function CreateRoomModal({ visible, onClose }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minimumAge, setMinimumAge] = useState(1);
  const [maxAge, setMaxAge] = useState(100);
  const { rooms, setRooms } = useContext(UserContext);
  const [alert, setAlert] = useState(false);
  const { colorScheme, themeButtonStyle } = useContext(ThemeContext);

  const handleSubmit = async () => {
    if (!name || !description) {
      setAlert(true);
      return;
    }

    try {
      const newRoom = await createRoom({
        name: name,
        users: null,
        description: description,
        minimumAge: minimumAge,
        maxAge: maxAge,
      });

      setShowModal(false);
      setRooms([...rooms, newRoom]);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <>
      <Button
        style={themeButtonStyle}
        mt={10}
        onClick={() => setShowModal(true)}
      >
        Create Room
      </Button>
      <Modal
        style={{
          backgroundColor:
            colorScheme === 'light' ? 'white' : colorScheme,
        }}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Stack
          style={{
            backgroundColor:
              colorScheme === 'light' ? 'white' : colorScheme,
          }}
          maxWidth="400px"
        >
          <Stack>
            <FormControl>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
    </>
  );
}
