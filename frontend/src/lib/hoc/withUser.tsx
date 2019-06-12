import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { UserData } from 'store/modules/user';

export interface WithUserProps {
  user?: UserData | null;
}

const withUser = (View: any) => {
  const WithUser = (props: WithUserProps) => <View {...props} />;

  return connect(
    ({ user }: StoreState) => ({
      user: user.user,
    }),
    () => ({})
  )(WithUser);
};

export default withUser;
