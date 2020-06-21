import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MotionLayoutProvider } from 'react-motion-layout';

import AllComponents from './components/AllComponents';
import UI from './components/UI/UI';
import CompanyCard from './components/Cards/CompanyCard';
import CompanyDetails from './components/Cards/CompanyDetails';
import Home from './Home';

import './App.css';

const App = () => (
  <MotionLayoutProvider>
    <Switch>
      {/* <Route exact={true} path="/" component={Home} /> */}
      <Route exact={true} path="/" component={UI} />
      <Route
        path={`/company/:companyName?`}
        render={({ match }) => (
          <CompanyDetails match={match} companyName={match.params.companyName} />
          // <CompanyCard match={match} data={{ companyName: match.params.companyName, title: '' }} />
        )}
      />
      <Route exact={true} path="/all/:componentName?" component={AllComponents} />
    </Switch>
  </MotionLayoutProvider>
);

export default App;
