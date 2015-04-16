'use strict';

import React, { Component } from 'react';

class ToDoItem extends Component {

  render () {
    var defaultClass = 'callout';

    defaultClass += this.props.done ? ' callout-success' : ' callout-info';

    return (
      <div className={defaultClass}>
        <i className='ficon ficon-checkmark mark-done' onClick={this.props.onClickDone}></i>
        <span>{this.props.value}</span>
        <i className='close' onClick={this.props.onClickClose}>&times;</i>
      </div>
    );
  }
}

export default ToDoItem;
