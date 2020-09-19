import React from 'react';
import { Route, Switch } from 'react-router';
import { withLazy } from 'utils';

const Home = withLazy(() => import('./home'));

const ModulesRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="**" render={() => <div>Not Found Page </div>} />
    </Switch>
  );
};

export default ModulesRouter;
