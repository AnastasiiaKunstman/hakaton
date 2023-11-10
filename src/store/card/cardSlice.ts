/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import cardService from './cardService';

interface IResult {
  id: number,
  name: string;
  author: string;
  salary: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  required_education_level: IEducationLevel[],
  required_skills: ISkill[],
  pub_date: string,
}

interface ISchedule {
  id: number
  name: string
}

interface IEducationLevel {
  id: number
  name: string
}

interface ISkill {
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

export const getCards = createAsyncThunk(
  'card/get',
  async (query: any, thunkAPI) => {
    try {
      return await cardService.getCards(query);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        console.log('getCards.pending');
        state.isLoading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        console.log('getCards.fulfilled', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.results = action.payload.results || [];
      })
      .addCase(getCards.rejected, (state, action) => {
        console.log('getCards.rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.results = null;
      });
  },
});

export const { setQuery } = cardSlice.actions;
export default cardSlice.reducer;
