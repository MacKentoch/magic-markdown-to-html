/* eslint no-tabs:0 */
/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */

import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

class HistoFilesFilterCmd extends PureComponent {
  render() {
    const { selectedFilter } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <button
          className={
            cx({
              btn: true,
              'btn btn-primary': true,
              active: selectedFilter === 'today'
            })
          }
          style={{ margin: '5px' }}
          onClick={this.handlesOnTodayFilterSelect}>
          {'today'.toUpperCase()}
        </button>
        <button
          className={
            cx({
              btn: true,
              'btn btn-primary': true,
              active: selectedFilter === 'thisWeek'
            })
          }
          style={{ margin: '5px' }}
          onClick={this.handlesOnThisWeekFilterSelect}>
          {'this week'.toUpperCase()}
        </button>
        <button
          className={
            cx({
              btn: true,
              'btn btn-primary': true,
              active: selectedFilter === 'thisMonth'
            })
          }
          style={{ margin: '5px' }}
          onClick={this.handlesOnThisMonthFilterSelect}>
          {'this Month'.toUpperCase()}
        </button>
        <button
          className={
            cx({
              btn: true,
              'btn btn-primary': true,
              active: selectedFilter === 'all'
            })
          }
          style={{ margin: '5px' }}
          onClick={this.handlesOnAllFilterSelect}>
          {'All history'.toUpperCase()}
        </button>
      </div>
    );
  }

  handlesOnTodayFilterSelect = (event) => {
    event.preventDefault();
    const { onFilterSelect } = this.props;
    onFilterSelect('today');
  }

  handlesOnThisWeekFilterSelect = (event) => {
    event.preventDefault();
    const { onFilterSelect } = this.props;
    onFilterSelect('thisWeek');
  }

  handlesOnThisMonthFilterSelect = (event) => {
    event.preventDefault();
    const { onFilterSelect } = this.props;
    onFilterSelect('thisMonth');
  }

  handlesOnAllFilterSelect = (event) => {
    event.preventDefault();
    const { onFilterSelect } = this.props;
    onFilterSelect('all');
  }
}

HistoFilesFilterCmd.propTypes = {
  selectedFilter: PropTypes.oneOf(['today', 'thisWeek', 'thisMonth', 'all']),
  onFilterSelect: PropTypes.func.isRequired
};

HistoFilesFilterCmd.defaultProps = {
  selectedFilter: 'today'
};

export default HistoFilesFilterCmd;
