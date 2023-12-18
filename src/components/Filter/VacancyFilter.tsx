/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box, Typography, TextField, Autocomplete,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';

function VacancyFilter() {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const { specializationsOpt } = useAppSelector((state) => state.filters);
  const specialization = specializationsOpt.map((options) => options.name);

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        maxWidth: '438px',
      }}
      >
        <Typography variant="subtitle1" fontWeight={500}>Вакансия</Typography>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          fullWidth
          size="small"
          noOptionsText="Нет подходящих вариантов"
          options={specialization}
          renderInput={(params) => <TextField {...params} placeholder="Например, Fronend разработчик" />}
        />
      </Box>
    </Box>
  );
}

export default VacancyFilter;
