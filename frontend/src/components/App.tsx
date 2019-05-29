import { Home, NotFound } from 'pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Route>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/:mode(trending|recent|collections|tags|stored)"
            component={Home}
          />
          <Route component={NotFound} />
        </Switch>
      </Route>
    </React.Fragment>
  );
};

export default App;