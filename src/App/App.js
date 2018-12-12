import React, { Component } from 'react';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
// import ‘bootstrap/dist/css/bootstrap.min.css’;
import './App.scss';

class App extends Component {

  componentDidMount() {
    connection();
  }
  render() {
    console.log(this);
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }
}

export default App;
