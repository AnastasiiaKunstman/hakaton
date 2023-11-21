/* eslint-disable @typescript-eslint/no-shadow */
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
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { vacancyShema } from '../../utils/index';
import Input from '../../UI/Input/Input';
import { updateVacancy } from '../../store/vacancy/vacancySlice';

  type TSelectedOpt = {
    id: number
    name: string
  };

interface VacancyEditProps {
  vacancy: IVacancy
  isEditing: boolean;
  onSave: (editedVacancy: { name: string; text: string }) => void;
}

interface IVacancy {
  id: number,
  name: string;
  salary: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  required_education_level: IEducationLevel[];
  required_skills: ISkill[];
  specialization: ISpecialization[]
  pub_date: string;
  text: string
}

interface ISchedule {
  id: number;
  name: string;
}

interface ISpecialization {
  id: number;
  name: string;
}

interface IEducationLevel {
  id: number;
  name: string;
}

interface ISkill {
  id: number;
  name: string;
}

function EditVacancyForm({ vacancy }: VacancyEditProps) {
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
  const [selectedSkills, setSelectedSkills] = useState<TSelectedOpt[]>([]);

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

  const handleSkillsChange = (
    evt: SyntheticEvent,
    selectedSkill: TSelectedOpt[],
  ) => {
    setSelectedSkills([...selectedSkill]);
  };

  const [editedVacancy, setEditedVacancy] = useState({ ...vacancy });

  const handleFieldChange = (fieldName: string, value: string) => {
    setEditedVacancy((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <Box maxWidth="xl" sx={{ p: '50px 0 0', height: '588px' }}>

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
          dispatch(updateVacancy(transformedData));
        })}
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
                value={editedVacancy.name}
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
                  value={editedVacancy.salary}
                  onChange={(e) => handleFieldChange('salary', e.target.value)}
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

              </Grid>
              <Grid padding={0}>
                <Typography variant="caption" sx={{ marginBottom: '4px' }}>
                  Локация
                </Typography>
                <Autocomplete
                  options={locationsOpt}
                  getOptionLabel={(locationsOpt) => locationsOpt.name}
                  onChange={handleLocationChange}
                  value={selectedLocation || editedVacancy.location}
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
                <Typography id="skills_select_id_label" sx={{ marginBottom: '4px' }}>
                  Технологии, ключевые слова
                </Typography>
                <Autocomplete
                  multiple
                  options={skillsOpt}
                  getOptionLabel={(skillsOpt) => skillsOpt.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={handleSkillsChange}
                  value={selectedSkills}
                  filterSelectedOptions
                  noOptionsText="Нет подходящих вариантов"
                  renderInput={(params) => (
                    <Input
                      {...params}
                      type="text"
                      placeholder={
                    selectedSkills.length === 0
                      ? 'Например, React'
                      : ''
                  }
                      register={register}
                      registerName="required_skills"
                      error={!!errors.required_skills}
                      helperText={errors.required_skills?.message}
                    />
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
                  value={editedVacancy.text}
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: '27px',
        }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button variant="contained" sx={{ width: '220px' }} type="submit">
              Очистить форму
            </Button>
            <Button variant="contained" sx={{ width: '410px' }} type="submit">
              Сохранить
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default EditVacancyForm;
