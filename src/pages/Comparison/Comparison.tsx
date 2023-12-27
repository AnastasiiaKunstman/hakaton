import {
  Typography,
  Box,
  IconButton,
  Tab,
  Button,
  Tabs,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useState } from 'react';
import Vector from '../../images/Vector.svg';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import AI from '../../images/tetris_white.svg';
import './Comparison.scss';

function Comparison() {
  const [value, setValue] = useState('1');
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: '#1D6BF3', pt: '28px' }}>
            <Tabs
              onChange={handleChange}
              value={value}
              textColor="inherit"
              indicatorColor="primary"
              aria-label="inherit tabs example"
            >
              <IconButton color="inherit">
                <img src={Vector} alt="Стрелка назад" />
              </IconButton>
              <Tab
                label="Сравнение"
                value="1"
                sx={{
                  fontWeight: 500,
                  lineHeight: '130%',
                  fontFamily: 'YS Display',
                  fontSize: '24px',
                }}
              />
            </Tabs>
          </Box>

          <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 500, lineHeight: '110%', color: '#5A9BFF' }}>
                Вакансия: Middle Frontend-разработчик (React/Redux)
              </Typography>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
              >
                <IconButton
                  className="icon-button__telegram"
                  component="a"
                //   href={`https://t.me/${student.telegram}`}
                  target="_blank"
                />
                <IconButton
                  className="icon-button__email"
                  component="a"
                //   href={`mailto:${student.email}`}
                  target="_blank"
                />
                {' '}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '6px',
                    backgroundColor: '#5A9BFF',
                    boxShadow: 'none',
                    width: '250px',
                    padding: '15px 57px',
                    '&:hover': {
                      backgroundColor: '#1D6BF3',
                      boxShadow: 'none',
                    },
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
            {!isClicked && (
            <Box
              marginTop="221px"
              sx={{
                display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center',
              }}
            >
              <Typography lineHeight="120%" color="#797981" variant="h3">
                Пока здесь пусто
              </Typography>
              <Typography lineHeight="110%" color="#5A9BFF" fontWeight={500} variant="h3">
                Добавьте кандидатов для сравнения
              </Typography>
            </Box>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default Comparison;
