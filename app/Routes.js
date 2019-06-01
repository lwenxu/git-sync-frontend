import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage/HomePage';
import Settings from './containers/Settings';

export default () => (
  <App>
    <Switch>
      <Route path={routes.SETTING} component={Settings} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
