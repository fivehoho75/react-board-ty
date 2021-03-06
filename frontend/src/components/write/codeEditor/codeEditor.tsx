import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import marked from 'marked';
import React, { Component } from 'react';
import './codeEditor.scss';

let CodeMirror: any = null;

if (process.env.APP_ENV !== 'server') {
  // tslint:disable:no-var-requires
  CodeMirror = require('codemirror');
  require('codemirror/addon/scroll/simplescrollbars');
  require('codemirror/addon/display/placeholder');
  require('codemirror/mode/markdown/markdown');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/shell/shell');
  require('codemirror/mode/python/python');
  require('codemirror/mode/go/go');
  require('codemirror/mode/swift/swift');
  require('codemirror/mode/clike/clike');
  // tslint:enable:no-var-requires
}

function checkiOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  );
}

const checker = {
  youtube: (text: string) => {
    const regex = /^<iframe.*src="https:\/\/www.youtube.com\/embed\/(.*?)".*<\/iframe>$/;
    const result = regex.exec(text);
    if (!result) {
      return null;
    }
    return result[1];
  },
  twitter: (text: string) => {
    if (!/^<blockquote class="twitter-tweet/.test(text)) {
      return null;
    }
    const regex = /href="(.*?)"/g;
    const links = [];
    let match = regex.exec(text);
    while (match) {
      links.push(match[1]);
      match = regex.exec(text);
    }
    // @ts-ignore
    const code = /twitter.com\/(.*?)\?/.exec(links[links.length - 1])[1];
    return code;
  },
  codesandbox: (text: string) => {
    const regex = /^<iframe src="https:\/\/codesandbox.io\/embed\/(.*?)".*<\/iframe>$/;
    const result = regex.exec(text);
    if (!result) {
      return null;
    }
    return result[1];
  },
};

const checkEmbed = (text: string) => {
  const keys = Object.keys(checker);

  for (const item of keys) {
    const key = item;
    // @ts-ignore
    const fn = checker[item];
    const code = fn(text);
    if (code) {
      return `!${key}[${code}]`;
    }
  }
  return null;
};

interface Props {
  body: string;
  insertText: string | undefined | null;
  onEditBody(value: string): any;
  onClearInsertText(): void;
}

interface State {
  cursor: any;
  iOS: boolean;
}

class CodeEditor extends Component<Props, State> {
  codeMirror: any;
  editor: any;
  prevScrollTop: number = 0;
  scrollBefore: number = 0; // changes only when active scroll line changes
  prevOffsetTop: number = 0;
  prevPreviewScrollTop: number = 0;

  state = {
    cursor: null,
    iOS: false,
  };

  insertText = () => {
    const { insertText, onClearInsertText } = this.props;
    const editor = this.codeMirror;
    const selection = editor.getSelection();

    console.log('insertText');
    if (selection.length > 0) {
      editor.replaceSelection(insertText);
    } else {
      const doc = editor.getDoc();
      const cursor = doc.getCursor();

      const pos = {
        line: cursor.line,
        ch: cursor.ch,
      };

      doc.replaceRange(insertText, pos);
    }
    onClearInsertText();
  };

  onScroll = (e: any) => {
    // retrieve current scroll info and line number
    const scrollInfo = e.getScrollInfo();
    const lineNumber = e.lineAtHeight(scrollInfo.top, 'local');
    const preview = document.getElementById('preview');

    if (!preview) {
      return;
    }

    const down = this.prevScrollTop < scrollInfo.top;
    this.prevScrollTop = scrollInfo.top;

    // content from line 0 -> lineNumber
    const range = e.getRange(
      {
        line: 0,
        ch: null,
      },
      {
        line: lineNumber,
        ch: null,
      }
    );
    const { top, clientHeight, height } = scrollInfo;

    // scroll to bottom
    if (height - clientHeight - top < 50) {
      (preview as any).scroll({
        behavior: 'smooth',
        top: preview.scrollHeight,
      });
      return;
    }

    // count ```
    const count = (range.match(/\n```/g) || []).length;
    const shouldCloseCodeblock = count % 2 === 1 ? '\n```' : '';
    // convert to markdown
    const markdown = `<h1></h1><div>${marked(
      `${range}${shouldCloseCodeblock}`
    )}</div>`;
    // create DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(markdown, 'text/html');
    if (!doc.body) {
      return;
    }
    // count lines
    const totalLines = doc.body.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table'
    );
    const markdownRender = document.getElementById('markdown-render');
    if (!markdownRender || !preview) {
      return;
    }
    // select all lines
    const elements = markdownRender.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table'
    );
    if (!elements) {
      return;
    }
    // retrieve scrollTop of rendered current line
    const index =
      totalLines.length > elements.length ? elements.length : totalLines.length;
    if (!elements[index - 1]) {
      return;
    }
    // @ts-ignore
    const { offsetTop } = elements[index - 1];
    // if pointing to same element, calculate diff and apply
    if (this.prevOffsetTop !== offsetTop) {
      this.scrollBefore = scrollInfo.top;
    }
    const diff =
      this.prevOffsetTop === offsetTop ? scrollInfo.top - this.scrollBefore : 0;
    this.prevOffsetTop = offsetTop;
    const previewScrollTop = offsetTop + diff;
    if (previewScrollTop > this.prevPreviewScrollTop && !down) {
      return;
    }
    this.prevPreviewScrollTop = previewScrollTop;
    // actually scroll
    (preview as any).scroll({
      behavior: 'smooth',
      top: previewScrollTop,
    });
  };

  initialize = () => {
    if (!CodeEditor) {
      return;
    }
    if (checkiOS()) {
      this.setState({
        iOS: true,
      });
      return;
    }

    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'material',
      lineNumbers: false, // 좌측에 라인넘버 띄우기
      lineWrapping: true, // 내용이 너무 길면 다음 줄에 작성
      scrollbarStyle: 'overlay',
      placeholder: '당신의 이야기를 적어보세요...',
    });
    (window as any).codeMirror = this.codeMirror; // for debugging use
    this.codeMirror.on('focus', () => {
      if (this.props.body === '' && window.outerWidth < 768) {
        this.codeMirror.options.placeholder = '';
        this.codeMirror.setValue(' ');
        this.codeMirror.setValue('');
      }
    });
    this.codeMirror.on('blur', () => {
      if (this.props.body === '' && window.outerWidth < 768) {
        this.codeMirror.options.placeholder = '당신의 이야기를 적어보세요...';
        this.codeMirror.setValue(' ');
        this.codeMirror.setValue('');
      }
    });
    this.codeMirror.on('change', this.onChange);
    this.codeMirror.on('scroll', this.onScroll);

    this.codeMirror.on('paste', (editor: any, e: any) => {
      const { items } = e.clipboardData || e.originalEvent.clipboardData;
      if (e.clipboardData) {
        const text = e.clipboardData.getData('Text');
        const check = checkEmbed(text);
        if (!check) {
          return;
        }
        const selection = editor.getSelection();
        if (selection.length > 0) {
          editor.replaceSelection(check);
        } else {
          const doc = editor.getDoc();
          const cursor = doc.getCursor();
          const pos = {
            line: cursor.line,
            ch: cursor.ch,
          };
          doc.replaceRange(check, pos);
        }
        e.preventDefault();
        return;
      }
      if (items.length !== 2) {
        return;
      }
      if (items[1].kind !== 'file') {
        return;
      }
      e.preventDefault();
    });

    if (this.props.body) {
      this.codeMirror.setValue(this.props.body);
    }
  };

  onChange = (doc: any) => {
    const cursor = doc.getCursor();
    this.setState({
      cursor,
    });

    const { onEditBody, body } = this.props;
    if (body !== doc.getValue()) {
      onEditBody(doc.getValue());
    }
    // if editing the last line
    const { line } = cursor;
    const last = doc.lastLine();
    if (last - line < 5) {
      const preview = document.getElementById('preview');
      if (!preview) {
        return;
      }
      preview.scrollTop = preview.scrollHeight;
    }
  };

  onTextareaChange = (e: any) => {
    this.props.onEditBody(e.target.value);
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { codeMirror } = this;
    const { cursor } = this.state;
    const { body } = this.props;

    if (!codeMirror) {
      return;
    }
    // diff cursor
    if (prevState.cursor !== cursor) {
      codeMirror.setCursor(cursor);
      return;
    }
    if (prevProps.body !== body && body !== this.codeMirror.getValue()) {
      codeMirror.setValue(body);
      if (!cursor) {
        return;
      }
      codeMirror.setCursor(cursor);
    }
    if (!prevProps.insertText && this.props.insertText) {
      this.insertText();
    }
  }

  render() {
    const { iOS } = this.state;
    return (
      <div className="CodeEditor material">
        {iOS ? (
          <textarea
            className="ios-fallback"
            value={this.props.body}
            onChange={this.onTextareaChange}
          />
        ) : (
          <div
            className="editor"
            ref={ref => {
              this.editor = ref;
            }}
          />
        )}
      </div>
    );
  }
}

export default CodeEditor;
