import { AppBar, Toolbar, Typography,Box } from '@mui/material';
import RefreshScheduleContextButton from '../components/RefreshScheduleContextButton';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

      <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" noWrap>
                          <Link to="/">Railwise Admin</Link>
                        </Typography>
                        <RefreshScheduleContextButton />
                    </Box>
          
        </Toolbar>
      </AppBar>
    );
}

export default Header;
