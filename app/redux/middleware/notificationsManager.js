/* eslint max-len:0 */
/* eslint import/prefer-default-export:0 */
/* eslint no-unused-vars:0 */

/* -------------------------------------------------------------------------------------------------------------
    NOTE: notificationManager middleware

    dispatch an action with "showNotification" object :

    showNotification: {
      message: 'test message',
      dismissAfter: 1000,
      action: 'Dismiss'
    }
 ------------------------------------------------------------------------------------------------------------- */
import appConfig from '../../config';

const DEFAULT_DISMISS_TIME = appConfig.notifications.timeout;
const DEFAULT_MESSAGE = '';
const DEFAULT_ACTION = appConfig.notifications.defaultAction;

export const notificationManager = store => next => action => {
  if (action && action.showNotification) {
    const notificationPayload = action.showNotification;
    next({
      type: 'ADD_NOTIFICATION',
      notification: {
        message: notificationPayload.message || DEFAULT_MESSAGE,
        dismissAfter: notificationPayload.dismissAfter || DEFAULT_DISMISS_TIME,
        action: notificationPayload.action || DEFAULT_ACTION
      }
    });
    return next(action);
  }
  return next(action);
};
