import React from 'react';
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
