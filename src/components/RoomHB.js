import React, { useContext } from 'react';
import { Menu, Button, Center, Text } from 'native-base';
import socket from '../utils/socket';
import { ThemeContext, UserContext } from '../App';
import { Ionicons } from 'react-icons/io5';
import { createRoom } from '../utils/APIFunctions'; // Assuming you have this function defined
import ThemedText from './ThemedText';

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
      <Menu
        style={[themeContainerStyle]}
        h='200'
        closeOnSelect={true}
        trigger={triggerProps => (
          <Button style={themeButtonStyle} {...triggerProps}>
            {isValidRoom(room) ? 'Change Room' : 'Join a Room'}
          </Button>
        )}
      >
        <Menu.OptionGroup defaultValue='Rooms' title='Rooms' type='radio'>
          {rooms?.length > 0 &&
            rooms.map((room, i) => (
              <Menu.ItemOption
                style={themeContainerStyle}
                value={room.name}
                key={i}
                onPress={() => {
                  socket.emit('join', { room: room.name });
                  setRoom(room.name);
                }}
              >
                <Text color={colorScheme === 'dark' ? 'white' : 'black'}>{room.name}</Text>
              </Menu.ItemOption>
            ))}
          <Menu.ItemOption
            style={themeContainerStyle}
            value={'Create'}
            key={99}
            onPress={handleCreateRoom}
          >
            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>Create a Room</Text>
          </Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Center>
  );
}
