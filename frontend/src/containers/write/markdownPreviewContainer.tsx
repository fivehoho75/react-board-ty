import MarkdownPreview from 'components/write/markdownPreview';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { PostData } from 'store/modules/write';

interface Props {
  title: string;
  body: string;
  postData: PostData | null;
}

class MarkdownPreviewContainer extends Component<Props> {
  render() {
    const { title, body, postData } = this.props;
    return (
      <MarkdownPreview
        title={title}
        body={body}
        theme={postData /*&& postData.meta.code_theme*/}
      />
    );
  }
}

export default connect(
  ({ write }: StoreState) => ({
    title: write.title,
    body: write.body,
    meta: write.meta,
    postData: write.postData,
  }),
  () => ({})
)(MarkdownPreviewContainer);
