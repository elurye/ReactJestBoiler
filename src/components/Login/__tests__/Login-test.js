jest.dontMock('../Login');
jest.dontMock('classnames');

describe('Login component test', function() {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Login = require('../Login');
  var dom = TestUtils.renderIntoDocument(React.createElement(Login));
  var formElement = TestUtils.findRenderedDOMComponentWithClass(dom, 'checkout__login').getDOMNode();
  var testObject = require('../testModule');

  describe('Login Form Renders', function() {
    it('displays form and input fields', function() {
      var classes = getClasses();
      expect(formElement.getAttribute('class')).toEqual('checkout__login');
      expect(classes.child).toContain('form-input-group');
      expect(classes.child).toContain('submit-button');
      expect(classes.input).toContain('form-input-label');
      expect(classes.input).toContain('form-input-text');
    });
  });

  describe('Login Form the inital state default view', function() {
    it('contains the data', function() {
      var data = dom.getInitialState();
      expect(Object.keys(data).length).toEqual(2);
      expect(data.loginSuccessful).toEqual(false);
      expect(data.loginStatusText).toEqual('');
    });
  });

  describe('Login Form submit function', function() {
    var event = {
      preventDefault: function() {
        return this;
      }
    };

    it('changes state upon login success', function() {

      testObject.smile = jest.genMockFunction().mockImplementation(function(txt) {
          return this;
      });

      var btn = TestUtils.findRenderedDOMComponentWithClass(dom, 'submit-button');

      TestUtils.Simulate.click(btn);

     // dom.handleLoginSubmit(event);

      expect(dom.state.loginSuccessful).toEqual(true);
      expect(dom.state.loginStatusText).toEqual('Success');
      expect(testObject.smile).toBeCalledWith('happy');
    });

    it('changes state upon login failure', function() {

      dom.refs.username.getDOMNode().value = 'error';
      dom.handleLoginSubmit(event);

      expect(dom.state.loginSuccessful).toEqual(false);
      expect(dom.state.loginStatusText).toEqual('Failure');

      var classes = getClasses();
      expect(classes.input).toContain('form-input-text error');
      expect(React.findDOMNode(dom.refs.password).value).toEqual('');
    });
  });

  function getClasses() {
    var formChildClasses = [];
    var formInputClasses = [];
    Array.prototype.forEach.call(formElement.children, function(formElement) {
      var formClass = formElement.getAttribute('class');
      formChildClasses.push(formClass);
      if (formClass === 'form-input-group') {
        Array.prototype.forEach.call(formElement.children, function(inputElement) {
          var inputClass = inputElement.getAttribute('class');
          formInputClasses.push(inputClass);
        });
      }
    });

    return {
      child: formChildClasses,
      input: formInputClasses
    };
  }
});
