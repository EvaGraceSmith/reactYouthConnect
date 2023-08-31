import React, { useContext } from 'react';
import { ThemeContext } from '../App'; // Check compatibility with your project structure
import { styles } from '../utils/styles'; // Check compatibility with your project structure

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

  const buttonStyles = {
    marginTop: mt,
    width: w || width,
    ...styles.button, // Apply your button styles here
    ...themeButtonStyle, // Apply your theme-specific button styles here
  };

  return (
    <button
      data-testid={testID}
      disabled={disabled}
      style={buttonStyles}
    >
      {children}
    </button>
  );
}
