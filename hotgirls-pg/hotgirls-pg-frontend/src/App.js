import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';
import CreatePostScreen from './pages/CreatePostScreen';

class App extends React.Component {
  state = {
    currentUser: {
      email: '',
      fullName: '',
    },
  };

  componentWillMount() {
    const email = window.localStorage.getItem('email');
    const fullName = window.localStorage.getItem('fullName');

    if (email && fullName) {
      this.setState({
        currentUser: {
          email: email,
          fullName: fullName,
        },
      });
    }
  }

  handleLogoutClick = (event) => {
    // call logout api => clear session storage
    fetch(`http://localhost:3001/users/logout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // clear window local storage
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('fullName');

        // reset currentUser in state
        this.setState({
          currentUser: {
            email: '',
            fullName: '',
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Hotgirls</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.state.currentUser.email ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" >Welcome, {this.state.currentUser.fullName} </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={this.handleLogoutClick}>Log out </a>
                </li>
              </ul>

            ) : (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register" tabIndex="-1" aria-disabled="true">Register </a>
                  </li>
                </ul>
              )}
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              <a className="btn btn-primary" href='/create-post'> + New Post</a>
            </form>
          </div>
        </nav>

        <Router>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/create-post' component={CreatePostScreen} />
        </Router>
      </div>
    );
  }
}

export default App;