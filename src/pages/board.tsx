import BoardTemplate from 'components/base/boardTemplate';
import BoardPostCards from 'containers/list/boardPostCards';
import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    return (
      <BoardTemplate>
        <BoardPostCards />
      </BoardTemplate>
    );
  }
}
