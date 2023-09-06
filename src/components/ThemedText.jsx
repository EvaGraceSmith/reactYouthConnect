import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '../App';

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

  const textStyle = {
    marginBottom: mb,
    marginTop: mt,
    textAlign: textAlign,
    fontSize: fontSize,
    ...themeTextStyle,
    color: color,
  };

  return (
    <Typography
      variant="body1" // You can adjust the variant accordingly
      data-testid={testID}
      style={testStyle ? testStyle : textStyle}
    >
      {text} {children}
    </Typography>
  );
}
