/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import './Queue.less';
import React, { Component } from 'react/addons';


var Queue = React.createClass({
  getInitialState: function() {
    return {
      queue: [
        { value: 'Be awesome', done: false },
        { value: 'Learn React', done: false  },
        { value: 'Use JSX in my CodePens', done: false }
      ],
      queueDone: [],
      inputValue: '',
      timeLastExecuted: 0
    };
  },

  addTodo: function() {
    var queue = this.state.queue;
    var timeNow = Date.now();
    var timeElapsed = this.state.timeLastExecuted ? timeNow - this.state.timeLastExecuted : 1000;
    var rateMS = 1000;

    queue.push({
      value: this.state.inputValue,
      timeExecute: timeElapsed < rateMS ? timeLastExecuted + rateMs : 0,
      done: false
    });

    this.setState({
      queue: queue,
      inputValue: ''
    });
  },

  handleChange: function(e) {
    this.setState({
      inputValue: e.target.value
    });
  },

  markTodoDone: function(e) {
    var index = 0;
    var queued = this.state.queue;
    var queueDone = this.state.queueDone;
    var item = queued[index];
    queued.splice(index, 1);
    item.done = !item.done;

    if (item.done) {
      queueDone.push(item);
    }

    this.setState({
      queue: queued,
      queueDone: queueDone
    });
  },

  startQueue: function() {
    var queueInterval = 10000;
    var num = 0;

    var accessQueue = function() {
      console.log(num++);
      if (this.state.queue.length) {
        this.markTodoDone();
      } else {
        clearInterval(interval);
      }
    }.bind(this);

    var interval = setInterval(accessQueue, queueInterval);
  },

  render: function() {

    var queue = this.state.queue.map(function(item, index) {
      return (<li key={index} className={item.done ? 'popped' : 'queued'}
              onClick={this.markTodoDone}>{item.value}</li>);
    }.bind(this));

    return (
      <div className='Queue'>
        <div className='col-xl-9 col-xs-offset-3'>
          <h1>My Queue List</h1>
          <TimerExample start={Date.now()} />
          <button className="btn btn-warning" onClick={this.startQueue}>Start Marking Queue</button>
          <ul>
            {queue}
          </ul>
          <div className='input-group'>
            <input type='text' value={this.state.inputValue} onChange={this.handleChange} className='input-item' placeholder='What do you need to do?'/>
            <button className='btn btn-default' onClick={this.addTodo}>Add Todo</button>
          </div>
        </div>
      </div>
    );
  }
});

export default Queue;


  var TimerExample = React.createClass({

  getInitialState: function(){

    // This is called before our render function. The object that is
    // returned is assigned to this.state, so we can use it later.

    return { elapsed: 0 };
  },

  componentDidMount: function(){

    // componentDidMount is called by react when the component
    // has been rendered on the page. We can set the interval here:

    this.timer = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function(){

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  },

  tick: function(){

    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered

    this.setState({elapsed: new Date() - this.props.start});
  },

  render: function() {

    var elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x):
    var seconds = (elapsed / 10).toFixed(0);

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable.

    return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
  }
});
