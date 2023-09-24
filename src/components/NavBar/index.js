import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBoostrap from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Logo from "../Photos/logoPIC.png";
import Image from "react-bootstrap/Image";

const Navbar = ({ handleLogout, loggedInUser}) => {

  const location = useLocation();

  const isRouteActive = (route) => {
    return location.pathname === route;
  };

  const renderHome = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Join Us in the Heart of New Orleans: Empower Your Finances, Crescent City
      Style!
    </Tooltip>
  );

  const renderLogin = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Enter the Big Easy!
    </Tooltip>
  );

  // const renderCreate = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Unlock Your Financial Potential with Us: Open Your Path to Prosperity!
  //   </Tooltip>
  // );

  const renderWithdrawl = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Unlock Your Funds, Embrace Local Flavor and Style"
    </Tooltip>
  );

  const renderDeposit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      "Secure Your Dreams, Deposit for Tomorrow"
    </Tooltip>
  );
  const renderBalance = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Balance!
    </Tooltip>
  );

  // const renderAlldata = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     "Data-Driven Banking in the Big Easy: Uncover Opportunities, Make Informed
  //     Decisions!"
  //   </Tooltip>
  // );

  return (
    <div>
      <NavbarBoostrap bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Image src={Logo} fluid style={{ height: "55px", width: "55px" }} />
     
          <NavbarBoostrap.Toggle aria-controls="navbarScroll" />
          <NavbarBoostrap.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", font: "white" }}
              navbarScroll
            >
              {/* Home */}
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderHome}
              >
                <Link
                  className={`nav-link ${isRouteActive("/") ? "" : "active"}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </OverlayTrigger>


              {/* Login page */}
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderLogin}
                >
                  <Link
                    className={`nav-link ${
                      isRouteActive("/login") ? "" : "active"
                    }`}
                    aria-current="page"
                    to="/login"
                  >
                    Login/Logout
                  </Link>
                </OverlayTrigger>
         

              {/* Create account page
           
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderCreate}
                >
                  <Link
                    className={`nav-link ${
                      isRouteActive("/create-account") ? "" : "active"
                    }`}
                    aria-current="page"
                    to="/create-account"
                  >
                    Create Account
                  </Link>
                </OverlayTrigger> */}
           
        
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderBalance}
                >
                  <Link
                    className={`nav-link ${
                      isRouteActive("/balance") ? "" : "active"
                    }`}
                    aria-current="page"
                    to="/balance"
                  >
                    Balance
                  </Link>
                </OverlayTrigger>
         
              {/* Withdrawl page */}
        
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderWithdrawl}
                >
                  <Link
                    className={`nav-link ${
                      isRouteActive("/withdraw") ? "" : "active"
                    }`}
                    aria-current="page"
                    to="/withdraw"
                  >
                    Withdraw
                  </Link>
                </OverlayTrigger>
           

              {/* Deposit Page */}
            
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderDeposit}
                >
                  <Link
                    className={`nav-link ${
                      isRouteActive("/deposit") ? "" : "active"
                    }`}
                    aria-current="page"
                    to="/deposit"
                  >
                    Deposit
                  </Link>
                </OverlayTrigger>
            


              {/* Logout
          
                <Link
                  className={`nav-link ${isRouteActive("/") ? "" : "active"}`}
                  aria-current="page"
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none", // Remove underline
                    color: "#fff", // Text color
                    fontWeight: "bold", // Text weight
                    marginRight: "20px", // Adjust spacing
                  }}
                >
                  Logout
                </Link>
               */}
            </Nav>
          </NavbarBoostrap.Collapse>
        </Container>
      </NavbarBoostrap>
    </div>
  );
};

export default Navbar;
