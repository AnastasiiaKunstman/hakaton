/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '../../../UI/Input/Input';
import { signUp } from '../../../app/index';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { registrationShema } from '../../../utils/index';
import './Registration.scss';

type formRegistration = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
};

const Registration: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isSuccess, isError } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationShema),
  });

  useEffect(() => {
    if (user) navigate('/profile-modal');
  }, [user, navigate]);

  const onSubmit = async (userData: formRegistration) => {
    await dispatch(signUp(userData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box className="modal-box">
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          Карьерный Трекер.Найм
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16, color: '#797981' }}>
          Зарегистрировать аккаунт
        </Typography>
        <Box className="input">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type="text"
                placeholder="Имя"
                register={register}
                registerName="first_name"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="text"
                placeholder="Фамилия"
                register={register}
                registerName="last_name"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            {/* <Grid item xs={12}>
                <Input
                type="telegram"
                placeholder="Telegram"
                register={register}
                registerName="telegram"
              />
              </Grid> */}
            <Grid item xs={12}>
              <Input
                type="email"
                placeholder="E-mail"
                register={register}
                registerName="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="phone_number"
                placeholder="Телефон"
                register={register}
                registerName="phoneNumber"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="company"
                placeholder="Компания"
                register={register}
                registerName="company"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="password"
                placeholder="Пароль"
                register={register}
                registerName="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: '12px', borderRadius: '6', height: 50,
            }}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
      }}
      >
        <Typography variant="body1" sx={{ fontWeight: 400, color: '#797981' }}>Уже есть аккаунт?</Typography>
        <Link
          className="link"
          href="/sign-in"
          variant="body2"
          underline="none"
          sx={{ py: 3, color: '#fff' }}
        >
          Войти
        </Link>
      </Box>
    </form>
  );
};

export default Registration;
