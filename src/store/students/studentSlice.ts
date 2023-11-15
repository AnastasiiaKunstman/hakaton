/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import studentService from './studentService';

interface IResult {
  id: number;
  avatar?: string;
  last_name: string;
  first_name: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  telegram: string;
  email: string;
  skills: ISkills[];
  is_favorited: boolean;
}

interface ISchedule {
  id: number
  name: string
}

interface ISkills {
  id: number
  name: string
}

interface IinitialState {
  query: string
  results: IResult[] | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string | unknown
}

const initialState: IinitialState = {
  query: '',
  results: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getStudents = createAsyncThunk(
  'student/get',
  async (query: any, thunkAPI) => {
    try {
      return await studentService.getStudents(query);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results = action.payload.results;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.results = null;
      });
  },
});

export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
