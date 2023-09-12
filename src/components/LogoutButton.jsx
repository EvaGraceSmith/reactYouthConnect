import { useContext } from 'react';
import { Button } from '@mui/material';
import { UserContext, ThemeContext } from '../App';

export default function LogoutButton() {
  const { themeButtonStyle } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const handleLogout = () => setUser(null);

  return (
    <Button
      style={themeButtonStyle}
      mt={2}
      variant="contained"
      size="small"
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}
