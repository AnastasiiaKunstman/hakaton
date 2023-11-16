/* eslint-disable max-len */
/* eslint-disable no-console */
import {
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import { IResult } from '../../../store/card/cardSlice';

interface CardBigProps {
  card: IResult;
}

function CardBig({ card }: CardBigProps) {
  const skills = card.required_skills.map((name) => name.name).join(',  ');
  const formattedDate = format(new Date(card.pub_date), 'dd.MM');
  const edLevel = card.required_education_level.map((name) => name.name);
  const scheduleString = card.schedule.map((name) => name.name);
  // const specString = card.specialization.map((name) => name.name);

  return (
    <Box maxWidth="xl" key={card.id} sx={{ p: '28px 44px' }}>
      <form>
        <Grid container item xs={12}>
          <Grid item container xs={5} flexDirection="column" gap="20px">
            <Grid sx={{ p: 0, mb: '20px' }}>
              <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                Вакансия
              </Typography>
              <Typography>{card.name}</Typography>
            </Grid>
            <Grid padding={0}>
              <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                Зарплата:
                {' '}
                {card.salary}
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
                {card.location.name}
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
                {}
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
                <Typography>{card.text}</Typography>
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
