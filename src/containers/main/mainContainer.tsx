import MainTemplate from 'components/main/mainTemplate';
import Board from 'pages/board';
import BoardInput from 'pages/boardInput';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';
import MainSidebarCotainer from './mainSidebarCotainer';

interface Props extends RouteComponentProps<any> {
  landing?: boolean;
}

class MainContainer extends Component<Props> {
  render() {
    return (
      <MainTemplate sidebar={<MainSidebarCotainer match={this.props.match} />}>
        <Switch>
          <Route exact path="/(|trending)" component={Board} />
          <Route path="/recent" component={BoardInput} />
        </Switch>
      </MainTemplate>
    );
  }
}

export default withRouter(MainContainer);
