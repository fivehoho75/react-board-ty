import MainHead from 'components/main/mainHead';
import RightConerContainer from 'containers/main/rightCornerContainer';
import withUser from 'lib/hoc/withUser';
import React, { Component } from 'react';
import { BaseActions } from 'store/actionCreators';
import { UserData } from 'store/modules/user';

interface Props {
  user: UserData | null;
}

class MainHeadContainer extends Component<Props> {
  onEnterLanding = () => {
    BaseActions.enterLanding();
  };

  render() {
    const { onEnterLanding } = this;
    const { user } = this.props;

    return (
      <MainHead
        onLogin={onEnterLanding}
        logged={!!user}
        rightArea={user && <RightConerContainer />}
      />
    );
  }
}

export default withUser(MainHeadContainer);
