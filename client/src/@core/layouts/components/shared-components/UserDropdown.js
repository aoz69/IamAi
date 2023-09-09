// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'


const UserDropdown = () => {
  const [user, setUser] = useState({});
  const [logoutSuccess, setLogoutSuccess] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()


  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3100/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        console.log(data);
        setLogoutSuccess(true);
        router.push('/pages/login');
      } else {
        setLogoutSuccess(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutSuccess(false);
    }
  };

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    router.push('/profile'); 
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
  }


 
  useEffect(() => {
    fetch('http://localhost:3100/getSession', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.user) {
          setUser(data.user);
        } else {
          router.push('pages/login');
        }
      })
      .catch((error) => {
        console.error('Error fetching user session:', error);
      });
  }, []);


  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>
              {user.name}
                </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={handleProfileClick}>
        <Box sx={styles}>
          <AccountOutline sx={{ marginRight: 2 }} />
          Profile
        </Box>
      </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleClick()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Manage User
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown