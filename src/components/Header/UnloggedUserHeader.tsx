import {
  AppBar, Toolbar, Container, MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../images/H.svg';
import './LoggedUser.scss';

export default function UnloggedUserHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', height: '65px', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <MenuItem component={Link} to="/">
            <img className="img__logo" src={Logo} alt="Логотип" />
          </MenuItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
