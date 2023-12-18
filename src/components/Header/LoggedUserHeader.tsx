/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Button, MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../app/index';
import Logo from '../../images/H.svg';
import User from '../../images/userActive.svg';
import './LoggedUser.scss';

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

const LoggedUserHeader:FC = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1A1B22', height: '60px', boxShadow: 'none', padding: '0 46px',
      }}
    >
      <Box maxWidth="xl" sx={{ height: '60px' }}>
        <Toolbar sx={{ height: '60px' }}>
          <MenuItem component={Link} to="/">
            <img className="img__logo" src={Logo} alt="Логотип" />
          </MenuItem>
          <Box sx={{ flexGrow: 1, display: { md: 'inline-flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                sx={{
                  textTransform: 'none',
                  p: '20px',
                  '&.MuiButtonBase-root:hover': { color: 'white' },
                  color: page.path === window.location.pathname ? 'white' : '#B5B5B7',
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
                to="/profile"
                sx={{

                  '&.MuiButtonBase-root:hover': { color: 'white' },
                }}
              >
                <img className="img__header" src={User} alt="Профиль" />
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
                  '&.MuiButtonBase-root:hover': { opacity: '0.7', borderColor: 'white', boxShadow: 'none', backgroundColor: 'transparent' },
                }}
              >
                Выйти
              </Button>
            </MenuItem>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default LoggedUserHeader;
