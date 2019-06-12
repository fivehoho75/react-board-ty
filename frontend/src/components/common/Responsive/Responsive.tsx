import cx from 'classnames';
import React from 'react';
import './Responsive.scss';

const Responsive = ({ children, className, ...rest }: any) => {
  return (
    <div className={cx('common', 'responsive', className)} {...rest}>
      {children}
    </div>
  );
};

export default Responsive;
