import React from 'react';
import {
  Box, Typography, TextField, Autocomplete,
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';

function LocationFilter() {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const { locationsOpt } = useAppSelector((state) => state.filters);
  const location = locationsOpt.map((options) => options.name);

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        maxWidth: '438px',
      }}
      >
        <Typography variant="subtitle1" fontWeight={500}>Регион</Typography>
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
          size="small"
          options={location}
          renderInput={(params) => <TextField {...params} placeholder="Москва" />}
        />
      </Box>
    </Box>
  );
}

export default LocationFilter;
