/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Card, CardContent, Box, Typography, Button, SvgIcon, IconButton, Dialog, DialogContent,
} from '@mui/material';
import './vacancyCard.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { format } from 'date-fns';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  IVacancy, updateVacancy,
} from '../../store/vacancy/vacancySlice';
import EditVacancy from './EditCard';
import DelCard from './DelCard';

interface VacancyCardProps {
  card: IVacancy
  onDelete: () => void
}

function VacancyCard({ card, onDelete }: VacancyCardProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();

  const skillsString = card.required_skills.map((name) => name.name);
  const formattedDate = format(new Date(card.pub_date), 'dd.MM');
  const educationLevel = card.required_education_level.map((name) => name.name);
  const schedule = card.schedule.map((name) => name.name).join(', ');

  const onClickCard = () => {
    setOpenEditDialog(true);
    setOpenDeleteDialog(false);
  };

  const handleSaveChanges = (updatedData: any) => {
    dispatch(updateVacancy(updatedData));
    setOpenEditDialog(false);
  };

  const onDeleteCard = () => {
    setOpenDeleteDialog(true);
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    onDelete();
    setOpenDeleteDialog(false);
  };

  const handleCloseDialogs = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Card
        className="card"
        key={card.id}
        style={{
          borderRadius: '12px',
          backgroundColor: '#F1F6FF',
          boxShadow: 'none',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ACCCFF'; }} // изменение цвета при наведении
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F1F6FF'; }}
      >
        <CardContent className="card-content" sx={{ p: 0 }}>
          <Box className="box">
            <Typography variant="h3">
              {card.name}
            </Typography>
            <Box className="icon-box">
              <IconButton sx={{ width: '24px', padding: 0 }} onClick={onClickCard}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.0252 1.97528C21.3997 1.35077 20.552 1 19.6681 1C18.7842 1 17.9365 1.35077 17.311 1.97528L2.34784 16.9384C1.91934 17.3645 1.57959 17.8714 1.34824 18.4296C1.11689 18.9879 0.99853 19.5864 1.00001 20.1907V22.0795C1.00001 22.3235 1.09694 22.5575 1.26948 22.7301C1.44202 22.9026 1.67603 22.9995 1.92003 22.9995H3.80883C4.41306 23.0012 5.01163 22.8831 5.56989 22.6519C6.12814 22.4207 6.63499 22.081 7.06109 21.6526L22.0252 6.68853C22.6494 6.0631 23 5.21555 23 4.3319C23 3.44826 22.6494 2.60071 22.0252 1.97528ZM5.76019 20.3517C5.2413 20.8672 4.54021 21.1574 3.80883 21.1595H2.84005V20.1907C2.83912 19.8281 2.91011 19.469 3.04893 19.134C3.18774 18.7991 3.39161 18.495 3.64875 18.2394L15.0045 6.88357L17.1206 8.99961L5.76019 20.3517ZM20.7234 5.38762L18.4178 7.69411L16.3018 5.58267L18.6082 3.27618C18.7472 3.13754 18.9121 3.02763 19.0935 2.95271C19.2749 2.8778 19.4693 2.83935 19.6656 2.83956C19.8619 2.83978 20.0562 2.87865 20.2374 2.95396C20.4187 3.02927 20.5833 3.13954 20.722 3.27848C20.8606 3.41742 20.9705 3.58231 21.0454 3.76373C21.1204 3.94515 21.1588 4.13955 21.1586 4.33583C21.1584 4.53211 21.1195 4.72642 21.0442 4.90768C20.9689 5.08894 20.8586 5.25358 20.7197 5.39222L20.7234 5.38762Z" fill="#797981" />
                  </svg>
                </SvgIcon>
              </IconButton>
              <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onDeleteCard}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6C17.8125 5.81253 17.5582 5.70721 17.293 5.70721C17.0278 5.70721 16.7735 5.81253 16.586 6L12 10.586L7.414 6C7.22647 5.81253 6.97216 5.70721 6.707 5.70721C6.44184 5.70721 6.18753 5.81253 6 6C5.81253 6.18753 5.70721 6.44184 5.70721 6.707C5.70721 6.97216 5.81253 7.22647 6 7.414L10.586 12L6 16.586C5.81253 16.7735 5.70721 17.0278 5.70721 17.293C5.70721 17.5582 5.81253 17.8125 6 18C6.18753 18.1875 6.44184 18.2928 6.707 18.2928C6.97216 18.2928 7.22647 18.1875 7.414 18L12 13.414L16.586 18C16.7735 18.1875 17.0278 18.2928 17.293 18.2928C17.5582 18.2928 17.8125 18.1875 18 18C18.1875 17.8125 18.2928 17.5582 18.2928 17.293C18.2928 17.0278 18.1875 16.7735 18 16.586L13.414 12L18 7.414C18.1875 7.22647 18.2928 6.97216 18.2928 6.707C18.2928 6.44184 18.1875 6.18753 18 6Z" fill="#797981" />
                  </svg>
                </SvgIcon>
              </IconButton>
            </Box>
          </Box>
          <Box className="info-box">
            <Box className="row">
              <Typography className="label" variant="body1">{educationLevel}</Typography>
              <Typography className="value" variant="body1">{card.salary}</Typography>
            </Box>
            <Box className="row">
              <Box className="location-box">
                <Typography className="location" variant="body1">{card.location.name}</Typography>
                <Typography className="type" variant="body1">{schedule}</Typography>
              </Box>
              <Typography className="work-type" variant="body1" />
            </Box>
          </Box>
          <Box className="description" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {skillsString.map((skill, id) => (
              <Box
                key={id}
                sx={{
                  border: '1px solid #1D6BF3',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#1D6BF3',
                  textAlign: 'center',
                  height: 'min-content',
                  padding: '6px 12px',
                  margin: '4px',
                }}
              >
                <Typography variant="body2">{skill}</Typography>
              </Box>
            ))}
          </Box>
          <Box className="date">
            <Button className="date_btn" variant="contained" href="#contained-buttons" onClick={onClickCard}>Перейти</Button>
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <KeyboardArrowDownIcon className="icon-button" color="disabled" fontSize="small" />
              <Typography variant="body2">{formattedDate}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog fullScreen onClose={handleCloseDialogs} aria-labelledby="customized-dialog-title" open={openEditDialog}>
        <EditVacancy
          key={card.id}
          card={card}
          onSave={handleSaveChanges}
          skillsString={skillsString}
          educationLevel={educationLevel}
          schedule={schedule}
          onDelete={onDeleteCard}
          onCancel={handleCloseDialogs}
        />
      </Dialog>

      <Dialog maxWidth="lg" onClose={handleCloseDialogs} open={openDeleteDialog}>
        <DialogContent sx={{
          width: '430px',
          height: '230px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <DelCard
            key={card.id}
            card={card}
            onDelete={handleDelete}
            onCancel={handleCloseDialogs}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VacancyCard;
