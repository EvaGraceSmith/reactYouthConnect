import { useEffect, useState, useContext, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Image,
  ScrollView,
  Icon,
} from '@mui/material';
import RoomHB from '../components/RoomHB';
import ThemedBox from '../components/ThemedBox';
import { colors } from '../utils/styles';
import { UserContext, ThemeContext } from '../App';
import socket from '../utils/socket';
import ThemedText from '../components/ThemedText';
import ThemedBackground from '../components/ThemedBackground';

export default function Room({ navigation }) {
  const messageInputRef = useRef(null);
  const {
    colorScheme,
    bgImage,
    themeButtonStyle,
    themeContainerStyle,
    themeTextStyle,
  } = useContext(ThemeContext);
  const { user, room, setRoom, setPickedImagePath } = useContext(UserContext);
  const [toChatBot, setToChatBot] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const testimage = 'https://i.imgur.com/2nCt3Sbl.jpg';

  const handleSubmit = () => {
    const payload = {
      text: message,
      room: room,
      username: user.username,
      timestamp: new Date().getTime(),
    };
    socket.emit('MESSAGE', payload);
    setMessages([...messages, payload]);
    setMessage('');
  };

  const sendToChatBot = () => {
    socket.emit('TO CHAT BOT', toChatBot);
  }; //this is not being used atm, but will be used when we implement chatbot

  useEffect(() => {
    if (room === 'none' || room === 'Chat') {
      navigation.navigate('Home');
    } else {
      console.log('ROOM CHANGED', room);
      navigation.navigate(room);
      socket.emit('GET RECENT MESSAGES', room);
    }
  }, [room]);

  const addNewMessage = (payload) => {
    console.log('NEW MESSAGE', message, messages);
    setMessages([...messages, payload]);
  };

  const isValidRoom = (room) => {
    let valid = room !== 'none' && room !== null && room !== undefined;
    return valid;
  };

  const imageTrim = (text, name) => {
    if (user.username === name) {
      console.log(text);
      let newText = text.split(' ');
      console.log(newText);
      return newText[1];
    } else {
      return text;
    }
  };

  const isValidHttpUrl = (str) => {
    if (typeof str === 'string' && str.includes('Image')) {
      str.trimStart('Image ');
      return true;
    } else return false;
  };

  useEffect(() => {
    try {
      socket.on('NEW MESSAGE', (payload) => {
        console.log('NEW MESSAGE', messages, payload);
        if (typeof payload === 'object') {
          setMessages([...messages, payload]);
        }
      });
    } catch (error) {
      console.error('ERROR RECEIVING MESSAGE', error);
    }

    try {
      socket.on('SENDING RECENT MESSAGES', (payload) => {
        if (messages.length < 1) {
          console.log('RECEIVED RECENT MESSAGES', payload);
          setMessages(payload);
        }
      });
    } catch (error) {
      console.error('ERROR RECEIVING RECENT MESSAGES', error);
    }
  }, [socket]);

  const handleEditMessage = (messageId, content) => {
    const updatedMessage = {
      id: messageId,
      text: content,
      username: user.username,
      timestamp: new Date().getTime(),
    };

    socket.emit('EDIT_MESSAGE', updatedMessage);

    return updatedMessage;
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      socket.emit('DELETE_MESSAGE', { messageId, room });
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleCameraImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (!response.didCancel && !response.error) {
        setPickedImagePath(response.uri);

        const payload = {
          text: 'Image ' + response.uri,
          room: room,
          username: user.username,
          isImage: true,
        };
        socket.emit('MESSAGE', payload);
      }
    });
  };

  const handlePickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setPickedImagePath(response.uri);

        const payload = {
          text: 'Image ' + response.uri,
          room: room,
          username: user.username,
          isImage: true,
        };
        socket.emit('MESSAGE', payload);
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedBox container={true} safeArea={true}>
        <ThemedBackground source={bgImage} resizeMode='cover' style={{ flex: 1 }}>
          <Box flex={1} mt={15} p={3} mb={-3}>
            {!isValidRoom(room) && (
              <ThemedText
                style={themeTextStyle}
                textAlign={'center'}
                fontSize={'lg'}
                text={'Please join a room'}
              />
            )}

            {isValidRoom(room) && <RoomHB />}
          </Box>
          <ScrollView
            mt={5}
            maxH={500}
            alignContent={'center'}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <VStack mt={10} mb={50} space={4} alignItems='center'>
              {messages.length > 0 &&
                messages.map((message, i) => {
                  const isOutgoing = message.username === user.username;
                  const isEditMode =
                    editMode && selectedMessage?.id === message.id;
                  return (
                    <HStack
                      key={i}
                      width={'90%'}
                      bg={isOutgoing ? '#05e2e6' : '#a7ef72'}
                      color={'white'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      rounded='25px'
                      paddingTop={2}
                      paddingBottom={2}
                      shadow={3}
                      px={4}
                      py={2}
                      mb={2}
                    >
                      {isValidHttpUrl(message.text) ? (
                        <Image
                          key={i}
                          src={{
                            uri: imageTrim(message.text, message.username),
                          }}
                          style={{ width: 200, height: 200 }}
                          alt={`${user.username} Image ${i}`}
                        />
                      ) : (
                        <>
                          <ThemedText
                            color={isOutgoing ? 'black' : 'black'}
                            fontSize={'md'}
                            text={`${message.username}: ${message.text}`}
                          />
                        </>
                      )}
                    </HStack>
                  );
                })}
            </VStack>
          </ScrollView>

          <HStack>
            <Button
              w={20}
              style={[themeButtonStyle, { alignItems: 'center' }]}
              onPress={handleCameraImage}
            >
              <Icon name='camera-outline' size={24} color='white' />
            </Button>
            <Button
              w={20}
              onPress={handlePickImage}
              style={[themeButtonStyle, { alignItems: 'center' }]}
            >
              <Icon name='image-outline' size={24} color='white' />
            </Button>
          </HStack>

          {user?.username && (
            <VStack width={'100%'} style={{ flex: 1 }}>
              <HStack
                style={{
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Input
                    ref={messageInputRef}
                    value={message}
                    style={themeContainerStyle}
                    onChangeText={setMessage}
                    placeholder='Send a message'
                    placeholderTextColor={
                      colorScheme === 'light' ? 'black' : 'white'
                    }
                    color={colorScheme === 'light' ? 'black' : 'white'}
                    returnKeyType='send'
                    onSubmitEditing={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </HStack>
            </VStack>
          )}
        </ThemedBackground>
      </ThemedBox>
    </KeyboardAwareScrollView>
  );
}
