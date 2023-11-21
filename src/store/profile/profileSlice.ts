import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import profileService from './profileService';

export type IProfile = {
  id?: number
  avatar?: string
  first_name: string
  last_name: string
  telegram: string
  email:string
  phone_number: string
  company: string
  password: string
  is_active: boolean
};

interface IInitialState {
  profile: IProfile | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const initialState: IInitialState = {
  profile: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getProfile = createAsyncThunk(
  'profile/get',
  async (_, thunkAPI) => {
    try {
      return await profileService.getProfile();
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData: any, thunkAPI) => {
    try {
      return await profileService.updateProfile(profileData);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async (profileID: number, thunkAPI) => {
    try {
      await profileService.deleteProfile(profileID);
      return profileID;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile | null>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profile = state.profile.filter((p) => p.id !== action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
