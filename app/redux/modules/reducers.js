// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import views from './views';
import files from './files';
import notifications from './notifications';
import user from './user';

const rootReducer = combineReducers({
  routing,
  views,
  files,
  notifications,
  user
});

export default rootReducer;
