import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottom:'1px solid #ddd',
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = ({ open, handleDrawerToggle, menuItem }) => {
  return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItem.map((item, index) => (
            <Link style={{ textDecoration: 'none', color: '#000'}} to={item.path} key={index}>
              <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 60, justifyContent: open ? 'initial' : 'center', px: 2.5, flexDirection: open ? 'row' : 'column' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto',color:'#585858'}} >{item.icon} </ListItemIcon>
                  <Typography sx={{ fontSize: open ? '15px' : '9px',color:'gray' }}>{item.name} </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
  );
};
export default Sidebar;