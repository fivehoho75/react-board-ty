import BackgroundColor from 'components/base/backgroudColor';
import Responsive from 'components/common/Responsive';
import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './RegisterTemplate.scss';

interface Props {
  form: ReactNode;
}

class RegisterTemplate extends Component<Props> {
  render() {
    const { form } = this.props;
    return (
      <div className="register-template">
        <BackgroundColor color="#495057" />
        <Responsive className="mock-header">
          <Link to="/" className="brand">
            velog
          </Link>
          <div className="light">
            <span>/</span>회원가입
          </div>
        </Responsive>
        <section className="rest">
          <div className="register-card">{form}</div>
        </section>
      </div>
    );
  }
}

export default RegisterTemplate;
