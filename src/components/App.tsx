import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFound } from 'pages';
const App: React.FC = () => {
  return (
    <React.Fragment>
      <Route>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Route>
    </React.Fragment>
  );
};

export default App;
