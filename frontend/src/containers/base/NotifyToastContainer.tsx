import NotifyToast from 'components/base/NotifyToast';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { BaseActions } from 'store/actionCreators';

interface Props {
  toast: {
    type: string | null;
    message: string | null;
    visible: boolean;
  };
}
class NotifyToastContainer extends Component<Props> {
  onHide() {
    BaseActions.hideToast();
  }

  render() {
    const { toast } = this.props;

    return <NotifyToast toast={toast} onHide={this.onHide} />;
  }
}

export default connect(
  ({ base }: StoreState) => ({
    toast: base.toast,
  }),
  () => ({})
)(NotifyToastContainer);
