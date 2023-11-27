/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Box } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import TableDynamic from '../../components/Table/TableDinamic';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import VacancyFilter from '../../components/Filter/VacancyFilter';

export default function StudentsPage() {
  return (
    <>
      <LoggedUserHeader />
      <Box
        maxWidth="xl"
        sx={{
          p: '0 116px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '20px',
        }}
      >
        <NavigationMenu />
        <VacancyFilter />
        <TableDynamic />
      </Box>
    </>
  );
}
