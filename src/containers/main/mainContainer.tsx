import BackgroundColor from 'components/base/backgroudColor';
import React, { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';
import './mainContainer.scss';

interface Props {
  sidebar?: ReactNode;
}

class MainContainer extends Component<Props> {
  render() {
    const { sidebar } = this.props;

    return (
      <div className="Main">
        <BackgroundColor color="#f1f3f5" />
        {sidebar}
        <Switch>
          <Route exact path="/(|lists)" component={Lists} />
        </Switch>
      </div>
    );
  }
}

export default MainContainer;
