import WriteHeader from 'components/write/writeHeader';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { WriteActions } from 'store/actionCreators';

interface Props {
  title: string;
  body: string;
  history: any;
}

class WriteHeaderContainer extends Component<Props> {
  onChangeTitle = (e: any) => {
    const { value } = e.target;
    WriteActions.editField({
      field: 'title',
      value,
    });
  };

  onGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { onChangeTitle } = this;
    const { title } = this.props;

    return (
      <Fragment>
        {title && (
          <Helmet>
            <title>{`(작성중) ${title} | velog`}</title>
          </Helmet>
        )}
        <WriteHeader
          onChangeTitle={onChangeTitle}
          onGoBack={this.onGoBack}
          title={title}
        />
      </Fragment>
    );
  }
}

export default connect(
  ({ write }: StoreState) => ({
    title: write.title,
    body: write.body,
  }),
  () => ({})
)(WriteHeaderContainer);
