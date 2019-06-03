import React, { Component, Fragment, ReactNode } from 'react';
import { MdKeyboardArrowRight as RightIcon } from 'react-icons/md';
import './writePanes.scss';

interface Props {
  left: ReactNode;
  right: ReactNode;
  mode: string;
  onSetLayoutMode(mode: string): void;
}
export default class WritePanes extends Component<Props> {
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
