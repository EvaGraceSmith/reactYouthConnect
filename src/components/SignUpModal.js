import React, { useContext } from 'react';
import { Menu, Button, Center, Text } from 'native-base';
import socket from '../utils/socket'; // Ensure socket imports are compatible with web-based React
import { ThemeContext, UserContext } from '../App'; // Check compatibility with web-based React
import { Ionicons } from 'react-icons/io5'; // Ensure compatibility with web-based React
import { createRoom } from '../utils/APIFunctions'; // Assuming you have this function defined
import ThemedText from './ThemedText'; // Check compatibility with web-based React

export default function RoomHB() {
  const { themeButtonStyle, themeContainerStyle, colorScheme } = useContext(ThemeContext);
  const { user, setRoom, rooms, room, setRooms } = useContext(UserContext);

  const isValidRoom = room => {
    let valid = room !== 'none' && room !== null && room !== undefined;
    return valid;
  };

  const handleCreateRoom = async () => {
    const newRoom = await createRoom({
      name: 'New Room Name', // Change this to the desired room name
      users: null,
      description: '',
      minimumAge: 1,
      maxAge: 100,
    });

    if (newRoom) {
      setRooms(prevRooms => [...prevRooms, newRoom]);
      socket.emit('join', { room: newRoom.name });
      setRoom(newRoom.name);
    }
  };

  return (
    <Center>
      <div>
        {/* Your dropdown menu and button components */}
        {/* Ensure compatibility with web-based React */}
      </div>
    </Center>
  );
}
