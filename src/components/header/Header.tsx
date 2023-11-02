import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppDispatch } from '../../store/store';
import { logout, setCredentials } from '../../store/authSlice';
import { useGetDetailsQuery } from '../../store/authService';

export const pages = [
  {
    name: 'Вход',
    path: '/login',
    id: 1,
  },
  {
    name: 'Регистрация',
    path: '/registration',
    id: 2,
  },
  {
    name: 'Home',
    path: '/home',
    id: 3,
  },
  {
    name: 'Профиль',
    path: '/profile',
    id: 4,
  },
  {
    name: 'Студент',
    path: '/student',
    id: 5,
  },
  {
    name: 'Создать вакансию',
    path: '/vacancies',
    id: 6,
  },
  {
    name: 'Таблица кандидатов',
    path: '/students',
    id: 7,
  },

];

export default function Header() {
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1B22', height: '65px' }}>
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
                onClick={handleCloseNavMenu}
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
            <MenuItem>
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