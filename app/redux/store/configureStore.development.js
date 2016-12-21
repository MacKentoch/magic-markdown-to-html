import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import {
  localStorageManager,
  notificationManager
} from '../middleware';
import rootReducer from '../modules/reducers';
// actions
import * as viewsActions from '../modules/views';
import * as filesActions from '../modules/files';
import * as notificationsActions from '../modules/notifications';
import * as userActions from '../modules/user';

const actionCreators = {
  ...viewsActions,
  ...filesActions,
  ...notificationsActions,
  ...userActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    localStorageManager,
    notificationManager,
    router,
    logger
  )
);

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../modules/reducers', () =>
      store.replaceReducer(require('../modules/reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
