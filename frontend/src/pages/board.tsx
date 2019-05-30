import BoardTemplate from 'components/base/boardTemplate';
import BoardPostCards from 'containers/list/boardPostCards';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Board extends Component {
  render() {
    return (
      <BoardTemplate>
        <Helmet>
          <title>섹션1 | BoardTest</title>
        </Helmet>
        <BoardPostCards />
      </BoardTemplate>
    );
  }
}
