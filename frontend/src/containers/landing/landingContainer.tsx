import LandingTemplate from 'components/base/landingTemplate';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';

interface Props {
  hidden: boolean;
  form: ReactNode;
}
const LandingContainer = (props: Props) => {
  if (props.hidden) {
    return null;
  }
  return <LandingTemplate {...props} />;
};

export default connect(
  ({ base }: StoreState) => ({
    hidden: !base.landing,
  }),
  () => ({})
)(LandingContainer);
