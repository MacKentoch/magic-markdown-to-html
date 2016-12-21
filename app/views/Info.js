/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import { List } from 'immutable';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';

class Info extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  componentWillMount() {
    const { actions: { enterInfo } } = this.props;
    enterInfo();
  }

  componentWillUnmount() {
    const { actions: { leaveInfo } } = this.props;
    leaveInfo();
  }

  render() {
    const { animated, viewEntersAnim } = this.state;
    const { username } = this.props;

    return (
      <ViewContainer
        animated={animated}
        launchAnimation={viewEntersAnim}>
        <div className="row">
          <div className="col-sm-12">
            <ViewTitle
              title={'Info'}
              faIconName={'fa-info-circle'}
            />
            <div>
              <h4>
                Your are connected as:
                <b style={{ marginLeft: '10px' }}>
                  {username}
                </b>
              </h4>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

Info.propTypes = {
  // views:
  currentView: PropTypes.string.isRequired,
  // notifications:
  notifications: PropTypes.instanceOf(List),
  // user:
  username: PropTypes.string.isRequired,

  actions: PropTypes.shape({
    // views:
    enterInfo: PropTypes.func.isRequired,
    leaveInfo: PropTypes.func.isRequired,
    // notifications:
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired
  }).isRequired
};

export default Info;
