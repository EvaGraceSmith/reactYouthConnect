import React, { createContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import TabNav from './components/TabNav';
import { useColorScheme } from 'react-native';
import { fetchRooms } from './utils/APIFunctions';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';

export const ThemeContext = createContext();
export const UserContext = createContext();

const theme = createTheme({
  palette: {
    type: 'light', // Set 'dark' for dark mode
  },
  // Add your theme-specific styles here
  customStyles: {
    darkContainer: {
      backgroundColor: '#333',
    },
    darkThemeText: {
      color: '#fff',
    },
    darkThemeButton: {
      backgroundColor: '#555',
      color: '#fff',
    },
    darkNav: {
      backgroundColor: '#222',
    },
    darkInput: {
      color: '#fff',
    },
    // Define your dark theme styles
    lightContainer: {
      backgroundColor: '#fff',
    },
    lightThemeText: {
      color: '#000',
    },
    lightThemeButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    lightNav: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    lightInput: {
      color: '#000',
    },
    // Define your light theme styles
  },
});

export default function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState('none');
  const [rooms, setRooms] = useState([]);
  const [colorScheme, setColorScheme] = useState('light'); // Set the initial color scheme to 'light'
  const [pickedImagePath, setPickedImagePath] = useState();

  useEffect(() => {
    fetchRooms(setRooms);
  }, []);

  function setToDarkTheme() {
    setColorScheme('dark');
  }

  function setToLightTheme() {
    setColorScheme('light');
  }

  const toggleTheme = () => {
    colorScheme === 'dark' ? setToLightTheme() : setToDarkTheme();
  };

  useEffect(() => {
    colorScheme === 'dark' ? setToDarkTheme() : setToLightTheme();
  }, [colorScheme]);

  return (

    <MuiThemeProvider theme={theme}>
          <CssBaseline />
      <UserContext.Provider
        value={{
          user,
          setUser,
          room,
          setRoom,
          rooms,
          setRooms,
          pickedImagePath,
          setPickedImagePath,
        }}
      >
        <ThemeProvider theme={theme}>
          <TabNav user={user} room={room} />
        </ThemeProvider>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}
