import React from 'react';
import './ListingForm.scss';

class ListingForm extends React.Component {
  render() {
    return (
      <div className="listing-form col">
        <h2>Add New Listing:</h2>
      <form>
      <div class="form-group">
        <label for="address">Address:</label>
          <input
            type="text"
            class="form-control"
            id="address"
            aria-describedby="addressHelp"
            placeholder="234 Edge Moor Dr, 21783"
            />
        </div>
        <button className="btn btn-danger">Save Listing</button>
      </form>
  </div>
    );
  }
}

export default ListingForm;
