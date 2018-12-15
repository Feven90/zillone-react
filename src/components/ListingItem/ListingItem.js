import React from 'react';
import './ListingItem.scss';
import listingShape from '../../helpers/propz/lsitingShape';
import formatPrice from '../../helpers/formatPrice';

class ListingItem extends React.Component {
  static propTypes = {
    listing: listingShape,
  }

  render() {
    const { listing } = this.props;
    return (
      <li className="listing-item text-center">
        <span className="col-7">{listing.address}</span>
        <span className="col-3">{formatPrice(listing.price)}</span>
      </li>
    );
  }
}

export default ListingItem;
