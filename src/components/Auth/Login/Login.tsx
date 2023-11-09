/* eslint-disable react/function-component-definition */
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Input from '../../../UI/Input/Input';
import { login } from '../../../store/index';
import { loginShema } from '../../../utils/index';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './Login.scss';

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginShema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isError, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/active-vacancies');
  }, [user, navigate]);

  const onSubmit = async (userData: Inputs) => {
    dispatch(login(userData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box className="modal-box">
        <Typography component="h2" variant="h5" sx={{ fontSize: 24 }}>
          Карьерный Трекер.Найм
        </Typography>
        <Typography component="h2" variant="body1" sx={{ fontSize: 16, color: '#797981' }}>
          Войти в аккаунт
        </Typography>
        <Box className="input">
          <Input
            type="email"
            placeholder="Почта"
            register={register}
            registerName="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Input
            type="password"
            placeholder="Пароль"
            register={register}
            registerName="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Link className="link" sx={{ mt: '-4px' }} href="/password-recovery" variant="body2" underline="none">
            Не помню пароль
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: '12px', borderRadius: '6', height: 50,
            }}
          >
            Войти
          </Button>

        </Box>
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
      }}
      >
        <Typography variant="body1" sx={{ fontWeight: 400, color: '#797981' }}>Новый пользователь?</Typography>
        <Link
          className="link"
          href="/sign-up"
          variant="body2"
          underline="none"
          sx={{ py: 3, color: '#fff' }}
        >
          Зарегистрироваться
        </Link>
      </Box>
    </form>
  );
};

export default Login;
