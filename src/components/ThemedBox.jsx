import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ThemeContext } from '../App';

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

  const boxStyle = {
    padding: p,
    paddingTop: py,
    width: w,
    maxWidth: maxW,
    ...testStyle,
    ...(container && themeContainerStyle),
  };

  return (
    <Box
      data-testid={testID}
      style={boxStyle}
      sx={safeArea ? { marginTop: 'env(safe-area-inset-top)' } : {}}
    >
      {children}
    </Box>
  );
}
