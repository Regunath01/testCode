import { Button } from '@mui/material';

const AppButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  size = 'medium',
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
