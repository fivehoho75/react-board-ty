import cx from 'classnames';
import React, { Component, Fragment } from 'react';
import withClickOutside from 'react-onclickoutside';
import './SubmitBox.scss';

interface Props {
  isEditing: boolean;
  visible: boolean;
  isEdit: boolean;
  onClose(): void;
  onTempSave(): Promise<any>;
  onSubmit(): void;
}

interface State {
  animating: boolean;
}

class SubmitBox extends Component<Props, State> {
  static defaultProps = {
    isEditing: false,
  };

  state = {
    animating: false,
  };

  handleClickOutside = () => {
    const { onClose, visible } = this.props;
    if (!visible) {
      return;
    }
    onClose();
  };

  render() {
    const { isEdit, visible, onTempSave, onSubmit } = this.props;
    const { animating } = this.state;

    if (!visible && !animating) {
      return null;
    }

    return (
      <div className={cx('SubmitBox', visible ? 'appear' : 'disappear')}>
        <div className="wrapper">
          <div className="title">
            <div className="text">
              {isEdit ? '글 수정하기' : '새 글 작성하기'}
            </div>
          </div>
          <Fragment>
            <div className="sections">
              <section>
                <div className="section-title">태그 설정</div>
              </section>
              <section>
                <div className="section-title">썸네일 지정</div>
              </section>
              <section>
                <div className="section-title">시리즈 설정</div>
              </section>
            </div>
            <div className="footer">
              <div className="buttons">
                <button className="gray" onClick={onTempSave}>
                  임시저장
                </button>
                <button
                  className={cx('purple', { blue: isEdit })}
                  onClick={onSubmit}
                >
                  {isEdit ? '업데이트' : '작성하기'}
                </button>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default withClickOutside(SubmitBox);
