import React, { useState } from 'react';
import {
  Card, CardContent, Box, Typography, Button,
} from '@mui/material';
import './vacancyCard.scss';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppDispatch } from '../../store/index';
import deleteVacancy from '../../store/vacancy/vacancySlice';
import EditVacancy from '../EditVacancy/EditVacancy';

const getRandomColor = () => {
  const colors = ['#F1F6FF', '#C2E5CE', '#FFDDE5', '#CCC2ED'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

interface VacancyProps {
  id: number,
  name: string;
  salary: string;
  location: string;
  specialization: string;
  schedule: string;
  required_education_level: string,
  required_skills: string,
  pub_date: string,
}

// eslint-disable-next-line react/function-component-definition
const VacancyCard: React.FC<VacancyProps> = ({
  id,
  name,
  salary,
  location,
  specialization,
  schedule,
  required_education_level,
  required_skills,
  pub_date,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const cardStyle = {
    backgroundColor: getRandomColor(),
  };

  return (
    <Box>
      {isEditing ? (
      // Если isEditing установлен в true, отображаем компонент редактирования вакансии
        <EditVacancy onCancel={() => setIsEditing(false)} />
      ) : (
      // Иначе отображаем карточку вакансии с кнопкой редактирования
        <Card className="card" sx={cardStyle} style={{ borderRadius: '12px' }}>
          <CardContent className="card-content" sx={{ p: 0 }}>
            <Box className="box">
              <Typography variant="h3">
                {name}
              </Typography>
              <Box className="icon-box">
                <Button onClick={handleEditClick}>
                  <EditIcon className="icon-button" color="disabled" fontSize="small" />
                </Button>
                <Button onClick={() => dispatch(deleteVacancy(id))}>
                  <CloseIcon className="icon-button" color="disabled" fontSize="small" />
                </Button>
              </Box>
            </Box>
            <Box className="info-box">
              <Box className="row">
                <Typography className="label" variant="body1">{required_education_level}</Typography>
                <Typography className="value" variant="body1">{salary}</Typography>
              </Box>
              <Box className="row">
                <Box className="location-box">
                  <Typography className="location" variant="body1">{location}</Typography>
                  <Typography className="type" variant="body1">{schedule}</Typography>
                </Box>
                <Typography className="work-type" variant="body1">{specialization}</Typography>
              </Box>
            </Box>
            <Box className="description">
              <Typography variant="body2">{required_skills}</Typography>
            </Box>
            <Box className="date">
              <KeyboardArrowDownIcon className="icon-button" color="disabled" fontSize="small" />
              <Typography variant="body2">{pub_date}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default VacancyCard;
