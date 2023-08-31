import React, { useContext } from 'react';
import { ThemeContext } from '../App'; // Check compatibility with your project structure
import { styles } from '../utils/styles'; // Check compatibility with your project structure
import { fonts } from '../utils/fonts'; // Check compatibility with your project structure

export default function ThemedText({
  testID,
  text,
  testStyle,
  fontSize,
  textAlign,
  mb,
  mt,
  children,
  color,
}) {
  const { themeTextStyle } = useContext(ThemeContext);

  const textStyles = {
    marginBottom: mb,
    marginTop: mt,
    textAlign: textAlign,
    fontSize: fontSize,
    ...styles.text, // Apply your text styles here
    ...themeTextStyle, // Apply your theme-specific text styles here
    color: color,
  };

  return (
    <span
      data-testid={testID}
      style={testStyle ? testStyle : textStyles}
    >
      {text} {children}
    </span>
  );
}
