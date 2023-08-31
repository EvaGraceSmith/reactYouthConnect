import React, { useState, useEffect, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import TabNav from './components/TabNav';

import { useColorScheme } from 'react-native';
import { bgImageDark, bgImageLight } from './utils/images';
import { styles } from './utils/styles';

export const ThemeContext = createContext();
export const UserContext = createContext();

export function fetchRooms(setRooms) {
  try {
    fetch('https://youth-connect-backend.onrender.com/api/v1/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
      });
  } catch (err) {
    console.error('ERROR FETCHING ROOMS: ', err);
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState('none');
  const [rooms, setRooms] = useState([]);
  const [bgImage, setBgImage] = useState();
  const [colorScheme, setColorScheme] = useState('light'); // Default to light theme
  const [themeContainerStyle, setThemeContainerStyle] = useState(styles.lightContainer);
  const [themeTextStyle, setThemeTextStyle] = useState(styles.lightThemeText);
  const [themeButtonStyle, setThemeButtonStyle] = useState(styles.lightThemeButton);
  const [themeNavStyle, setThemeNavStyle] = useState(styles.lightNav);
  const [themeInputStyle, setThemeInputStyle] = useState(styles.lightInput);
  const [pickedImagePath, setPickedImagePath] = useState();

  useEffect(() => {
    fetchRooms(setRooms);
  }, []);

  const toggleTheme = () => {
    if (colorScheme === 'dark') {
      setThemeContainerStyle(styles.lightContainer);
      setThemeTextStyle(styles.lightThemeText);
      setBgImage(bgImageLight);
      setColorScheme('light');
      setThemeButtonStyle(styles.lightThemeButton);
      setThemeNavStyle(styles.lightNav);
      setThemeInputStyle(styles.lightInput);
    } else {
      setThemeContainerStyle(styles.darkContainer);
      setThemeTextStyle(styles.darkThemeText);
      setBgImage(bgImageDark);
      setColorScheme('dark');
      setThemeButtonStyle(styles.darkThemeButton);
      setThemeNavStyle(styles.darkNav);
      setThemeInputStyle(styles.darkInput);
    }
  };

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <SafeAreaProvider
      style={{ paddingTop: 40, ...themeNavStyle }}
      initialMetrics={inset}
    >
      <StatusBar style='dark' hidden={false} />
      <NavigationContainer>
        <NativeBaseProvider initialWindowMetrics={inset}>
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
            <ThemeContext.Provider
              value={{
                colorScheme,
                bgImage,
                toggleTheme,
                themeContainerStyle,
                themeTextStyle,
                themeInputStyle,
                themeNavStyle,
                themeButtonStyle,
              }}
            >
              <TabNav user={user} room={room} themeNavStyle={themeNavStyle} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
