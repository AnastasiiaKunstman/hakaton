/* eslint-disable max-len */
/* eslint-disable no-console */
import {
  useEffect,
  useState,
} from 'react';
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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createVacancy } from '../../store';
import { vacancyShema } from '../../utils/index';
import Input from '../../UI/Input/Input';
import BtnVacancy from '../btnVacancy/BtnVacancy';
import Delete from '../../images/delete.svg';
import AI from '../../images/tetris_transparant.svg';
import { IOSSwitch } from '../../utils/constans/Switch';
import Snackbars from '../SnackBars/SnackBars';

type TSelectedOpt = {
  id: number
  name: string
};

function VacancyForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(vacancyShema) });

  const dispatch = useAppDispatch();

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
    <Box maxWidth="xl" sx={{ p: '28px 0 71px' }}>

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
          await dispatch(createVacancy(transformedData));
          const isCreateSuccessful = createVacancy(transformedData);

          if (isCreateSuccessful) {
            setSnackbarSeverity('success');
            setSnackbarMessage('Вакансия успешно создана.');
          } else {
            setSnackbarSeverity('error');
            setSnackbarMessage('Ошибка при создании вакансии.');
          }

          setSnackbarOpen(true);
          reset();
        })}
      >

        <Grid container item xs={12}>
          <Grid item container xs={5} flexDirection="column" marginRight="42px" width="39%">
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
                gap: '20px',
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
              <Grid padding={0}>
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

              <Grid padding={0}>
                <Typography variant="caption" fontWeight={500}>
                  Срок поиска вакансии
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} sx={{ p: 0 }}>
                    <DatePicker format="DD.MM.YYYY" sx={{ width: '100%', backgroundColor: '#fff' }} />
                  </DemoContainer>
                </LocalizationProvider>
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

              <Grid padding={0}>
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
                  type="button"
                  fullWidth
                  sx={{
                    height: '40px',
                    backgroundColor: '#fff',
                    color: '#1D6BF3',
                    border: '1px solid #1D6BF3',
                    boxShadow: 'none',
                    borderRadius: '6px',
                  }}
                >
                  Из шаблонов Яндекс Практикума
                </Button>
                <Button
                  type="button"
                  fullWidth
                  sx={{
                    height: '40px',
                    backgroundColor: '#fff',
                    color: '#1D6BF3',
                    border: '1px solid #1D6BF3',
                    boxShadow: 'none',
                    borderRadius: '6px',
                    justifyContent: 'center',
                    gap: '20px',
                  }}
                >
                  <img
                    src={AI}
                    style={{
                      color: '#797981', width: '20px', height: '20px',
                    }}
                    alt="Иконка тетриса"
                  />
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
                      sx={{ marginTop: '4px', backgroundColor: '#fff', height: '88px' }}
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

              <Grid item xs={12}>
                <Typography variant="caption" fontWeight={500}>
                  Описание работы
                </Typography>
                <Input
                  type="text"
                  rows={19}
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: '27px',
        }}
        >
          <Box className="edit-buttons">
            <Button type="submit" className="clear-button">
              Сохранить
            </Button>
            <Button type="submit" className="publish-button">
              Опубликовать вакансию и начать поиск
            </Button>
          </Box>
        </Box>
      </form>

      {/* Компонент Snackbar */}
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
