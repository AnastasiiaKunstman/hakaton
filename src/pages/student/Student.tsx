import {
  Avatar,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  IconButton,
  TextField,
  Tab,
  Button,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { SyntheticEvent, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Location from '../../images/location.svg';
import Vector from '../../images/Vector.svg';
import { IResult } from '../../store/students/studentSlice';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import Book from '../../images/diary.svg';
import Info from '../../images/info.svg';
import AI from '../../images/tetris_white.svg';
import Eye from '../../images/ea.svg';

interface StudentProps {
  student: IResult;
  onFavorite: (studentId: number, isFavorite: boolean) => void;
  onCancel: () => void;
}

export default function Student({ student, onFavorite, onCancel }: StudentProps) {
  const [isFavorite, setIsFavorite] = useState(student.is_favorited);
  const [value, setValue] = useState('1');
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleFavoriteClick = () => {
    onFavorite(student.id, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  const edLevel = student.required_education_level?.map((name) => name.name).join(',  ');
  const skillsString = student.skills.map((name) => name.name);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: '#1D6BF3', pt: '28px' }}>
            <TabList onChange={handleChange} textColor="inherit">
              <IconButton color="inherit" onClick={onCancel}>
                <img src={Vector} alt="Стрелка назад" />
              </IconButton>
              <Tab
                label="Резюме кандидата"
                value="1"
                sx={{
                  fontWeight: 500,
                  lineHeight: '130%',
                  fontFamily: 'YS Display',
                  fontSize: '24px',
                }}
              />
              <Tab
                label="Аналитика"
                value="2"
                sx={{
                  fontWeight: 500,
                  lineHeight: '130%',
                  fontFamily: 'YS Display',
                  fontSize: '24px',
                }}
              />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                pt: '34px',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 500, lineHeight: '110%', color: '#5A9BFF' }}>
                Вакансия: Название вакансии
              </Typography>
            </Box>

            <Box
              maxWidth="lg"
              sx={{
                mt: 5,
                mb: 2,
                p: 0,
              }}
            >
              <Box
                sx={{
                  border: '1px solid #B5B5B7',
                  borderRadius: '6px',
                  padding: '24px',
                  mb: '42px',
                  display: 'flex',
                  position: 'relative',
                  height: '143px',
                  gap: '20px',
                }}
              >
                <Avatar
                  alt={student.first_name}
                  src={student.avatar}
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                />
                <Box sx={{
                  display: 'flex', flexDirection: 'column', gap: '12px', width: '100%',
                }}
                >
                  <Typography variant="h3" fontWeight={500} lineHeight="110%">
                    {`${student.first_name} ${student.last_name}`}
                  </Typography>
                  <Typography variant="h3" lineHeight="24px">
                    {edLevel || 'Специализация. '}
                    {edLevel || 'Уровень'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img style={{ width: '24px', height: '24px' }} className="img__location" src={Location} alt="Локация" />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      lineHeight="16px"
                      color="#797981"
                    >
                      {student.location.name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '30%',
                }}
                >
                  <Box sx={{ width: '100%' }}>
                    <IconButton
                      onClick={handleFavoriteClick}
                      className={`icon-button__like ${isFavorite ? 'active' : ''}`}
                    />
                    <IconButton
                      className="icon-button__match"
                    />
                    <IconButton>
                      <img src={Eye} alt="Иконка глаза" />
                    </IconButton>
                    <IconButton
                      className="icon-button__telegram"
                      component="a"
                      href={`https://t.me/${student.telegram}`}
                      target="_blank"
                    />
                    <IconButton
                      className="icon-button__email"
                      component="a"
                      href={`mailto:${student.email}`}
                      target="_blank"
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <TextField
               // value={student.matching_percentage}
                      size="small"
                      fullWidth
                      placeholder="Совпадение..."
                      sx={{
                        textAlign: 'center',
                        backgroundColor: '#C2E5CE',
                        padding: 0,
                      }}
                    />
                  </Box>
                </Box>

              </Box>
              <Grid container columnSpacing={5} gap="24px">
                <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Grid>
                    <Typography lineHeight="20px" fontWeight={500} variant="body1">
                      О себе
                    </Typography>
                    <Typography variant="body2" lineHeight="20px" mt="8px">
                      Здесь будет находится информация из резюме кандидата, раздел "О себе"
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography lineHeight="20px" fontWeight={500} variant="body1">
                      Опыт работы
                    </Typography>
                    <Typography variant="body2" lineHeight="20px" mt="8px">
                      Здесь будет находится информация из резюме кандидата, раздел "Опыт работы"
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box display="flex">
                    {skillsString.map((skill, id) => (
                      <Box
                        key={id}
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
                        <Typography variant="body2">{skill}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img style={{ width: '24px', height: '24px' }} src={Book} alt="Книга" />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      lineHeight="16px"
                      color="#797981"
                    >
                      Моё портфолио
                    </Typography>
                  </Box>

                  <Typography lineHeight="20px" fontWeight={500} variant="body1">
                    Сертификаты
                  </Typography>
                  <List>
                    <ListItem
                      disablePadding
                      sx={{
                        fontFamily: 'YS Text',
                        fontSize: '14px',
                        lineHeight: '20px',
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <FiberManualRecordIcon sx={{ fontSize: 5 }} />
                      <Typography>
                        Здесь будет находится информация из резюме кандидата, раздел "Сертификаты"
                      </Typography>
                    </ListItem>
                  </List>
                  <Typography lineHeight="20px" fontWeight={500} variant="body1">
                    Технические навыки
                  </Typography>
                  <List>
                    {student.skills.map((skill) => (
                      <ListItem
                        disablePadding
                        key={skill.id}
                        sx={{
                          fontFamily: 'YS Text',
                          fontSize: '14px',
                          lineHeight: '20px',
                          display: 'flex',
                          gap: '8px',
                        }}
                      >
                        <FiberManualRecordIcon sx={{ fontSize: 5 }} />
                        {skill.name}
                      </ListItem>
                    ))}
                  </List>
                  <Typography lineHeight="20px" fontWeight={500} variant="body1">
                    Языки
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                pt: '34px',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 500, lineHeight: '110%', color: '#5A9BFF' }}>
                Вакансия: Название вакансии
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Typography variant="body2" sx={{ flineHeight: '16px', color: '#797981' }}>
                    Анализ текста резюме нейросетью
                  </Typography>
                  <img src={Info} alt="Информация" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '6px',
                    backgroundColor: '#5A9BFF',
                    boxShadow: 'none',
                    width: '250px',
                    padding: '15px 57px',
                  }}
                  onClick={handleButtonClick}
                >
                  <img
                    src={AI}
                    style={{
                      width: '20px', height: '20px', marginRight: '8px',
                    }}
                    alt="Иконка тетриса"
                  />
                  Аналитика AI
                </Button>
              </Box>
            </Box>
            <Box
              maxWidth="lg"
              sx={{
                mt: 5,
                mb: 2,
                p: 0,
              }}
            >
              <Box
                sx={{
                  border: '1px solid #B5B5B7',
                  borderRadius: '6px',
                  padding: '24px',
                  mb: '21px',
                  display: 'flex',
                  position: 'relative',
                  height: '143px',
                  gap: '20px',
                }}
              >
                <Avatar
                  alt={student.first_name}
                  src={student.avatar}
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                />
                <Box sx={{
                  display: 'flex', flexDirection: 'column', gap: '12px', width: '100%',
                }}
                >
                  <Typography variant="h3" fontWeight={500} lineHeight="110%">
                    {`${student.first_name} ${student.last_name}`}
                  </Typography>
                  <Typography variant="h3" lineHeight="24px">
                    {edLevel || 'Специализация. '}
                    {edLevel || 'Уровень'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img style={{ width: '24px', height: '24px' }} className="img__location" src={Location} alt="Локация" />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      lineHeight="16px"
                      color="#797981"
                    >
                      {student.location.name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '30%',
                }}
                >
                  <Box sx={{ width: '100%' }}>
                    <IconButton
                      onClick={handleFavoriteClick}
                      className={`icon-button__like ${isFavorite ? 'active' : ''}`}
                    />
                    <IconButton
                      className="icon-button__match"
                    />
                    <IconButton>
                      <img src={Eye} alt="Иконка глаза" />
                    </IconButton>
                    <IconButton
                      className="icon-button__telegram"
                      component="a"
                      href={`https://t.me/${student.telegram}`}
                      target="_blank"
                    />
                    <IconButton
                      className="icon-button__email"
                      component="a"
                      href={`mailto:${student.email}`}
                      target="_blank"
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                     // value={student.matching_percentage}
                      size="small"
                      fullWidth
                      placeholder="Совпадение..."
                      sx={{
                        textAlign: 'center',
                        backgroundColor: '#C2E5CE',
                        padding: 0,
                      }}
                    />
                  </Box>
                </Box>

              </Box>
              {!isClicked && (
              <Box
                marginTop="76px"
                sx={{
                  display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center',
                }}
              >
                <Typography lineHeight="110%" color="#5A9BFF" fontWeight={500} variant="h3">
                  Нажмите на кнопку «Аналитика AI»
                </Typography>
                <Typography lineHeight="120%" color="#797981" variant="h3">
                  для получения результатов
                </Typography>
              </Box>
              )}
              {isClicked && (
              <>
                <Box marginBottom="20px">
                  <Typography lineHeight="130%" fontWeight={500} variant="h2">
                    Результаты аналитики:
                  </Typography>
                </Box>

                <Grid container columnSpacing={5} gap="24px">
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Grid>
                      <Typography lineHeight="20px" fontWeight={500} variant="body1">
                        Красные флаги
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        placeholder="Красные флаги — важные моменты на которые нужно обратить внимание. Например, перерыв в работе больше 6 месяцев или смена работы чаще, чем раз в год."
                        sx={{ marginTop: '8px' }}
                      />
                    </Grid>
                    <Grid>
                      <Typography lineHeight="20px" fontWeight={500} variant="body1">
                        Зеленые флаги
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        placeholder="Зеленые флаги — важные моменты на которые нужно обратить внимание. Например, последний опыт работы релевантен с вакансией или профильное образование."
                        sx={{ marginTop: '8px' }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Grid>
                      <Typography lineHeight="20px" fontWeight={500} variant="body1">
                        Общий вывод:
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        placeholder="Здесь будет находится краткий вывод по общей совместимости кандидата с вакансией и критерии на которых основан вывод."
                        sx={{ marginTop: '8px' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
              )}
            </Box>
          </TabPanel>

        </TabContext>

      </Box>
    </>
  );
}
