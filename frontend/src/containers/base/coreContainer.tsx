import throttle from 'lodash/throttle';
import React, { Component, Fragment } from 'react';
import { BaseActions } from 'store/actionCreators';

interface Props {}
class CoreContainer extends Component<Props> {
  onResize = throttle(() => {
    this.setWidth();
  }, 250);

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

  initialize = async () => {
    window.addEventListener('resize', this.onResize);
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return <Fragment />;
  }
}

export default CoreContainer;
