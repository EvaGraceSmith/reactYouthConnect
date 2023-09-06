import React, { useContext } from 'react';
import { Container, Box } from '@mui/material';
import { ThemeContext } from '../App';

export default function ThemedBackground({ children }) {
  const { bgImage, themeContainerStyle } = useContext(ThemeContext);

  const containerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...themeContainerStyle,
  };

  return (
    <Container style={containerStyle}>
      <Box>{children}</Box>
    </Container>
  );
}
