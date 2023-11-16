/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormControlLabel, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import LoggedUserHeader from '../Header/LoggedUserHeader';
import { ICardData } from '../../store/card/cardService';
import Snackbars from '../SnackBars/SnackBars';
import Input from '../../UI/Input/Input';
import Delete from '../../images/delete.svg';
import AI from '../../images/tetris_transparant.svg';
import { IOSSwitch } from '../../utils/constans/Switch';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { vacancyShema } from '../../utils/index';
import { updateVacancy } from '../../store/vacancy/vacancySlice';
import '../btnVacancy/BtnVacancy.scss';

type TSelectedOpt = {
  id: number
  name: string
};

interface EditVacancyProps {
  card: ICardData;
}

export default function EditVacancy({ card }: EditVacancyProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [editedVacancy, setEditedVacancy] = useState<ICardData | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card) {
      setEditedVacancy(card);
    }
  }, [card]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setEditedVacancy((prev) => ({
      ...prev!,
      [fieldName]: value,
    }));
  };

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
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px' }}>
        <NavigationMenu />
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
              await dispatch(updateVacancy(transformedData));
              const isUpdateSuccessful = updateVacancy(transformedData);

              if (isUpdateSuccessful) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Изменения сохранены.');
              } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Ошибка при редактировании вакансии.');
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
                    value={editedVacancy?.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
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
                      value={editedVacancy?.salary || ''}
                      onChange={(e) => handleFieldChange('salary', e.target.value)}
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
                      defaultValue={editedVacancy?.schedule || ''}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" sx={{ marginTop: '4px', backgroundColor: '#fff' }}>
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
                        defaultValue={editedVacancy?.required_education_level || ''}
                        render={({ field }) => (
                          <Select {...field} fullWidth size="small" sx={{ marginTop: '4px', backgroundColor: '#fff' }}>
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
                        defaultValue={editedVacancy?.specialization || ''}
                        render={({ field }) => (
                          <Select {...field} fullWidth size="small" sx={{ marginTop: '4px', backgroundColor: '#fff' }}>
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
                      defaultValue={editedVacancy?.required_skills || ''}
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
                      value={editedVacancy?.text || ''}
                      onChange={(e) => handleFieldChange('text', e.target.value)}
                      register={register}
                      registerName="text"
                      error={!!errors.text}
                      helperText={errors.text?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pt: '27px',
              }}
            >
              <Box className="edit-buttons" textAlign="center">
                <Button className="edit-button">
                  Удалить вакансию
                </Button>
                <Button className="edit-button">
                  В архив
                </Button>
              </Box>
              <Box className="edit-buttons">
                <Button className="clear-button">
                  Очистить текст
                </Button>
                <Button type="submit" className="publish-button">
                  Сохранить
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
      </Box>
    </>
  );
}
