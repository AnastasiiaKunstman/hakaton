/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {
  FC, useEffect, useState,
} from 'react';
import {
  Autocomplete,
  Box, Button, FormControlLabel, Grid, MenuItem, Select, TextField, Typography,
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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { vacancyShema } from '../../utils/index';
import { IVacancy, updateVacancy } from '../../features/vacancy/vacancySlice';
import '../btnVacancy/BtnVacancy.scss';

interface CardProps {
  vacancy: IVacancy;
  skillsString: string[];
  educationLevel: string[];
  schedule: string;
  formattedDate: string;
  onDelete: () => void;
  onCancel: () => void;
}

const EditVacancy:FC<CardProps> = ({
  vacancy, skillsString, educationLevel, schedule, formattedDate, onDelete, onCancel,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IVacancy>({} as IVacancy);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vacancyShema) });

  useEffect(() => {
    if (vacancy) {
      setFormData({
        id: vacancy.id,
        is_archived: vacancy.is_archived,
        name: vacancy.name,
        location: vacancy.location,
        text: vacancy.text,
        salary: vacancy.salary,
        pub_date: vacancy.pub_date,
        specialization: vacancy.specialization,
        schedule: vacancy.schedule,
        required_education_level: vacancy.required_education_level,
        required_skills: vacancy.required_skills,
      });
    }
  }, [vacancy]);

  console.log(vacancy);

  const specialization = vacancy?.specialization?.map((name) => name.name).join(', ');

  const handleFormChange = (fieldName: string | number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateVacancy(formData)).unwrap();
      setSnackbarSeverity('success');
      setSnackbarMessage('Изменения сохранены.');
      setSnackbarOpen(true);
    } catch (error: any) {
      console.error('Ошибка при сохранении данных:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Ошибка при редактировании вакансии.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [hidden, setHidden] = useState(false);

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  const handleClear = () => {
    setFormData({
      ...formData,
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
        <Box maxWidth="xl" key={vacancy.id} sx={{ p: '20px 0 71px', height: '588px' }}>

          <form noValidate onSubmit={handleSave}>

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
                    value={formData.name || ''}
                    onChange={(e) => handleFormChange('name', e)}
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
                      value={formData.salary || ''}
                      onChange={(e) => handleFormChange('salary', e)}
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
                        Дата создания вакансии
                      </Typography>
                      <Input
                        type="text"
                        size="small"
                        placeholder="Диапазон действия"
                        value={formattedDate || ''}
                        onChange={(e) => handleFormChange('pub_date', e)}
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
                        value={schedule || ''}
                        onChange={(e) => handleFormChange('schedule', e)}
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
                      value={vacancy.location.name || ''}
                      onChange={(e) => handleFormChange(formData.location.id, e)}
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
                        value={educationLevel || ''}
                        onChange={(e) => handleFormChange('required_education_level', e)}
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
                        value={specialization || ''}
                        onChange={(e) => handleFormChange('specialization', e)}
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
                      <img src={AI} alt="" />
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
                      value={skillsString || ''}
                      onChange={(e) => handleFormChange('required_skills', e)}
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
                      value={formData.text || ''}
                      onChange={(e) => handleFormChange('text', e)}
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
};

export default EditVacancy;
