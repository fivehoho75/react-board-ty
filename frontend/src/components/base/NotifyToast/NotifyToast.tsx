import cx from 'classnames';
import React, { Component } from 'react';
import './NotifyToast.scss';

interface Props {
  toast: {
    type: string | null;
    message: string | null;
    visible: boolean;
  };
  onHide: () => void;
}

interface State {
  animating: boolean;
}

class NotifyToast extends Component<Props, State> {
  state = {
    animating: false,
  };
  autoHideTimeout: any = null;
  animateTimeout: any = null;
  componentDidUpdate(prevProps: Props, prevState: State) {
    // false -> true
    if (!prevProps.toast.visible && this.props.toast.visible) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = null;
      }
      this.autoHideTimeout = setTimeout(() => {
        this.props.onHide();
        this.autoHideTimeout = null;
      }, 1500);
    }

    if (prevProps.toast.visible !== this.props.toast.visible) {
      this.setState({
        animating: true,
      });
      if (this.animateTimeout) {
        clearTimeout(this.animateTimeout);
        this.animateTimeout = null;
      }
      this.animateTimeout = setTimeout(() => {
        this.setState({
          animating: false,
        });
      }, 150);
    }
  }
  render() {
    const { type, message, visible } = this.props.toast;
    const { animating } = this.state;
    const transition = (() => {
      if (!animating) {
        return '';
      }
      return visible ? 'appear' : 'disappear';
    })();
    if (!animating && !visible) {
      return null;
    }
    if (!type || !message) {
      return null;
    }
    return <div className={cx('NotifyToast', type, transition)}>{message}</div>;
  }
}

export default NotifyToast;
