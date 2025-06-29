import { Box, IconButton, InputBase, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Navbar = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: '#2c2c3e',
      px: 3,
      py: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1e1e2f', borderRadius: 1, px: 2 }}>
        <SearchIcon sx={{ color: 'gray' }} />
        <InputBase placeholder="Search..." sx={{ color: 'white', ml: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <NotificationsNoneIcon sx={{ color: 'white' }} />
        </IconButton>
        <Avatar src="https://randomuser.me/api/portraits/men/44.jpg" alt="user" />
      </Box>
    </Box>
  );
};

export default Navbar;
