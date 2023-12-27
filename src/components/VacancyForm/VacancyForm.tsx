/* eslint-disable max-len */
/* eslint-disable no-console */
import { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createVacancy } from '../../app/index';
import { vacancyShema } from '../../utils/index';
import Input from '../../UI/Input/Input';
import Delete from '../../images/delete.svg';
// import AI from '../../images/tetris_transparant.svg';
import { IOSSwitch } from '../../utils/constans/Switch';
import Snackbars from '../SnackBars/SnackBars';
import BtnVacancy from '../btnVacancy/BtnVacancy';

type TSelectedOpt = {
  id: number
  name: string
};

function VacancyForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    navigate('/students/');
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vacancyShema) });

  const {
    skillsOpt,
    educationLevelOpt,
    specializationsOpt,
    schedulesOpt,
    locationsOpt,
  } = useAppSelector((state) => state.filters);

  const [hidden, setHidden] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<TSelectedOpt[]>([]);

  const handleSkillsChange = (event: SelectChangeEvent<typeof selectedSkills>) => {
    const {
      target: { value },
    } = event;

    const selectedValues: TSelectedOpt[] = typeof value === 'string' ? value.split(',').map((item) => ({ id: Number(item), name: String(item) })) : value;

    setSelectedSkills(selectedValues);
  };

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  return (
    <Box maxWidth="xl" sx={{ p: '20px 0 71px', height: '588px' }}>

      <form
        noValidate
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          const transformedData = {
            ...data,
            location: data.location,
            required_skills: selectedSkills.map((id) => ({ id, name: String(id) })),
            required_education_level: [{ id: Number(data.required_education_level), name: String(data.required_education_level) }],
            specialization: [{ id: Number(data.specialization), name: String(data.specialization) }],
            schedule: [{ id: Number(data.schedule), name: String(data.schedule) }],
          };

          try {
            await dispatch(createVacancy(transformedData)).unwrap();
            setSnackbarSeverity('success');
            setSnackbarMessage('Вакансия успешно создана.');
            setSnackbarOpen(true);
          } catch (err) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Ошибка при создании вакансии.');
            setSnackbarOpen(true);
          }
        })}
      >

        <Grid container item xs={12}>
          <Grid item container xs={5} flexDirection="column" marginRight="42px" width="39%" height="588px">
            <Grid sx={{ p: 0, mb: '20px' }}>
              <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                Вакансия
              </Typography>
              <Input
                fullWidth
                type="text"
                placeholder="Введите название должности"
                register={register}
                registerName="name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid
              item
              container
              xs
              sx={{
                flexDirection: 'column',
                backgroundColor: '#F1F6FF',
                borderRadius: '12px',
                padding: '32px 40px',
                gap: '16px',
                justifyContent: 'center',
                height: '500px',
                flexWrap: 'nowrap',
              }}
            >
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: '500' }}>Фильтры</Typography>
                <Button
                  type="button"
                  size="small"
                  sx={{
                    color: '#797981', fontSize: '14px', gap: '4px', lineHeight: '20px',
                  }}
                >
                  <img src={Delete} style={{ color: '#797981', width: '16px', height: '16px' }} alt="Иконка корзины" />
                  Очистить фильтры
                </Button>
              </Grid>
              <Grid padding={0} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography variant="caption" fontWeight={500}>
                  Зарплата или вилка
                </Typography>
                <Input
                  type="text"
                  fullWidth
                  size="small"
                  placeholder="от"
                  register={register}
                  registerName="salary"
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                />
              </Grid>
              <Grid
                container
                sx={{
                  padding: '0',
                  gap: '20px',
                }}
              >
                <Grid xs item>
                  <Typography variant="caption" fontWeight={500}>
                    Срок поиска вакансии
                  </Typography>
                  <Input
                    type="text"
                    size="small"
                    placeholder="Диапазон действия"
                    register={register}
                    registerName="pub_date"
                    error={!!errors.pub_date}
                    helperText={errors.pub_date?.message}
                  />
                </Grid>
                <Grid xs item>
                  <Typography variant="caption" fontWeight={500}>
                    Формат работы
                  </Typography>
                  <Controller
                    name="schedule"
                    control={control}
                    defaultValue="" // значение по умолчанию, если нужно
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        size="small"
                        sx={{ marginTop: '4px', backgroundColor: '#fff' }}
                      >
                        {schedulesOpt.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid padding={0}>
                <Typography variant="caption" fontWeight={500}>
                  Локация
                </Typography>
                <Controller
                  name="location"
                  control={control}
                  defaultValue="" // значение по умолчанию, если нужно
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      sx={{ marginTop: '4px', backgroundColor: '#fff' }}
                    >
                      {locationsOpt.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>

              <Grid
                container
                sx={{
                  padding: '0',
                  gap: '20px',
                }}
              >
                <Grid item xs>
                  <Typography variant="caption" fontWeight={500}>
                    Уровень
                  </Typography>
                  <Controller
                    name="required_education_level"
                    control={control}
                    defaultValue="" // Установите значение по умолчанию, если нужно
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        size="small"
                        sx={{ marginTop: '4px', backgroundColor: '#fff' }}
                      >
                        {educationLevelOpt.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="caption" fontWeight={500}>
                    Специализация
                  </Typography>
                  <Controller
                    name="specialization"
                    control={control}
                    defaultValue="" // Установите значение по умолчанию, если нужно
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        size="small"
                        sx={{ marginTop: '4px', backgroundColor: '#fff' }}
                      >
                        {specializationsOpt.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  padding: '0',
                  gap: '16px',
                }}
              >
                <FormControlLabel
                  control={<IOSSwitch sx={{ margin: '0 12px' }} checked={hidden} onChange={handleHiddenChange} />}
                  label="Дополнительно"
                />
                <Box
                  width="100%"
                >
                  <Grid
                    container
                    sx={{
                      padding: '0',
                      gap: '20px',
                    }}
                  >
                    <Grid item xs>
                      <Typography variant="caption" fontWeight={500} sx={{ color: hidden ? '#1A1B22' : '#797981' }}>
                        Возраст
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        placeholder="Число или диапазон"
                        disabled={!hidden}
                        sx={{ marginTop: '4px', backgroundColor: hidden ? '#fff' : '#F9FAFB' }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="caption" fontWeight={500} sx={{ color: hidden ? '#1A1B22' : '#797981' }}>
                        Уровень английского
                      </Typography>
                      <Select
                        fullWidth
                        size="small"
                        defaultValue=""
                        disabled={!hidden}
                        sx={{ marginTop: '4px', backgroundColor: hidden ? '#fff' : '#F9FAFB' }}
                      >
                        <MenuItem value="a1">A1</MenuItem>
                        <MenuItem value="a2">A2</MenuItem>
                        <MenuItem value="b1">B1</MenuItem>
                        <MenuItem value="b2">B2</MenuItem>
                        <MenuItem value="c1">C1</MenuItem>
                        <MenuItem value="c2">C2</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs
            sx={{
              justifyContent: 'flex-start', flexDirection: 'column', p: 0, gap: '20px',
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                Описание
              </Typography>
              <Grid
                container
                sx={{
                  gap: '40px',
                  justifyContent: 'space-between',
                  flexWrap: 'nowrap',
                }}
              >
                <Button
                  fullWidth
                  sx={{
                    height: '40px',
                    backgroundColor: '#fff',
                    color: '#1D6BF3',
                    border: '1px solid #1D6BF3',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#1D6BF3',
                    },
                  }}
                >
                  Из шаблонов Яндекс Практикума
                </Button>
                <Button
                  fullWidth
                  disabled
                  sx={{
                    height: '40px',
                    backgroundColor: '#fff',
                    color: '#1D6BF3',
                    border: '1px solid #B5B5B7',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                  startIcon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
                      <rect x="0.699219" y="3" width="6.8" height="6.3" stroke="#B5B5B7" />
                      <rect x="9.2998" y="3" width="6.8" height="6.3" stroke="#B5B5B7" />
                      <rect x="9.30078" y="10.8" width="6.8" height="6.3" stroke="#B5B5B7" />
                      <rect x="17.7998" y="10.8" width="6.8" height="6.3" stroke="#B5B5B7" />
                    </svg>
                  )}
                >
                  Генерация текста нейросетью
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs
              sx={{
                padding: '0',
                alignContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="caption" fontWeight={500}>
                  Технологии, ключевые слова
                </Typography>
                <Controller
                  name="required_skills"
                  control={control}
                  defaultValue="1" // значение по умолчанию, если нужно
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      sx={{
                        marginTop: '4px', backgroundColor: '#fff', height: '88px', alignItems: 'flex-start',
                      }}
                      multiple
                      value={selectedSkills}
                      onChange={handleSkillsChange}
                    >
                      {skillsOpt.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography variant="caption" fontWeight={500}>
                  Описание работы
                </Typography>
                <Input
                  type="text"
                  rows={13}
                  fullWidth
                  multiline
                  name="text"
                  register={register}
                  registerName="text"
                  error={!!errors.text}
                  helperText={errors.text?.message}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <BtnVacancy />
      </form>

      <Snackbars
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
}

export default VacancyForm;
