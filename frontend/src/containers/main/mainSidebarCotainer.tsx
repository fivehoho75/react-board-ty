import MainSidebar from 'components/main/mainSidebar';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {}

class MainSidebarCotainer extends Component<Props> {
  render() {
    return <MainSidebar url={this.props.match.url} />;
  }
}

export default withRouter(MainSidebarCotainer);
