/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import studentService from './studentService';

export interface IResult {
  id: number;
  avatar?: string;
  last_name: string;
  first_name: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  telegram: string;
  email: string;
  skills: ISkills[];
  required_education_level?: IEducationLevel[];
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

interface IEducationLevel {
  id: number
  name: string
}

interface ToggleFavoriteStatusParams {
  studentID: number;
  isFavorite: boolean;
}

interface IinitialState {
  query: string
  results: IResult[]
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
  (_, thunkAPI) => {
    try {
      return studentService.getStudents();
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const getFavoriteStudents = createAsyncThunk(
  'student/get',
  (_, thunkAPI) => {
    try {
      return studentService.getFavoriteStudents();
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const likeStudents = createAsyncThunk(
  'favorite/like',
  ({ studentID, isFavorite }: ToggleFavoriteStatusParams, thunkAPI) => {
    try {
      return studentService.likeStudents(studentID, isFavorite);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const dislikeStudents = createAsyncThunk(
  'favorite/dislike',
  ({ studentID, isFavorite }: ToggleFavoriteStatusParams, thunkAPI) => {
    try {
      return studentService.dislikeStudents(studentID, isFavorite);
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
    setStudents: (state, action: PayloadAction<{ results: IResult[] }>) => {
      state.results = action.payload.results;
    },
    addToFavorites: (state, action: PayloadAction<IResult>) => {
      const studentToAdd = state.results?.find((student) => student.id === action.payload.id);
      if (studentToAdd) {
        state.results?.push(studentToAdd);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.results = state.results?.map((student) => (
        student.id === action.payload ? { ...student, isFavorite: false } : student
      ));
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
      })

      // eslint-disable-next-line max-len
      .addCase(likeStudents.fulfilled, (state, action: PayloadAction<IResult | { detail: string }>) => {
        if ('detail' in action.payload) {
          console.log(action.payload.detail);
        } else {
          state.results?.unshift(action.payload);
          state.isSuccess = true;
        }

        state.isLoading = false;
      })
      .addCase(likeStudents.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(dislikeStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dislikeStudents.fulfilled, (state, action: PayloadAction<number>) => {
        // Обновляем статус isFavorite у студента с указанным ID
        state.results = state.results?.map((student) => (
          student.id === action.payload ? { ...student, isFavorite: false } : student
        ));
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(dislikeStudents.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setStudents, addToFavorites, removeFromFavorites } = studentSlice.actions;

export default studentSlice.reducer;
