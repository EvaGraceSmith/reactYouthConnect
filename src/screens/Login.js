import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import base64 from 'base-64';
import ThemedBackground from '../components/ThemedBackground';
import { ThemeContext, UserContext } from '../App';

export default function Login({ navigation }) {
  const { themeInputStyle, themeTextStyle, themeButtonStyle } =
    useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let headers = new Headers();
      let user = base64.encode(`${username}:${password}`);
      headers.set('Authorization', `Basic ${user}`);
      fetch('https://youth-connect-backend.onrender.com/signin', {
        method: 'POST',
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('login success');
          setUser(data.user);
          navigation.navigate('Home');
        });
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error);
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedBackground>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box
          p={2}
          pt={20}
          width="90%"
          maxWidth={290}
        >
          <Typography
            variant="h6"
            fontWeight="medium"
            component="div"
            mt={1}
            sx={themeTextStyle}
          >
            {user?.username
              ? `You're all set ${user?.username}`
              : 'Sign in to continue!'}
          </Typography>

          <form>
            <TextField
              label="Username"
              fullWidth
              style={themeInputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </form>
          <form>
            <TextField
              label="Password"
              type="password"
              fullWidth
              style={themeInputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <Button
            mt={2}
            variant="contained"
            style={themeButtonStyle}
            onClick={handleSubmit}
            disabled={user?.username ? true : false}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </ThemedBackground>
  );
}
