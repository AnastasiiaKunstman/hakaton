/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import SuccesIcon from '../../../images/statusSucces.svg';
import '../Notification.scss';

interface SuccesProps {
  title?: string
  description?: string
}

export const Succes: FC<SuccesProps> = ({
  title = 'Успешно',
  description = 'Подробности отсутствуют',
}) => (
  <div className="message_container">
    <img className="icon" src={SuccesIcon} alt="Иконка успешности" />
    <div className="error">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
    </div>
  </div>
);
