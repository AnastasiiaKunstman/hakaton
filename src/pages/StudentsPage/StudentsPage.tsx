/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Autocomplete,
  Box, TextField, Typography,
} from '@mui/material';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import TableDynamic from '../../components/Table/TableDinamic';
import LoggedUserHeader from '../../components/Header/LoggedUserHeader';
import { useAppSelector } from '../../store/hooks';

export default function StudentsPage() {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const { specializationsOpt } = useAppSelector((state) => state.filters);
  const specialization = specializationsOpt.map((options) => options.name);

  return (
    <>
      <LoggedUserHeader />
      <Box
        maxWidth="xl"
        className="StudentsPage"
        sx={{
          p: '0 116px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '20px',
        }}
      >
        <NavigationMenu />
        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
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
              id="controllable-states-demo"
              fullWidth
              options={specialization}
              renderInput={(params) => <TextField {...params} placeholder="Например, Fronend разработчик" />}
            />
          </Box>
        </Box>
        <TableDynamic />
      </Box>
    </>
  );
}
