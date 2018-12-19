import React from 'react';
import propTypes from 'prop-types';
import './ListingForm.scss';
import authRequests from '../../helpers/data/authRequests';
import listingRequests from '../../helpers/data/listingRequests';

const defaultListing = {
  address: '',
  squareFootage: 0,
  price: 0,
  numBeds: 0,
  numBaths: 0,
  heating: '',
  cooling: '',
  imageUrl: '',
  uid: '',
};

class ListingForm extends React.Component {
  static propTypes = {
    onSubmit: propTypes.func,
    isEditing: propTypes.bool,
    editId: propTypes.string,
  }

  state = {
    newListing: defaultListing,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newListing };
    // spread operator, making a copy of state, just for caution if we
    // modify here we don't want it to be modified in state too.
    tempListing[name] = e.target.value;
    this.setState({ newListing: tempListing });
  }

  addressChange = (e) => {
    this.formFieldStringState('address', e);
  }

  formSubmit = (e) => {
    e.preventDefault();
    // const {newListing} = this.state;
    const { onSubmit } = this.props;
    const myListing = { ...this.state.newListing };
    myListing.uid = authRequests.getCurrentUid();
    onSubmit(myListing);
    this.setState({ newListing: defaultListing });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      listingRequests.getSingleListing(editId)
        .then((listing) => {
          this.setState({ newListing: listing.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newListing } = this.state;
    return (
      <div className="listing-form col">
        <h2>Add New Listing:</h2>
      <form onSubmit={this.formSubmit}>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            aria-describedby="addressHelp"
            placeholder="234 Edge Moor Dr, 21783"
            value={newListing.address}
            onChange={this.addressChange}
            />
        </div>
        <button className="btn btn-danger">Save Listing</button>
      </form>
  </div>
    );
  }
}

export default ListingForm;
