import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  
} from "reactstrap";
import CartSummary from "../cart/CartSummary";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" expand="md"  light>
          <NavbarBrand href="/">Restaurant Devops</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse  navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"> GitHub    </NavLink>
              </NavItem>
              <CartSummary />   
            </Nav>     
                  
          </Collapse>      
        </Navbar>
      </div>
    );
  }
}
