import MainSidebar from 'components/main/mainSidebar';
import React, { Component } from 'react';
import { match } from 'react-router';

interface Props {
  match: match<any>;
}

class MainSidebarCotainer extends Component<Props> {
  render() {
    return <MainSidebar url={this.props.match.url} />;
  }
}

export default MainSidebarCotainer;
