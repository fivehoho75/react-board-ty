import MarkdownRender from 'components/common/markdownRender';
import React from 'react';
import './markdownPreview.scss';

interface Props {
  title: string;
  body: string;
  theme: any;
}
const MarkdownPreview: React.FC<Props> = ({ title, body, theme }) => {
  return (
    <div className="MarkdownPreview" id="preview">
      <h1>{title}</h1>
      <MarkdownRender body={body} theme={theme} />
    </div>
  );
};

export default MarkdownPreview;
