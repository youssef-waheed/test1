import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./UserNav.css";
import Logo from "./HL.jpeg";

const UserNav = () => {
  return (
 <Nav className="Nav">
             <Navbar.Brand href="/" className="custom-logo" >
            <img src={Logo} alt="Logo" className="custom-logo-img" />
          </Navbar.Brand>
            <Nav.Link as={Link} to="/AppDate" className="custom-link">
              مواعيد التقدم للمدن الجامعية
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="custom-link">
              تسجيل الدخول للطلاب
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/InquiryAboutAdmission"
              className="custom-link"
            >
              الاستعلام عن القبول في المدينة الجامعية
            </Nav.Link>
            <Nav.Link as={Link} to="/AppForm" className="custom-link">
              تقديم طلب التحاق للمدن الجامعية
            </Nav.Link>
            <Nav.Link as={Link} to="/Instructions" className="custom-link">
            إرشادات التقدم والإقرارت
            </Nav.Link>
          </Nav>
);
};

export default UserNav;
