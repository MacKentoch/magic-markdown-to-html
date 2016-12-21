/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */

import React, { PureComponent, PropTypes } from 'react';

class FileExtension extends PureComponent {
  render() {
    return (
      <div
        style={{
          fontSize: '30px',
          color: '#F1F1F1',
          marginRight: '10px'
        }}>
        { this.getExtensionIconFromFileType() }
      </div>
    );
  }

  getExtensionIconFromFileType = () => {
    const { fileType } = this.props;

    switch (fileType) {
      case 'pdf':
      case 'application/pdf':
        return <i className="fa fa-file-pdf-o" />;

      case 'txt':
      case 'text/plain':
        return <i className="fa fa-file-pdf-o" />;

      case 'doc':
      case 'application/msword':
      case 'docx':
        return <i className="fa fa-file-word-o" />;

      case 'xls':
      case 'application/excel':
      case 'application/vnd.ms-excel':
      case 'application/x-excel':
      case 'application/x-msexcel':
      case 'xlsx':
        return <i className="fa fa-file-excel-o" />;

      case 'csv':
        return <i className="fa fa-file-text-o" />;

      case 'png':
      case 'image/png':
      case 'image/jpeg':
      case 'jpg':
      case 'jpeg':
      case 'image/pjpeg':
      case 'bmp':
      case 'image/bmp':
      case 'image/x-windows-bmp':
        return <i className="fa fa-file-image-o" />;

      case 'zip':
      case 'application/x-compressed':
      case 'application/x-zip-compressed':
      case 'application/zip':
      case 'multipart/x-zip':
      case '7zip':
      case 'rar':
        return <i className="fa fa-file-archive-o" />;

      default:
        return <i className="fa fa-file-o" />;
    }
  }
}

FileExtension.propTypes = {
  fileType: PropTypes.string
};

export default FileExtension;
