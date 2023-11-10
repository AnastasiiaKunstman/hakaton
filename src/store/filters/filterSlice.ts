import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import filtersService from './filterService';

interface TOpts {
  id: number
  name: string
  symbol?: symbol
}

interface IinitialState {
  locationOpt: TOpts[]
  skillsOpt: TOpts[]
  experienceOpt: TOpts[]
  employmentsOpt: TOpts[]
  schedulesOpt: TOpts[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string | unknown
}

const initialState: IinitialState = {
  locationOpt: [],
  skillsOpt: [],
  employmentsOpt: [],
  experienceOpt: [],
  schedulesOpt: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getCity = createAsyncThunk('filters/city', async () => await filtersService.getCity());

export const getCurrency = createAsyncThunk('filters/currency', async () => await filtersService.getCurrency());

export const getSkills = createAsyncThunk('filters/skills', async () => await filtersService.getSkills());
export const getSchedules = createAsyncThunk('filters/schedules', async () => await filtersService.getSchedules());
export const getEmployments = createAsyncThunk(
  'filters/employments',
  async () => await filtersService.getEmployments(),
);
export const getExperiences = createAsyncThunk(
  'filters/experiences',
  async () => await filtersService.getExperiences(),
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.cityOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSchedules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.schedulesOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getSchedules.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getEmployments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployments.fulfilled, (state, action) => {
        state.employmentsOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getEmployments.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getExperiences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExperiences.fulfilled, (state, action) => {
        state.experienceOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getExperiences.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.skillsOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getSkills.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.currencyOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getCurrency.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default filtersSlice.reducer;
