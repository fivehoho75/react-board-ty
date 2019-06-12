import RegisterTemplate from 'components/register/RegisterTemplate';
import RegisterFormContainer from 'containers/register/RegisterFormContainer';
import React from 'react';

const Register = () => {
  return <RegisterTemplate form={<RegisterFormContainer />} />;
};

export default Register;
