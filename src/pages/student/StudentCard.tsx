/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Card, CardContent, Typography, Button, SvgIcon, Dialog, CardMedia, CardActions, Avatar,
} from '@mui/material';
import { useState } from 'react';
import { IFavorite } from '../../store/favorite/favoriteSlice';
import Student from './Student';
import './StudentCard.scss';

interface StudentProps {
  student: IFavorite
  onFavorite: () => void
}

function StudentCard({ student, onFavorite }: StudentProps) {
  const [open, setOpen] = useState(false);

  const skillsString = student.skills.map((name) => name.name);
  const schedule = student.schedule.map((name) => name.name).join(', ');

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

  const handleCloseDialogs = () => {
    setOpen(false);
  };

  return (
    <>
      <Card key={student.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`${student.avatar}` || '../'}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${student.first_name} ${student.last_name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small" onClick={onClickCard}>Подробнее</Button>
          <Button size="small">
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                <path d="M11.5174 2.3083C12.0129 1.74981 12.6154 1.2963 13.2891 0.974552C13.9629 0.652803 14.6943 0.469344 15.4401 0.435012C16.186 0.40068 16.9311 0.516171 17.6316 0.774664C18.332 1.03316 18.9736 1.42941 19.5183 1.94001C20.0631 2.45061 20.5 3.06521 20.8032 3.74749C21.1064 4.42978 21.2698 5.16592 21.2838 5.91242C21.2977 6.65893 21.1619 7.40065 20.8844 8.09379C20.6069 8.78693 20.1933 9.41742 19.668 9.94802L11.4565 18.2383C11.3968 18.2987 11.3256 18.3466 11.2472 18.3793C11.1688 18.4121 11.0847 18.4289 10.9997 18.4289C10.9147 18.4289 10.8306 18.4121 10.7522 18.3793C10.6738 18.3466 10.6026 18.2987 10.5428 18.2383L2.3314 9.94802C1.33539 8.94245 0.758155 7.59633 0.716312 6.1816C0.674468 4.76687 1.17113 3.38898 2.10597 2.3263C4.32426 -0.196272 8.25168 -0.204843 10.482 2.3083L10.9997 2.89116L11.5174 2.3083Z" fill="#1D6BF3" />
              </svg>
            </SvgIcon>
          </Button>
        </CardActions>
      </Card>

      {/* <Card
        className="card"
        key={student.id}
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
          <Avatar src={student.avatar} alt="Аватар" />

          <Box className="box">
            <Box className="icon-box">
              <IconButton
                sx={{ width: '24px', padding: 0 }}
                component="a"
                href={`mailto:${student.email}`}
                target="_blank"
              >
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                    <path d="M22.3233 6.55959H20.8106V5.04679C20.8106 4.12227 20.0585 3.37012 19.134 3.37012H17.6212V1.85746C17.6212 0.929896 16.8687 0.180786 15.9446 0.180786H1.67667C0.754453 0.180833 0 0.927552 0 1.85746V11.7637C0 12.6882 0.752156 13.4403 1.67667 13.4403H3.18937V14.9531C3.18937 15.8776 3.94153 16.6298 4.86605 16.6298H6.37875V18.1425C6.37875 19.067 7.13091 19.8192 8.05542 19.8192H22.3234C23.2479 19.8192 24 19.067 24 18.1425V8.23621C24 7.31174 23.2478 6.55959 22.3233 6.55959ZM14.7343 1.85511L8.81063 7.66045L2.88708 1.85526L14.7343 1.85511ZM1.67442 11.7637L1.67475 3.01157L8.22464 9.43059C8.55019 9.74967 9.07116 9.74957 9.39661 9.43059L15.9465 3.01152L15.9447 11.7659L1.67442 11.7637ZM4.8638 14.953V13.4403H15.9447C16.8692 13.4403 17.6213 12.6882 17.6213 11.7637V5.04482L19.1362 5.04529C19.1362 5.04529 19.1362 5.0458 19.1362 5.04683L19.134 14.9553L4.8638 14.953ZM22.3233 18.1447L8.05317 18.1424V16.6297H19.134C20.0586 16.6297 20.8107 15.8775 20.8107 14.953V8.23424L22.3256 8.23466C22.3256 8.23466 22.3257 8.23518 22.3257 8.23621L22.3233 18.1447Z" fill="#797981" />
                  </svg>
                </SvgIcon>
              </IconButton>
              <IconButton
                sx={{ width: '24px', height: '24px', padding: 0 }}
                component="a"
                href={`https://t.me/${student.telegram}`}
                target="_blank"
              >
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.2647 2.42772C21.98 2.19085 21.6364 2.03561 21.2704 1.97852C20.9045 1.92143 20.5299 1.96463 20.1866 2.10351L2.26566 9.33886C1.88241 9.49654 1.55618 9.76705 1.33026 10.1145C1.10434 10.4619 0.989427 10.8698 1.00076 11.2841C1.0121 11.6984 1.14916 12.0994 1.39374 12.4339C1.63832 12.7685 1.97886 13.0207 2.37016 13.1572L5.99516 14.418L8.01566 21.0996C8.04312 21.1889 8.08297 21.2738 8.13404 21.352C8.14179 21.364 8.15272 21.3729 8.16096 21.3846C8.21996 21.4669 8.29127 21.5397 8.37239 21.6003C8.39546 21.6179 8.41755 21.6344 8.44221 21.65C8.53714 21.713 8.64228 21.7591 8.75294 21.7861L8.76478 21.7871L8.77149 21.79C8.83802 21.8035 8.90574 21.8104 8.97364 21.8105C8.98017 21.8105 8.98597 21.8074 8.99244 21.8073C9.0949 21.8055 9.19647 21.7878 9.29353 21.755C9.31611 21.7473 9.33546 21.7344 9.35737 21.7251C9.42975 21.6951 9.49832 21.6567 9.56166 21.6106C9.61238 21.5678 9.66312 21.5251 9.71388 21.4824L12.416 18.499L16.4463 21.6211C16.8011 21.8973 17.2379 22.0474 17.6875 22.0478C18.1587 22.0472 18.6154 21.8846 18.9809 21.5874C19.3465 21.2901 19.5987 20.8762 19.6954 20.415L22.958 4.39843C23.032 4.03795 23.0065 3.66415 22.8844 3.31702C22.7623 2.96989 22.5481 2.66249 22.2647 2.42772ZM9.37016 14.7363C9.2315 14.8744 9.13672 15.0504 9.0977 15.2422L8.78819 16.7462L8.00413 14.1531L12.0694 12.0362L9.37016 14.7363ZM17.6719 20.04L12.9092 16.3505C12.71 16.1966 12.46 16.1233 12.2092 16.1454C11.9583 16.1675 11.725 16.2833 11.5557 16.4697L10.6903 17.4249L10.9961 15.9384L18.0791 8.85543C18.2482 8.68659 18.3512 8.46278 18.3695 8.22455C18.3878 7.98632 18.3201 7.74941 18.1788 7.55675C18.0375 7.36408 17.8319 7.22839 17.5992 7.17426C17.3664 7.12014 17.122 7.15115 16.9102 7.26168L6.74491 12.5543L3.02055 11.1914L20.999 3.99899L17.6719 20.04Z" fill="#797981" />
                  </svg>
                </SvgIcon>
              </IconButton>
            </Box>
          </Box>
          <Box className="info-box">
            <Typography className="label" variant="h2">{`${student.first_name} ${student.last_name}`}</Typography>
            <Box className="row">
              <Box className="location-box">
                <Typography className="location" variant="body1">{student.location.name}</Typography>
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
              <IconButton sx={{ width: '24px', height: '24px', padding: 0 }}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                    <path d="M11.5174 2.3083C12.0129 1.74981 12.6154 1.2963 13.2891 0.974552C13.9629 0.652803 14.6943 0.469344 15.4401 0.435012C16.186 0.40068 16.9311 0.516171 17.6316 0.774664C18.332 1.03316 18.9736 1.42941 19.5183 1.94001C20.0631 2.45061 20.5 3.06521 20.8032 3.74749C21.1064 4.42978 21.2698 5.16592 21.2838 5.91242C21.2977 6.65893 21.1619 7.40065 20.8844 8.09379C20.6069 8.78693 20.1933 9.41742 19.668 9.94802L11.4565 18.2383C11.3968 18.2987 11.3256 18.3466 11.2472 18.3793C11.1688 18.4121 11.0847 18.4289 10.9997 18.4289C10.9147 18.4289 10.8306 18.4121 10.7522 18.3793C10.6738 18.3466 10.6026 18.2987 10.5428 18.2383L2.3314 9.94802C1.33539 8.94245 0.758155 7.59633 0.716312 6.1816C0.674468 4.76687 1.17113 3.38898 2.10597 2.3263C4.32426 -0.196272 8.25168 -0.204843 10.482 2.3083L10.9997 2.89116L11.5174 2.3083Z" fill="#1D6BF3" />
                  </svg>
                </SvgIcon>
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card> */}

      <Dialog fullScreen onClose={handleCloseDialogs} aria-labelledby="customized-dialog-title" open={open}>
        <Student
          key={student.id}
          student={student}
          onCancel={handleCloseDialogs}
        />
      </Dialog>
    </>
  );
}

export default StudentCard;
