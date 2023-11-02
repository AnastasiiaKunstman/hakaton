export interface IUser {
  id?: number
  email: string;
  first_name: string;
  last_name: string;
  telegram?: string;
  phone_number?: string;
  company?: string;
  password: string;
}

export interface RegisterRequestData {
  email: string;
  first_name: string;
  last_name: string;
  telegram: string;
  phone_number: string;
  company: string;
  password: string;
}

export interface LoginRequestData {
  email: string
  password: string
}

export interface UserSlice {
  user: IUser;
  isUserLoading: boolean;
}
