import React from 'react';
import { Box, Typography } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';

export default function ViewedStudent() {
  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px', height: '92vh' }}>
        <NavigationMenu />
        <Typography variant="h3" color="#797981" paddingTop="310px" textAlign="center">
          Кажется здесь пока ничего нет...
        </Typography>
      </Box>
    </>
  );
}
