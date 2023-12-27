/* eslint-disable max-len */
import React from 'react';
import {
  TableCell, TableRow, TextField, Avatar, Checkbox, IconButton, Dialog,
} from '@mui/material';
import Student from '../../pages/Student/Student';
import './TableActive.scss';

interface StudentTableProps {
  student: IStudent
  onLike: (studentId: number, isFavorite: boolean) => void
  onDelete: (studentId: number, isFavorite: boolean) => void
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

function TableActive({ student, onLike, onDelete }: StudentTableProps) {
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(student.is_favorited);

  const skillsString = student.skills.map((name) => name.name).join(',  ');
  const scheduleString = student.schedule.map((name) => name.name).join(',  ');

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      onLike(student.id, true); // Передаем true, так как мы собираемся добавить в избранное
      setIsFavorite(true);
    } else {
      onDelete(student.id, false); // Передаем false, так как мы собираемся удалить из избранного
      setIsFavorite(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handelOpenPopup = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onClickCard = () => {
    handelOpenPopup();
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#F1F6FF',
        },
      }}
      >
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
        <TableCell onClick={onClickCard}><Avatar src={student.avatar} /></TableCell>
        <TableCell onClick={onClickCard}>{`${student.first_name} ${student.last_name}`}</TableCell>
        <TableCell onClick={onClickCard}>{student.location.name}</TableCell>
        <TableCell onClick={onClickCard}>{scheduleString}</TableCell>
        <TableCell onClick={onClickCard}>
          <TextField
          // value={student.matching_percentage}
            size="small"
            disabled
            sx={{
              width: '100px',
              textAlign: 'center',
              backgroundColor: '#C2E5CE',
              padding: 0,
            }}
          />
        </TableCell>
        <TableCell onClick={onClickCard}>{skillsString}</TableCell>
        <TableCell sx={{ padding: '16px 0' }}>
          <IconButton
            onClick={handleFavoriteClick}
            className={`icon-button__like ${isFavorite ? 'active' : ''}`}
          />
          <IconButton
            className="icon-button__match"
          />
          <IconButton
            className="icon-button__telegram"
            component="a"
            href={`https://t.me/${student.telegram}`}
            target="_blank"
          />
          <IconButton
            className="icon-button__email"
            component="a"
            href={`mailto:${student.email}`}
            target="_blank"
          />
        </TableCell>
      </TableRow>

      <Dialog fullScreen onClose={handelOpenPopup} aria-labelledby="customized-dialog-title" open={open}>
        <Student
          key={student.id}
          student={student}
          onCancel={handleCloseDialog}
          onFavorite={onDelete}
        />
      </Dialog>
    </>
  );
}

export default TableActive;
