/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import React, {
  useState, SyntheticEvent, SetStateAction, useEffect,
} from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Autocomplete,
  TableContainer, Grid, Box, Typography, Button, SvgIcon, CircularProgress, TextField,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import TableActive from './TableActive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  dislikeStudents, getFavoriteStudents, getStudents, likeStudents,
} from '../../store/index';
import Delete from '../../images/delete.svg';

type TSelectedOpt = {
  id: number
  name: string
};

function TableDynamic() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const results = useAppSelector((state) => state.student.results);
  const { isLoading, isError } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getFavoriteStudents());
  }, [dispatch]);

  // console.log(results);
  // console.log(results?.filter((student) => student.is_favorited));

  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleLikeStudent = async (studentID: number, isFavorite: boolean) => {
    await dispatch(likeStudents({ studentID, isFavorite }));
  };

  const handleDislikeStudent = async (studentID: number, isFavorite: boolean) => {
    await dispatch(dislikeStudents({ studentID, isFavorite }));
  };

  const {
    skillsOpt,
    schedulesOpt,
    locationsOpt,
  } = useAppSelector((state) => state.filters);

  const [selectedLocation, setSelectedLocation] = useState<TSelectedOpt | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<TSelectedOpt[]>([]);
  const schedule = schedulesOpt.map((options) => options.name);

  const handleLocationChange = (
    evt: SyntheticEvent,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    selectedLocation: SetStateAction<TSelectedOpt | null>,
  ) => {
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
    } else {
      setSelectedLocation(null);
    }
  };

  const handleSkillsChange = (
    evt: SyntheticEvent,
    selectedSkill: TSelectedOpt[],
  ) => {
    setSelectedSkills([...selectedSkill]);
  };

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
              sx={{
                color: '#1D6BF3', fontSize: '14px', lineHeight: '20px', marginRight: '20px',
              }}
            >
              <SvgIcon sx={{ width: '24px', height: '24px', marginRight: '4px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="#1D6BF3" />
                </svg>
              </SvgIcon>
              Добавить фильтры
            </Button>
            <Button
              type="button"
              size="small"
              sx={{ color: '#797981', fontSize: '14px' }}
            >
              <img src={Delete} alt="Иконка корзины" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Очистить все
            </Button>
          </Box>
        </Box>

        {/* Фильтры */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
          <Grid padding={0} width="194px">
            <Typography variant="caption" fontWeight={500}>
              Город
            </Typography>
            <Autocomplete
              options={locationsOpt}
              getOptionLabel={(locationsOpt) => locationsOpt.name}
              onChange={handleLocationChange}
              value={selectedLocation}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText="Нет подходящих вариантов"
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  placeholder="Москва"
                  name="location"
                  sx={{ marginTop: '4px' }}
                />
              )}
            />
          </Grid>
          <Grid padding={0} width="194px">
            <Typography variant="caption" fontWeight={500}>
              Формат работы
            </Typography>
            <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              size="small"
              options={schedule}
              sx={{ width: '194px', marginTop: '4px' }}
              renderInput={(params) => <TextField {...params} placeholder="Офис" />}
            />
          </Grid>
          <Grid padding={0} width="250px">
            <Typography variant="caption" fontWeight={500}>
              Навыки
            </Typography>
            <Autocomplete
              multiple
              options={skillsOpt}
              getOptionLabel={(skillsOpt) => skillsOpt.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={handleSkillsChange}
              value={selectedSkills}
              filterSelectedOptions
              size="small"
              noOptionsText="Нет подходящих вариантов"
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    selectedSkills.length === 0
                      ? 'Java Script, CSS, HTML'
                      : ''
                  }
                  sx={{ marginTop: '4px' }}
                />
              )}
            />
          </Grid>
        </Box>

        <TableContainer>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" stroke="#797981" />
                  </svg>
                </TableCell>
                <TableCell>Студент</TableCell>
                <TableCell />
                <TableCell>Город</TableCell>
                <TableCell>Формат работы</TableCell>
                <TableCell>Навыки</TableCell>
                <TableCell />
                <TableCell sx={{ width: '180px' }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {isLoading && (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: 'center', border: 'none' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: 'center', border: 'none' }}>
                    <Typography>Ошибка! Что-то пошло не так</Typography>
                  </TableCell>
                </TableRow>
              )}

              {location.pathname === '/students/'
        && results?.map((student) => (
          <TableActive
            key={student.id}
            student={student}
            onLike={(id, isFavorite) => handleLikeStudent(id, isFavorite)}
            onDelete={(id, isFavorite) => handleDislikeStudent(id, isFavorite)}
          />
        ))}

              {location.pathname === '/students/save/'
  && results?.filter((student) => student.is_favorited) // Отфильтровываем только тех студентов, у которых is_favorited: true
    .map((student) => (
      <TableActive
        key={student.id}
        student={student}
        onLike={(id, isFavorite) => handleLikeStudent(id, isFavorite)}
        onDelete={(id, isFavorite) => handleDislikeStudent(id, isFavorite)}
      />
    ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default TableDynamic;
