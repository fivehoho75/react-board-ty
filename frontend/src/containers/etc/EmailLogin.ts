import storage, { keys } from 'lib/storage';
import queryString from 'query-string';
import { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { StoreState } from 'store';
import { AuthActions, BaseActions, UserActions } from 'store/actionCreators';
import { AuthResult } from 'store/modules/auth';

interface Props extends RouteComponentProps {
  authResult?: AuthResult | null;
}

class EmailLogin extends Component<Props> {
  initialize = async () => {
    const { search } = this.props.location;
    const { code } = queryString.parse(search);
    try {
      await AuthActions.codeLogin(code as string);
      const { authResult } = this.props;

      if (!authResult) {
        return;
      }
      const { user } = authResult;

      UserActions.setUser(user);
      storage.set(keys.user, user);
      BaseActions.exitLanding();
    } catch (e) {
      console.log(e);
    }
    const { history } = this.props;
    history.push('/');
  };
  componentDidMount() {
    this.initialize();
  }
  render() {
    return null;
  }
}

export default connect(
  ({ auth }: StoreState) => ({
    authResult: auth.authResult,
  }),
  () => ({})
)(EmailLogin);
