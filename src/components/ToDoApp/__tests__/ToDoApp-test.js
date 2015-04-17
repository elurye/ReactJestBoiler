jest.dontMock('../ToDoApp');
jest.dontMock('../ToDoItem');

describe('ToDoApp', function() {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ToDoApp = require('../ToDoApp');
  var Component = TestUtils.renderIntoDocument(React.createElement(ToDoApp));

  var state = {
    todos: [
      { value: 'Be awesome', done: false },
      { value: 'Learn React', done: true },
      { value: 'Use JSX in my CodePens', done: true }
    ]
  };

  it('sets class name and state info', function() {
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'ToDoApp').getDOMNode();
    expect(element).toBeDefined();
    expect(element.className).toBe('ToDoApp');
    expect(Component.state).toEqual(state);
  });

  it('adds item to list when called', function() {
    Component.state.inputValue = "Test Input";

    var todoItem = {
      value: Component.state.inputValue,
      done: false
    };
    state.todos.push(todoItem);

    //Call the actual method to test
    Component.addTodo(todoItem);

    expect(Component.state.todos).toEqual(state.todos);
  });

  it('marks toDoItem done', function() {
    expect(Component.state.todos[0].done).toBe(false);
    Component.markTodoDone(0);
    expect(Component.state.todos[0].done).toBe(true);
  });
});
