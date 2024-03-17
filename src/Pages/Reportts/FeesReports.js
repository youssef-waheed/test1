import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const FeesReports = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState("");

  useEffect(() => {
    FetchFeesReports();
  }, [ofYear]);

  const FetchFeesReports = async () => {
    const queryString = `?ofYear=${ofYear}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/reports/feesReportMales${queryString}`
      );
      console.log(response);
      setStudents(response.data.data.students || []);
    } catch (error) {
      console.log(error);
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    console.log("====================================");
    console.log(selectedYear);
    setOfYear(selectedYear, () => FetchFeesReports());
    console.log("===================================="); // Update the ofYear state with the selected value
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
        <h1>اعداد الطلاب لجامعة حلوان</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم القومي</th>
              <th>الكلية</th>
              <th>السكن </th>
              <th>العام الاكاديمي </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) &&
              students.map((Fee, index) => (
                <tr key={index}>
                  <td>{Fee.studentName}</td>
                  <td>{Fee.nationalID}</td>
                  <td>{Fee.College}</td>
                  <td>{Fee.HousingType}</td>
                  <td>{Fee.year}</td>
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

export default FeesReports;
