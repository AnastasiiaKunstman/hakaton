/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import ErrorIcon from '../../../images/statusErr.svg';
import '../Notification.scss';

interface ErrorProps {
  title?: string
  description?: string
}

export const Error: FC<ErrorProps> = ({
  title = 'Произошла ошибка',
  description = 'Подробности отсутствуют',
}) => (
  <div className="message_container">
    <img className="iccon" src={ErrorIcon} alt="Иконка ошибки" />
    <div className="error">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
    </div>
  </div>
);
