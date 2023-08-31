import React, { useContext, useState } from 'react';
import { View, Button, Image } from 'react-native'; // Adjust imports for web
import { UserContext } from '../App'; // Adjust import path based on your project structure
import socket from '../utils/socket'; // Check socket import compatibility
import { Box, Input } from 'native-base'; // Check import compatibility

const CameraScreen = () => {
  const testimage = 'https://i.imgur.com/2nCt3Sbl.jpg';
  const { user, room, pickedImagePath, setPickedImagePath } =
    useContext(UserContext);

  const handleCameraImage = async () => {
    // Implement camera image handling for web environment
  };

  const handlePickImage = async () => {
    // Implement image picking handling for web environment
  };

  return (
    <View>
      <View>
        <Button
          onClick={handleCameraImage} // Change onPress to onClick for web
          style={{ color: 'orange' }}
        >
          Take Picture
        </Button>
        <Button onClick={handlePickImage} style={{ color: 'blue' }}>
          Select Image
        </Button>
        <Image
          src={pickedImagePath ? pickedImagePath : testimage} // Adjust src attribute
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
  );
};

export default CameraScreen;
