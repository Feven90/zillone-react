import React from 'react';
import PropTypes from 'prop-types';
import './MyNavbar.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class MyNavbar extends React.Component {
  static PropTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  // defined variable you will see in dom
  render() {
    // const { isAuthed } = this.props.isAuthed;
    const { isAuthed, logoutClickEvent } = this.props;
    return (
      <div className="my-navbar">
         <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Zillone</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                { isAuthed ? <NavLink onClick={logoutClickEvent}>Logout</NavLink> : ''}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
