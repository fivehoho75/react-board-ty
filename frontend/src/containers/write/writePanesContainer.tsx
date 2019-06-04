import WritePanes from 'components/write/writePanes';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { WriteActions } from 'store/actionCreators';
import CodeEditorContainer from './codeEditorContainer';
import MarkdownPreviewContainer from './markdownPreviewContainer';

interface Props {
  mode: string;
  width: number;
}

class WritePanesContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);
    if (typeof window === 'undefined') {
      return;
    }
    const width = window.outerWidth;
    if (width < 1024) {
      WriteActions.setLayoutMode('editor');
    }
  }

  componentWillUnmount() {
    WriteActions.reset(); // reset Write Module on page leave
  }

  onSetLayoutMode = (mode: string) => {
    WriteActions.setLayoutMode(mode);
  };

  render() {
    return (
      <WritePanes
        left={
          <Fragment>
            <CodeEditorContainer />
          </Fragment>
        }
        right={<MarkdownPreviewContainer />}
        mode={this.props.mode}
        onSetLayoutMode={this.onSetLayoutMode}
      />
    );
  }
}

export default connect(
  ({ write, base }: StoreState) => ({
    mode: write.writeExtra.layoutMode,
    width: base.windowWidth,
  }),
  () => ({})
)(WritePanesContainer);
