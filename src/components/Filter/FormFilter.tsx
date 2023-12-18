import React, { useState } from 'react';
import {
  Box, Typography, TextField, Grid, Select, MenuItem, FormControlLabel, Button,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { IOSSwitch } from '../../utils/constans/Switch';
import { useAppSelector } from '../../app/hooks';
import Delete from '../../images/delete.svg';
import { vacancyShema } from '../../utils/validation/yupSchema';
import Input from '../../UI/Input/Input';

function FormFilter() {
  const [hidden, setHidden] = useState(false);
  const [filters, setFilters] = useState({
    // начальные значения фильтров
    location: '',
    salary: '',
    schedule: '',
    required_education_level: '',
    specialization: '',
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    // Сбрасываем все фильтры
    setFilters({
      location: '',
      salary: '',
      schedule: '',
      required_education_level: '',
      specialization: '',
    });
  };

  const {
    control,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vacancyShema) });

  const {
    educationLevelOpt,
    specializationsOpt,
    schedulesOpt,
    locationsOpt,
  } = useAppSelector((state) => state.filters);

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  return (
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
          onClick={handleClearFilters}
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
          value={filters.salary}
          onChange={(e) => handleFilterChange('salary', e.target.value)}
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
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
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
              value={filters.schedule}
              onChange={(e) => handleFilterChange('schedule', e.target.value)}
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
                value={filters.required_education_level}
                onChange={(e) => handleFilterChange('required_education_level', e.target.value)}
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
                value={filters.specialization}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
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
  );
}

export default FormFilter;
