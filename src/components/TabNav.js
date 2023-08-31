import React, { useContext } from 'react';
import { ThemeContext, UserContext } from '../App'; // Check compatibility with web-based React
import { createRoom } from '../utils/APIFunctions'; // Assuming you have this function defined

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
      // Simulating socket.emit since sockets may not be supported in web-based React
      console.log(`Joining room: ${newRoom.name}`);
      setRoom(newRoom.name);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        {/* Your dropdown menu and button components */}
        {/* Ensure compatibility with web-based React */}
        <button
          style={themeButtonStyle}
          onClick={handleCreateRoom}
        >
          {isValidRoom(room) ? 'Change Room' : 'Join a Room'}
        </button>
        {rooms?.length > 0 &&
          rooms.map((room, i) => (
            <div
              key={i}
              style={themeContainerStyle}
              onClick={() => {
                // Simulating socket.emit since sockets may not be supported in web-based React
                console.log(`Joining room: ${room.name}`);
                setRoom(room.name);
              }}
            >
              <span
                style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}
              >
                {room.name}
              </span>
            </div>
          ))}
        <div
          style={themeContainerStyle}
          onClick={handleCreateRoom}
        >
          <span
            style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}
          >
            Create a Room
          </span>
        </div>
      </div>
    </div>
  );
}
