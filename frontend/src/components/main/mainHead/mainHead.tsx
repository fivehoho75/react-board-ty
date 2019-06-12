import Button from 'components/common/Button';
import React, { ReactNode } from 'react';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './mainHead.scss';

interface Props {
  rightArea: ReactNode;
  logged: boolean;
  onLogin(): void;
}
const MainHead = ({ onLogin, rightArea }: Props) => {
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
      <div className="right-area">
        {rightArea || (
          <Button theme="outline" onClick={onLogin}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainHead;
