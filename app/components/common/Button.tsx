
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'; // Example custom prop for styling
  isLoading?: boolean; // Example custom prop for loading state
  customClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  customClass = '',
  ...props
}) => {
  let className = `btn btn-${variant}`;
  if (isLoading) {
    className += ' btn-loading';
  }
  else if( variant === 'secondary') {
    className += ` bg-red-500 px-4`
  }

  return (
    <button className={`${className} ${customClass}`} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;

