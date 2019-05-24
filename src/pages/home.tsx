import PageTemplate from 'components/base/pageTemplate';
import MainContainer from 'containers/main/mainContainer';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { actionCreators as baseActions } from '../store/modules/base';

interface Props extends RouteComponentProps<any> {
  BaseActions: typeof baseActions;
  mode: string;
}

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);

    if (this.props.match.params.mode) {
      // console.log('Exit');
      this.props.BaseActions.exitLanding();
    }

    const query = queryString.parse(this.props.location.search);
    if (query.next) {
      // console.log('Enter');
      this.props.BaseActions.enterLanding();
    }
    // console.log('======>\r\n' + JSON.stringify(this.props));
  }

  render() {
    return (
      <PageTemplate>
        <div>Board Test</div>
        <MainContainer />
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Home);
