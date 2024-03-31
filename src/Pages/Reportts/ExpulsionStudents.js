import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ExpulsionStudents = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    fetchExplusionStudents();
  }, [ofYear]);

  const fetchExplusionStudents = async () => {
    const queryString = ofYear ? `?ofYear=${ofYear}` : "";
    try {
      const response = await axios.get(
        `http://localhost:5000/reports/expulsionStudentsMale${queryString}`
      );
      console.log(response);
      const { data } = response.data;
      setStudents(data.student || []); // Ensure students is an array
      setStudentCount(data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleYearChange}
            value={ofYear} // Attach onChange event handler
          >
            <option>اختر العام الاكديمي</option>
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </Form.Select>
        </div>
        <div className="names"></div>
      </div>
      <div className="coll">
        <h1>عدد الطلاب: {studentCount}</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم القومي</th>
              <th>الكلية</th>
              <th>السكن</th>
              <th>العام الاكاديمي</th>
            </tr>
          </thead>
          <tbody>
            {students?.length > 0 ? (
              students.map((Fee, index) => (
                <tr key={index}>
                  <td>{Fee.studentName}</td>
                  <td>{Fee.nationalID}</td>
                  <td>{Fee.College}</td>
                  <td>{Fee.HousingType}</td>
                  <td>{Fee.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="warning">
                    <Alert
                      variant="danger"
                      style={{
                        textAlign: "center",
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      لا يوجد بيانات لهذا الطالب/طالبة
                    </Alert>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ExpulsionStudents;
