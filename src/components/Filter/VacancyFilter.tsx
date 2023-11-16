import React from 'react';
import {
  Box, Typography, TextField, Autocomplete,
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';

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
        marginTop: '22px',
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
          id="controllable-states-demo"
          fullWidth
          options={specialization}
          renderInput={(params) => <TextField {...params} placeholder="Например, Fronend разработчик" />}
        />
      </Box>
    </Box>
  );
}

export default VacancyFilter;
