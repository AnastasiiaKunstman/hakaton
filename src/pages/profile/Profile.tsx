/* eslint-disable react/function-component-definition */
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect, FC } from 'react';
import Location from '../../images/location.svg';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import { getProfile, IProfile } from '../../store/profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IVacancy, getVacancies } from '../../store/vacancy/vacancySlice';
import EditProfile from './EditProfile';

const Profile:FC = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const { vacancyList } = useAppSelector((state) => state.vacancies);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVacancies());
    dispatch(getProfile());
  }, [dispatch]);

  const [isProfileEdit, setIsProfileEdit] = useState(false);

  const [profileData, setProfileData] = useState<IProfile | null>(profile ? { ...profile } : null);

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsProfileEdit(!isProfileEdit);
  };

  const navigate = useNavigate();

  const handleProfileFClose = () => {
    navigate(-1);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData((prevData) => {
      if (prevData === null) {
        return null;
      }

      return { ...prevData, [field]: value };
    });
  };

  // console.log(vacancyList);
  // console.log(profileData);

  return (
    <Box sx={{ height: '100vh' }}>
      <LoggedUserHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '28px 117px 20px',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 500, lineHeight: '130%' }}>
          Информация профиля
        </Typography>
        <IconButton color="inherit" onClick={handleProfileFClose}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: '14px 117px 50px' }}>
        {!isProfileEdit
          ? (
            <Grid container gap="20px">
              <Grid
                item
                xs={5}
                sx={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px',
                }}
              >
                <Box
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: '12px',
                    p: 2,
                    pr: 3,
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                  }}
                >
                  <Avatar alt="Аватар" src={profileData?.avatar} sx={{ height: '60px', width: '60px', mr: 2 }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 500, maxWidth: 300, mb: '8px' }}>
                      {profileData ? `${profileData.last_name} ${profileData.first_name}` : ''}
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 300 }}>
                      Информация
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#5A9BFF' }}>
                      {profileData?.email}
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
                <Grid
                  xs
                  item
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: '12px',
                    padding: '16px 16px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'space-between',
                  }}
                >
                  <Grid>
                    <Typography variant="caption" fontWeight={500}>
                      Шаблон
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Здесь будет шаблон"
                      sx={{ color: '#797981', marginTop: '4px', borderRadius: '4px' }}
                      variant="outlined"
                      multiline
                      minRows={2}
                      maxRows={12}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="caption" fontWeight={500}>
                      Ссылка или файл
                    </Typography>
                    <Box sx={{
                      display: 'flex', gap: '20px', justifyContent: 'space-between', marginTop: '4px',
                    }}
                    >
                      <TextField
                        fullWidth
                        placeholder="Подготовьте заранее письмо или ссылку на тестовое задание"
                        sx={{
                          color: '#797981', borderRadius: '4px',
                        }}
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        sx={{
                          width: '40%', borderRadius: '6px', border: '1px solid #1D6BF3', color: '#1D6BF3', fontFamily: 'YS Text', fontSize: '14px', fontWeight: 500, lineHeight: '20px',
                        }}
                      >
                        Отправить
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs>
                <Box
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .2)',
                    borderRadius: '12px',
                    padding: '16px 16px 32px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    height: 'max-content',
                  }}
                >
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 500, mb: '8px' }}>
                      {profileData?.company}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img style={{ width: '24px', height: '24px' }} className="img__location" src={Location} alt="Локация" />
                      <Typography variant="body2" sx={{ color: '#797981' }}>
                        Москва
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight={500} sx={{ mb: '4px' }}>
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
                            cursor: 'pointer',
                          }}
                        >
                          <Typography variant="body2" lineHeight="16px">{vacancies.name}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight={500}>
                      Сфера деятельности
                    </Typography>
                    <Box sx={{
                      display: 'flex', gap: '20px', alignItems: 'center', marginTop: '4px',
                    }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Например, Fintech"
                        variant="outlined"
                        sx={{ width: '50%', borderRadius: '4px' }}
                      />
                      <Typography variant="body2" sx={{ mb: '8px', color: '#5A9BFF', width: '50%' }}>
                        Укажите деятельность — это улучшит качество поиска и авто-подбора кандидатов
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight={500}>
                      Описание
                    </Typography>
                    <Box sx={{
                      display: 'flex', gap: '20px', alignItems: 'center', marginTop: '4px',
                    }}
                    >
                      <TextField
                        placeholder="Подсказка"
                        variant="outlined"
                        sx={{ width: '50%', borderRadius: '4px' }}
                        multiline
                        minRows={1}
                        maxRows={12}
                      />
                      <Typography variant="body2" sx={{ mb: '8px', color: '#5A9BFF', width: '50%' }}>
                        Описание кампании сэкономит время и увеличит отклики к вакансии
                      </Typography>
                    </Box>
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
            <EditProfile
              key={profile?.id}
              onChange={handleChange}
              onClick={handleEditClick}
            />
          )}
      </Box>
    </Box>
  );
};

export default Profile;
