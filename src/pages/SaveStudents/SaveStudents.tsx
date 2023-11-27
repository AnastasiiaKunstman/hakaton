import React from 'react';
import { Box } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import VacancyFilter from '../../components/Filter/VacancyFilter';
import TableDynamic from '../../components/Table/TableDinamic';

export default function SaveStudents() {
  return (
    <>
      <LoggedUserHeader />
      <Box
        maxWidth="xl"
        className="StudentsPage"
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
