// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import IconButton from '@mui/material/IconButton'
import Menu from 'mdi-material-ui/Menu'

const AppBarContent = props => {

  const { hidden, } = props


  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {hidden && hiddenSm ? (
          <IconButton
            color='inherit'
            onClick={props.toggleNavVisibility}
            sx={{ ml: -2.75 }}
          >
            <Menu />
          </IconButton>
        ) : null}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
