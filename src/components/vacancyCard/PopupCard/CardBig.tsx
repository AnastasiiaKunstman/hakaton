/* eslint-disable max-len */
/* eslint-disable no-console */
import {
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { IVacancy, getVacancies } from '../../../store/vacancy/vacancySlice';
import { useAppDispatch } from '../../../store/hooks';

interface CardBigProps {
  vacancy: IVacancy;
}

function CardBig({ vacancy }: CardBigProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  const skills = vacancy.required_skills.map((name) => name.name).join(',  ');
  const formattedDate = format(new Date(vacancy.pub_date), 'dd.MM');
  const edLevel = vacancy.required_education_level.map((name) => name.name);
  const scheduleString = vacancy.schedule.map((name) => name.name);
  const specString = vacancy.specialization.map((name) => name.name);

  return (
    <Box maxWidth="xl" sx={{ p: '28px 44px' }}>
      <form>
        <Grid container item xs={12}>
          <Grid item container xs={5} flexDirection="column" gap="20px">
            <Grid sx={{ p: 0, mb: '20px' }}>
              <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                Вакансия
              </Typography>
              <Typography>{vacancy.name}</Typography>
            </Grid>
            <Grid padding={0}>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Зарплата:
                {' '}
                {vacancy.salary}
              </Typography>
            </Grid>

            <Grid padding={0}>
              <Typography variant="caption">
                Дата создания вакансии:
                {' '}
                {formattedDate}
              </Typography>
            </Grid>

            <Grid padding={0}>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Локация:
                {' '}
                {vacancy.location}
              </Typography>
            </Grid>

            <Grid padding={0}>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Формат работы:
                {' '}
                {scheduleString}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Уровень:
                {' '}
                {edLevel}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Специализация:
                {' '}
                {specString}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs
            sx={{
              justifyContent: 'flex-start', flexDirection: 'column', p: 0, gap: '20px',
            }}
          >
            <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
              Описание
            </Typography>
            <Grid
              item
              container
              xs
              sx={{
                padding: '0',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Технологии, ключевые слова:
                </Typography>
                <Typography>
                  {skills}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Описание работы:
                </Typography>
                <Typography>{vacancy.text}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: '27px',
        }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button variant="contained">
              Переместить в архив
            </Button>
            <Button variant="contained" className="publish-button">
              Удалить вакансию
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default CardBig;
