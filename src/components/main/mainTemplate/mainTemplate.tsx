import BackgroundColor from 'components/base/backgroudColor';
import React, { ReactNode } from 'react';
import './mainTemplate.scss';

interface Props {
  sidebar: ReactNode;
  children?: ReactNode;
}

const MainTemplate = ({ sidebar, children }: Props) => (
  <div className="MainTemplate">
    <BackgroundColor color="#f1f3f5" />
    {sidebar}
    {children}
  </div>
);

export default MainTemplate;
