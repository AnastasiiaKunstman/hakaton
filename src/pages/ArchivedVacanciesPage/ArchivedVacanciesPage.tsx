import React, {useState} from 'react';
import { Box, Typography, TextField } from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
// import VacancyCard from '../../components/vacancyCard/VacancyCard';

export default function ArchivedVacancy() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box maxWidth="xl" sx={{ p: '0 118px', height: '92vh' }}>
      <NavigationMenu />
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          maxWidth: '438px',
          marginTop: '22px',
        }}
        >
          <Typography variant="subtitle1" fontWeight={500}>Вакансия</Typography>
          <TextField
            placeholder="Например, Фронтенд-разработчик"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>
      <Typography variant='h3' color={'#797981'} paddingTop={'210px'} textAlign={'center'}>У вас еще нет закрытых вакансий</Typography>
      {/* <VacancyCard /> */}
    </Box>
  );
}
