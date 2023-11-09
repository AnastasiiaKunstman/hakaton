/* eslint-disable no-console */
import {
  Button, TextField, Box, Typography,
} from '@mui/material';
import UnloggedUserHeader from '../../Header/UnloggedUserHeader';
import Footer from '../../Footer/Footer';
import './PasswordRecovery.scss';

export default function PasswordRecovery() {
  return (
    <Box className="password-modal">
      <UnloggedUserHeader />
      <form>
        <Box className="modal-box">
          <Typography variant="h2" sx={{ fontWeight: 500 }}>
            Карьерный Трекер.Найм
          </Typography>
          <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          }}
          >
            <Typography variant="body1" sx={{ color: '1A1B22' }}>
              Восстановление пароля
            </Typography>
            <Typography variant="body1" sx={{ color: '#797981', textAlign: 'center' }}>
              Введите почту, указанную при регистрации
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              id="email"
              placeholder="Почта"
            //   value={email}
            //   onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: '24px', borderRadius: '6', height: 50,
              }}
            >
              Восстановить пароль
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </Box>
  );
}
