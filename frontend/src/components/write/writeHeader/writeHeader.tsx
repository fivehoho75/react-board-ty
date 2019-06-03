import cx from 'classnames';
import React from 'react';
import { IoMdImage as ImageIcon } from 'react-icons/io';
import { MdKeyboardBackspace as BackIcon } from 'react-icons/md';
import './writeHeader.scss';

interface Props {
  title: string;
  isEdit: boolean;
  onChangeTitle(e: any): void;
  onUploadClick(): void;
  onOpenSubmitBox(): void;
  onGoBack(): void;
}
const WriteHeader = ({
  onChangeTitle,
  onOpenSubmitBox,
  onUploadClick,
  onGoBack,
  title,
  isEdit,
}: Props) => {
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
      <div className="actions">
        <button className="upload-image" onClick={onUploadClick}>
          <ImageIcon />
          <div className="btn-text">업로드</div>
        </button>
        <div
          className={cx('button', isEdit ? 'edit' : 'submit')}
          onClick={onOpenSubmitBox}
        >
          {isEdit ? '업데이트' : '작성하기'}
        </div>
      </div>
    </div>
  );
};

export default WriteHeader;
