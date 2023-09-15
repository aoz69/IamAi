import { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiMenu from '@mui/material/Menu';
import MuiAvatar from '@mui/material/Avatar';
import MuiMenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import BellOutline from 'mdi-material-ui/BellOutline';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const fetchNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:3100/fetchNotifi');
    return response.data.notifi; 
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};
const fetchUserName = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3100/user/${userId}`); // Replace with your actual API endpoint for fetching user names
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    return userData.name; // Assuming 'name' is the property that contains the user's name
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  }
};

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis'
})




const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetchNotificationsData = async () => {
      try {
        const response = await fetch('http://localhost:3100/fetchNotifi');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const notificationsData = await response.json();
        setNotifications(notificationsData.notifi);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotificationsData();
  }, []);

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleDropdownClose = () => {
    setAnchorEl(null);
  }

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map(notification => (
            <MenuItem key={notification._id}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%' }}>
                <Avatar alt={notification.user} src={notification.userAvatar} />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', flexDirection: 'column', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <MenuItemSubtitle variant='body2'>{notification.data}</MenuItemSubtitle>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default NotificationDropdown;