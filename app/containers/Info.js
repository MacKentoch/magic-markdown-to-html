/* eslint arrow-body-style:0 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '../redux/modules/views';
import * as notificationsActions from '../redux/modules/notifications';
import { Info } from '../views';

const mapStateToProps = state => {
  return {
    // views:
    currentView: state.views.get('currentView'),
    // notifications:
    notifications: state.notifications,
    // user:
    username: state.user.get('name')
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // views:
        enterInfo: viewActions.enterInfo,
        leaveInfo: viewActions.leaveInfo,
        // notifications:
        addNotification: notificationsActions.addNotification,
        removeNotification: notificationsActions.removeNotification
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
