/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { PropTypes } from 'react';
import cx from 'classnames';

const ViewContainer = ({ children, animated, launchAnimation }) => (
  <div
    className={cx({
      'view--content': true,
      animatedViews: animated,
      'view-enter': launchAnimation
    })}
    style={{ color: '#4A4A4A' }}>
    { children }
  </div>
);

ViewContainer.propTypes = {
  children: PropTypes.node.isRequired,
  animated: PropTypes.bool,
  launchAnimation: PropTypes.bool
};

ViewContainer.defaultProps = {
  animated: false,
  launchAnimation: false
};

export default ViewContainer;
