/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { PropTypes } from 'react';

const ViewTitle = ({ title, faIconName }) => (
  <div
    className="page-header"
    style={{ borderBottomColor: '#4A4A4A', marginTop: 5, color: '#4A4A4A' }}>
    <h1>
      <i className={`fa ${faIconName}`} aria-hidden="true" />
      &nbsp;
      {title}
    </h1>
  </div>
);

ViewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  faIconName: PropTypes.string
};

ViewTitle.defaultProps = {
  faIconName: 'fa-home'
};

export default ViewTitle;
