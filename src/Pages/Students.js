import React from "react";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

const Students = () => {
  return (
    <div>
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
              لا يوجد بيانات، الطالب غير مسجل بالسكن
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default Students;
