import storage from 'lib/storage';
import throttle from 'lodash/throttle';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { StoreState } from 'store';
import { BaseActions, UserActions } from 'store/actionCreators';
import { UserData } from 'store/modules/user';
import NotifyToastContainer from './NotifyToastContainer';

interface Props extends RouteComponentProps {
  user: UserData | null;
}

class CoreContainer extends Component<Props> {
  unlisten = null;

  onResize = throttle(() => {
    this.setWidth();
  }, 250);

  constructor(props: Props) {
    super(props);
    this.setWidth();
  }

  checkUser = async () => {
    const storedUser = storage.get('__velog_user__');
    if (!storedUser) {
      UserActions.processUser();
      return;
    }
    BaseActions.exitLanding();
    UserActions.setUser(storedUser);
    try {
      await UserActions.checkUser();
    } catch (e) {
      storage.remove('__velog_user__');
    }
  };

  setWidth = () => {
    if (typeof window === 'undefined') {
      return;
    }
    BaseActions.setWidth(window.outerWidth);
  };

  initialize = async () => {
    this.checkUser();
    window.addEventListener('resize', this.onResize);
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <Fragment>
        <NotifyToastContainer />
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    ({ user }: StoreState) => ({
      user: user.user,
    }),
    () => ({})
  )(CoreContainer)
);
