import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBarForm from "./SideBarForm";
import "../Style/Bar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SIdeBar = () => {
  return (
    <Container className="container">
      <Row>
        <Col sm={3} className="col">
          <div className="bar">بيانات اساسية</div>
          <div className="select">
            <p className="academicyear">العام الاكديمي</p>
            <Form.Select size="sm" className="selectmenu">
              <option>2025 - 2026</option>
              <option>2024 - 2025</option>
              <option>2023 - 2024</option>
            </Form.Select>
          </div>
          <div className="select">
            <p>الكلية</p>
            <Form.Select size="sm" className="selectmenu">
              <option>حاسبات</option>
              <option>هندسة</option>
              <option>آداب</option>
            </Form.Select>
          </div>
          <div className="form">
            <SideBarForm />
          </div>
          {/* <Col sm={1}></Col> */}
        </Col>
      </Row>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Container>
  );
};
// ASdasdasdasdasd

export default SIdeBar;
