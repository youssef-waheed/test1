import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./UserNav.css";
import Logo from "./HL.jpeg";

const UserNav = () => {
  return (
   
        <Navbar expand="lg" className="custom-navbar">
          <Container>
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Navbar.Brand as={Link} to="/" className="custom-logo">
              <img src={Logo} alt="Logo" className="custom-logo-img" />
              
            </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/AppDate" className="custom-link">
                  مواعيد التقدم للمدن الجامعية
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="custom-link">
                  تسجيل الدخول للطلاب
                </Nav.Link>
                <Nav.Link as={Link} to="/InquiryAboutAdmission" className="custom-link">
                  الاستعلام عن القبول في المدينة الجامعية
                </Nav.Link>
                <Nav.Link as={Link} to="/AppForm" className="custom-link">
                  تقديم طلب التحاق للمدن الجامعية
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    
  );
};

export default UserNav;
