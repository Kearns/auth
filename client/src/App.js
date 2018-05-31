import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";

class App extends Component {
  render() {
    const {
      fetching,
      user,
      onLogin,
      onInput,
      error,
      username,
      password
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>

          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={e => onInput("username", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => onInput("password", e.target.value)}
          />
          {fetching ? (
            <button disabled>Logging In...</button>
          ) : (
            <button onClick={() => onLogin({ username, password })}>
              Login
            </button>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    user: state.user,
    error: state.error,
    username: state.username,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ({ username, password }) =>
      dispatch({ type: "API_CALL_REQUEST", username, password }),
    onInput: (name, value) =>
      dispatch({ type: "UPDATE_INPUT_VALUE", name, value })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
