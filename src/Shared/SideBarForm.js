import React from "react";
import Form from "react-bootstrap/Form";
import "../Style/Form.css";
const SideBarForm = () => {
  return (
    <Form className="form">
      {["checkbox", "radio"].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="طلاب الجامعة"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="من خارج الجامعة"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />
        </div>
      ))}
    </Form>
  );
};
// ASdasdasdasdasd

export default SideBarForm;
