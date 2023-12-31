import { useContext } from 'react';
import { ThemeContext, UserContext } from '../App'; // Adjust import paths based on your project structure
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import { styles } from '../utils/styles'; // Check import compatibility
import SignUpModal from '../components/SignUpModal';
import CreateRoomModal from '../components/CreateRoomModal';
import ThemedBox from '../components/ThemedBox';
import ThemedText from '../components/ThemedText';
import ThemedBackground from '../components/ThemedBackground';
import LoginModal from '../components/LoginModal';
import RoomHB from '../components/RoomHB';
import ApproveUsersList from '../components/ApproveUsersList';
import LogoutButton from '../components/LogoutButton';
import { MenuItem } from '@mui/material';

export default function HomeScreen() {
  const { toggleTheme, themeButtonStyle, colorScheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const imageUrl = colorScheme === 'light' ? 'https://github.com/EvaGraceSmith/chat/blob/fc760237fb4cfbcb4412634cc621c9ba22e1aecc/assets/TransparentLogo.png?raw=true' : 'https://github.com/EvaGraceSmith/chat/blob/main/assets/TransparentLogoDark.png?raw=true';

  return (
    <ThemedBox container={true} testID='HOME'>
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: -40 }}>
        <img src={imageUrl} style={{ width: 400, height: 400 }} alt='Youth connect logo' testID='YCLOGO' />
      </Box>

      <ThemedBackground style={{ marginTop: -40 }}>
        {/* Commented out due to unsupported ThemedText */}
        {/* <ThemedText
          mb={10}
          textAlign={'center'}
          fontSize='xl'
          testID={'HOME TITLE'}
          text={`Welcome to Youth Connect! ${user && user.username !== 'null' ? user.username : ''}`}
        /> */}

        {user && user.role === 'admin' && (
          <>
            <ApproveUsersList />
            <CreateRoomModal />
          </>
        )}

        <Box display="flex" flexDirection="column">
          {!user?.username ? (
            <>
              <LoginModal />
              <SignUpModal />
            </>
          ) : (
            <>
              <RoomHB />
              <LogoutButton />
            </>
          )}

          <Button
            style={[themeButtonStyle]}
            mt={10}
            size={'sm'}
            onClick={toggleTheme} // Change onPress to onClick for web
          >
            Change Theme
          </Button>
        </Box>
      </ThemedBackground>
    </ThemedBox>
  );
}
