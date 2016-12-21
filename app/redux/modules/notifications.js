import { Map, List } from 'immutable';

// /////////////////////
// constants
// /////////////////////
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// /////////////////////
// reducer
// /////////////////////
const initialState = List();
// NOTE: a notification is an object like:
//   {
//     key: 2,
//     message: 'test message',
//     dismissAfter: 1000,
//     action: 'Dismiss',
//     onClick: () => this.key // returns its own key (needed to dismiss notification)
//   }

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_NOTIFICATION:
      return state.push(
        Map({
          key: state.size + 1,
          ...action.notification,
          onClick: () => removeNotification(this)
        })
      );

    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.get('key') !== action.notification.key);

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification
  };
}

export function removeNotification(notification) {
  return {
    type: REMOVE_NOTIFICATION,
    notification
  };
}
