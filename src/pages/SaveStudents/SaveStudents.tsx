import React from 'react';
import { Box, Typography } from '@mui/material';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';

export default function SaveStudents() {
  return (
    <Box maxWidth="xl" sx={{ p: '0 118px', height: '92vh' }}>
      <NavigationMenu />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Typography variant="h3" color="#797981" paddingTop="310px" textAlign="center">
          Кажется здесь пока никого нет...
        </Typography>
        <HeartBrokenIcon sx={{ color: '#00000052' }} fontSize="large" />
      </Box>
    </Box>
  );
}
