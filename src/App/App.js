import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Listings from '../components/Listings/Listings';
import MyNavbar from '../components/MyNavbar/MyNavbar';

import listingRequests from '../helpers/data/listingRequests';
import ListingForm from '../components/ListingForm/ListingForm';
import Building from '../components/Building/Building';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
    state = {
      authed: false,
      listings: [],
    };

    componentDidMount() {
      connection();
      listingRequests.getRequest()
        .then((listings) => {
          this.setState({ listings });
        })
        .catch(err => console.error('error with listingh GET', err));

      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authed: true,
          });
        } else {
          this.setState({
            authed: false,
          });
        }
      });
    }

    componentWillUnmount() {
      this.removeListener();
    }

isAuthenticated = () => {
  this.setState({ authed: true });
}

deleteOne = (listingId) => {
  listingRequests.delteListing(listingId)
    .then(() => {
      listingRequests.getRequest()
        .then((listings) => {
          this.setState({ listings });
        });
    })
    .catch(err => console.error('error with delte single', err));
}

render() {
  const logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false });
  };
  if (!this.state.authed) {
    return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
    );
  }
  // //passing reference not calling it
  return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
       <div className="row">
       <Listings
       // listings is the key being passed, this is what is being passed as props
          listings={this.state.listings}
          deleteSingleListing={this.deleteOne}
        />
       <Building />
       </div>
       <div>
       <ListingForm />
       </div>
      </div>
  );
}
}

export default App;
