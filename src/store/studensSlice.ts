/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';

const GET_STUDENT = 'GET_STUDENT';

type ResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: StudentsState;
};

type Student = {
  id: number;
  avatar?: string;
  last_name: string;
  first_name: string;
  location: string[];
  telegram: string;
  email: string;
  schedule: string[]; 
  skills: string[];
  is_favorited: boolean;
};

export type StudentsState = {
  students: Student[];
};

const initialState: StudentsState = {
  students: [],
};

export const fetchStudents = createAsyncThunk(
  `students/${GET_STUDENT}`,
  async () => {
    const response = await axiosInstance({
      method: 'GET',
      url: '/students/',
    });
    return response.data;
  },
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state: StudentsState) => {
      console.log('fetchStudents.pending');
      state.students = initialState.students;
    });
    builder.addCase(fetchStudents.fulfilled, (state: StudentsState, action) => {
      console.log('fetchStudents.fulfilled', action.payload);
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state: StudentsState) => {
      console.log('fetchStudents.rejected');
      state.students = initialState.students;
    });
  },
});

export default studentSlice.reducer;
