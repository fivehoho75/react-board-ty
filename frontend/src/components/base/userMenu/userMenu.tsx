import UserMenuItem from 'components/base/userMenuItem';
import React, { Component } from 'react';
import withClickOutside from 'react-onclickoutside';
import './userMenu.scss';

interface Props {
  username: string;
  onClick(): void;
  onClickOutside(): void;
}

class UserMenu extends Component<Props> {
  myClickOutsideHandler = () => {
    this.props.onClickOutside();
  };

  render() {
    const { username, onClick } = this.props;

    return (
      <div className="user-menu-wrapper">
        <div className="user-menu-positioner">
          <div className="rotated-square" />
          <div className="user-menu" onClick={onClick}>
            <div className="menu-items">
              <UserMenuItem to={`/@${username}`}>내 벨로그</UserMenuItem>
              <div className="separator" />
              <UserMenuItem to="/write">새 글 작성</UserMenuItem>
              <UserMenuItem to="/saves">임시 글</UserMenuItem>
              <div className="separator" />
              <UserMenuItem to="/settings">설정</UserMenuItem>
              <UserMenuItem>로그아웃</UserMenuItem>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const clickOutsideConfig = {
  handleClickOutside(instance: any) {
    return instance.myClickOutsideHandler;
  },
};

export default withClickOutside(UserMenu, clickOutsideConfig);
