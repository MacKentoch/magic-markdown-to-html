/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
// import appConfig from '../../config';
import FileExtension from './FileExtension';
import FileName from './FileName';
import FileSize from './FileSize';
import FileRemove from './FileRemove';

class File extends PureComponent {
  render() {
    const {
      type,
      name,
      size,
      fileIndex,
      style,
      showDeleteButton,
      showError
    } = this.props;

    return (
      <div>
        {
          showError &&
          <div style={{
            diplay: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}>
            <p>
              Error
            </p>
          </div>
        }
        <a
          onClick={this.handlesOnFileClick}
          className="list-group-item"
          style={{
            paddingTop: '10px',
            paddingRight: '10px',
            backgroundColor: '#4A4A4A',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0px',
            ...style
          }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <FileExtension fileType={type} />
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
              <FileName fileName={name} />
              <FileSize fileSize={size} />
            </div>
            {
              showDeleteButton &&
              <FileRemove
                fileIndex={fileIndex}
                onClick={this.handlesOnRemoveClick}
              />
            }
          </div>
        </a>
      </div>
    );
  }

  handlesOnRemoveClick = fileIdx => {
    event.preventDefault();
    const { onFileRemove } = this.props;
    onFileRemove(fileIdx);
  }
}

File.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  // filePath: PropTypes.string,
  size: PropTypes.any.isRequired,
  fileIndex: PropTypes.number.isRequired,
  onFileRemove: PropTypes.func,
  style: PropTypes.any,
  showDeleteButton: PropTypes.bool,
  showError: PropTypes.bool
};

File.defaultProps = {
  type: 'unknown',
  showError: false
};

export default File;
