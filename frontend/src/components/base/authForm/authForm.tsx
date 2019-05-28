import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  onExitLanding(): void;
}

const AuthForm = ({ onExitLanding }: Props) => {
  return (
    <div className="AuthForm">
      <div className="explore-wrapper">
        <Link className="explore" to="/trending" onClick={onExitLanding}>
          로그인 하지 않고 둘러보기
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
