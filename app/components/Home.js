/* eslint react/sort-comp:0 */
/* eslint react/jsx-closing-bracket-location:0 */
/* eslint max-len:0 */
/* eslint arrow-body-style:0 */

// @no-flow
import React, { Component } from 'react';
import recursive from 'recursive-readdir';
import { CubeGrid } from 'better-react-spinkit';
import path from 'path';
import cx from 'classnames';

const ipcRenderer = require('electron').ipcRenderer;

const rootPath = path.resolve('../');

class Home extends Component {
  state = {
    isFetchingDirectories: true,
    files: [],
    mdFiles: [],
    isRendering: false
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
      err => console.log(err)
    );

    // receiving an array of converted markdown into html:
    ipcRenderer.on('convertedIntoHtml', this.onConvertedIntoHtml);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('mdConverter');
  }

  render() {
    const {
      files,
      isFetchingDirectories,
      isRendering,
      mdFiles
    } = this.state;

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
            flex: 1,
            flexDirection: 'column',
            marginTop: '50px'
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
          </div>
        }
      </div>
    );
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

  getListListFiles = () => {
    return new Promise((resolve, reject) => {
      recursive(rootPath, (err, files) => {
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

    console.log('files, ', files);

    if (Array.isArray(files) && files.length > 0) {
      this.setState({ isRendering: true });
      // send markdown file to main to convert it:
      ipcRenderer.send('convertHtml', files);
    }
  }
}


export default Home;
