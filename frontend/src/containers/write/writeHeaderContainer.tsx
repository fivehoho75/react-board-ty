import WriteHeader from 'components/write/writeHeader';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StoreState } from 'store';
import { WriteActions } from 'store/actionCreators';
import { PostData } from 'store/modules/write';

interface Props extends RouteComponentProps<any> {
  title: string;
  body: string;
  postData?: PostData | null;
}

class WriteHeaderContainer extends Component<Props> {
  onChangeTitle = (e: any) => {
    const { value } = e.target;
    WriteActions.editField({
      field: 'title',
      value,
    });
  };

  onUploadClick = () => {
    console.log('==>onUploadClick');
  };

  onOpenSubmitBox = () => {
    WriteActions.openSubmitBox();
  };

  onGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { onChangeTitle, onUploadClick, onOpenSubmitBox, onGoBack } = this;
    const { title, postData } = this.props;

    return (
      <Fragment>
        {title && (
          <Helmet>
            <title>{`(작성중) ${title} | velog`}</title>
          </Helmet>
        )}
        <WriteHeader
          onOpenSubmitBox={onOpenSubmitBox}
          onChangeTitle={onChangeTitle}
          onUploadClick={onUploadClick}
          onGoBack={onGoBack}
          title={title}
          isEdit={!!postData && !postData.is_temp}
        />
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    ({ write }: StoreState) => ({
      title: write.title,
      body: write.body,
      postData: write.postData,
    }),
    () => ({})
  )(WriteHeaderContainer)
);
