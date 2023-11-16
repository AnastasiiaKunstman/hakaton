/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarsProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Snackbars: React.FC<SnackbarsProps> = ({
  open, onClose, message, severity,
}) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Snackbars;
