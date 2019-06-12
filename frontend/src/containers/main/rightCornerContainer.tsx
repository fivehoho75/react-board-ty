import UserButton from 'components/base/userButton';
import withUser, { WithUserProps } from 'lib/hoc/withUser';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { StoreState } from 'store';
import { BaseActions } from 'store/actionCreators';
import UserMenuContainer from './userMenuContainer';

interface Props extends WithUserProps {}
class RightCornerContainer extends Component<Props> {
  onUserButtonClick = () => {
    BaseActions.showUserMenu();
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <Fragment>
        <UserButton
          onClick={this.onUserButtonClick}
          thumbnail={user.thumbnail}
        />
        <UserMenuContainer />
      </Fragment>
    );
  }
}

export default compose(
  withUser,
  connect(
    (state: StoreState) => ({}),
    () => ({})
  )
)(RightCornerContainer);
