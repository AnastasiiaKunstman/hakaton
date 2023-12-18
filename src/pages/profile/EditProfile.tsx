/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import {
  Avatar,
  TextField,
  Grid,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationShema } from '../../utils/validation/yupSchema';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Snackbars from '../../components/SnackBars/SnackBars';
import LocationFilter from '../../components/Filter/LocationFilter';
import { IVacancy, deleteVacancy } from '../../features/vacancy/vacancySlice';
import CloseIcon from '../../images/close_12.svg';
import Link from '../../images/link.svg';
// import LinkH from '../../images/link-hover.svg';

interface EditProfileProps {
  onChange: (field: string, value: string) => void
  onClick: () => void
  onSave: (e: React.FormEvent) => void
}

const EditProfile: FC<EditProfileProps> = ({ onChange, onClick, onSave }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { vacancyList } = useAppSelector((state) => state.vacancies);
  const profile = useAppSelector((state) => state.profile.profile);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationShema),
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteCard = async (vacancyID: number) => {
    try {
      await dispatch(deleteVacancy(vacancyID));

      setSnackbarSeverity('success');
      setSnackbarMessage('Вакансия успешно удалена.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Ошибка при удалении вакансии.');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={onSave}
      >
        <Grid container gap="40px">
          <Grid
            item
            xs={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '40px',
              height: '593px',
            }}
          >
            <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Grid sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Grid sx={{
                  display: 'flex', flexDirection: 'column', gap: '8px', width: '154px', alignItems: 'center', margin: '22px 28.5px',
                }}
                >
                  <Avatar alt="Аватар" src={profile?.avatar} sx={{ width: '60px', height: '60px' }} />
                  <Typography variant="body2" sx={{ color: '#1D6BF3', fontWeight: 500, lineHeight: '20px' }}>Заменить фото</Typography>
                </Grid>
                <Grid sx={{
                  display: 'flex', flexDirection: 'column', gap: '12px', width: '100%',
                }}
                >
                  <Grid xs item>
                    <Typography variant="body2" fontWeight={500}>Имя</Typography>
                    <TextField
                      fullWidth
                      placeholder="Имя"
                      variant="outlined"
                      size="small"
                      sx={{ marginTop: '4px' }}
                      defaultValue={profile?.first_name}
                      error={!!errors.first_name}
                      helperText={errors.first_name ? `${errors.first_name.message}` : ''}
                      {...register('first_name')}
                      // eslint-disable-next-line max-len
                      onChange={(e) => onChange('first_name', e.target.value)}
                    />
                  </Grid>
                  <Grid xs item>
                    <Typography variant="body2" fontWeight={500}>Фамилия</Typography>
                    <TextField
                      sx={{ marginTop: '4px' }}
                      fullWidth
                      size="small"
                      placeholder="Фамилия"
                      variant="outlined"
                      defaultValue={profile?.last_name}
                      onChange={(e) => onChange('last_name', e.target.value)}
                    />
                  </Grid>

                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex' }} gap="12px">
                <Grid xs={6} item>
                  <Typography variant="body2" fontWeight={500}>Почта</Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    sx={{ marginTop: '4px' }}
                    placeholder="Почта"
                    variant="outlined"
                    defaultValue={profile?.email}
                    error={!!errors.email}
                    helperText={errors.email ? `${errors.email.message}` : ''}
                    {...register('email')}
                    onChange={(e) => onChange('email', e.target.value)}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography variant="body2" fontWeight={500}>Пароль</Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    sx={{ marginTop: '4px' }}
                    placeholder="Пароль"
                    variant="outlined"
                    defaultValue={profile?.password}
                    error={!!errors.password}
                    helperText={errors.password ? `${errors.password.message}` : ''}
                    {...register('password')}
                    onChange={(e) => onChange('password', e.target.value)}
                  />
                </Grid>
              </Grid>

            </Grid>

            <Grid container xs={12} item marginTop="6px" height="349px">
              <Grid xs item>
                <Typography variant="body2" fontWeight={500}>
                  Шаблон
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Здесь будет шаблон"
                  sx={{
                    color: '#797981', marginTop: '4px', marginBottom: '8px', borderRadius: '4px',
                  }}
                  variant="outlined"
                  multiline
                  rows="9.5"
                />
                <Box sx={{ display: 'flex', gap: '20px', height: '40px' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: '50%',
                      border: '1px solid #1D6BF3',
                      color: '#1D6BF3',
                      fontFamily: 'YS Text',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                    }}
                  >
                    <img src={Link} alt="Ссылка" />
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      width: '50%',
                      border: '1px solid #1D6BF3',
                      color: '#1D6BF3',
                      fontFamily: 'YS Text',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      '&:hover': {
                        color: '#fff',
                        backgroundColor: '#1D6BF3',
                      },
                    }}
                  >
                    Запомнить шаблон
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </Grid>
          <Grid
            item
            xs
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              height: '593px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Grid sx={{ width: '50%' }}>
                <Typography variant="subtitle1" fontWeight={500}>Название компании</Typography>
                <TextField
                  id="company"
                  fullWidth
                  size="small"
                  sx={{ marginTop: '4px' }}
                  variant="outlined"
                  defaultValue={profile?.company}
                  onChange={(e) => onChange('company', e.target.value)}
                />
              </Grid>
              <Grid sx={{ width: '50%' }}>
                <LocationFilter />
              </Grid>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={500} sx={{ mb: '4px' }}>
                Вакансии в работе:
                {' '}
                {`${vacancyList.length === 0 ? 'У вас еще нет активных вакансий' : `${vacancyList.length}`}`}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {vacancyList.map((vacancies: IVacancy) => (
                  <Box
                    key={vacancies.id}
                    sx={{
                      borderRadius: '4px',
                      backgroundColor: '#F1F6FF',
                      color: '#1A1B22',
                      textAlign: 'center',
                      height: 'min-content',
                      width: 'max-content',
                      padding: '6px 12px',
                      margin: '4px',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <Typography variant="body2" lineHeight="16px">
                        {vacancies.name}
                      </Typography>
                      <IconButton sx={{ p: 0 }} onClick={() => handleDeleteCard(vacancies.id)}>
                        <img src={CloseIcon} alt="Иконка крестик" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" fontWeight={500}>
                Сфера деятельности
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Например, Fintech"
                variant="outlined"
                sx={{ width: '50%', borderRadius: '4px', marginTop: '4px' }}
              />
            </Box>
            <Box sx={{ height: '100%' }}>
              <Typography variant="body2" fontWeight={500}>
                Описание компании
              </Typography>
              <TextField
                placeholder="Описание компании"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: '4px', marginTop: '4px' }}
                multiline
                rows={11}
              />
            </Box>

          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt: '30px',
          }}
        >
          <Button
            sx={{
              mr: 2,
              color: '#B5B5B7',
              borderRadius: '6px',
              '&:hover': {
                color: '#fff',
                backgroundColor: '#1D6BF3',
              },
            }}
            variant="outlined"
            onClick={onClick}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#5A9BFF',
              color: '#fff',
              width: '386px',
              height: '40px',
              borderRadius: '6px',
              padding: '10px 20px',
              fontFamily: 'YS Text',
              fontSize: '14px',
              lineHeight: '20px',
              '&:hover': {
                backgroundColor: '#1D6BF3',
                boxShadow: 'none',
              },
            }}
          >
            Сохранить
          </Button>
        </Box>
      </form>

      <Snackbars
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default EditProfile;
