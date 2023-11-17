/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import cardService from './cardService';

export interface TVacancyCard {
  id: number,
  name: string;
  author: string;
  salary: string;
  pub_date: string,
  text: string,
  location: { id: number, name: string }
  specialization: string
  required_skills: {
    id: number
    name: string
  }[]
  schedule: {
    id: number
    name: string
  }[]
  required_education_level: {
    id: number
    name: string
  }[]
}

interface IInitialState {
  vacancyCard: TVacancyCard[] | null,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string | unknown,

}

const initialState: IInitialState = {
  vacancyCard: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getCards = createAsyncThunk(
  'card/get',
  async (_, thunkAPI) => {
    try {
      return await cardService.getCards();
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const getVacancyCard = createAsyncThunk(
  'card/vacancyCard',
  async (cardID: number | string, thunkAPI: any) => {
    try {
      return await cardService.getVacancyCard(cardID);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (cardID: number, thunkAPI) => {
    try {
      await cardService.deleteCard(cardID);
      return cardID;
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
    closeCard: (state) => {
      state.vacancyCard = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    setQuery: (state, action) => {
      state.vacancyCard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancyCard = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vacancyCard = null;
      })

      .addCase(getVacancyCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVacancyCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancyCard = action.payload;
      })
      .addCase(getVacancyCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.vacancyCard = state.vacancyCard.filter((card) => card.id !== action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteCard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setQuery, closeCard } = cardSlice.actions;
export default cardSlice.reducer;
