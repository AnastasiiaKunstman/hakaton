export { default as authReducer } from '../features/auth/authSlice';
export { default as authService } from '../features/auth/authService';
export {
  signUp, login, logout, reset,
} from '../features/auth/authSlice';

export { default as filtersReducer } from '../features/filters/filterSlice';
export { default as filtersService } from '../features/filters/filterService';
export {
  getSkills,
  getSpecializations,
  getEducationLevel,
  getSchedules,
  getLocations,
} from '../features/filters/filterSlice';

export { default as vacancyReducer } from '../features/vacancy/vacancySlice';
export { default as vacancyService } from '../features/vacancy/vacancyService';
export { createVacancy, getVacancies, getVacancy } from '../features/vacancy/vacancySlice';

export { default as studentReducer } from '../features/students/studentSlice';
export { default as studentService } from '../features/students/studentService';
export {
  getStudents, setStudents, getFavoriteStudents, likeStudents, dislikeStudents,
} from '../features/students/studentSlice';

export { default as profileReducer } from '../features/profile/profileSlice';
export { default as profileService } from '../features/profile/profileService';
export { getProfile, deleteProfile, updateProfile } from '../features/profile/profileSlice';
