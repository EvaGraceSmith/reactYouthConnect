import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UserContext } from '../App'; // Adjust import path over to App.jsx when ready




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
    <Box>
      <Box>
        <Button
          onClick={handleCameraImage} // Change onPress to onClick for web
          style={{ color: 'orange' }}
        >
          Take Picture
        </Button>
        <Button onClick={handlePickImage} style={{ color: 'blue' }}>
          Select Image
        </Button>
        <img
          src={pickedImagePath ? pickedImagePath : testimage} // Adjust src attribute
          style={{ width: 200, height: 200 }}
        />
      </Box>
    </Box>
  );
};

export default CameraScreen;
