export { default as authReducer } from './auth/authSlice';
export { default as authService } from './auth/authService';
export {
  signUp, login, logout, reset,
} from './auth/authSlice';

export { default as filtersReducer } from './filters/filterSlice';
export { default as filtersService } from './filters/filterService';
export {
  getSkills,
  getSpecializations,
  getEducationLevel,
  getSchedules,
  getLocations,
} from './filters/filterSlice';

export { default as vacancyReducer } from './vacancy/vacancySlice';
export { default as vacancyService } from './vacancy/vacancyService';
export { createVacancy, getVacancies, getVacancy } from './vacancy/vacancySlice';

export { default as studentReducer } from './students/studentSlice';
export { default as studentService } from './students/studentService';
export {
  getStudents, setStudents, getFavoriteStudents, likeStudents, dislikeStudents,
} from './students/studentSlice';

export { default as profileReducer } from './profile/profileSlice';
export { default as profileService } from './profile/profileService';
export { getProfile, deleteProfile, updateProfile } from './profile/profileSlice';
