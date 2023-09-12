import React from 'react';
import { Box, Button, AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NavBar({ room, themeNavStyle }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3700B3' }}>
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <IconButton color="inherit" component={Link} to="/">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                Room Name
              </Typography>
              <Typography color="inherit">{room}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button color="inherit">
                {/* RoomHB */}
              </Button>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
