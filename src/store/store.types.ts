import { UserSlice } from './userSlice.types';
import { StudentsState } from './studensSlice';

export interface Store {
  user: UserSlice;
  students: StudentsState;
}
