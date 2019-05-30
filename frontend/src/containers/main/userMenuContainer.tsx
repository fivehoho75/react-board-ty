import UserMenu from 'components/base/userMenu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { BaseActions } from 'store/actionCreators';

interface Props {
  visible?: boolean;
  username: string;
}

class UserMenuContainer extends Component<Props> {
  onClickOutside = () => {
    BaseActions.hideUserMenu();
  };

  onClick = () => {
    BaseActions.hideUserMenu();
  };

  render() {
    const { visible, username } = this.props;
    const { onClickOutside, onClick } = this;

    if (!visible) {
      return null;
    }
    return (
      <UserMenu
        username={username}
        onClickOutside={onClickOutside}
        onClick={onClick}
        eventTypes={['click', 'touchend']}
      />
    );
  }
}

export default connect(
  ({ base }: StoreState) => ({ visible: base.userMenu }),
  () => ({})
)(UserMenuContainer);
