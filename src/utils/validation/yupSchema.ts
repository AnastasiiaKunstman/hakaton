import * as yup from 'yup';

export const errors = {
  InvalidEmail: 'Введите корректный email',
  RequiredField: 'Это поле обязательное',
  minLength: 'Минимальная длина 8 символов',
  minLength2: 'Минимальная длина 2 символа',
  InvalidPassword: 'Пароль должен содержать спецсимвол, однин заглавный символ, одну цифру',
  InvalidTelegram: 'Введите корректный telegram',
  InvalidPhoneNumber: 'Введите корректный номер телефона',
};

export const schema = yup.object().shape({
  email: yup.string().email(errors.InvalidEmail).required(errors.RequiredField),
  password: yup.string().min(8, errors.minLength)
    .required(errors.RequiredField).matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/, errors.InvalidPassword),
  name: yup.string().required(errors.RequiredField).min(2, errors.minLength2),
  lastName: yup.string().required(errors.RequiredField).min(2, errors.minLength2),
  telegram: yup.string().matches(/^@[A-Za-z\d_-]{5,32}$/, errors.InvalidTelegram),
  phoneNumber: yup.string().matches(/^\d{11}$/, errors.InvalidPhoneNumber),
  company: yup.string().min(2, errors.minLength2),
  avatar: yup.string().min(8, errors.minLength),
});
