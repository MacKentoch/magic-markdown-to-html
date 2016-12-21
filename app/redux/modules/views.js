import { Map } from 'immutable';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ENTER_HOME_VIEW = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW = 'LEAVE_HOME_VIEW';
const ENTER_HISTORY_VIEW = 'ENTER_HISTORY_VIEW';
const LEAVE_HISTORY_VIEW = 'LEAVE_HISTORY_VIEW';
const ENTER_INFO_VIEW = 'ENTER_INFO_VIEW';
const LEAVE_INFO_VIEW = 'LEAVE_INFO_VIEW';

// /////////////////////
// reducer
// /////////////////////
const initialState = Map({
  currentView: 'not set',
  enterTime: null,
  leaveTime: null
});

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);
  switch (action.type) {

    case ENTER_HOME_VIEW:
    case ENTER_HISTORY_VIEW:
    case ENTER_INFO_VIEW:
      // can't enter if you are already inside
      if (state.get('currentView') !== action.currentView) {
        // return state.withMutations(
        //   state => {
        //     state.set('currentView', action.currentView);
        //     state.set('enterTime', currentTime)
        //     state.set('leaveTime', currentTime);
        //   }
        // );
        return state.merge({
          currentView: action.currentView,
          enterTime: currentTime,
        });
      }
      return state;

    case LEAVE_HOME_VIEW:
    case LEAVE_HISTORY_VIEW:
    case LEAVE_INFO_VIEW:
      // can't leave if you aren't already inside
      if (state.get('currentView') === action.currentView) {
        return state.merge({
          currentView: action.currentView,
          leaveTime: currentTime
        });
      }
      return state;

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function enterHome() {
  return {
    type: ENTER_HOME_VIEW,
    currentView: 'home'
  };
}

export function leaveHome() {
  return {
    type: LEAVE_HOME_VIEW,
    currentView: 'home'
  };
}

export function enterHistory() {
  return {
    type: ENTER_HISTORY_VIEW,
    currentView: 'history'
  };
}

export function leaveHistory() {
  return {
    type: LEAVE_HISTORY_VIEW,
    currentView: 'history'
  };
}

export function enterInfo() {
  return {
    type: ENTER_INFO_VIEW,
    currentView: 'info'
  };
}

export function leaveInfo() {
  return {
    type: LEAVE_INFO_VIEW,
    currentView: 'info'
  };
}
