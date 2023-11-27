/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { FC, useEffect, useState } from 'react';
import {
  Box, Button, FormControlLabel, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import LoggedUserHeader from '../Header/LoggedUserHeader';
import Snackbars from '../SnackBars/SnackBars';
import Input from '../../UI/Input/Input';
import Delete from '../../images/delete.svg';
import AI from '../../images/tetris_transparant.svg';
import { IOSSwitch } from '../../utils/constans/Switch';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { vacancyShema } from '../../utils/index';
import { IVacancy, getVacancy, updateVacancy } from '../../store/vacancy/vacancySlice';
import '../btnVacancy/BtnVacancy.scss';

type TSelectedOpt = {
  id: number
  name: string
};

interface CardProps {
  card: IVacancy
  onSave: (updatedData: IVacancy) => void;
  skillsString: string[];
  educationLevel: string[];
  schedule: string;
  onDelete: () => void;
  onCancel: () => void;
}

const EditVacancy:FC<CardProps> = ({
  card, onSave, skillsString, educationLevel, schedule, onDelete, onCancel,
}) => {
  const dispatch = useAppDispatch();

  const [editedData, setEditedData] = useState<IVacancy>(card);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (field: string, value: string | TSelectedOpt) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  // console.log(card);

  const handleSave = () => {
    dispatch(updateVacancy(editedData))
      .then((response: any) => {
        onSave(editedData);
        setSnackbarSeverity('success');
        setSnackbarMessage('Изменения сохранены.');
      })
      .catch((error: any) => {
        console.error('Ошибка при сохранении данных:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Ошибка при редактировании вакансии.');
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vacancyShema) });

  // const {
  //   skillsOpt,
  //   educationLevelOpt,
  //   specializationsOpt,
  //   schedulesOpt,
  //   locationsOpt,
  // } = useAppSelector((state) => state.filters);

  // const schedule = card.schedule.map((name) => name.name).join(', ');
  // const educationLevel = card.required_education_level.map((name) => name.name).join(', ');
  // const skills = card.required_skills.map((name) => name.name).join(', ');
  // const specialization = card.specialization.map((name) => name.name).join(', ');

  // console.log(schedule, educationLevel, skills);

  const [hidden, setHidden] = useState(false);
  // const [selectedSkills, setSelectedSkills] = useState<TSelectedOpt[]>([]);

  // const handleSkillsChange = (event: SelectChangeEvent<typeof selectedSkills>) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   const selectedValues: TSelectedOpt[] = typeof value === 'string' ? value.split(',').map((item) => ({ id: Number(item), name: String(item) })) : value;

  //   setSelectedSkills(selectedValues);
  // };

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  const handleClear = () => {
    // Очищаем все поля формы, кроме id
    setEditedData({
      ...editedData,
      name: '',
      location: { id: 0, name: '' },
      text: '',
      salary: '',
      pub_date: '',
      specialization: [],
      schedule: [],
      required_education_level: [],
      required_skills: [],
      is_archived: false,
    });
  };

  return (
    <>
      <LoggedUserHeader />
      <Box maxWidth="xl" sx={{ p: '0 118px' }}>
        <NavigationMenu />
        <Box maxWidth="xl" key={card.id} sx={{ p: '20px 0 71px', height: '588px' }}>

          <form
            noValidate
            // onSubmit={handleSubmit(async (data) => {
            //   console.log(data);
            //   const transformedData = {
            //     ...data,
            //     location: data.location,
            //     required_skills: selectedSkills.map((id) => ({ id, name: String(id) })),
            //     required_education_level: [{ id: Number(data.required_education_level), name: String(data.required_education_level) }],
            //     specialization: [{ id: Number(data.specialization), name: String(data.specialization) }],
            //     schedule: [{ id: Number(data.schedule), name: String(data.schedule) }],
            //   };
            //   await dispatch(updateVacancy(transformedData));
            //   // const isUpdateSuccessful = updateVacancy(transformedData);

            //   if (updateVacancy(transformedData)) {
            //     setSnackbarSeverity('success');
            //     setSnackbarMessage('Изменения сохранены.');
            //   } else {
            //     setSnackbarSeverity('error');
            //     setSnackbarMessage('Ошибка при редактировании вакансии.');
            //   }

            //   setSnackbarOpen(true);
            //   reset();
            // })}
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
                    value={editedData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
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
                      value={editedData.salary}
                      onChange={(e) => handleChange('salary', e.target.value)}
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
                      <Input
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="Офис"
                        value={schedule}
                        onChange={(e) => handleChange('schedule', e.target.value)}
                        register={register}
                        registerName="schedule"
                        error={!!errors.schedule}
                        helperText={errors.schedule?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid padding={0}>
                    <Typography variant="caption" fontWeight={500}>
                      Локация
                    </Typography>
                    <Input
                      type="text"
                      fullWidth
                      size="small"
                      placeholder="Город"
                      value={editedData.location.name}
                      onChange={(e) => handleChange('location', { id: editedData.location.id, name: e.target.value })}
                      register={register}
                      registerName="location"
                      error={!!errors.location}
                      helperText={errors.location?.message}
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
                      <Input
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="Intern"
                        value={educationLevel}
                        onChange={(e) => handleChange('required_education_level', e.target.value)}
                        register={register}
                        registerName="required_education_level"
                        error={!!errors.required_education_level}
                        helperText={errors.required_education_level?.message}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="caption" fontWeight={500}>
                        Специализация
                      </Typography>
                      <Input
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="Designer"
                        value={editedData.specialization}
                        onChange={(e) => handleChange('specialization', e.target.value)}
                        register={register}
                        registerName="specialization"
                        error={!!errors.specialization}
                        helperText={errors.specialization?.message}
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
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#1D6BF3',
                        },
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
                    gap: '20px',
                  }}
                >
                  <Grid item xs={12}>
                    <Typography variant="caption" fontWeight={500}>
                      Технологии, ключевые слова
                    </Typography>
                    <Input
                      type="text"
                      fullWidth
                      multiline
                      placeholder="Технологии, ключевые слова"
                      value={skillsString}
                      onChange={(e) => handleChange('required_skills', e.target.value)}
                      register={register}
                      registerName="required_skills"
                      error={!!errors.required_skills}
                      helperText={errors.required_skills?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" fontWeight={500}>
                      Описание работы
                    </Typography>
                    <Input
                      type="text"
                      rows={13}
                      fullWidth
                      multiline
                      name="text"
                      value={editedData.text}
                      onChange={(e) => handleChange('text', e.target.value)}
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
                <Button className="cancel-button" onClick={onCancel}>
                  Отмена
                </Button>
                <Button className="edit-button" onClick={onDelete}>
                  Удалить вакансию
                </Button>
              </Box>
              <Box className="edit-buttons">
                <Button className="clear-button" onClick={handleClear}>
                  Очистить
                </Button>
                <Button type="submit" className="publish-button" onClick={handleSave}>
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
};

export default EditVacancy;
