/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import {
  AppBar, Box, Toolbar, Button, MenuItem,
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
        backgroundColor: '#1A1B22', height: 'max-content', boxShadow: 'none', padding: '0 78px',
      }}
    >
      <Toolbar>
        <MenuItem component={Link} to="/vacancies/active">
          <img className="img__logo" src={Logo} alt="Логотип" />
        </MenuItem>
        <Box sx={{
          display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '20px',
        }}
        >
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
          <MenuItem sx={{ padding: 0, height: '100%' }}>
            <Button
              color="secondary"
              component={Link}
              to="/profile"
              sx={{ padding: 0 }}
            >
              <img className="img__header" src={User} alt="Профиль" />
            </Button>
          </MenuItem>
          <Button
            onClick={onLogout}
            sx={{
              border: '1px solid #fff',
              boxShadow: 'none',
              color: 'white',
              fontSize: '14px',
              '&:hover': {
                opacity: '0.8',
              },
            }}
          >
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoggedUserHeader;
