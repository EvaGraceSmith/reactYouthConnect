import React, { useContext } from 'react';
import { ImageBackground, View } from 'react-native'; // Import View for flex layout
import { ThemeContext } from '../App'; // Check compatibility with your project structure
import { styles } from '../utils/styles'; // Check compatibility with your project structure

export default function ThemedBackground({ children }) {
  const { bgImage, themeContainerStyle } = useContext(ThemeContext);

  return (
    <ImageBackground
      source={bgImage}
      resizeMode='cover'
      style={[styles.container, themeContainerStyle, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
    >
      {/* Wrap children in a View for flex layout */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </View>
    </ImageBackground>
  );
}
