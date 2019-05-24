import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './mainMenuItem.scss';

interface Props {
  text: string;
  to: string;
  active?: boolean;
}

const MainMenuItem = ({ text, to = '', active = false }: Props) => {
  return (
    <li className={cn('MainMenuItem', { active })}>
      <Link to={to}>
        <div className="text">{text}</div>
      </Link>
    </li>
  );
};

export default MainMenuItem;
