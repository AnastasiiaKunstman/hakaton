/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import {
  Typography, Button, Box, IconButton,
} from '@mui/material';
import { IVacancy } from '../../features/vacancy/vacancySlice';
import CloseIcon from '../../images/close_mini.svg';

interface DelCardProps {
  card: IVacancy;
  onDelete: () => void;
  onCancel: () => void;
}

const DelCard:FC<DelCardProps> = ({
  card, onDelete, onCancel,
}) => (
  <>
    <Box
      key={card.id}
      sx={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      }}
    >
      <Typography variant="h1">Вы уверены?</Typography>
      <form action="#" method="post" onSubmit={onDelete}>
        <Button
          variant="contained"
          sx={{
            width: '153px',
            backgroundColor: '#5A9BFF',
            color: '#fff',
            height: '40px',
            borderRadius: '6px',
            padding: '10px 20px',
            fontFamily: 'YS Text',
            fontSize: '14px',
            lineHeight: '20px',
          }}
          type="submit"
          aria-label="Сохранение данных"
        >
          Да
        </Button>

      </form>

    </Box>
    <IconButton
      type="button"
      aria-label="Отмена"
      onClick={onCancel}
      sx={{ position: 'absolute', top: '0', right: '0'}}
    >
      <img src={CloseIcon} alt="Закрыть" />
    </IconButton>
  </>
);

export default DelCard;
