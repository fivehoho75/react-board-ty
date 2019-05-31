import WritePanes from 'components/write/writePanes';
import React, { Component } from 'react';

interface Props {
  mode: string;
  width: number;
}

class WritePanesContainer extends Component {
  render() {
    return <WritePanes />;
  }
}

export default WritePanesContainer;
