import React, { ReactNode } from 'react';
import './boardTemplate.scss';

interface Props {
  children: ReactNode;
}
const BoardTemplate = ({ children }: Props) => {
  return <div className="BoardTemplate">{children}</div>;
};

export default BoardTemplate;
