/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import Box from '@mui/material/Box';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import UnloggedUserHeader from '../Header/UnloggedUserHeader';
import Footer from '../Footer/Footer';
import './Auth.scss';

enum EPodComponent {
  login,
  registration,
}

type TPodComponent = keyof typeof EPodComponent;

interface IAuthProps {
  podComponent: TPodComponent
}

const Auth: FC<IAuthProps> = ({ podComponent = 'login' }) => (
  <Box className="auth">
    <UnloggedUserHeader />
    {podComponent === 'login' ? <Login /> : <Registration /> }
    <Footer />
  </Box>
);

export default Auth;
