/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Autocomplete,
  TableContainer, IconButton, TextField, Avatar, Grid, Box, Typography, Button, SvgIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { Store } from '../../store/store.types';
import { fetchStudents } from '../../store/studensSlice';

{ /* Костыль */ }
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

export default function TableDynamic() {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [filterFields, setFilterFields] = useState<string[]>(['']);
  const addFilterField = () => {
    setFilterFields([...filterFields, '']);
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const dispatch = useAppDispatch();
  const ResponseData = useSelector((state: Store) => state.students.students);
  const [loading, setLoading] = useState(true);
  const students = ResponseData.results || [];
  const [employmentType, setEmploymentType] = useState<string | null>(null);
  const [skills, setSkills] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [english, setEnglish] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchStudents())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography variant="subtitle1" textAlign="center" color="#797981">
                      Загрузка...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell component="th" scope="student" sx={{ p: 0 }}>
                      <Checkbox
                        icon={(
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" stroke="#797981" />
                          </svg>
                        )}
                        checkedIcon={(
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.5" y="1" width="23" height="23" rx="3.5" fill="white" stroke="#1D6BF3" />
                            <path d="M10.304 16.419L6.38501 12.5C6.19748 12.3125 5.94317 12.2072 5.67801 12.2072C5.41284 12.2072 5.15854 12.3125 4.97101 12.5C4.78354 12.6875 4.67822 12.9418 4.67822 13.207C4.67822 13.4722 4.78354 13.7265 4.97101 13.914L8.89001 17.833C9.07574 18.0188 9.29625 18.1662 9.53896 18.2667C9.78166 18.3673 10.0418 18.4191 10.3045 18.4191C10.5672 18.4191 10.8274 18.3673 11.0701 18.2667C11.3128 18.1662 11.5333 18.0188 11.719 17.833L20.971 8.58099C21.1585 8.39347 21.2638 8.13916 21.2638 7.87399C21.2638 7.60883 21.1585 7.35452 20.971 7.16699C20.7835 6.97952 20.5292 6.87421 20.264 6.87421C19.9988 6.87421 19.7445 6.97952 19.557 7.16699L10.304 16.419Z" fill="#1D6BF3" />
                          </svg>
                        )}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Grid item>
                          <Avatar>{student.avatar}</Avatar>
                        </Grid>
                        <Grid item>
                          {student.first_name}
                          {' '}
                          {student.last_name}
                        </Grid>
                      </Box>
                    </TableCell>
                    <TableCell>{student.location.name}</TableCell>
                    <TableCell>
                      {student.schedule.map((schedule) => (
                        <li style={{ listStyle: 'none' }} key={schedule.id}>{schedule.name}</li>
                      ))}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: 'flex', gap: '16px', maxWidth: '404px',
                      }}
                    >
                      <TextField
                        // value={student.matching_percentage}
                        size="small"
                        sx={{
                          width: '130px',
                          textAlign: 'center',
                          backgroundColor: '#C2E5CE',
                          padding: 0,
                        }}
                      />
                      <Grid item>
                        {student.skills.map((skills) => (
                          <li style={{ listStyle: 'none' }} key={skills.id}>{skills.name}</li>
                        ))}
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component="a"
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                          <path d="M10.8201 2.07998L10.0001 2.90198L9.17606 2.07798C8.16797 1.07003 6.80076 0.503819 5.37521 0.503912C3.94965 0.504006 2.58252 1.0704 1.57456 2.07848C0.566605 3.08657 0.000394525 4.45378 0.000488293 5.87934C0.000582061 7.30489 0.566973 8.67203 1.57506 9.67998L9.47006 17.575C9.61069 17.7154 9.80131 17.7943 10.0001 17.7943C10.1988 17.7943 10.3894 17.7154 10.5301 17.575L18.4321 9.67798C19.439 8.66981 20.0044 7.30315 20.0042 5.87828C20.0041 4.45341 19.4382 3.08689 18.4311 2.07898C17.9314 1.57903 17.3382 1.18242 16.6852 0.911824C16.0323 0.64123 15.3324 0.501953 14.6256 0.501953C13.9187 0.501953 13.2189 0.64123 12.5659 0.911824C11.9129 1.18242 11.3197 1.58003 10.8201 2.07998ZM17.3681 8.61998L10.0001 15.985L2.63506 8.61998C2.27209 8.26086 1.98368 7.83353 1.78639 7.36258C1.58911 6.89162 1.48686 6.38632 1.4855 5.87571C1.48414 5.36511 1.58371 4.85927 1.77848 4.38727C1.97325 3.91527 2.25939 3.48642 2.62044 3.12537C2.9815 2.76431 3.41035 2.47818 3.88235 2.2834C4.35435 2.08863 4.86019 1.98906 5.37079 1.99042C5.88139 1.99178 6.3867 2.09404 6.85765 2.29132C7.32861 2.4886 7.75593 2.77701 8.11506 3.13998L9.47306 4.49698C9.54371 4.56772 9.6278 4.62362 9.72036 4.66138C9.81293 4.69915 9.91212 4.71803 10.0121 4.71692C10.1121 4.7158 10.2108 4.6947 10.3025 4.65487C10.3942 4.61504 10.477 4.55728 10.5461 4.48498L11.8801 3.13998C12.6154 2.45556 13.5875 2.083 14.5919 2.10067C15.5963 2.11834 16.5546 2.52487 17.2654 3.23474C17.9762 3.94461 18.384 4.90248 18.4029 5.90685C18.4219 6.91122 18.0515 7.8838 17.3681 8.61998Z" fill="#B5B5B7" />
                        </svg>
                      </IconButton>
                      <IconButton
                        component="a"
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                          <path d="M9.4716 9.46283C7.73401 11.0118 7.43457 15.0646 7.43457 15.0646C7.43457 15.0646 11.4874 14.7652 13.0364 13.0276C14.4181 11.4777 14.5642 7.93506 14.5642 7.93506C14.5642 7.93506 11.0215 8.08115 9.4716 9.46283Z" fill="#B5B5B7" />
                          <path d="M1 8.37496C1 10.1983 1.72432 11.947 3.01363 13.2363C4.30294 14.5256 6.05161 15.2499 7.87496 15.2499C9.69831 15.2499 11.447 14.5256 12.7363 13.2363C14.0256 11.947 14.7499 10.1983 14.7499 8.37496C14.7499 6.55161 14.0256 4.80294 12.7363 3.51363C11.447 2.22432 9.69831 1.5 7.87496 1.5C6.05161 1.5 4.30294 2.22432 3.01363 3.51363C1.72432 4.80294 1 6.55161 1 8.37496Z" stroke="#B5B5B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.25 14.625C7.25 16.4483 7.97432 18.197 9.26363 19.4863C10.5529 20.7756 12.3016 21.4999 14.125 21.4999C15.9483 21.4999 17.697 20.7756 18.9863 19.4863C20.2756 18.197 20.9999 16.4483 20.9999 14.625C20.9999 12.8016 20.2756 11.0529 18.9863 9.76363C17.697 8.47432 15.9483 7.75 14.125 7.75C12.3016 7.75 10.5529 8.47432 9.26363 9.76363C7.97432 11.0529 7.25 12.8016 7.25 14.625Z" stroke="#B5B5B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </IconButton>
                      <IconButton
                        component="a"
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                          <path d="M5.87313 14.629C4.02813 13.319 2.56813 11.615 1.74313 10.539C1.51244 10.242 1.38721 9.87659 1.38721 9.5005C1.38721 9.12441 1.51244 8.75902 1.74313 8.462C3.23613 6.513 6.81813 2.5 11.0001 2.5C12.8761 2.5 14.6301 3.307 16.1301 4.374" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M13.13 7.387C12.8523 7.10467 12.5214 6.88011 12.1565 6.72629C11.7916 6.57246 11.3998 6.49241 11.0038 6.49075C10.6078 6.48909 10.2154 6.56586 9.84915 6.71662C9.48295 6.86738 9.15022 7.08916 8.87016 7.36915C8.5901 7.64915 8.36824 7.98183 8.21739 8.34799C8.06654 8.71416 7.98969 9.10657 7.99125 9.50259C7.99282 9.8986 8.07278 10.2904 8.22652 10.6554C8.38026 11.0203 8.60473 11.3512 8.887 11.629M3 17.5L19 1.5M9 16.204C9.6492 16.3972 10.3227 16.4969 11 16.5C15.182 16.5 18.764 12.487 20.257 10.538C20.4876 10.2407 20.6127 9.87509 20.6125 9.49883C20.6124 9.12256 20.4869 8.75707 20.256 8.46C19.7313 7.77549 19.1684 7.12112 18.57 6.5" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </IconButton>
                      <IconButton
                        component="a"
                        href={`https://t.me/${student.telegram}`}
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M22.2647 2.92778C21.98 2.69091 21.6364 2.53567 21.2704 2.47858C20.9045 2.42149 20.5299 2.46469 20.1866 2.60357L2.26566 9.83892C1.88241 9.9966 1.55618 10.2671 1.33026 10.6145C1.10434 10.962 0.989427 11.3699 1.00076 11.7841C1.0121 12.1984 1.14916 12.5994 1.39374 12.934C1.63832 13.2685 1.97886 13.5208 2.37016 13.6573L5.99516 14.918L8.01566 21.5997C8.04312 21.6889 8.08297 21.7739 8.13404 21.852C8.14179 21.864 8.15272 21.873 8.16096 21.8846C8.21996 21.967 8.29127 22.0397 8.37239 22.1004C8.39546 22.118 8.41755 22.1345 8.44221 22.1501C8.53714 22.2131 8.64228 22.2591 8.75294 22.2862L8.76478 22.2872L8.77149 22.2901C8.83802 22.3036 8.90574 22.3105 8.97364 22.3106C8.98017 22.3106 8.98597 22.3074 8.99244 22.3073C9.0949 22.3055 9.19647 22.2879 9.29353 22.255C9.31611 22.2473 9.33546 22.2345 9.35737 22.2252C9.42975 22.1952 9.49832 22.1567 9.56166 22.1106C9.61238 22.0679 9.66312 22.0251 9.71388 21.9824L12.416 18.9991L16.4463 22.1211C16.8011 22.3974 17.2379 22.5475 17.6875 22.5479C18.1587 22.5473 18.6154 22.3847 18.9809 22.0874C19.3465 21.7901 19.5987 21.3762 19.6954 20.9151L22.958 4.89849C23.032 4.53801 23.0065 4.16421 22.8844 3.81708C22.7623 3.46995 22.5481 3.16255 22.2647 2.92778ZM9.37016 15.2364C9.2315 15.3745 9.13672 15.5505 9.0977 15.7422L8.78819 17.2462L8.00413 14.6532L12.0694 12.5362L9.37016 15.2364ZM17.6719 20.5401L12.9092 16.8506C12.71 16.6966 12.46 16.6234 12.2092 16.6455C11.9583 16.6675 11.725 16.7833 11.5557 16.9697L10.6903 17.9249L10.9961 16.4385L18.0791 9.35549C18.2482 9.18665 18.3512 8.96285 18.3695 8.72461C18.3878 8.48638 18.3201 8.24947 18.1788 8.05681C18.0375 7.86414 17.8319 7.72845 17.5992 7.67433C17.3664 7.6202 17.122 7.65121 16.9102 7.76174L6.74491 13.0544L3.02055 11.6915L20.999 4.49905L17.6719 20.5401Z" fill="#B5B5B7" />
                        </svg>
                      </IconButton>
                      <IconButton
                        component="a"
                        href={`mailto:${student.email}`}
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                          <path d="M22.3233 7.05962H20.8106V5.54682C20.8106 4.6223 20.0585 3.87015 19.134 3.87015H17.6212V2.35749C17.6212 1.42993 16.8687 0.680817 15.9446 0.680817H1.67667C0.754453 0.680864 0 1.42758 0 2.35749V12.2637C0 13.1882 0.752156 13.9404 1.67667 13.9404H3.18937V15.4532C3.18937 16.3777 3.94153 17.1298 4.86605 17.1298H6.37875V18.6425C6.37875 19.567 7.13091 20.3192 8.05542 20.3192H22.3234C23.2479 20.3192 24 19.567 24 18.6425V8.73624C24 7.81177 23.2478 7.05962 22.3233 7.05962ZM14.7343 2.35515L8.81063 8.16048L2.88708 2.35529L14.7343 2.35515ZM1.67442 12.2637L1.67475 3.5116L8.22464 9.93062C8.55019 10.2497 9.07116 10.2496 9.39661 9.93062L15.9465 3.51155L15.9447 12.2659L1.67442 12.2637ZM4.8638 15.4531V13.9404H15.9447C16.8692 13.9404 17.6213 13.1882 17.6213 12.2637V5.54485L19.1362 5.54532C19.1362 5.54532 19.1362 5.54583 19.1362 5.54687L19.134 15.4553L4.8638 15.4531ZM22.3233 18.6447L8.05317 18.6424V17.1297H19.134C20.0586 17.1297 20.8107 16.3776 20.8107 15.4531V8.73427L22.3256 8.7347C22.3256 8.7347 22.3257 8.73521 22.3257 8.73624L22.3233 18.6447Z" fill="#B5B5B7" />
                        </svg>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
