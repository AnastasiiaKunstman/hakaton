import {
  CssBaseline,
  Container,
  Avatar,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const testData = {
  avatar: 'https://funart.pro/uploads/posts/2021-04/1618313148_42-funart_pro-p-kapibara-i-chelovek-zhivotnie-krasivo-foto-42.jpg',
  firstName: 'Иван',
  lastName: 'Иванов',
  email: 'good-hr@ya.ru',
  telegram: '@good-hr',
  phoneNumber: '88005553535',
  skills: [{ id: 1, name: 'React' }, { id: 2, name: 'TypeScript' }, { id: 3, name: 'Redux' }, { id: 4, name: 'MUI' }, { id: 5, name: 'Yup' }],
  info: 'Middle Frontend Developer',
  experience: 'Январь 2021 — настоящее время: Frontend-разработчик с 3+ годами опыта в создании динамичных и отзывчивых веб-приложений. Сильные навыки в JavaScript, React, Redux и современных инструментах сборки. Ответственный, внимательный к деталям и ориентированный на результат.',
  about: 'Frontend-разработчик с 3+ годами опыта в создании динамичных и отзывчивых веб-приложений. Сильные навыки в JavaScript, React, Redux и современных инструментах сборки. Ответственный, внимательный к деталям и ориентированный на результат.',
  curses: [{ id: 1, name: 'Яндекс.Практикум Backend' }, { id: 2, name: 'Яндекс.Практикум Frontend' }, { id: 3, name: 'Яндекс.Практикум Дизайнер' }],
};

export default function Student() {
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
            border: '1px solid rgba(0, 0, 0, .2)',
            borderRadius: 2,
            p: 2,
            mb: 3,
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
              component="p"
              fontSize={12}
              sx={{
                opacity: '.5',
                lineHeight: '14px',
                mt: 1,
              }}
            >
              <LocationOnIcon fontSize="inherit" />
              Москва
            </Typography>
          </Box>
        </Box>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography
              fontSize={16}
              fontWeight={500}
              component="h2"
            >
              О себе
            </Typography>
            <Typography
              fontSize={14}
              mb={2}
            >
              {testData.about}
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={500}
              component="h2"
            >
              Опыт работы
            </Typography>
            <Typography
              fontSize={14}
            >
              {testData.experience}
              {testData.experience}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" mb={2}>
              {testData.skills.map((skill) => (
                <Typography
                  sx={{
                    mr: 2,
                    pl: 2,
                    pr: 2,
                    backgroundColor: '#F1F6FF',
                    borderRadius: '2px',
                  }}
                  key={skill.id}
                >
                  {skill.name}
                </Typography>
              ))}
            </Box>
            <Typography
              fontSize={16}
              fontWeight={500}
              component="h2"
            >
              Сертификаты
            </Typography>
            <List>
              {testData.curses.map((item) => (
                <ListItem
                  disablePadding
                  sx={{
                    fontSize: '14px',
                  }}
                  key={item.id}
                >
                  <FiberManualRecordIcon fontSize="inherit" />
                  {item.name}
                </ListItem>
              ))}
            </List>
            <Typography
              fontSize={16}
              fontWeight={500}
              component="h2"
            >
              Технические навыки
            </Typography>
            <List>
              {testData.skills.map((skill) => (
                <ListItem
                  disablePadding
                  sx={{
                    fontSize: '14px',
                  }}
                  key={skill.id}
                >
                  <FiberManualRecordIcon fontSize="inherit" />
                  {skill.name}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
