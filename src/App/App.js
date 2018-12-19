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
      isEditing: false,
      editId: '-1',
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

formSubmitEvent = (newListing) => {
  listingRequests.postRequest(newListing)
    .then(() => {
      listingRequests.getRequest()
        .then((listings) => {
          this.setState({ listings }); // after we submit the form lisings will be updatede
        });
    })
    .catch(err => console.error('error with listing post', err));
}

passListingToEdit = listingId => this.setState({ isEditing: true, editId: listingId });

render() {
  const {
    authed,
    listings,
    isEditing,
    editId,
  } = this.state;
  const logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false });
  };
  if (!authed) {
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
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
       <div className="row">
       <Listings
       // listings is the key being passed, this is what is being passed as props
          listings={listings}
          deleteSingleListing={this.deleteOne}
          passListingToEdit={this.passListingToEdit}
        />
       <Building />
       </div>
       <div>
       <ListingForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
       </div>
      </div>
  );
}
}

export default App;
