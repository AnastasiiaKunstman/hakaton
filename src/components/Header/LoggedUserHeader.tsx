import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/index';

export const pages = [
  {
    name: 'Подбор кандидатов',
    path: '/students/',
    id: 1,
  },
  {
    name: 'Мои вакансии',
    path: '/vacancies/active',
    id: 2,
  },
];

export default function LoggedUserHeader() {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1B22', height: '65px', boxShadow: 'none', padding: '0 46px' }}>
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
          <Box sx={{ flexGrow: 1, display: { md: 'inline-flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                // onClick={handleCloseNavMenu}
                sx={{
                  textTransform: 'none', color: '#B5B5B7', p: '20px', '&.MuiButtonBase-root:hover': { color: 'white' },
                }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <MenuItem>
              <IconButton
                color="secondary"
                component={Link}
                to="/"
                sx={{

                  '&.MuiButtonBase-root:hover': { color: 'white' },
                }}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </MenuItem>
            <MenuItem sx={{ paddingRight: '24px' }}>
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  borderColor: 'white',
                  fontSize: '14px',
                  borderRadius: '6',
                  '&.MuiButtonBase-root:hover': { borderColor: 'white' },
                }}
              >
                Выйти
              </Button>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
