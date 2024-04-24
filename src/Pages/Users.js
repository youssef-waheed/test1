import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
const Users = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/getAdmins`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
          <div className="select">
            <p className="academicyear">العام الاكديمي</p>
            <Form.Select
              size="sm"
              className="selectmenu"
              // onChange={handleYearChange}
              // value={ofYear}
            >
              <option>اختر العام الاكديمي</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
              <option>2023-2024</option>
            </Form.Select>
          </div>
          <div className="select1">
            <p style={{ fontWeight: "bold", width: "30px" }}>نوع الغياب</p>
            <Form.Select
              style={{ width: "150px" }}
              size="sm"
              className="Type"
              m-5
              // onChange={handleApsenceKind}
              // value={selectedAbsence}
            >
              <option>اختر نوع الغياب...</option>
              {/* {apsenceKinds.map((apsence, index) => (
                <option key={index} value={apsence}>
                  {apsence}
                </option>
              ))} */}
            </Form.Select>
          </div>
          <div className="penalty-date">
            <p style={{ fontWeight: "bold" }}> من تاريخ</p>
            <input
              type="date"
              // onChange={handleApsenceDate}
              // value={ApsenceDate}
            />
          </div>
          <div className="cancellation-date">
            <p style={{ fontWeight: "bold" }}> الى تاريخ</p>
            <input
              type="date"
              // onChange={handleCancelationDate}
              // value={cancellationDate}
            />
          </div>
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>كود الطالب</th>
                <th>نوع الغياب</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {/* {Apsence.map((student, index) => (
            <tr key={index}>
              <td>{student.studentName}</td>
              <td>{student.StudentId}</td>
              <td>{student.TypeOfAbsence}</td>
              <td>{student.notes}</td>
            </tr>
          ))} */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
