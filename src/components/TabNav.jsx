import React, { useContext } from 'react';
import { Tabs, Tab } from '@mui/material';

import HomeScreen from '../screens/Home';
import RoomList from '../screens/RoomList';
import Login from '../screens/Login';
import Room from '../screens/Room';
import Camera from '../screens/CameraScreen';

export default function TabNav({ user, room, themeNavStyle }) {
  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarItemStyle: {
      ...themeNavStyle,
    },
    tabBarLabelStyle: { fontWeight: '900', fontSize: 15 },
  };

  return (
    <Tabs
      initialSelectedIndex={0}
      centered
      variant="fullWidth"
      scrollButtons="auto"
      textColor="primary"
      indicatorColor="primary"
    >
      <Tab label="Home" component={HomeScreen} {...screenOptions} />
      {user && user.username && (
        <Tab
          label={room !== 'none' ? room : 'Chat'}
          title={'Room'}
          component={Room}
          {...screenOptions}
        />
      )}
    </Tabs>
  );
}
