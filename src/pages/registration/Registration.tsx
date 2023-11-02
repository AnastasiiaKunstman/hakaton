/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { ChangeEvent, useState } from 'react';
import { schema } from '../../utils/validation/yupSchema';
import { useAppDispatch } from '../../store/store';
import { signupUser } from '../../store/userSlice';

export default function Registration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget as HTMLInputElement;
    const fieldName = (e.currentTarget as HTMLInputElement).id;
    // eslint-disable-next-line default-case
    switch (fieldName) {
      case 'first_name':
        setFirstName(value);
        break;
      case 'last_name':
        setSecondName(value);
        break;
      case 'telegram':
        setTelegram(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhone(value);
        break;
      case 'company':
        setCompany(value);
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

    interface RegisterData {
      first_name: string,
      last_name: string,
      telegram: string,
      email: string,
      password: string,
      phone_number: string,
      company: string,
    }

    const registrationData: RegisterData = {
      first_name: firstName,
      last_name: secondName,
      telegram,
      email,
      password,
      company,
      phone_number: phoneNumber,
    };

    dispatch(signupUser(registrationData))
      .then(() => {
        // Навигация только после успешного запроса
        navigate('/profile', { replace: true });
        unwrapResult;
      })
      .catch((reason) => console.log(reason));
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
              Зарегистрировать аккаунт
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="first_name"
                    value={firstName}
                    placeholder="Имя"
                    error={!!errors.name}
                    helperText={errors.name ? `${errors.name.message}` : ''}
                    {...register('name')}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    value={secondName}
                    placeholder="Фамилия"
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    helperText={errors.lastName ? `${errors.lastName.message}` : ''}
                    {...register('lastName')}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="telegram"
                    value={telegram}
                    placeholder="telegram"
                    error={!!errors.lastName}
                    helperText={errors.lastName ? `${errors.lastName.message}` : ''}
                    {...register('lastName')}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={email}
                    placeholder="Почта"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email ? `${errors.email.message}` : ''}
                    {...register('email')}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    value={phoneNumber}
                    placeholder="Телефон"
                    /* error={!!errors.phone}
                    helperText={errors.phone ? `${errors.phone.message}` : ''}
                    {...register('phone')} */
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    placeholder="Компания"
                    type="company"
                    id="company"
                    value={company}
                    /* error={!!errors.password}
                    helperText={errors.password ? `${errors.password.message}` : ''}
                    {...register('password')} */
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    value={password}
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password ? `${errors.password.message}` : ''}
                    {...register('password')}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, borderRadius: '6', height: 50,
                }}
              >
                Зарегистрироваться
              </Button>
            </Box>
          </Box>
        </form>
        <Grid container justifyContent="center">
          <Grid
            item
            sx={{
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#797981' }}>Уже есть аккаунт?</Typography>
            <Link
              href="/login"
              variant="body2"
              underline="none"
              sx={{ py: 3 }}
            >
              Войти
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
