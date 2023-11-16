import React from 'react';
import { Box, Typography } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
// import VacancyCard from '../../components/vacancyCard/VacancyCard';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import VacancyFilter from '../../components/Filter/VacancyFilter';

export default function ArchivedVacancy() {
  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px', height: '92vh' }}>
        <NavigationMenu />
        <VacancyFilter />
        <Typography variant="h3" color="#797981" paddingTop="210px" textAlign="center">У вас еще нет закрытых вакансий</Typography>
        {/* <VacancyCard /> */}
      </Box>
    </>
  );
}
