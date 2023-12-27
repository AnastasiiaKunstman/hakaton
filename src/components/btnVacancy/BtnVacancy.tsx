/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import './BtnVacancy.scss';

const BtnVacancy: FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/vacancies' ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: '27px',
        }}
        >
          <Box className="edit-buttons">
            <Button type="submit" className="save-button">
              Сохранить
            </Button>
            <Button type="submit" className="publish-button">
              Опубликовать вакансию и начать поиск
            </Button>
          </Box>
        </Box>
      ) : location.pathname === '/vacancies/active#contained-buttons' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: '27px',
          }}
        >
          <Box className="edit-buttons">
            <Button className="edit-button">
              Удалить вакансию
            </Button>
            <Button className="cancel-button">
              В архив
            </Button>
          </Box>
          <Box className="edit-buttons">
            <Button className="clear-button">
              Очистить текст
            </Button>
            <Button type="submit" className="publish-button">
              Сохранить
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default BtnVacancy;
