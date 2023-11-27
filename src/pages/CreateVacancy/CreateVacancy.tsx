import React from 'react';
import { Box } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import VacancyForm from '../../components/VacancyForm/VacancyForm';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';

export default function CreateVacancy() {
  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px' }}>
        <NavigationMenu />
        <VacancyForm />
      </Box>
    </>
  );
}
