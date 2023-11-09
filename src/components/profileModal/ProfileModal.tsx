import {
  Box, Button, Typography, TextField, Grid, SvgIcon, Avatar,
} from '@mui/material';
import './ProfileModal.scss';
import Footer from '../Footer/Footer';
import UnloggedUserHeader from '../Header/UnloggedUserHeader';

export default function ProfileModal() {
  return (
    <Box className="profile-modal">
      <UnloggedUserHeader />
      <form>
        <Box className="modal-box">
          <Typography component="h2" variant="h2" className="profile-title">
            Информация профиля
          </Typography>
          <Box>
            <Grid container mb="40px">
              <Avatar sx={{ width: '60px', height: '60px' }} />
              <Button
                variant="outlined"
                href="#outlined-buttons"
                sx={{
                  marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: '#1D6BF3', border: 'none',
                }}
              >
                Загрузить фотографию профиля
              </Button>
            </Grid>
            <Grid container className="grid-container" gap="20px">
              <Grid item xs={6}>
                <Grid sx={{ marginBottom: '20px' }}>
                  <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                    Фамилия и имя
                  </Typography>
                  <TextField
                    type="text"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                    fullWidth
                    size="medium"
                    placeholder="Фамилия и имя"
                    required
                  />
                </Grid>
                <Grid className="info-box">
                  <Typography variant="body1" sx={{ mb: '4px', fontWeight: '500' }}>
                    Должность
                  </Typography>
                  <TextField
                    type="text"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                    fullWidth
                    size="medium"
                    placeholder="Должность"
                    required
                  />
                </Grid>
                <Grid>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      height: '50px', margin: '40px 0', color: '#797981', justifyContent: 'flex-start',
                    }}
                  >
                    <SvgIcon sx={{ width: '16px', height: '16px', mr: '4px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <g clipPath="url(#clip0_459_18532)">
                          <path d="M13.9999 3.16667H11.9333C11.7785 2.41428 11.3691 1.73823 10.7741 1.25248C10.179 0.766727 9.43472 0.50097 8.66659 0.5L7.33325 0.5C6.56512 0.50097 5.8208 0.766727 5.22575 1.25248C4.63071 1.73823 4.22132 2.41428 4.06659 3.16667H1.99992C1.82311 3.16667 1.65354 3.2369 1.52851 3.36193C1.40349 3.48695 1.33325 3.65652 1.33325 3.83333C1.33325 4.01014 1.40349 4.17971 1.52851 4.30474C1.65354 4.42976 1.82311 4.5 1.99992 4.5H2.66659V13.1667C2.66764 14.0504 3.01917 14.8976 3.64407 15.5225C4.26896 16.1474 5.11619 16.4989 5.99992 16.5H9.99992C10.8836 16.4989 11.7309 16.1474 12.3558 15.5225C12.9807 14.8976 13.3322 14.0504 13.3333 13.1667V4.5H13.9999C14.1767 4.5 14.3463 4.42976 14.4713 4.30474C14.5963 4.17971 14.6666 4.01014 14.6666 3.83333C14.6666 3.65652 14.5963 3.48695 14.4713 3.36193C14.3463 3.2369 14.1767 3.16667 13.9999 3.16667ZM7.33325 1.83333H8.66659C9.0801 1.83384 9.48334 1.96225 9.82099 2.20096C10.1587 2.43967 10.4142 2.77699 10.5526 3.16667H5.44725C5.58564 2.77699 5.84119 2.43967 6.17884 2.20096C6.5165 1.96225 6.91974 1.83384 7.33325 1.83333ZM11.9999 13.1667C11.9999 13.6971 11.7892 14.2058 11.4141 14.5809C11.0391 14.956 10.5304 15.1667 9.99992 15.1667H5.99992C5.46949 15.1667 4.96078 14.956 4.58571 14.5809C4.21063 14.2058 3.99992 13.6971 3.99992 13.1667V4.5H11.9999V13.1667Z" fill="#797981" />
                          <path d="M6.66667 12.5001C6.84348 12.5001 7.01305 12.4298 7.13807 12.3048C7.2631 12.1798 7.33333 12.0102 7.33333 11.8334V7.83341C7.33333 7.6566 7.2631 7.48703 7.13807 7.36201C7.01305 7.23699 6.84348 7.16675 6.66667 7.16675C6.48986 7.16675 6.32029 7.23699 6.19526 7.36201C6.07024 7.48703 6 7.6566 6 7.83341V11.8334C6 12.0102 6.07024 12.1798 6.19526 12.3048C6.32029 12.4298 6.48986 12.5001 6.66667 12.5001Z" fill="#797981" />
                          <path d="M9.33341 12.5001C9.51023 12.5001 9.67979 12.4298 9.80482 12.3048C9.92984 12.1798 10.0001 12.0102 10.0001 11.8334V7.83341C10.0001 7.6566 9.92984 7.48703 9.80482 7.36201C9.67979 7.23699 9.51023 7.16675 9.33341 7.16675C9.1566 7.16675 8.98703 7.23699 8.86201 7.36201C8.73699 7.48703 8.66675 7.6566 8.66675 7.83341V11.8334C8.66675 12.0102 8.73699 12.1798 8.86201 12.3048C8.98703 12.4298 9.1566 12.5001 9.33341 12.5001Z" fill="#797981" />
                        </g>
                        <defs>
                          <clipPath id="clip0_459_18532">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
                    Очистить фильтры
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid sx={{ marginBottom: '20px' }}>
                  <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: '500' }}>
                    Название компании
                  </Typography>
                  <TextField
                    type="text"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                    fullWidth
                    size="medium"
                    placeholder="Название компании"
                    required
                  />
                </Grid>
                <Grid className="info-box">
                  <Typography variant="body1" sx={{ mb: '4px', fontWeight: '500' }}>
                    Регион
                  </Typography>
                  <TextField
                    type="text"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                    fullWidth
                    size="medium"
                    placeholder="Регион"
                    required
                  />
                </Grid>

                <Grid className="button-box">
                  <Button fullWidth size="medium" variant="contained" sx={{ height: '50px', margin: '40px 0' }}>
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="outlined"
              href="/vacancies"
              className="create-vacancy-button"
            >
              <SvgIcon sx={{ width: '64px', height: '64px', mb: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                  <path d="M32.5 10.5V56.5" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9.5 33.5L55.5 33.5" stroke="#B5B5B7" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </SvgIcon>
              Создать вакансию
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </Box>
  );
}
