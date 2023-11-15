/* eslint-disable max-len */
/* eslint-disable no-console */
import {
  SyntheticEvent,
  useState,
} from 'react';
import {
  Grid,
  Button,
  Typography,
  Box,
  SvgIcon,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  Link,
  InputLabel,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createVacancy } from '../../store';
import { vacancyShema } from '../../utils/index';
import Input from '../../UI/Input/Input';

type TSelectedOpt = {
  id: number
  name: string
};

function VacancyForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vacancyShema) });

  const dispatch = useAppDispatch();

  const {
    skillsOpt,
    educationLevelOpt,
    specializationsOpt,
    schedulesOpt,
    locationsOpt,
  } = useAppSelector((state) => state.filters);

  const [selectedLocation, setSelectedLocation] = useState<TSelectedOpt | null>(null);

  const handleLocationChange = (
    evt: SyntheticEvent,
    selectedLocation: TSelectedOpt | null,
  ) => {
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
    } else {
      setSelectedLocation(null);
    }
  };

  return (
    <Box maxWidth="xl" sx={{ p: '28px 0 71px' }}>

      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const transformedData = {
            ...data,
            location: selectedLocation?.id,
            required_skills: [{ id: Number(data.required_skills), name: String(data.required_skills) }],
            required_education_level: [{ id: Number(data.required_education_level), name: String(data.required_education_level) }],
            specialization: [{ id: Number(data.specialization), name: String(data.specialization) }],
            schedule: [{ id: Number(data.schedule), name: String(data.schedule) }],
          };
          dispatch(createVacancy(transformedData));
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
                // onClick={onClearFilter}
                  sx={{ color: '#797981', fontSize: '14px' }}
                >
                  <DeleteIcon color="disabled" fontSize="small" />
                  Очистить фильтры
                </Button>
              </Grid>
              <Grid padding={0}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
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
                <Typography variant="caption">
                  Срок поиска вакансии
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker format="DD.MM.YYYY" sx={{ width: '100%' }} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid padding={0}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Локация
                </Typography>
                <Autocomplete
                  options={locationsOpt}
                  getOptionLabel={(locationsOpt) => locationsOpt.name}
                  onChange={handleLocationChange}
                  value={selectedLocation}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  noOptionsText="Нет подходящих вариантов"
                  renderInput={(params) => (
                    <Input
                      {...params}
                      type="text"
                      placeholder="Город"
                      register={register}
                      registerName="location"
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
                {/* <TextField
                  fullWidth
                  type="text"
                  placeholder="Город"
                  name="location"
                  value={inputValue.location}
                  onChange={(event) => handleInput('location', event.target.value)}
                /> */}
              </Grid>

              <Grid padding={0}>
                <InputLabel id="schedule_select_id_label">
                  Формат работы
                </InputLabel>
                <Controller
                  name="schedule"
                  control={control}
                  defaultValue="" // Установите значение по умолчанию, если нужно
                  render={({ field }) => (
                    <Select {...field} fullWidth>
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
                  <Typography id="education_select_id_label">
                    Уровень
                  </Typography>
                  <Controller
                    name="required_education_level"
                    control={control}
                    defaultValue="" // Установите значение по умолчанию, если нужно
                    render={({ field }) => (
                      <Select {...field} fullWidth>
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
                  <Typography id="specialization_select_id_label">
                    Специализация
                  </Typography>
                  <Controller
                    name="specialization"
                    control={control}
                    defaultValue="" // Установите значение по умолчанию, если нужно
                    render={({ field }) => (
                      <Select {...field} fullWidth>
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
                  }}
                >
                  <SvgIcon sx={{ m: '12px 20px 12px 23px', width: '20px', height: '20px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M7.125 0C6.69402 0 6.2807 0.171205 5.97595 0.475951C5.67121 0.780698 5.5 1.19402 5.5 1.625V4.625C5.5 4.72446 5.46049 4.81984 5.39016 4.89016C5.31984 4.96049 5.22446 5 5.125 5H2.125C1.69402 5 1.2807 5.17121 0.975951 5.47595C0.671205 5.7807 0.5 6.19402 0.5 6.625V9.625C0.5 9.8384 0.542032 10.0497 0.623696 10.2469C0.70536 10.444 0.825056 10.6232 0.975951 10.774C1.12685 10.9249 1.30599 11.0446 1.50314 11.1263C1.70029 11.208 1.9116 11.25 2.125 11.25H10.125C10.3384 11.25 10.5497 11.208 10.7469 11.1263C10.944 11.0446 11.1232 10.9249 11.274 10.774C11.4249 10.6232 11.5446 10.444 11.6263 10.2469C11.708 10.0497 11.75 9.8384 11.75 9.625V6.625C11.75 6.52554 11.7895 6.43016 11.8598 6.35983C11.9302 6.28951 12.0255 6.25 12.125 6.25H15.125C15.556 6.25 15.9693 6.07879 16.274 5.77405C16.5788 5.4693 16.75 5.05598 16.75 4.625V1.625C16.75 1.19402 16.5788 0.780698 16.274 0.475951C15.9693 0.171205 15.556 0 15.125 0H7.125ZM15.125 5H11.75V1.25H15.125C15.2245 1.25 15.3198 1.28951 15.3902 1.35983C15.4605 1.43016 15.5 1.52554 15.5 1.625V4.625C15.5 4.72446 15.4605 4.81984 15.3902 4.89016C15.3198 4.96049 15.2245 5 15.125 5ZM10.5 5H6.75V1.625C6.75 1.52554 6.78951 1.43016 6.85983 1.35983C6.93016 1.28951 7.02554 1.25 7.125 1.25H10.5V5ZM5.5 6.25V10H2.125C2.02554 10 1.93016 9.96049 1.85983 9.89017C1.78951 9.81984 1.75 9.72446 1.75 9.625V6.625C1.75 6.52554 1.78951 6.43016 1.85983 6.35983C1.93016 6.28951 2.02554 6.25 2.125 6.25H5.5ZM6.75 6.25H10.5V9.625C10.5 9.72446 10.4605 9.81984 10.3902 9.89017C10.3198 9.96049 10.2245 10 10.125 10H6.75V6.25ZM15.875 8.75H18.875C19.0884 8.75 19.2997 8.79203 19.4969 8.8737C19.694 8.95536 19.8732 9.07506 20.024 9.22595C20.1749 9.37685 20.2946 9.55599 20.3763 9.75314C20.458 9.95029 20.5 10.1616 20.5 10.375V18.375C20.5 18.5884 20.458 18.7997 20.3763 18.9969C20.2946 19.194 20.1749 19.3732 20.024 19.524C19.8732 19.6749 19.694 19.7946 19.4969 19.8763C19.2997 19.958 19.0884 20 18.875 20H5.125C4.9116 20 4.70029 19.958 4.50314 19.8763C4.30599 19.7946 4.12685 19.6749 3.97595 19.524C3.82506 19.3732 3.70536 19.194 3.6237 18.9969C3.54203 18.7997 3.5 18.5884 3.5 18.375V15.375C3.5 14.944 3.67121 14.5307 3.97595 14.226C4.2807 13.9212 4.69402 13.75 5.125 13.75H13.875C13.9745 13.75 14.0698 13.7105 14.1402 13.6402C14.2105 13.5698 14.25 13.4745 14.25 13.375V10.375C14.25 9.94402 14.4212 9.5307 14.726 9.22595C15.0307 8.9212 15.444 8.75 15.875 8.75ZM14.25 18.75V15H10.25V18.75H14.25ZM19.25 15H15.5V18.75H18.875C18.9745 18.75 19.0698 18.7105 19.1402 18.6402C19.2105 18.5698 19.25 18.4745 19.25 18.375V15ZM15.5 13.75H19.25V10.375C19.25 10.2755 19.2105 10.1802 19.1402 10.1098C19.0698 10.0395 18.9745 10 18.875 10H15.875C15.7755 10 15.6802 10.0395 15.6098 10.1098C15.5395 10.1802 15.5 10.2755 15.5 10.375V13.75ZM9 15H5.125C5.02554 15 4.93016 15.0395 4.85984 15.1098C4.78951 15.1802 4.75 15.2755 4.75 15.375V18.375C4.75 18.582 4.918 18.75 5.125 18.75H9V15Z" fill="#1D6BF3" />
                    </svg>
                  </SvgIcon>
                  Сгенерировать нейросетью
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs
              sx={{
                padding: '0',
                gap: '20px',
                alignItems: 'flex-end',
              }}
            >
              <Grid item xs={12}>
                <InputLabel id="skills_select_id_label">
                  Технологии, ключевые слова
                </InputLabel>
                <Controller
                  name="required_skills"
                  control={control}
                  defaultValue="" // Установите значение по умолчанию, если нужно
                  render={({ field }) => (
                    <Select {...field} fullWidth>
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
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Описание работы
                </Typography>
                <Input
                  type="text"
                  rows={20}
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
          <div className="edit-buttons">
            <button type="submit">
              Сохранить
            </button>
            <button type="submit" className="publish-button">
              <Link to="/#" sx={{ textDecoration: 'none', color: '#fff' }}>Опубликовать вакансию и начать поиск</Link>
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
}

export default VacancyForm;
