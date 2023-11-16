/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { FC, useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import VacancyCard from '../../components/vacancyCard/VacancyCard';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import { deleteCard, getCards } from '../../store/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Snackbars from '../../components/SnackBars/SnackBars';
import VacancyFilter from '../../components/Filter/VacancyFilter';

const ActiveVacancy: FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { results, isLoading, isError } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteCard = (cardId: number) => {
    dispatch(deleteCard(cardId));

    // const isDeletionSuccessful = deleteCard(cardId);

    if (deleteCard(cardId)) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Вакансия успешно удалена.');
    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage('Ошибка при удалении вакансии.');
    }

    setSnackbarOpen(true);
  };

  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 100px', height: '92vh' }}>
        <NavigationMenu />
        <VacancyFilter />
        <Box
          display="flex"
          flexDirection={results && results.length === 0 ? 'column' : 'row'}
          flexWrap={results && results.length === 0 ? 'nowrap' : 'wrap'}
          alignItems={results && results.length === 0 ? 'center' : 'flex-start'}
          gap={results && results.length === 0 ? '8px' : '20px'}
          marginTop="24px"
        >
          {isLoading && (
          <Box sx={{ textAlign: 'center', paddingTop: '210px', width: '100vw' }}>
            <CircularProgress />
          </Box>
          )}
          {isError && <Typography>Ошибка! Что-то пошло не так</Typography>}
          {!isLoading && !isError && results?.length === 0 ? (
            <Box sx={{ textAlign: 'center', paddingTop: '210px' }}>
              <Typography variant="h3" color="#797981">
                У вас еще нет активных вакансий
              </Typography>
              <Link style={{ textDecoration: 'none', color: '#5A9BFF' }} to="/vacancies">
                Создать вакансию
              </Link>
            </Box>
          ) : null}
          {!isLoading && !isError && results !== null && results?.map((card) => (
            <VacancyCard key={card.id} card={card} onDelete={() => handleDeleteCard(card.id)} />
          ))}
        </Box>
      </Box>

      {/* Компонент Snackbar */}
      <Snackbars
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default ActiveVacancy;
