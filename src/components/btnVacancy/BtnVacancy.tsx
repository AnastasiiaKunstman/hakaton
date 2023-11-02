import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './BtnVacancy.scss';

export default function BtnVacancy() {
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
          <div className="edit-buttons">
            <button type="submit" className="clear-button" >
              Сохранить
            </button>
            <button type="submit" className="publish-button">
              <Link style={{ textDecoration: 'none', color: '#fff' }} to="/students">Опубликовать вакансию и начать поиск</Link>
            </button>
          </div>
        </Box>
      ) : location.pathname === '/vacancies/id' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: '27px',
          }}
        >
          <div className="edit-buttons">
            <button type="button" className="edit-button">
              Удалить вакансию
            </button>
            <button type="button" className="edit-button">
              В архив
            </button>
          </div>
          <div className="edit-buttons">
            <button type="button" className="clear-button">
              Очистить текст
            </button>
            <button type="button" className="publish-button">
              Сохранить
            </button>
          </div>
        </Box>
      ) : null}
    </>
  );
}
