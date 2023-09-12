import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { ThemeContext } from '../App';

export default function ThemedButton({
  testID,
  mt,
  w,
  size,
  width,
  disabled,
  colorScheme,
  children,
}) {
  const { themeButtonStyle } = useContext(ThemeContext);

  const buttonStyle = {
    marginTop: mt,
    width: w,
    height: size === 'sm' ? '30px' : '40px', // You can adjust the height accordingly
    minWidth: width,
    ...themeButtonStyle,
  };

  return (
    <Button
      variant="contained"
      disabled={disabled}
      color={colorScheme}
      style={buttonStyle}
      data-testid={testID}
    >
      {children}
    </Button>
  );
}
