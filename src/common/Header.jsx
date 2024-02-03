import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Person, Logout } from '@mui/icons-material';

const Header = ({ handleLogout }) => {
  return (
    <MuiAppBar position="fixed" elevation={1} sx={{ zIndex: 1, backgroundColor: '#585858', height:'200px', color: 'white' }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        <Button color="inherit"><Person /></Button>
        <Button color="inherit" href='/' onClick={handleLogout}><Logout /></Button>
      </Toolbar>
    </MuiAppBar>
  );
};
export default Header;