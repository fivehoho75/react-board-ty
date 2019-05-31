import React from 'react';
import { MdKeyboardBackspace as BackIcon } from 'react-icons/md';
import './writeHeader.scss';

interface Props {
  title: string;
  onChangeTitle(e: any): void;
  onGoBack(): void;
}
const WriteHeader = ({ onChangeTitle, onGoBack, title }: Props) => {
  return (
    <div className="WriteHeader">
      <BackIcon className="back-icon" onClick={onGoBack} />
      <div className="title-area">
        <input
          placeholder="제목을 입력해주세요"
          autoFocus
          onChange={onChangeTitle}
          value={title}
        />
      </div>
    </div>
  );
};

export default WriteHeader;
