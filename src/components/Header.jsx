import { AppBar, Toolbar, Typography,Box } from '@mui/material';
import RefreshScheduleContextButton from '../components/RefreshScheduleContextButton';
const Header = () => {
    return (

      <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" noWrap>
                            Railwise Admin
                        </Typography>
                        <RefreshScheduleContextButton />
                    </Box>
          
        </Toolbar>
      </AppBar>
    );
}

export default Header;
