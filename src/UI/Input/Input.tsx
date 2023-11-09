import { SxProps, TextField, TextFieldProps } from '@mui/material';
import './Input.scss';

const sxStyles: SxProps = {
  width: '100%',
  '& .MuiInputLabel-root': {
    transition: 'none',
  },
  '& .MuiInputBase-input.MuiOutlinedInput-input': {
    height: '20px',
    padding: '10px 12px',
    // margin: "4px 0",
    background: '#FFFFFF',
  },
  '& .MuiInputBase-input:disabled': {
    border: '1px solid #DDE0E4',
    borderRadius: '4px',
    backgroundColor: '#DDE0E4',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#FF0200',
    margin: 0,
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
    {
      border: '1px solid #FF0200',
    },
};

export type TInputProps = {
  customLabel?: string
  register?: any
  registerName?: string
  registerOptions?: any
};

function Input(props: TextFieldProps & TInputProps) {
  const {
    customLabel, register, registerName, registerOptions, sx, ...rest
  } = props;

  return (
    <>
      {customLabel && <span className="label_custom">{customLabel}</span>}
      <TextField
        {...register(`${registerName}`, registerOptions)}
        sx={sxStyles}
        {...rest}
      />
    </>
  );
}

export default Input;
