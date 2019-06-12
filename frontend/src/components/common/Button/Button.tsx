import cx from 'classnames';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

interface Props {
  theme: 'default' | 'outline' | 'paper' | 'gray' | 'transparent';
  confirm?: boolean;
  cancel?: boolean;
  violetFont?: boolean;
  className?: string;
  to?: string | null;
  children: ReactNode;
  large?: boolean;
  fullWidth?: boolean;
  color?: string;
  onClick(): void;
}

const Button = ({
  theme,
  children,
  confirm,
  cancel,
  violetFont,
  className,
  to,
  large,
  fullWidth,
  color,
  ...rest
}: Props) => {
  const processedClassName = cx('Button', theme, className, color, {
    confirm,
    cancel,
    violetFont,
    large,
    fullWidth,
  });
  if (to) {
    return (
      <Link className={processedClassName} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={processedClassName} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  theme: 'default',
  confirm: false,
  cancel: false,
  violetFont: false,
  className: '',
  to: null,
  large: false,
  fullWidth: false,
  color: '',
};

export default Button;
