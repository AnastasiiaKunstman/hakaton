/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import cardService from './cardService';

export interface IResult {
  id: number,
  name: string;
  author: string;
  salary: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  required_education_level: IEducationLevel[],
  required_skills: ISkill[],
  pub_date: string,
  text: string,
  specialization: ISpecialization[],
}

interface ISpecialization {
  id: number
  name: string
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

export const getBigCards = createAsyncThunk(
  'card/bigGet',
  async (cardData: any, thunkAPI) => {
    try {
      return await cardService.getBigCards(cardData);
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
      state.results = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results = action.payload.results;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.results = null;
      })

      .addCase(getBigCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBigCards.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getBigCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        // Успешно удаленная карточка
        const deletedCardId = action.payload;
        // Обновляем состояние, удаляя карточку с указанным id
        state.results = state.results.filter((card) => card.id !== deletedCardId);
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
