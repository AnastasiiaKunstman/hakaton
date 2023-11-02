/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { schema } from '../../utils/validation/yupSchema';
import userLogin from '../../store/authActions';
import { useAppDispatch } from '../../store/store';

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget as HTMLInputElement;
    const fieldName = (e.currentTarget as HTMLInputElement).id;
    // eslint-disable-next-line default-case
    switch (fieldName) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // Заменить на React.FormEvent<HTMLFormElement>
  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    interface LoginData {
      email: string,
      password: string
    }
    const loginData: LoginData = {
      email,
      password,
    };

    dispatch(userLogin(loginData))
      .then(() => {
      // Навигация только после успешного запроса
        navigate('/vacancies', { replace: true });
      })
      .catch((reason: string) => console.log(reason));
  };
  return (
    <Container component="main" className="authPage">
      <CssBaseline />
      <Container maxWidth="xs">
        <form onSubmit={handleSubmitForm}>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: '12px',
              px: 3,
              py: 3,
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '400px',
            }}
          >
            <Typography component="h2" variant="h5" sx={{ fontSize: 24 }}>
              Карьерный Трекер.Найм
            </Typography>
            <Typography component="h2" variant="body1" sx={{ fontSize: 16, color: '#797981', margin: '24px auto 15px' }}>
              Войти в аккаунт
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                placeholder="Почта"
                autoFocus
                value={email}
                error={!!errors.email}
                helperText={errors.email ? `${errors.email.message}` : ''}
                {...register('email')}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                placeholder="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error={!!errors.password}
                helperText={errors.password ? `${errors.password.message}` : ''}
                {...register('password')}
                onChange={handleChange}
              />
              <Link href="#" variant="body2" underline="none">
                Не помню пароль
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, borderRadius: '6', height: 50,
                }}
              >
                Войти
              </Button>

            </Box>
          </Box>
        </form>
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
        }}
        >
          <Typography variant="body1" sx={{ fontWeight: 400, color: '#797981' }}>Новый пользователь?</Typography>
          <Link
            href="/registration"
            variant="body2"
            underline="none"
            sx={{ py: 3 }}
          >
            Зарегистрироваться
          </Link>
        </Box>
      </Container>
    </Container>
  );
}
