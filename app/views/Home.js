/* eslint react/sort-comp:0 */
/* eslint react/jsx-closing-bracket-location:0 */
/* eslint max-len:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-did-mount-set-state:0 */

// @no-flow
import React, { Component } from 'react';
import recursive from 'recursive-readdir';
import { CubeGrid } from 'better-react-spinkit';
import path from 'path';
import cx from 'classnames';

const ipcRenderer = require('electron').ipcRenderer;

// const defaultRootPath = path.resolve('../');

class Home extends Component {
  state = {
    isFetchingDirectories: true,
    files: [],
    mdFiles: [],
    isRendering: false,
    rootPath: '',
    errorMessage: '',
    saveThisDirectory: true
  };

  componentDidMount() {
    this.getListListFiles()
    .then(
      data => {
        return this.setState({
          files: data,
          isFetchingDirectories: false
        });
      }
    )
    .catch(
      err => {
        return this.setState({
          errorMessage: err.message
        });
      }
    );

    if (this.hasPresistDirectory()) {
      this.setState({ rootPath: this.getPersistDirectory() })
    }

    // receiving an array of converted markdown into html:
    ipcRenderer.on('convertedIntoHtml', this.onConvertedIntoHtml);
    ipcRenderer.on('select-directory-reply', this.onDirectorySelected);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('mdConverter');
  }

  render() {
    const {
      files,
      isFetchingDirectories,
      isRendering,
      mdFiles,
      rootPath,
      errorMessage,
      saveThisDirectory
    } = this.state;

    if (!rootPath || rootPath.length === 0) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <h1>Magic markdown to HTML</h1>
          <button
            className="btn btn-warning"
            style={{ width: '400px', marginTop: '120px' }}
            onClick={this.handlesSelectDirectory}>
            <span
              style={{
                color: '#fff',
                fontWeight: 'bolder'
              }}>
              Select a directory
            </span>
          </button>
          <div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={saveThisDirectory}
                  onChange={this.handlesSelectSaveThisDirectory}
                />
                Remember this directory
              </label>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <h1>Magic markdown to HTML</h1>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            flexDirection: 'column',
            alignItems: 'stretch',
            marginLeft: '40px',
            marginRight: '40px'
          }}>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#4A4A4A'
                  }}>
                  <b>
                    Renders markdown from directory:
                  </b>
                  <button
                    className="btn btn-warning"
                    style={{ marginLeft: '30px' }}
                    onClick={this.handlesDeleteDirectory}>
                    <span
                      style={{
                        color: '#fff',
                        fontWeight: 'bolder'
                      }}>
                      <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              </h3>
            </div>
            <div className="panel-body">
              <h5 style={{ color: '#4A4A4A' }}>
                {rootPath}
              </h5>
            </div>
          </div>
        </div>
        <hr />
        {
          errorMessage && errorMessage.length > 0 &&
            <div
              style={{
                display: 'flex',
                marginTop: '20px',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <div
                className="alert alert-dismissible alert-danger"
                style={{ width: '500px' }}>
                <button
                  type="button"
                  className="close"
                  onClick={this.onErrorAlertClick}>
                  &times;
                </button>
                <strong>Error: </strong>
                {errorMessage}
              </div>
            </div>
        }
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            marginTop: '20px'
          }}>
          {
            isRendering &&
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                <h2 style={{ textAlign: 'center' }}>
                  rendering markdown files...
                </h2>
                <CubeGrid
                  style={{ marginTop: '20px' }}
                  size={46}
                  color="#f1f2f3"
                />
              </div>
          }

          {
            !isRendering && Array.isArray(mdFiles) && mdFiles.length > 0 &&
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  marginLeft: '5%',
                  marginRight: '5%'
                }}>
                <table className="table table-striped table-hover ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Markdown file</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mdFiles
                      .map(markdown => markdown.replace(rootPath, ''))
                      .map(
                        (file, filesIdx) => (
                          <tr key={filesIdx}>
                            <td>{filesIdx}</td>
                            <td>{file}</td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </table>
              </div>
          }

          {
            !isRendering && isFetchingDirectories &&
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                <h2 style={{ textAlign: 'center' }}>
                  Inspecting markdown files...
                </h2>
                <CubeGrid
                  style={{ marginTop: '20px' }}
                  size={46}
                  color="#f1f2f3"
                />
              </div>
          }
          {
            !isRendering && mdFiles.length === 0 && !isFetchingDirectories && Array.isArray(files) && files.length > 0 &&
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  marginLeft: '5%',
                  marginRight: '5%'
                }}>
                <table className="table table-striped table-hover ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Markdown file</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      files
                      .map(markdown => markdown.replace(rootPath, ''))
                      .map(
                        (file, filesIdx) => (
                          <tr key={filesIdx}>
                            <td>{filesIdx}</td>
                            <td>{file}</td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </table>
              </div>
          }
        </div>
        {
          !isRendering && !isFetchingDirectories && mdFiles.length === 0 &&
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                marginLeft: '5%',
                marginRight: '5%'
              }}>
              <button
                className="btn btn-warning btn-block"
                onClick={this.handlesOnClick}>
                <span style={{ color: '#fff', fontWeight: 'bolder' }}>
                  CONVERT ALL MD FILES TO HTML
                </span>
              </button>
            </div>
        }
        {
          !isRendering && mdFiles.length > 0 &&
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <h1>
                <i
                  className={
                  cx({
                    fa: true,
                    'fa-thumbs-o-up': true,
                    animated: true,
                    zoomIn: true
                  })
                } />
              </h1>
              <h2>
                Done!
              </h2>
              <button
                className="btn btn-warning"
                style={{
                  marginTop: '30px',
                  padding: '20px',
                  paddingLeft: '30px',
                  paddingRight: '30px'
                }}
                onClick={this.handlesReset}>
                <i
                  className="fa fa-refresh fa-2x"
                  aria-hidden="true"
                />
              </button>
            </div>
        }
      </div>
    );
  }

  handlesSelectSaveThisDirectory = event => {
    const { saveThisDirectory } = this.state;
    this.setState({ saveThisDirectory: !saveThisDirectory });
  }

  handlesSelectDirectory= (event) => {
    event.preventDefault();
    ipcRenderer.send('select-directory');
  }

  onDirectorySelected = (event, args) => {
    if (Array.isArray(args) && args.length > 0) {
      const directory = args[0];
      const { saveThisDirectory } = this.state;
      if (saveThisDirectory === true) {
        this.savePresistDirectory(directory);
      }
      // console.log('directory: ', directory);
      this.setState({ rootPath: directory });
    }
  }

  handlesDeleteDirectory = event => {
    event.preventDefault();
    this.deletePresistDirectory();
    this.setState({ rootPath: '' });
  }

  savePresistDirectory = (directory) => {
    localStorage.setItem('rootDirectory', directory);
  }

  deletePresistDirectory = () => {
    localStorage.removeItem('rootDirectory');
  }

  getPersistDirectory = () => {
    return localStorage.getItem('rootDirectory');
  }

  hasPresistDirectory = () => {
    const directory = this.getPersistDirectory();
    if (directory) {
      return true;
    }
    return false;
  }

  handlesReset = (event) => {
    event.preventDefault();
    this.setState({ mdFiles: [] });
  }

  onConvertedIntoHtml = (event, args) => {
    const listMdFiles = args;
    // stop waiting:
    this.setState({ isRendering: false });

    if (!Array.isArray(listMdFiles)) {
      return;
    }
    if (listMdFiles.length === 0) {
      return;
    }

    // all is ok:
    this.setState({ mdFiles: listMdFiles });
  }

  onErrorAlertClick = (event) => {
    event.preventDefault();
    this.setState({ errorMessage: '' });
  }

  getListListFiles = () => {
    const { rootPath } = this.state;

    return new Promise((resolve, reject) => {
      recursive(path.resolve(rootPath), (err, files) => {
        if (err) {
          return reject(err);
        }
        const markdownFiles = files
                                .filter(markdown => markdown.slice(-3).toLowerCase() === '.md')
                                .filter(markdown => !markdown.includes('node_modules')); // filter node_modules dir (should pollute with multiples md files)
        return resolve(markdownFiles);
      });
    });
  }

  handlesOnClick = (event) => {
    event.preventDefault();
    const { files } = this.state;

    if (Array.isArray(files) && files.length > 0) {
      this.setState({ isRendering: true });
      // send markdown file to main to convert it:
      ipcRenderer.send('convertHtml', files);
    }
  }
}


export default Home;
