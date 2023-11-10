/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import TableDynamic from '../../components/Table/TableDinamic';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';

export default function StudentsPage() {
  return (
    <>
      <LoggedUserHeader />
      <Box
        maxWidth="xl"
        className="StudentsPage"
        sx={{
          p: '0 118px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '20px',
        }}
      >
        <NavigationMenu />
        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            maxWidth: '438px',
          }}
          >
            <Typography variant="subtitle1" fontWeight={500}>Вакансия</Typography>
            <TextField
              placeholder="Например, Фронтенд-разработчик"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>
        </Box>
        <TableDynamic />
      </Box>
    </>
  );
};
