import React, { ReactNode } from 'react';
import './pageTemplate.scss';

interface Props {
  header?: Node;
  children?: ReactNode;
}

const PageTemplate: React.FC<Props> = ({ header, children }) => (
  <div className="PageTemplate">
    {header}
    <main>{children}</main>
  </div>
);

export default PageTemplate;
