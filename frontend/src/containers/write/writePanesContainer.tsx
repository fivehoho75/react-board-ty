import WritePanes from 'components/write/writePanes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';

interface Props {
  mode: string;
  width: number;
}

class WritePanesContainer extends Component {
  onSetLayoutMode = (mode: string) => {
    console.log('==>onSetLayoutMode');
    // WriteActions.setLayoutMode(mode);
  };

  render() {
    return (
      <WritePanes
        left=""
        right=""
        mode=""
        onSetLayoutMode={this.onSetLayoutMode}
      />
    );
  }
}

export default connect(
  ({ base }: StoreState) => ({
    width: base.windowWidth,
  }),
  () => ({})
)(WritePanesContainer);
