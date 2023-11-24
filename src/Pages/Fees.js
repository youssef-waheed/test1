import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const Fees = () => {
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
              <p>نوع الدفع</p>
              <Form.Select size="sm" className="Type" m-5>
                {" "}
                الجزاءات
                <option>شهري </option>
                <option>سنوي </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>عن شهر </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option>أكتوبر </option>
              </Form.Select>
              <Form.Select size="sm" className="Type">
                {" "}
                <option>2023 </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>رقم قيمة السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>تاريخ السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p> المبلغ </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p> السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> يسدد الطالب </option>
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
            <th>الرسوم</th>
            <th>عن شهر</th>
            <th>المبلغ </th>
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

export default Fees;
