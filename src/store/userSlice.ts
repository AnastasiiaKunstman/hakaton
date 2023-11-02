import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { RegisterRequestData, UserSlice } from './userSlice.types';

const GET_USER = 'GET_USER';
const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const LOGOUT = 'LOGOUT';

export const initialStateUser: UserSlice = {
  user: {
    id: undefined,
    email: '',
    first_name: '',
    last_name: '',
    telegram: '',
    phone_number: '',
    company: '',
    password: '',
  },
  isUserLoading: true,
};

export const signupUser = createAsyncThunk(
  `users/${SIGN_UP}`,
  async (data: RegisterRequestData) => {
    const response = await axiosInstance({
      method: 'POST',
      url: '/users/',
      data,
    });

    return response.data;
  },
);

const user = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    clearUser: (state: UserSlice) => ({ ...state, user: initialStateUser.user }),
    updateUser: (state: UserSlice, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  actions: { clearUser, updateUser },
  reducer: userReducer,
} = user;
