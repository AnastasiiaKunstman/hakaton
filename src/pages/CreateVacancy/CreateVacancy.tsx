import React from 'react';
import { Box } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import VacancyForm from '../../components/VacancyForm/VacancyForm';

export default function CreateVacancy() {
  return (
    <Box maxWidth="xl" sx={{ p: '0 118px' }}>
      <NavigationMenu />
      <VacancyForm /> 
    </Box>
  );
}
