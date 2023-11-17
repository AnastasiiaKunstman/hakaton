/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import vacancyService from './vacancyService';

export type IVacancy = {
  id: number;
  name: string;
  location: { id: number; name: string };
  text: string;
  salary: string;
  pub_date: string;
  specialization: IEmployment[];
  schedule: IEmployment[];
  required_education_level: IEmployment[];
  required_skills: IEmployment[];
  is_archived: boolean;
  results: IVacancy[];
};

interface IEmployment {
  name: string;
}

interface IInitialState {
  vacancyList: IVacancy[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const initialState: IInitialState = {
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

export const getVacancy = createAsyncThunk(
  'vacancy/get',
  async (vacancyID: number, thunkAPI) => {
    try {
      return await vacancyService.getVacancy(vacancyID);
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
  async (vacancyID: number, thunkAPI) => {
    try {
      await vacancyService.deleteVacancy(vacancyID);
      return vacancyID;
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

      .addCase(getVacancies.pending, (state) => {
        state.isLoading = true;
      })
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

      .addCase(deleteVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.vacancyList = state.vacancyList.filter((vanacies) => vanacies.id !== action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteVacancy.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default vacanciesSlice.reducer;
