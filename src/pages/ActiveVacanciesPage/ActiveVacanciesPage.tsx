/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import VacancyCard from '../../components/vacancyCard/VacancyCard';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import { getCards } from '../../store/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ActiveVacancy: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <>
      <LoggedUserHeader />
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems={results.length === 0 ? 'center' : 'flex-start'}
          gap="8px"
          marginTop="24px"
        >
          {results.length === 0 ? (
            <>
              <Typography variant="h3" color="#797981" paddingTop="210px">
                У вас еще нет активных вакансий
              </Typography>
              <Link style={{ textDecoration: 'none', color: '#5A9BFF' }} to="/vacancies">
                Создать вакансию
              </Link>
            </>
          ) : (
            results.map((card) => (
              <VacancyCard key={card.id} card={card} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default ActiveVacancy;
