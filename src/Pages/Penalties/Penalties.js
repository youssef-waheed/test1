import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import "./Penalties.css";
const Penalties = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleDiv}
          className="button"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          إضافة
        </button>
        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <p>الإسم: عمر أشرف إسماعيل</p>{" "}
            <div className="select1">
              <p>نوع الجزاء</p>
              <Form.Select size="sm" className="Type" m-5>
                {" "}
                الجزاءات
                <option>إنذار بالحرمان</option>
                <option>حجب النتيجة الدراسية لعدم سداد المصروفات</option>
                <option>تجاوز مدة التصريح</option>
                <option> تجاوز مدة التصريح </option>
                <option> جزاء اداري </option>
                <option> مجلس تأديب </option>
                <option> لفت نظر </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>السبب </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option>السبب </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>التاريخ </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <button style={{ backgroundColor: "green", color: "white" }}>
              حفظ
            </button>
          </div>
        )}
            
      </div>{" "}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>النوع</th>
            <th>السبب</th>
            <th>التاريخ </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="warning">
        <>
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              This is a {variant} alert—check it out!
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default Penalties;
