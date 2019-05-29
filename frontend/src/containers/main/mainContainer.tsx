import MainTemplate from 'components/main/mainTemplate';
import Board from 'pages/board';
import BoardInput from 'pages/boardInput';
import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { StoreState } from 'store';
import MainSidebarCotainer from './mainSidebarCotainer';

interface Props extends RouteComponentProps<any> {
  landing: boolean;
}

class MainContainer extends Component<Props> {
  render() {
    // console.log('==>' + JSON.stringify(this.props));
    if (this.props.landing) {
      return null;
    }

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

export default compose(
  withRouter,
  connect(
    ({ base }: StoreState) => ({
      landing: base.landing,
    }),
    () => ({})
  )
)(MainContainer) as ComponentType;