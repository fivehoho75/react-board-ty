import React, { ReactNode } from 'react';
import './writeTemplate.scss';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const WriteTemplate = ({ header, children }: Props) => {
  return (
    <div className="WriteTemplate">
      {header}
      <div className="rest">{children}</div>
    </div>
  );
};

export default WriteTemplate;
