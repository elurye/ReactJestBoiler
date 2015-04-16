/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import './ToDoApp.less';
import React, { Component } from 'react/addons';
import ToDo from './ToDoItem';


var ToDoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        { value: 'Be awesome', done: false },
        { value: 'Learn React', done: true },
        { value: 'Use JSX in my CodePens', done: true }
      ]
    };
  },
  addTodo: function() {
    var todos = this.state.todos;

    todos.push({
      value: this.state.inputValue,
      done: false
    });

    this.setState({
      todos: todos,
      inputValue: ''
    });

    // Return false for form
    return false;
  },
  handleChange: function(e) {
    this.setState({
      inputValue: e.target.value
    });
  },
  removeTodo: function(index) {
    this.state.todos.splice(index, 1);

    this.setState({
      todos: this.state.todos
    });
  },
  markTodoDone: function(index) {
    var todos = this.state.todos;
    var todo = this.state.todos[index];
    todos.splice(index, 1);
    todo.done = !todo.done;

    if (todo.done) {
      todos.push(todo);
    } else {
      todos.unshift(todo);
    }

    this.setState({
      todos: todos
    });
  },
  render: function() {

    var todos = this.state.todos.map(function(todo, index) {
      return (
        <ToDo
          key={index}
          value={todo.value}
          done={todo.done}
          onClickClose={this.removeTodo.bind(this, index)}
          onClickDone={this.markTodoDone.bind(this, index)}
          /> );
    }.bind(this));

    return (
      <div className='ToDoApp'>
        <div className='col-xl-9 col-xs-offset-3'>
          <h1>My Todo List</h1>
          {todos}
          <form
            className='form-inline todo-form col-xs-8 col-xs-offset-2'
            role='form'
            onSubmit={this.addTodo}>
            <div className='input-group'>
              <label className='sr-only'></label>
              <input type='text' value={this.state.inputValue} onChange={this.handleChange} className='form-control' placeholder='What do you need to do?'/>
              <span className='input-group-btn'>
                <button className='btn btn-default'>Add Todo</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

export default ToDoApp;
