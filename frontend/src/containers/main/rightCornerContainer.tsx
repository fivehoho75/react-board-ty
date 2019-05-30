import UserButton from 'components/base/userButton';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { BaseActions } from 'store/actionCreators';
import UserMenuContainer from './userMenuContainer';

class RightCornerContainer extends Component {
  onUserButtonClick = () => {
    BaseActions.showUserMenu();
  };

  render() {
    return (
      <Fragment>
        <UserButton onClick={this.onUserButtonClick} />
        <UserMenuContainer username="test" />
      </Fragment>
    );
  }
}

export default connect(
  (state: StoreState) => ({}),
  () => ({})
)(RightCornerContainer);
