import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const BoardTemplate = ({ children }: Props) => {
  return <div className="BoardTemplate">{children}</div>;
};

export default BoardTemplate;
