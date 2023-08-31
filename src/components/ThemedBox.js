import React, { useContext } from 'react';
import { ThemeContext } from '../App'; // Check compatibility with your project structure
import { styles } from '../utils/styles'; // Check compatibility with your project structure

export default function ThemedBox({
  testID,
  safeArea,
  container,
  p,
  py,
  w,
  maxW,
  testStyle,
  children,
}) {
  const { themeContainerStyle } = useContext(ThemeContext);

  const boxStyles = {
    padding: p,
    paddingTop: py,
    width: w,
    maxWidth: maxW,
    boxSizing: 'border-box',
    ...styles.container, // Apply your container styles here
    ...themeContainerStyle, // Apply your theme-specific container styles here
    ...(testStyle || {}),
  };

  return (
    <div
      data-testid={testID}
      style={boxStyles}
    >
      {children}
    </div>
  );
}
