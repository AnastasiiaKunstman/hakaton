// Пример: export { default as Компонент } from "./Компонент/Компонент"

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

export { default as searchReducer } from './search/searchSlice';
export { default as searchService } from './search/searchService';
// export { getStudents, setQuery } from './search/searchSlice';

export { default as cardReducer } from './card/cardSlice';
export { default as cardService } from './card/cardService';
export {
  getCards, setQuery, closeCard, deleteCard, getVacancyCard,
} from './card/cardSlice';

export { default as studentReducer } from './students/studentSlice';
export { default as studentService } from './students/studentService';
export { getStudents } from './students/studentSlice';
