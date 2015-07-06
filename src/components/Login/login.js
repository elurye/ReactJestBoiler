'use strict';
var React = require('react');
var classNames = require('classnames');
var testObject = require('./testModule');
require('./Login.less');


module.exports = React.createClass({
  displayName: 'Login Form',

  getInitialState: function() {
    return {
      loginSuccessful: false,
      loginStatusText: ''
    };
  },

  handleLoginSubmit: function(e) {
    e.preventDefault();

    var credentials = {
      username: this.refs.username.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    };

    if (credentials.username != 'error') {
      this.setState({ loginSuccessful: true, loginStatusText: 'Success' });
      testObject.smile('happy');
    } else {
      this.setState({ loginSuccessful: false, loginStatusText: 'Failure' });
      this.refs.password.getDOMNode().value = '';
    }
  },

  render: function () {
    var errorMessage = 'There was an error with your Email and/or Password. Please try again.';
    var isErrorPresent = !this.state.loginSuccessful && this.state.loginStatusText.length !== 0;

    var loginErrorClasses = classNames({
      'is-error-message': isErrorPresent,
      'is-hidden': !isErrorPresent
    });

    var loginStatusClasses = classNames({
      'checkout__login-status': true,
      'is-success-message': !isErrorPresent,
      'is-error-message': isErrorPresent
    });

    var inputTextClasses = classNames({
      'form-input-text': true,
      'error': isErrorPresent
    });

    return (
      <form className="checkout__login">
        <p className={loginErrorClasses} data-bdd="login-error">{errorMessage}</p>
        <div className="form-input-group">
          <label htmlFor="username" className="form-input-label">Email</label>
          <input id="username" name="username" ref="username" type="text" className={inputTextClasses} data-bdd="login-username" />
        </div>
        <div className="form-input-group">
          <label htmlFor="password" className="form-input-label">Password</label>
          <input id="password" name="password" ref="password" type="password" className={inputTextClasses} data-bdd="login-password" />
        </div>
        <button type="submit" className="submit-button" data-bdd="login-submit" onClick={this.handleLoginSubmit}>Sign In</button>
        <p className={loginStatusClasses} data-bdd="login-status" ref="loginStatus">{this.state.loginStatusText}</p>
      </form>
    );
  }
});
