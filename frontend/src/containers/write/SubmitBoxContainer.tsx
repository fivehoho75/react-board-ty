import SubmitBox from 'components/write/submitBox';
import { escapeForUrl } from 'lib/common';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StoreState } from 'store';
import { BaseActions, WriteActions } from 'store/actionCreators';
import { Meta, PostData } from 'store/modules/write';

interface Props extends RouteComponentProps<any> {
  open: boolean;
  tags: string[];
  title: string;
  body: string;
  postData: PostData | null;
  thumbnail: string | null;
  meta: Meta;
  urlSlug: string | null;
}

class SubmitBoxContainer extends Component<Props> {
  onClose = () => {
    WriteActions.closeSubmitBox();
  };

  onSubmit = async () => {
    const {
      title,
      body,
      postData,
      thumbnail,
      tags,
      // meta,
      urlSlug,
    } = this.props;

    try {
      if (postData) {
        BaseActions.showToast({
          type: 'success',
          message: '포스트가 수정됐습니다',
        });
      } else {
        // console.log('onSubmit: ', JSON.stringify(this.props));
        await WriteActions.writePost({
          title,
          thumbnail,
          body,
          tags,
          is_temp: false,
          /*categories: categories
            ? categories.filter(c => c.active).map(c => c.id)
            : [],*/
          // meta,
          url_slug: urlSlug || escapeForUrl(title),
          // is_private: isPrivate,
          // series_id: seriesId,
        });

        BaseActions.showToast({
          type: 'success',
          message: '포스트가 작성됐습니다',
        });
      }
    } catch (e) {
      BaseActions.showToast({
        type: 'error',
        message: '포스트 작성 실패',
      });
    }
  };

  onTempSave = async () => {
    console.log('onTempSave');
  };

  render() {
    const { onClose, onTempSave, onSubmit } = this;
    const { open, postData } = this.props;

    return (
      <SubmitBox
        visible={open}
        onClose={onClose}
        onSubmit={onSubmit}
        isEdit={!!postData && !postData.is_temp}
        onTempSave={onTempSave}
      />
    );
  }
}

export default withRouter(
  connect(
    ({ write }: StoreState) => ({
      open: write.submitBox.open,
      tags: write.submitBox.tags,
      body: write.body,
      title: write.title,
      postData: write.postData,
      thumbnail: write.thumbnail,
      meta: write.meta,
      urlSlug: write.submitBox.url_slug,
    }),
    () => ({})
  )(SubmitBoxContainer)
);
