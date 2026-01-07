import { Box, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--bg-topbar)',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          sx={{
            color: 'var(--text-secondary)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <NotificationsIcon />
        </IconButton>

        <IconButton onClick={handleMenuOpen}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: 'var(--primary-color)',
              fontSize: '0.9rem',
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              minWidth: 220,
              mt: 1,
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            },
          }}
        >
          <Box sx={{ padding: '12px 16px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ padding: '10px 16px' }}>
            <PersonIcon sx={{ marginRight: 1.5, fontSize: '1.2rem' }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ padding: '10px 16px', color: 'error.main' }}>
            <LogoutIcon sx={{ marginRight: 1.5, fontSize: '1.2rem' }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
