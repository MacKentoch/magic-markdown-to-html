/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */

import React, { PureComponent, PropTypes } from 'react';


class FileName extends PureComponent {
  render() {
    const { fileName } = this.props;

    return (
      <p
        className="list-group-item-heading"
        style={{
          fontSize: '12px',
          color: '#F1F1F1'
        }}>
        { fileName }
      </p>
    );
  }
}

FileName.propTypes = {
  fileName: PropTypes.string
};

FileName.defaultProps = {
  fileName: ''
};

export default FileName;
