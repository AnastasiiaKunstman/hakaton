import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import filtersService from './filterService';

interface TOpts {
  id: number
  name: string
  symbol?: symbol
}

interface IinitialState {
  skillsOpt: TOpts[]
  educationLevelOpt: TOpts[]
  schedulesOpt: TOpts[]
  specializationsOpt: TOpts[]
  locationsOpt: TOpts[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string | unknown
}

const initialState: IinitialState = {
  skillsOpt: [],
  educationLevelOpt: [],
  specializationsOpt: [],
  schedulesOpt: [],
  locationsOpt: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getEducationLevel = createAsyncThunk('filters/educationLevel', async () => filtersService.getEducationLevel());

export const getSkills = createAsyncThunk('filters/skills', async () => filtersService.getSkills());

export const getSchedules = createAsyncThunk('filters/schedules', async () => filtersService.getSchedules());

export const getSpecializations = createAsyncThunk('filters/specializations', async () => filtersService.getSpecializations());

export const getLocations = createAsyncThunk('filters/locations', async () => filtersService.getLocations());

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(getSpecializations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.specializationsOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getSpecializations.rejected, (state) => {
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

      .addCase(getEducationLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEducationLevel.fulfilled, (state, action) => {
        state.educationLevelOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getEducationLevel.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.locationsOpt = action.payload;
        state.isLoading = false;
      })
      .addCase(getLocations.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default filtersSlice.reducer;
