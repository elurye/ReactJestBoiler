jest.dontMock('../ToDoApp');
jest.dontMock('../ToDoItem');

describe('ToDoApp', function() {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  it('sets class name', function() {

    var ToDoApp = require('../ToDoApp');
    var Component = TestUtils.renderIntoDocument(React.createElement(ToDoApp));

    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'ToDoApp').getDOMNode();
    expect(element).toBeDefined();
    expect(element.className).toBe('ToDoApp');
  });

});
