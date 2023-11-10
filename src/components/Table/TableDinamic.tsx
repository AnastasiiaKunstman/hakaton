import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Autocomplete,
  TableContainer, TextField, Grid, Box, Typography, Button, SvgIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableActive from './TableActive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getStudents } from '../../store/index';

// Костыль, переделать
const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Удаленная работа'];
const levelEnglish = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const locations = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Ростов-на-Дону',
  'Самара',
  'Омск',
  'Челябинск',
  'Уфа',
  // Можно добавить еще другие местоположения
];

const keySkills = [
  'Java Script',
  'React',
  'Figma',
  'Photoshop',
  'HTML5',
  'Node.js',
  'API',
  'Type Script',
  'MUI',
  'CSS3',
  'Адаптивная верстка',
  // и тп.
];

function TableDynamic() {
  const [filterFields, setFilterFields] = useState<string[]>(['']);
  const addFilterField = () => {
    setFilterFields([...filterFields, '']);
  };

  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.student);
  const { isLoading, isError } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const [employmentType, setEmploymentType] = useState<string | null>(null);
  const [skills, setSkills] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [english, setEnglish] = useState<string | null>(null);

  return (
    <Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px',
      }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight={500}>Настройка фильтров поиска</Typography>
          <Box sx={{ maxWidth: '295px' }}>

            <Button
              type="button"
              size="small"
              sx={{ color: '#1D6BF3', fontSize: '14px', marginRight: '20px' }}
              onClick={addFilterField}
            >
              <AddIcon />
              Добавить фильтры
            </Button>
            <Button
              type="button"
              size="small"
              sx={{ color: '#797981', fontSize: '14px' }}
            >
              <SvgIcon sx={{ width: '16px', height: '16px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.0002 2.66667H11.9335C11.7788 1.91428 11.3694 1.23823 10.7743 0.752479C10.1793 0.266727 9.43497 0.000969683 8.66683 0L7.3335 0C6.56536 0.000969683 5.82104 0.266727 5.226 0.752479C4.63095 1.23823 4.22156 1.91428 4.06683 2.66667H2.00016C1.82335 2.66667 1.65378 2.7369 1.52876 2.86193C1.40373 2.98695 1.3335 3.15652 1.3335 3.33333C1.3335 3.51014 1.40373 3.67971 1.52876 3.80474C1.65378 3.92976 1.82335 4 2.00016 4H2.66683V12.6667C2.66789 13.5504 3.01942 14.3976 3.64431 15.0225C4.2692 15.6474 5.11643 15.9989 6.00016 16H10.0002C10.8839 15.9989 11.7311 15.6474 12.356 15.0225C12.9809 14.3976 13.3324 13.5504 13.3335 12.6667V4H14.0002C14.177 4 14.3465 3.92976 14.4716 3.80474C14.5966 3.67971 14.6668 3.51014 14.6668 3.33333C14.6668 3.15652 14.5966 2.98695 14.4716 2.86193C14.3465 2.7369 14.177 2.66667 14.0002 2.66667ZM7.3335 1.33333H8.66683C9.08035 1.33384 9.48358 1.46225 9.82124 1.70096C10.1589 1.93967 10.4144 2.27699 10.5528 2.66667H5.4475C5.58588 2.27699 5.84143 1.93967 6.17909 1.70096C6.51675 1.46225 6.91998 1.33384 7.3335 1.33333ZM12.0002 12.6667C12.0002 13.1971 11.7894 13.7058 11.4144 14.0809C11.0393 14.456 10.5306 14.6667 10.0002 14.6667H6.00016C5.46973 14.6667 4.96102 14.456 4.58595 14.0809C4.21088 13.7058 4.00016 13.1971 4.00016 12.6667V4H12.0002V12.6667Z" fill="#797981" />
                  <path d="M6.66667 12C6.84348 12 7.01305 11.9297 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333V7.33329C7.33333 7.15648 7.2631 6.98691 7.13807 6.86189C7.01305 6.73686 6.84348 6.66663 6.66667 6.66663C6.48986 6.66663 6.32029 6.73686 6.19526 6.86189C6.07024 6.98691 6 7.15648 6 7.33329V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9297 6.48986 12 6.66667 12Z" fill="#797981" />
                  <path d="M9.33317 12C9.50998 12 9.67955 11.9297 9.80457 11.8047C9.9296 11.6797 9.99984 11.5101 9.99984 11.3333V7.33329C9.99984 7.15648 9.9296 6.98691 9.80457 6.86189C9.67955 6.73686 9.50998 6.66663 9.33317 6.66663C9.15636 6.66663 8.98679 6.73686 8.86177 6.86189C8.73674 6.98691 8.6665 7.15648 8.6665 7.33329V11.3333C8.6665 11.5101 8.73674 11.6797 8.86177 11.8047C8.98679 11.9297 9.15636 12 9.33317 12Z" fill="#797981" />
                </svg>
              </SvgIcon>
              Очистить все
            </Button>
          </Box>
        </Box>

        {/* Костыль */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
          <Grid padding={0} width="194px">
            <Typography variant="caption" sx={{ marginBottom: '4px' }}>
              Город
            </Typography>
            <Autocomplete
              options={locations}
              value={location}
              onChange={(_, newValue) => setLocation(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Город" />}
            />
          </Grid>
          <Grid padding={0} width="194px">
            <Typography variant="caption" sx={{ marginBottom: '4px' }}>
              Формат работы
            </Typography>
            <Autocomplete
              options={employmentTypes}
              value={employmentType}
              onChange={(_, newValue) => setEmploymentType(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="в офисе" />}
            />
          </Grid>
          <Grid padding={0} width="194px">
            <Typography variant="caption" sx={{ marginBottom: '4px' }}>
              Навыки
            </Typography>
            <Autocomplete
              options={keySkills}
              value={skills}
              onChange={(_, newValue) => setSkills(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="в офисе" />}
            />
          </Grid>
          <Grid padding={0} width="194px">
            <Typography variant="caption" sx={{ marginBottom: '4px' }}>
              Знание английского
            </Typography>
            <Autocomplete
              options={levelEnglish}
              value={english}
              onChange={(_, newValue) => setEnglish(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="А1" />}
            />
          </Grid>
        </Box>

        <TableContainer>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" stroke="#797981" />
                  </svg>
                </TableCell>
                <TableCell>Студент</TableCell>
                <TableCell>Город</TableCell>
                <TableCell sx={{ width: '140px' }}>Формат работы</TableCell>
                <TableCell>Навыки</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {isLoading && <h2>Loading...</h2>}
              {isError && (<h2> An error occured:{error}</h2>)}
              
              {results.map((student) => (
                <TableActive key={student.id} student={student} />
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default TableDynamic;
