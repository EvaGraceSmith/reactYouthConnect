import React, { useContext } from 'react';
import { Button } from 'native-base';
import { ThemeContext, UserContext } from '../App';

export default function LogoutButton() {
  const { themeButtonStyle } = useContext(ThemeContext);
  const { user, room, setUser } = useContext(UserContext);

  const handleLogout = () => setUser(null);

  return (
    <Button
      style={themeButtonStyle}
      mt={10}
      size='sm'
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}
