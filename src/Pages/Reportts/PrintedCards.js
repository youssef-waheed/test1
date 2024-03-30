import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const PrintedCards = () => {
  const [ofYear, setOfYear] = useState("");

  const [students, setStudents] = useState("");
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    fetchPrintedCards();
  }, [ofYear]);

  const fetchPrintedCards = async () => {
    const queryString = ofYear ? `?ofYear=${ofYear}` : "";
    if (ofYear) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/printedMalesCardsReport${queryString}`
        );
        console.log(response);
        const { data } = response.data;
        setStudents(data.student);
        setStudentCount(data.count);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/printedMalesCardsReport`
        );
        console.log(response);
        const { data } = response.data;
        setStudents(data.student);
        setStudentCount(data.count);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    console.log("====================================");
    console.log(selectedYear);
    console.log("====================================");
    fetchPrintedCards(); // Call fetchPrintedCards after setting the state
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
              <th>كود الطالب</th>
              <th>الكلية</th>
              <th>السكن </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) &&
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.nationalID}</td>
                  <td>{student.studentCode}</td>
                  <td>{student.College}</td>
                  <td>{student.HousingType}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {students.length === 0 && (
          <div className="warning">
            <Alert
              variant="danger"
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              لا يوجد بيانات لهذا الطالب/طالبة{" "}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintedCards;
