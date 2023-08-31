import React, { useEffect, useContext } from 'react';
import { ScrollView, VStack, Button } from 'native-base'; // Adjust imports for web
import ThemedText from '../components/ThemedText';
import ThemedBox from '../components/ThemedBox';
import ThemedBackground from '../components/ThemedBackground';
import { ThemeContext, UserContext } from '../App';
import socket from '../utils/socket';
import CreateRoomModal from '../components/CreateRoomModal';

export default function RoomList({ history }) {
  const { themeButtonStyle, themeContainerStyle, themeTextStyle } =
    useContext(ThemeContext);
  const { user, setRoom, rooms, room } = useContext(UserContext);

  useEffect(() => {
    if (room !== 'none') {
      console.log('ROOM CHANGED', room);
      history.push(room); // Use history.push for navigation in web
    }
  }, [room]);

  return (
    <ThemedBox container={true}>
      <ThemedBackground>
        {user?.username ? (
          <>
            <ThemedText
              mt={10}
              marginLeft={5}
              style={themeTextStyle}
              fontSize={'lg'}
              text='Join a room:'
            />
            <CreateRoomModal />
            <ScrollView maxH={500}>
              <VStack mt={5} space={4} alignItems='center'>
                {rooms?.length > 0 &&
                  rooms.map((room, i) => (
                    <Button
                      key={i}
                      bg='transparent'
                      style={[themeButtonStyle]}
                      onClick={() => {
                        socket.emit('join', { room: room.name });
                        setRoom(room.name);
                      }}
                    >
                      <VStack
                        w='64'
                        h='20'
                        style={themeContainerStyle}
                        rounded='md'
                        shadow={3}
                        justifyContent='center' // Add this for web styling
                        alignItems='center' // Add this for web styling
                      >
                        {room.name}
                      </VStack>
                    </Button>
                  ))}
              </VStack>
            </ScrollView>
          </>
        ) : (
          <ThemedText
            mt={0}
            textAlign='center'
            fontSize={'lg'}
            style={themeTextStyle}
            text='Please Log in first'
          />
        )}
      </ThemedBackground>
    </ThemedBox>
  );
}
