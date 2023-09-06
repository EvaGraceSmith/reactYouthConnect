import { useEffect, useContext } from 'react';
import {
  Box,
  ScrollView,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { ThemeContext, UserContext } from '../App';
import socket from '../utils/socket';
import CreateRoomModal from '../components/CreateRoomModal';
import ThemedText from '../components/ThemedText';
import ThemedBox from '../components/ThemedBox';
import ThemedBackground from '../components/ThemedBackground';

export default function RoomList({ history }) {
  const { themeButtonStyle, themeContainerStyle, themeTextStyle } =
    useContext(ThemeContext);
  const { user, setRoom, rooms, room } = useContext(UserContext);

  useEffect(() => {
    if (room !== 'none') {
      console.log('ROOM CHANGED', room);
      history.push(`/${room}`);
    }
  }, [room, history]);

  return (
    <ThemedBox container={true}>
      <ThemedBackground>
        {user?.username ? (
          <Container>
            <ThemedText
              mt={10}
              marginLeft={5}
              style={themeTextStyle}
              variant="h5"
              component="div"
            >
              Join a room:
            </ThemedText>
            <CreateRoomModal />
            <ScrollView>
              <Box mt={5} display="flex" flexDirection="column" alignItems="center">
                {rooms?.length > 0 &&
                  rooms.map((room, i) => (
                    <Button
                      key={i}
                      variant="outlined"
                      style={themeButtonStyle}
                      onClick={() => {
                        socket.emit('join', { room: room.name });
                        setRoom(room.name);
                      }}
                    >
                      <Card style={{ width: '20rem' }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            style={themeContainerStyle}
                          >
                            {room.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Button>
                  ))}
              </Box>
            </ScrollView>
          </Container>
        ) : (
          <ThemedText
            mt={0}
            textAlign="center"
            variant="h5"
            component="div"
            style={themeTextStyle}
          >
            Please Log in first
          </ThemedText>
        )}
      </ThemedBackground>
    </ThemedBox>
  );
}
