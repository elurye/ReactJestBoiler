'use strict';

import React, { Component } from 'react';
import classNames from 'classnames';

class ToDoItem extends Component {

  render () {
    var defaultClass = 'callout';

    var defaultClass = classNames({
      'callout': true,
      'callout-success': this.props.done,
      'callout-info': !this.props.done
    });

    return (
      <div>
        <input type="checkbox" className='ficon ficon-checkmark mark-done' onClick={this.props.onClickDone}></input>
        <label className={defaultClass}>{this.props.value}</label>
        <button className='close' onClick={this.props.onClickClose}>&times;</button>
      </div>
    );
  }
}

export default ToDoItem;
