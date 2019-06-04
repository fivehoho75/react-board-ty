import CodeEditor from 'components/write/codeEditor/codeEditor';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { WriteActions } from 'store/actionCreators';

interface Props {
  title: string;
  body: string;
  insertText: string | undefined | null;
}

class CodeEditorContainer extends Component<Props> {
  onEditBody = (value: string) => {
    WriteActions.editField({
      field: 'body',
      value,
    });
  };

  onClearInsertText = () => {
    WriteActions.setInsertText(null);
  };

  render() {
    const { onEditBody, onClearInsertText } = this;
    const { body, insertText } = this.props;

    return (
      <Fragment>
        <CodeEditor
          onEditBody={onEditBody}
          onClearInsertText={onClearInsertText}
          body={body}
          insertText={insertText}
        />
      </Fragment>
    );
  }
}

export default connect(
  ({ write }: StoreState) => ({
    title: write.title,
    body: write.body,
    insertText: write.insertText,
  }),
  () => ({})
)(CodeEditorContainer);
