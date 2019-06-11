import React from 'react';
import './landingTemplate.scss';

const LandingTemplate = ({ form }: any) => {
  return (
    <div className="LandingTemplate">
      <div className="left">
        <div>
          <div className="logo">BoardTest</div>
          <h2>메시지1</h2>
          <p>메시지2</p>
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>지금, 시작하세요.</h2>
          {form}
        </div>
      </div>
    </div>
  );
};

export default LandingTemplate;
