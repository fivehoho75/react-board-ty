import CoreContainer from 'containers/base/coreContainer';
import EmailLogin from 'containers/etc/EmailLogin';
import { Home, NotFound, Register, Write } from 'pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/:mode(trending|recent|collections|tags|stored)"
          component={Home}
        />
        <Route path="/register" component={Register} />
        <Route path="/email-login" component={EmailLogin} />
        <Route path="/write" component={Write} />
        <Route component={NotFound} />
      </Switch>
      <CoreContainer />
    </React.Fragment>
  );
};

export default App;
