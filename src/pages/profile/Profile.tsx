import { Link } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';
import { useState, ChangeEvent } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from '../../utils/validation/yupSchema';

const testData = {
  avatar: 'https://funart.pro/uploads/posts/2021-04/1618313148_42-funart_pro-p-kapibara-i-chelovek-zhivotnie-krasivo-foto-42.jpg',
  firstName: 'Иван',
  lastName: 'Иванов',
  email: 'good-hr@ya.ru',
  telegram: '@good-hr',
  phoneNumber: '88005553535',
  company: 'Yandex',
  password: 'secretWeShouldNotShow!1',
  info: 'Менеджер по подбору персонала',
};
export default function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [telegram, setTelegram] = useState('');
  const [company, setCompany] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget as HTMLInputElement;
    const fieldName = (e.currentTarget as HTMLInputElement).id;
    switch (fieldName) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'telegram':
        setTelegram(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
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
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interface UpdateData {
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      company: string,
      phoneNumber: string,
      telegram: string,
    }
    const updateData: UpdateData = {
      email,
      password,
      firstName,
      lastName,
      company,
      phoneNumber,
      telegram,
    };
  };

  function handleEditClick() {
    setIsProfileEdit(!isProfileEdit);
  }
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              height: 16,
              mb: 3,
            }}
          >
            Информация профиля
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {}}
            component={Link}
            to="/login"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
        {!isProfileEdit
          ? (
            <Grid container columnSpacing={2} rowSpacing={5}>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
              >
                <Box
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: 2,
                    p: 2,
                    pr: 3,
                    display: 'flex',
                    position: 'relative',
                  }}
                >
                  <Avatar
                    alt={testData.firstName}
                    src={testData.avatar}
                    sx={{
                      height: 60,
                      width: 60,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography>
                      {`${testData.lastName} ${testData.firstName}`}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: '14px',
                        maxWidth: 300,
                      }}
                    >
                      {testData.info}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: '16px',
                        color: `${blue[500]}`,
                      }}
                    >
                      {testData.email}
                    </Typography>
                    <IconButton
                      sx={{
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                      onClick={handleEditClick}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: 2,
                    p: 2,
                    pr: 3,
                    mt: 2,
                    position: 'relative',
                  }}
                >
                  <Typography>
                    Шаблон
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid rgba(0, 0, 0, .2)',
                      borderRadius: 1,
                      p: 1,
                      height: 196,
                    }}
                  >
                    <Typography
                      fontSize={14}
                      sx={{
                        opacity: '.5',
                      }}
                    >
                      Подготовьте заранее письмо или ссылку на тестовое задание
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={handleEditClick}
                    sx={{
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
              >
                <Box
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: 2,
                    p: 2,
                    position: 'relative',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      component="h2"
                    >
                      {testData.company}
                    </Typography>
                    <Typography
                      component="p"
                      fontSize={18}
                      sx={{
                        opacity: '.5',
                        lineHeight: '18px',
                        mt: 1,
                      }}
                    >
                      <LocationOnIcon fontSize="small" />
                      Москва
                    </Typography>
                    <Typography
                      fontSize={16}
                      fontWeight={500}
                      sx={{
                        mt: 1,
                        mb: 2,
                      }}
                    >
                      Сфера деятельности
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="В разработке"
                      variant="outlined"
                      sx={{
                        maxWidth: 600,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Typography
                      fontSize={16}
                      fontWeight={500}
                      sx={{
                        mt: 1,
                        mb: 1,
                      }}
                    >
                      Описание
                    </Typography>
                    <TextField
                      placeholder="В разработке"
                      fullWidth
                      variant="outlined"
                      sx={{
                        maxWidth: 600,
                      }}
                      multiline
                      rows={4}
                    />
                    <IconButton
                      sx={{
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                      onClick={handleEditClick}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )
          : (
            <form onSubmit={handleSubmitForm} noValidate>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  sm={5}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Avatar
                      alt={testData.firstName}
                      src={testData.avatar}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 8,
                      }}
                    />
                    <Box>
                      <TextField
                        sx={{
                          mb: 2,
                        }}
                        required
                        fullWidth
                        id="firstName"
                        label="Имя"
                        variant="outlined"
                        defaultValue={testData.firstName}
                        error={!!errors.name}
                        helperText={errors.name ? `${errors.name.message}` : ''}
                        {...register('name')}
                        onChange={handleChange}
                      />
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Фамилия"
                        variant="outlined"
                        defaultValue={testData.lastName}
                        error={!!errors.lastName}
                        helperText={errors.lastName ? `${errors.lastName.message}` : ''}
                        {...register('lastName')}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                  <TextField
                    id="avatar"
                    fullWidth
                    label="Аватар"
                    variant="outlined"
                    defaultValue={testData.avatar}
                    error={!!errors.avatar}
                    helperText={errors.avatar ? `${errors.avatar.message}` : ''}
                    {...register('avatar')}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                >
                  <TextField
                    sx={{
                      mb: 2,
                    }}
                    fullWidth
                    id="company"
                    label="Компания"
                    variant="outlined"
                    defaultValue={testData.company}
                    error={!!errors.company}
                    helperText={errors.company ? `${errors.company.message}` : ''}
                    {...register('company')}
                    onChange={handleChange}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        defaultValue={testData.email}
                        error={!!errors.email}
                        helperText={errors.email ? `${errors.email.message}` : ''}
                        {...register('email')}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        variant="outlined"
                        defaultValue={testData.password}
                        error={!!errors.password}
                        helperText={errors.password ? `${errors.password.message}` : ''}
                        {...register('password')}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="telegram"
                        label="Telegram"
                        variant="outlined"
                        defaultValue={testData.telegram}
                        error={!!errors.telegram}
                        helperText={errors.telegram ? `${errors.telegram.message}` : ''}
                        {...register('telegram')}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="phoneNumber"
                        label="Номер телефона"
                        variant="outlined"
                        defaultValue={testData.phoneNumber}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber ? `${errors.phoneNumber.message}` : ''}
                        {...register('phoneNumber')}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  mt: 3,
                }}
              >
                <Button
                  sx={{
                    mr: 2,
                  }}
                  variant="text"
                  color="inherit"
                  onClick={handleEditClick}
                >
                  Отмена
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={() => {}}
                >
                  Сохранить изменения
                </Button>
              </Box>
            </form>
          )}
      </Container>
    </>
  );
}