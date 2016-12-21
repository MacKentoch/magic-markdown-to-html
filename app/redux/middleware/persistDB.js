/* eslint arrow-body-style:0 */
/* eslint no-unused-vars:0 */
/* eslint import/prefer-default-export:0 */

export const persistDB = store => next => action => {
  if (action && action.savePersist) {
    // TODO: save to a DB (file or database):

    return next(action);
  }
  return next(action);
};
