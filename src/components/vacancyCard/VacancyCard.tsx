import React from 'react';
import {
  Card, CardContent, Box, Typography,
} from '@mui/material';
import './vacancyCard.scss';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const getRandomColor = () => {
  const colors = ['#F1F6FF', '#C2E5CE', '#FFDDE5', '#CCC2ED'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

function RandomColorCard() {
  const cardStyle = {
    backgroundColor: getRandomColor(),
  };

  return (
    <Card className="card" sx={cardStyle} style={{ borderRadius: '12px' }}>
      <CardContent className="card-content" sx={{ p: 0 }}>
        <Box className="box">
          <Typography variant="h3">
            Middle Frontend-разработчик (React)
          </Typography>
          <Box className="icon-box">
            <EditIcon className="icon-button" color="disabled" fontSize="small" />
            <CloseIcon className="icon-button" color="disabled" fontSize="small" />
          </Box>
        </Box>
        <Box className="info-box">
          <Box className="row">
            <Typography className="label" variant="body1">Мидл</Typography>
            <Typography className="value" variant="body1">100000</Typography>
          </Box>
          <Box className="row">
            <Box className="location-box">
              <Typography className="location" variant="body1">Moscow</Typography>
              <Typography className="type" variant="body1">офис</Typography>
            </Box>
            <Typography className="work-type" variant="body1">проектная работа</Typography>
          </Box>
        </Box>
        <Box className="description">
          <Typography variant="body2">тут будут навыки</Typography>
        </Box>
        <Box className="date">
          <KeyboardArrowDownIcon className="icon-button" color="disabled" fontSize="small" />
          <Typography variant="body2">28 окт</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RandomColorCard;
