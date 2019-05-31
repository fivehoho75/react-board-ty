import React, { Component, Fragment } from 'react';
import { MdKeyboardArrowRight as RightIcon } from 'react-icons/md';
import './writePanes.scss';

export default class WritePanes extends Component {
  onUnhideLeft = () => {};

  render() {
    return (
      <Fragment>
        <div className="reveal" onClick={this.onUnhideLeft}>
          <RightIcon />
        </div>
      </Fragment>
    );
  }
}
