/* eslint arrow-body-style:0 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '../redux/modules/views';
import * as filesActions from '../redux/modules/files';
import { History } from '../views';

const mapStateToProps = state => {
  return {
    // views:
    currentView: state.views.get('currentView'),
    // files:
    histoFiles: state.files.get('histoFiles'),
    histoFilter: state.files.get('histoFilter')
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // views:
        enterHistory: viewActions.enterHistory,
        leaveHistory: viewActions.leaveHistory,
        // files:
        getPersistHistoFiles: filesActions.getPersistHistoFiles,
        changeHistoFilter: filesActions.changeHistoFilter
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
