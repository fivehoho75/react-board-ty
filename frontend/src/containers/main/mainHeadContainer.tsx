import MainHead from 'components/main/mainHead';
import RightConerContainer from 'containers/main/rightCornerContainer';
import React, { Component } from 'react';

export default class MainHeadContainer extends Component {
  render() {
    return <MainHead rightArea={<RightConerContainer />} />;
  }
}
