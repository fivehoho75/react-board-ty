import WriteTemplate from 'components/write/writeTemplate';
import WriteHeaderContainer from 'containers/write/writeHeaderContainer';
import WritePanesContainer from 'containers/write/writePanesContainer';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router';

/*
const Write = () => {
  return (
    <WriteTemplate header={<WriteHeaderContainer />}>
      <Helmet>
        <title>새 글 작성하기 | BoardTest</title>
      </Helmet>
    </WriteTemplate>
  );
};*/

class Write extends Component<RouteComponentProps<any>> {
  render() {
    return (
      <WriteTemplate
        header={<WriteHeaderContainer history={this.props.history} />}
      >
        <Helmet>
          <title>새 글 작성하기 | BoardTest</title>
        </Helmet>
        <WritePanesContainer />
      </WriteTemplate>
    );
  }
}

export default Write;
