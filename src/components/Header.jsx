import { AppBar, Toolbar, Typography,Box ,CssBaseline} from '@mui/material';

const Header = () => {
    return (

      <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            Railwise Admin
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default Header;
