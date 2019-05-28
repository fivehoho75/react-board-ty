import React from 'react';
import './landingTemplate.scss';

const LandingTemplate = ({ form }: any) => {
  return (
    <div className="LandingTemplate">
      <div className="left">
        <div>
          <div className="logo">BoardTest</div>
        </div>
      </div>
      <div className="right">{form}</div>
    </div>
  );
};

export default LandingTemplate;
