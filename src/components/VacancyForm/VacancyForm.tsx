import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Grid, Autocomplete, Stack, SvgIcon,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import BtnVacancy from '../btnVacancy/BtnVacancy';

// Вынести в отдельный файл с константами
const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Удаленная работа'];
const experienceLevels = ['Нет опыта', '1 год', '2 года', '3 года', 'Более 3 лет'];
const levelEnglish = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const candidatesAge = [18, 20 - 30, 30 - 45, 45];
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
  { title: 'Java Script' },
  { title: 'React' },
  { title: 'Figma' },
  { title: 'Photoshop' },
  { title: 'HTML5' },
  { title: 'Node.js' },
  { title: 'API' },
  { title: 'Type Script' },
  { title: 'MUI' },
  { title: 'CSS3' },
  { title: 'Адаптивная верстка' },
  // и тп.
];

const VacancyForm: React.FC = () => {
  // Переделать на Redux
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [employmentType, setEmploymentType] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [english, setEnglish] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь отправка данных на сервер
  };

  return (
    <Box maxWidth="xl" sx={{ p: '28px 0 71px' }}>
      <form onSubmit={handleFormSubmit}>
        <Grid container xs={12}>
          <Grid container xs={5} flexDirection="column" marginRight="42px" width="39%">
            <Grid sx={{ p: 0, mb: '20px' }}>
              <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                Вакансия
              </Typography>
              <TextField
                type="text"
                name="title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                fullWidth
                size="small"
                placeholder="Введите название должности"
                required
              />
            </Grid>
            <Grid
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
                <TextField
                  type="text"
                  name="salary"
                  fullWidth
                  size="small"
                  placeholder="от"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
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
                  options={locations}
                  value={location}
                  onChange={(_, newValue) => setLocation(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Город" />}
                />
                {/* <Autocomplete
                  options={dropdownData}
                  getOptionLabel={(option) => option.label}
                  value={formData.selectedValue}
                  onChange={(_, newValue) => handleFieldChange('selectedValue', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      placeholder="Город"
                      />
                  )}
                 /> */}
              </Grid>

              <Grid padding={0}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Формат работы
                </Typography>
                <Autocomplete
                  options={employmentTypes}
                  value={employmentType}
                  onChange={(_, newValue) => setEmploymentType(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth size="medium" placeholder="в офисе" />}
                />
                {/* <Autocomplete
                  options={dropdownData}
                  getOptionLabel={(option) => option.label}
                  value={formData.selectedValue}
                  onChange={(_, newValue) => handleFieldChange('selectedValue', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      placeholder="Город"
                      />
                  )}
                 /> */}
              </Grid>

              <Grid
                container
                sx={{
                  padding: '0',
                  gap: '20px',
                }}
              >
                <Grid xs>
                  <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                    Опыт
                  </Typography>
                  <Autocomplete
                    options={experienceLevels}
                    value={experience}
                    onChange={(_, newValue) => setExperience(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="от 1 года" />}
                  />
                  {/* <Autocomplete
                    options={dropdownData}
                    getOptionLabel={(option) => option.label}
                    value={formData.selectedValue}
                    onChange={(_, newValue) => handleFieldChange('selectedValue', newValue)}
                    renderInput={(params) => (
                      <TextField
                          {...params}
                          fullWidth
                          size="small"
                          placeholder="Город"
                          />
                    )}
                  /> */}
                </Grid>
                <Grid xs>
                  <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                    Уровень
                  </Typography>
                  <Autocomplete
                    options={experienceLevels}
                    value={experience}
                    onChange={(_, newValue) => setExperience(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="от 1 года" />}
                  />
                  {/* <Autocomplete
                    options={dropdownData}
                    getOptionLabel={(option) => option.label}
                    value={formData.selectedValue}
                    onChange={(_, newValue) => handleFieldChange('selectedValue', newValue)}
                    renderInput={(params) => (
                      <TextField
                          {...params}
                          fullWidth
                          size="small"
                          placeholder="Город"
                          />
                    )}
                  /> */}
                </Grid>
              </Grid>
              <Grid container item spacing={2} gap="20px">
                <Grid item xs>
                  <Typography>
                    Возраст
                  </Typography>
                  <Autocomplete
                    options={candidatesAge}
                    value={age}
                    onChange={(_, newValue) => setAge(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Возраст" />}
                  />
                </Grid>
                <Grid item xs>
                  <Typography>
                    Знание английского
                  </Typography>
                  <Autocomplete
                    options={levelEnglish}
                    value={english}
                    onChange={(_, newValue) => setEnglish(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="А1" />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
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
              container
              xs
              sx={{
                padding: '0',
                gap: '20px',
                alignItems: 'flex-end',
              }}
            >
              <Grid xs={12}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Технологии, ключевые слова
                </Typography>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={keySkills}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[keySkills[1]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        multiline
                      />
                    )}
                  />
                </Stack>
              </Grid>

              {/* <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={formData.required_skills}
                    renderInput={(params) => (
                      <TextField
                          {...params}
                          name="required_skills"
                          value={formData.required_skills}
                          rows={2}
                          multiline
                          />
                    )}
                  /> */}
              <Grid xs={12}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Описание работы
                </Typography>
                <TextField
                  type="text"
                  name="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={20}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <BtnVacancy/>
      </form>
    </Box>
  );
};

export default VacancyForm;
