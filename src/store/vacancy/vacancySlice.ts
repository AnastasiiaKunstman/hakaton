/* eslint-disable @typescript-eslint/no-explicit-any */
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
  (vacancyID: number, thunkAPI) => {
    try {
      return vacancyService.getVacancy(vacancyID);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const createVacancy = createAsyncThunk(
  'vacancy/create',
  (vacancyData: any, thunkAPI) => {
    try {
      return vacancyService.createVacancy(vacancyData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const updateVacancy = createAsyncThunk(
  'vacancy/update',
  (vacancyData: any, thunkAPI) => {
    try {
      return vacancyService.updateVacancy(vacancyData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const deleteVacancy = createAsyncThunk(
  'vacancy/delete',
  (vacancyID: number, thunkAPI) => {
    try {
      vacancyService.deleteVacancy(vacancyID);
      return vacancyID;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const vacanciesSlice = createSlice({
  name: 'vacacies',
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
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.vacancyList = action.payload.results;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        const updatedVacancy = action.payload;
        const index = state.vacancyList.findIndex((v) => v.id === updatedVacancy.id);

        if (index !== -1) {
          // Обновляем существующую вакансию новыми данными
          state.vacancyList[index] = updatedVacancy;
        }

        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateVacancy.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.vacancyList = state.vacancyList.filter((v) => v.id !== action.payload);
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
