import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Alert,
  Text,
} from 'native-base';
import { UserContext, ThemeContext } from '../App';
import { fetchRooms } from '../App';
import { styles, colors } from '../utils/styles';

export default function CreateRoomModal({ visible, onClose }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minimumAge, setMinimumAge] = useState(1);
  const [maxAge, setMaxAge] = useState(100);
  const { rooms, setRooms } = useContext(UserContext);
  const [alert, setAlert] = useState(false);
  const { colorScheme, themeButtonStyle } = useContext(ThemeContext);

  const createRoomFunction = async () => {
    const method = 'POST';
    const url = 'https://youth-connect-backend.onrender.com/api/v1/rooms';
    const action = 'CREATING ROOM';
    let headers = new Headers();
    const body = {
      name: name,
      users: null,
      description: description,
      minimumAge: minimumAge,
      maxAge: maxAge,
    };
    headers.set('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log('Data from create room', data);
      setShowModal(false);
      fetchRooms(setRooms);
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      setAlert(true);
      return;
    }
    await createRoomFunction();
    console.log('finished creating room');
  };

  return (
    <>
      <Button
        style={[themeButtonStyle]}
        mt={10}
        onPress={() => {
          setShowModal(true);
        }}
      >
        Create Room
      </Button>
      <Modal
        style={{
          backgroundColor:
            colorScheme === 'light' ? 'white' : colors.backgroundDarker,
        }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content
          style={{
            backgroundColor:
              colorScheme === 'light' ? 'white' : colors.backgroundDark,
          }}
          maxWidth='400px'
        >
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={(text) => setName(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input onChangeText={(text) => setDescription(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleSubmit}>Submit</Button>
              {alert && (
                <Alert variant='subtle' status='error' mt={2}>
                  <Text>Error, Please enter all required fields</Text>
                </Alert>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
