import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function UnloggedUserHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1B22', height: '65px', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <MenuItem component={Link} to="/">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" fill="#1A1B22" />
              <rect width="2.64" height="18" transform="matrix(1 0 0 -1 12 31)" fill="#F9FAFB" />
              <rect width="2.64" height="18" transform="matrix(1 0 0 -1 29 31)" fill="#F9FAFB" />
              <rect width="2.64" height="5" transform="matrix(0 -1 -1 0 21.3203 21.3198)" fill="#F9FAFB" />
              <rect width="2.64" height="5" transform="matrix(0 -1 -1 0 27.3203 24.3198)" fill="#F9FAFB" />
            </svg>
          </MenuItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
