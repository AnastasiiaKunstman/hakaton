/* eslint-disable max-len */
import React from 'react';
import {
  TableCell, TableRow, TextField, Avatar, Checkbox, IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
// import LikeActive from '../../images/LikeActive.svg';
// import Like from '../../images/Like.svg';
import Telegram from '../../images/telegram.svg';
import Email from '../../images/email.svg';
import Match from '../../images/circles.svg';

const label = { inputProps: { 'aria-label': 'Checkbox like' } };
interface StudentTableProps {
  student: IStudent
}

interface IStudent {
  id: number;
  avatar?: string;
  last_name: string;
  first_name: string;
  location: { id: number; name: string };
  schedule: ISchedule[];
  telegram: string;
  email: string;
  skills: ISkills[];
  is_favorited: boolean;
}

interface ISchedule {
  id: number
  name: string
}

interface ISkills {
  id: number
  name: string
}

function TableActive({ student }: StudentTableProps) {
  const [checked, setChecked] = React.useState(true);

  const skillsString = student.skills.map((name) => name.name).join(',  ');
  const scheduleString = student.schedule.map((name) => name.name).join(',  ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <TableRow>
      <TableCell>{student.id}</TableCell>
      <TableCell>
        <Checkbox
          icon={(
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1" width="23" height="23" rx="3.5" fill="white" stroke="#1D6BF3" />
              <path d="M10.304 16.419L6.38501 12.5C6.19748 12.3125 5.94317 12.2072 5.67801 12.2072C5.41284 12.2072 5.15854 12.3125 4.97101 12.5C4.78354 12.6875 4.67822 12.9418 4.67822 13.207C4.67822 13.4722 4.78354 13.7265 4.97101 13.914L8.89001 17.833C9.07574 18.0188 9.29625 18.1662 9.53896 18.2667C9.78166 18.3673 10.0418 18.4191 10.3045 18.4191C10.5672 18.4191 10.8274 18.3673 11.0701 18.2667C11.3128 18.1662 11.5333 18.0188 11.719 17.833L20.971 8.58099C21.1585 8.39347 21.2638 8.13916 21.2638 7.87399C21.2638 7.60883 21.1585 7.35452 20.971 7.16699C20.7835 6.97952 20.5292 6.87421 20.264 6.87421C19.9988 6.87421 19.7445 6.97952 19.557 7.16699L10.304 16.419Z" fill="#1D6BF3" />
            </svg>
          )}
          checkedIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" stroke="#797981" />
            </svg>
          )}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      <TableCell><Avatar src={student.avatar} /></TableCell>
      <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
      <TableCell>{student.location.name}</TableCell>
      <TableCell>{scheduleString}</TableCell>
      <TableCell>
        <TextField
          // value={student.matching_percentage}
          size="small"
          sx={{
            width: '100px',
            textAlign: 'center',
            backgroundColor: '#C2E5CE',
            padding: 0,
          }}
        />
      </TableCell>
      <TableCell>{skillsString}</TableCell>
      <TableCell sx={{ p: 0 }}>
        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <IconButton
          component="a"
          target="_blank"
        >
          <img src={Match} alt="Сравнение" />
        </IconButton>
        {/* <IconButton
      component="a"
      target="_blank"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
        <path d="M5.87313 14.629C4.02813 13.319 2.56813 11.615 1.74313 10.539C1.51244 10.242 1.38721 9.87659 1.38721 9.5005C1.38721 9.12441 1.51244 8.75902 1.74313 8.462C3.23613 6.513 6.81813 2.5 11.0001 2.5C12.8761 2.5 14.6301 3.307 16.1301 4.374" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.13 7.387C12.8523 7.10467 12.5214 6.88011 12.1565 6.72629C11.7916 6.57246 11.3998 6.49241 11.0038 6.49075C10.6078 6.48909 10.2154 6.56586 9.84915 6.71662C9.48295 6.86738 9.15022 7.08916 8.87016 7.36915C8.5901 7.64915 8.36824 7.98183 8.21739 8.34799C8.06654 8.71416 7.98969 9.10657 7.99125 9.50259C7.99282 9.8986 8.07278 10.2904 8.22652 10.6554C8.38026 11.0203 8.60473 11.3512 8.887 11.629M3 17.5L19 1.5M9 16.204C9.6492 16.3972 10.3227 16.4969 11 16.5C15.182 16.5 18.764 12.487 20.257 10.538C20.4876 10.2407 20.6127 9.87509 20.6125 9.49883C20.6124 9.12256 20.4869 8.75707 20.256 8.46C19.7313 7.77549 19.1684 7.12112 18.57 6.5" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconButton> */}
        <IconButton
          component="a"
          href={`https://t.me/${student.telegram}`}
          target="_blank"
        >
          <img src={Telegram} alt="Телеграм" />
        </IconButton>
        <IconButton
          component="a"
          href={`mailto:${student.email}`}
          target="_blank"
        >
          <img src={Email} alt="Почта" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableActive;
