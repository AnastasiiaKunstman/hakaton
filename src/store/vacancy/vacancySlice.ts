import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import vacancyService from './vacancyService';

export interface IVacancy {
  id: string
  name: string
  location: string
  text: string
  salary: string
  specialization: IEmployment[]
  schedule: IEmployment[]
  required_education_level: IEmployment[]
  required_skills: IEmployment[]
  languages?: string
  age?: string
  is_archived: boolean
  is_template: boolean
  template_invite: string
}

export interface IEmployment {
  name: string
}

interface IinitialState {
  vacancyList: IVacancy[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string | unknown
}

const initialState: IinitialState = {
  vacancyList: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getVacancies = createAsyncThunk(
  'vacancy/get',
  async (_, thunkAPI) => {
    try {
      return await vacancyService.getVacancies();
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const createVacancy = createAsyncThunk(
  'vacancy/create',
  async (vacancyData: any, thunkAPI) => {
    try {
      return await vacancyService.createVacancy(vacancyData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const updateVacancy = createAsyncThunk(
  'vacancy/update',
  async (vacancyData: any, thunkAPI) => {
    try {
      return await vacancyService.updateVacancy(vacancyData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const deleteVacancy = createAsyncThunk(
  'vacancy/delete',
  async (vacancyData: any, thunkAPI) => {
    try {
      return await vacancyService.daleteVacancy(vacancyData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const vacanciesSlice = createSlice({
  name: 'vanacies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.vacancyList.push(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createVacancy.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getVacancies.pending, (state) => {})
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.vacancyList = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteVacancy.pending, (state) => {})
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.vacancyList.filter((vacancy) => vacancy.id !== action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteVacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default vacanciesSlice.reducer;
