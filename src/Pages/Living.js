import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Living = () => {
  return (
    <div>
      <div className="StudentName">
        {" "}
        <p style={{ fontWeight: "bold" }}>الاسم: عمر أشرف إسماعيل</p>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>المبني</th>
            <th>الفرقة</th>
            <th>تاريخ السكن</th>
            <th>
              {" "}
              <Button style={{ backgroundColor: "green" }}>إضافة</Button>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
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

export default Living;
