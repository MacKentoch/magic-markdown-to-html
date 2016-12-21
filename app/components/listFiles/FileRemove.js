/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
/* eslint jsx-a11y/no-static-element-interactions:0 */

import React, { PureComponent, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';

class FileRemove extends PureComponent {
  state = {
    isMouseOver: false
  };

  render() {
    const { isMouseOver } = this.state;
    return (
      <div
        onMouseEnter={this.handlesOnMouseEnter}
        onMouseLeave={this.handlesOnMouseLeave}>
        <Motion style={{ scaleXY: spring(isMouseOver ? 2 : 1, presets.wobbly) }}>
          {
            ({ scaleXY }) => (
              <span
                onClick={this.handlesOnClick}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: '16px',
                  color: '#F1F1F1',
                  padding: '5px',
                  transform: `scale(${scaleXY})`
                }}>
                <i className="fa fa-trash-o" />
              </span>
            )
          }
        </Motion>
      </div>
    );
  }

  handlesOnClick = event => {
    event.preventDefault();
    const { onClick, fileIndex } = this.props;
    onClick(fileIndex);
  }

  handlesOnMouseEnter = () => {
    this.setState({ isMouseOver: true });
  }

  handlesOnMouseLeave = () => {
    this.setState({ isMouseOver: false });
  }
}

FileRemove.propTypes = {
  onClick: PropTypes.func.isRequired,
  fileIndex: PropTypes.number.isRequired
};

export default FileRemove;
