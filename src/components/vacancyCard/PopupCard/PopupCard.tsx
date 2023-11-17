/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import CloseMini from '../../../images/close_mini.svg';
import EditVacancy from '../EditCard';

interface PopupCardProps {
  open: boolean
  onClose: () => void
}

export const PopupCard: FC<PopupCardProps> = ({ open, onClose }) => (
  <Dialog
    open={open}
    fullScreen
    onClose={() => onClose}
    aria-labelledby="customized-dialog-title"
  >
    <Button onClick={onClose}>
      <img src={CloseMini} alt="иконка закрытия" />
    </Button>

    <DialogContent>
      <EditVacancy />
    </DialogContent>
  </Dialog>
);

export default PopupCard;
