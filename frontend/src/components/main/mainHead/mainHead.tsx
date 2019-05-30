import React, { ReactNode } from 'react';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './mainHead.scss';

interface Props {
  rightArea: ReactNode;
}
const MainHead = ({ rightArea }: Props) => {
  return (
    <div className="MainHead">
      <div className="button-area">
        <Link to="/search" className="search-btn">
          <SearchIcon />
        </Link>
      </div>
      <div className="spacer" />
      <Link to="/" className="mobile-logo">
        BoardTest
      </Link>
      <div className="right-area">{rightArea}</div>
    </div>
  );
};

export default MainHead;
