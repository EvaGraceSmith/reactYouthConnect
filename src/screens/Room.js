import React, { useEffect, useState, useContext, useRef } from 'react';
import { Platform, View, ScrollView, Button, Image } from 'react-native'; // Adjust imports for web
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Use KeyboardAwareScrollView for web
import { VStack, Box, Text, Center, HStack, Menu, Input } from 'native-base'; // Adjust imports for web
import * as ImagePicker from 'expo-image-picker';
import RoomHB from '../components/RoomHB';
import ThemedBox from '../components/ThemedBox';
import * as Haptics from 'expo-haptics';
import { colors, styles } from '../utils/styles';
import { UserContext, ThemeContext } from '../App';
import socket from '../utils/socket';
import ThemedText from '../components/ThemedText';
import ThemedBackground from '../components/ThemedBackground';
import { Ionicons } from '@expo/vector-icons';

export default function Room({ route, history }) {
  const messageInputRef = useRef(null);
  const {
    colorScheme,
    bgImage,
    themeButtonStyle,
    themeContainerStyle,
    themeTextStyle,
  } = useContext(ThemeContext);
  const { user, room, setRoom, pickedImagePath, setPickedImagePath } =
    useContext(UserContext);
  const [toChatBot, setToChatBot] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const testimage =
    'https://i.imgur.com/2nCt3Sbl.jpg';

  // Rest of your component remains mostly unchanged

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedBox container={true} safeArea={true}>
        <ThemedBackground source={bgImage} resizeMode='cover' style={{ flex: 1 }}>
          <Box flex={1} mt={15} p={3} mb={-3}>
            {/* Rest of your JSX */}
          </Box>
          <ScrollView
            mt={5}
            maxH={500}
            alignContent={'center'}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <VStack mt={10} mb={50} space={4} alignItems='center'>
              {/* Rest of your messages mapping */}
            </VStack>
          </ScrollView>
          <HStack>
            <Button
              w={20}
              style={[themeButtonStyle, { alignItems: 'center' }]}
              onClick={handleCameraImage} // Use onClick for web
            >
              <Ionicons name='camera-outline' size={24} color='white' />
            </Button>
            <Button
              w={20}
              onClick={handlePickImage} // Use onClick for web
              style={[themeButtonStyle, { alignItems: 'center' }]}
            >
              <Ionicons name='image-outline' size={24} color='white' />
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
                {/* Rest of your JSX */}
              </HStack>
            </VStack>
          )}
        </ThemedBackground>
      </ThemedBox>
    </KeyboardAwareScrollView>
  );
}
