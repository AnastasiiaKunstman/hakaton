import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/store';
import { Store } from './store/store.types';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Header from './components/header/Header';

import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import ViewedStudent from './pages/ViewedStudents/ViewedStudents';
import InvitedStudents from './pages/InvitedStudents/InvitedStudents';
import SaveStudents from './pages/SaveStudents/SaveStudents';
import CreateVacancy from './pages/CreateVacancy/CreateVacancy';
import ActiveVacancy from './pages/ActiveVacanciesPage/ActiveVacanciesPage';
import ArchivedVacancy from './pages/ArchivedVacanciesPage/ArchivedVacanciesPage';
import Student from './pages/student/Student';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/vacancies" element={<CreateVacancy />} />
        <Route path="/vacancies/active" element={<ActiveVacancy />} />
        <Route path="/vacancies/archive" element={<ArchivedVacancy />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/viewed" element={<ViewedStudent />} />
        <Route path="/students/invited" element={<InvitedStudents />} />
        <Route path="/students/save" element={<SaveStudents />} />
      </Routes>
    </>
  );
}
