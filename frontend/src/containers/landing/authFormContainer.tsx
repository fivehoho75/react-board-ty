import AuthForm from 'components/base/authForm';
import React, { Component } from 'react';
import { BaseActions } from 'store/actionCreators';

class AuthFormContainer extends Component {
  onExitLanding = () => {
    BaseActions.exitLanding();
  };

  render() {
    return <AuthForm onExitLanding={this.onExitLanding} />;
  }
}

export default AuthFormContainer;
