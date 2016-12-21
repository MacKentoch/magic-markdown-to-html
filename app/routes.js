// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Home';
// import HistoryPage from './containers/History';
// import InfoPage from './containers/Info';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    {/* <Route path="/history" component={HistoryPage} />
    <Route path="/info" component={InfoPage} /> */}
    {/* to prevent page not found (does not make sense in an electron app): */}
    <Route path="*" component={HomePage} />
  </Route>
);
