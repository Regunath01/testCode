import { TextField } from '@mui/material';

const AppTextField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  fullWidth = true,
  required = false,
  disabled = false,
  error = false,
  helperText,
  multiline = false,
  rows = 1,
  name,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      name={name}
      {...props}
    />
  );
};

export default AppTextField;
