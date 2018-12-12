import React, { Component } from 'react';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Listings from '../components/Listings/Listings';

import './App.scss';

class App extends Component {
    // eslint-disable-next-line no-undef
    state = {
      authed: false,
    };

    componentDidMount() {
      connection();
    }

isAuthenticated = () => {
  this.setState({ authed: true });
}

render() {
  if (!this.state.authed) {
    return (
        <div className="App">
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
    );
  }
  // //passing reference not calling it
  console.log(this);
  return (
      <div className="App">
        <Listings />
      </div>
  );
}
}

export default App;
