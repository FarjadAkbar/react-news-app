/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  
  console.log(isLoggedIn);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {
            isLoggedIn &&
              <Nav.Link as={Link} to="/preference">Preference</Nav.Link>
            }
          </Nav>
          <Nav>
          {isLoggedIn ? (
              <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
