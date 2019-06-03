import React, { Component, Fragment } from 'react';
import { BaseActions } from 'store/actionCreators';

interface Props {}
class CoreContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setWidth();
  }

  setWidth = () => {
    if (typeof window === 'undefined') {
      return;
    }
    BaseActions.setWidth(window.outerWidth);
  };

  render() {
    return <Fragment>Core</Fragment>;
  }
}

export default CoreContainer;
