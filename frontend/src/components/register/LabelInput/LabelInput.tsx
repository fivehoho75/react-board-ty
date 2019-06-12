import cx from 'classnames';
import React, { ChangeEvent } from 'react';
import { MdLockOutline as LockIcon } from 'react-icons/md';

import './LabelInput.scss';

interface Props {
  type?: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  limit: number | null;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const LabelInput = ({
  label,
  value,
  limit,
  required,
  disabled,
  ...rest
}: Props) => {
  return (
    <div className={cx('register label-input', { disabled })}>
      <div className="label">
        {label} {required && <span>*</span>}
      </div>
      <input value={value} {...rest} disabled={disabled} />
      {disabled && (
        <div className="lock-wrapper">
          <div className="lock">
            <LockIcon />
          </div>
        </div>
      )}
      {limit && (
        <div className="limit">
          {!value ? 0 : value.length} / {limit}
        </div>
      )}
    </div>
  );
};

LabelInput.defaultProps = {
  value: '',
  disabled: false,
  required: false,
  limit: null,
};

export default LabelInput;
