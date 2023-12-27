import {
  Routes, Route,
} from 'react-router-dom';
import { useEffect } from 'react';
import Auth from './components/Auth/Auth';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import ViewedStudent from './pages/ViewedStudents/ViewedStudents';
import InvitedStudents from './pages/InvitedStudents/InvitedStudents';
import SaveStudents from './pages/SaveStudents/SaveStudents';
import CreateVacancy from './pages/CreateVacancy/CreateVacancy';
import ActiveVacancy from './pages/ActiveVacanciesPage/ActiveVacanciesPage';
import ArchivedVacancy from './pages/ArchivedVacanciesPage/ArchivedVacanciesPage';
import Student from './pages/Student/Student';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getSkills,
  getSpecializations,
  getEducationLevel,
  getSchedules,
  getLocations,
  getVacancies,
} from './app/index';
import PasswordRecovery from './components/Auth/PasswordRecovery/PasswordRecovery';
import NotFoundError from './components/NotFoundError/NotFoundError';
import Comparison from './pages/Comparison/Comparison';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getSkills());
      dispatch(getSpecializations());
      dispatch(getEducationLevel());
      dispatch(getSchedules());
      dispatch(getLocations());
      dispatch(getVacancies());
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/signin" element={<Auth podComponent="login" />} />
      <Route path="/signup" element={<Auth podComponent="registration" />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      <Route path="/student" element={<ProtectedRoute element={Student} />} />
      <Route path="*" element={<ProtectedRoute element={NotFoundError} />} />
      <Route path="/vacancies" element={<ProtectedRoute element={CreateVacancy} />} />
      <Route path="/vacancies/active" element={<ProtectedRoute element={ActiveVacancy} />} />
      <Route path="/vacancies/archive" element={<ProtectedRoute element={ArchivedVacancy} />} />
      <Route path="/students/" element={<ProtectedRoute element={StudentsPage} />} />
      <Route path="/students/viewed/" element={<ProtectedRoute element={ViewedStudent} />} />
      <Route path="/students/invited/" element={<ProtectedRoute element={InvitedStudents} />} />
      <Route path="/students/save/" element={<ProtectedRoute element={SaveStudents} />} />
      <Route path="/students/сomparison/" element={<ProtectedRoute element={Comparison} />} />
    </Routes>
  );
}

export default App;
