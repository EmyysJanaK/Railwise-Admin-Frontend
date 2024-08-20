import React from 'react';
import { List, ListItem, ListItemText, Drawer, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Dashboard', 'Bookings', 'Revenue', 'User Registrations', 'Class Distribution', 'Booking Details', 'Schedule Details'].map((text) => (
            <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(' ', '-')}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
