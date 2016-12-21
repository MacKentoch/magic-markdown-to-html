import { Map } from 'immutable';
import username from 'username';

// /////////////////////
// constants
// /////////////////////
const QUERY_GET_USERNAME = 'QUERY_GET_USERNAME';
const RECEIVED_GET_USERNAME = 'RECEIVED_GET_USERNAME';
const ERROR_GET_USERNAME = 'ERROR_GET_USERNAME';

// /////////////////////
// reducer
// /////////////////////
const initialState = Map({
  name: ''
});

export default function (state = initialState, action) {
  switch (action.type) {

    case QUERY_GET_USERNAME:
      return state;

    case RECEIVED_GET_USERNAME:
      return state.set('name', action.name || '');

    case ERROR_GET_USERNAME:
      return state;

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////

export function getUserName() {
  return (dispatch, getState) => {
    if (shouldGetUserName(getState())) {
      dispatch(queryGetUserName());
      username()
        .then(name => dispatch(receivedGetUserName(name)))
        .catch(err => dispatch(errorGetUserName(err)));
    }
  };
}

function shouldGetUserName(state) {
  return state.user.get('name').length === 0;
}

function queryGetUserName() {
  return {
    type: QUERY_GET_USERNAME
  };
}

function receivedGetUserName(name = '') {
  return {
    type: RECEIVED_GET_USERNAME,
    name
  };
}

function errorGetUserName(error) {
  return {
    type: ERROR_GET_USERNAME,
    error,
    // // notification (middleware):
    // showNotification: {
    //   message: 'Profile unreachable...',
    //   dismissAfter: 1000,
    //   action: 'OK'
    // }
  };
}
