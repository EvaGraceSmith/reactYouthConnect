import React, { useContext } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { UserContext, ThemeContext } from '../App';
import socket from '../utils/socket';
import ThemedText from './ThemedText';
import CreateRoomModal from './CreateRoomModal';
import { deleteRoom } from '../utils/APIFunctions';

export default function RoomHB() {
  const { themeButtonStyle, themeContainerStyle, colorScheme } = useContext(ThemeContext);
  const { user, setRoom, rooms, room, setRooms } = useContext(UserContext);

  const isValidRoom = (room) => {
    return room !== 'none' && room !== null && room !== undefined;
  };

  return (
    <div>
      <Menu
        id="room-menu"
        anchorEl={null}
        open={false}
        onClose={() => {
          console.log('closed');
        }}
      >
        <MenuItem>
          <Button
            variant="contained"
            style={themeButtonStyle}
            onClick={() => {
              // Open the menu
            }}
          >
            {isValidRoom(room) ? 'Change Room' : 'Join a Room'}
          </Button>
        </MenuItem>
        {rooms?.length > 0 &&
          rooms.map((room, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                socket.emit('join', { room: room.name });
                setRoom(room.name);
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={room.name} />
              {user.role === 'admin' && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="inherit"
                  onClick={() => {
                    // Handle room deletion
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </MenuItem>
          ))}
        <MenuItem>
          <CreateRoomModal />
        </MenuItem>
      </Menu>
    </div>
  );
}
