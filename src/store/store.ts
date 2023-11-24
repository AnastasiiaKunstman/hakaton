import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  authReducer,
  vacancyReducer,
  filtersReducer,
  studentReducer,
  profileReducer,
} from './index';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    vacancies: vacancyReducer,
    student: studentReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
