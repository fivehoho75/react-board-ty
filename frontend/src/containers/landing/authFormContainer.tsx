import AuthForm from 'components/base/authForm';
import { pressedEnter } from 'lib/common';
import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { StoreState } from 'store';
import { AuthActions, BaseActions } from 'store/actionCreators';
import {
  AuthResult,
  SocialAuthResult,
  VerifySocialResult,
} from 'store/modules/auth';

interface Props extends RouteComponentProps<any> {
  email: string;
  sentEmail: boolean;
  sending: boolean;
  isUser: boolean;
  socialAuthResult: SocialAuthResult | null;
  verifySocialResult: VerifySocialResult | null;
  authResult: AuthResult | null;
  nextUrl: string | null;
}

class AuthFormContainer extends Component<Props> {
  githubLogin: any = null;

  onEnterKeyPress = pressedEnter(() => {
    this.onSendVerification();
  });

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    AuthActions.setEmailInput(value);
  };

  onSendVerification = async (): Promise<any> => {
    console.log('onSendVerification');
    const { email } = this.props;
    try {
      await AuthActions.sendAuthEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  onSocialLogin = async (): Promise<any> => {
    console.log('onSocialLogin');
  };

  onExitLanding = () => {
    BaseActions.exitLanding();
  };

  render() {
    const {
      onChange,
      onSendVerification,
      onEnterKeyPress,
      onSocialLogin,
      onExitLanding,
    } = this;
    const { email, sentEmail, sending, isUser } = this.props;

    return (
      <AuthForm
        isUser={isUser}
        email={email}
        sending={sending}
        sentEmail={sentEmail}
        onChange={onChange}
        onSendVerification={onSendVerification}
        onEnterKeyPress={onEnterKeyPress}
        onSocialLogin={onSocialLogin}
        onExitLanding={onExitLanding}
      />
    );
  }
}

export default withRouter(
  connect(
    ({ auth, pender }: StoreState) => ({
      email: auth.email,
      sentEmail: auth.sentEmail,
      isUser: auth.isUser,
      sending: pender.pending['auth/SEND_AUTH_EMAIL'],
      socialAuthResult: auth.socialAuthResult,
      verifySocialResult: auth.verifySocialResult,
      authResult: auth.authResult,
      nextUrl: auth.nextUrl,
    }),
    () => ({})
  )(AuthFormContainer)
);
