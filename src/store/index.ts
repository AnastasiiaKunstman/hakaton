// Пример: export { default as Компонент } from "./Компонент/Компонент"

export { default as authReducer } from './auth/authSlice';
export { default as authService } from './auth/authService';
export {
  signUp, login, logout, reset,
} from './auth/authSlice';

export { default as filtersReducer } from './filters/filterSlice';
export { default as filtersService } from './filters/filterService';
// export {
//   getCity,
//   getCurrency,
//   getSkills,
//   getSchedules,
//   getExperiences,
//   getEmployments,
// } from './filters/filterSlice';

export { default as vacancyReducer } from './vacancy/vacancySlice';
export { default as vacancyService } from './vacancy/vacancyService';
export { createVacancy, getVacancies, deleteVacancy } from './vacancy/vacancySlice';

export { default as searchReducer } from './search/searchSlice';
export { default as searchService } from './search/searchService';
// export { getStudents, setQuery } from './search/searchSlice';

export { default as cardReducer } from './card/cardSlice';
export { default as cardService } from './card/cardService';
export { getCards, setQuery } from './card/cardSlice';

export { default as studentReducer } from './students/studentSlice';
export { default as studentService } from './students/studentService';
export { getStudents, setQuery } from './students/studentSlice';
