import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const ResidenceOrder = () => {
  const [students, setStudents] = useState([]);
  const [ofYear, setOfYear] = useState("");

  useEffect(() => {
    fetchResidenceOrder();
    fetchPrintResidenceORder();
  }, [ofYear]);

  const fetchResidenceOrder = async () => {
    const queryString = `?ofYear=${ofYear}`;
    if (ofYear) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/residenceOrderMale${queryString}`
        );
        setStudents(response.data.data.students);

        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/residenceOrderMale`
        );
        setStudents(response.data.data.students);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchPrintResidenceORder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/reports/printResidenceOrder?ofYear=${ofYear}`,
        { nationalID: "11111111111111" }
      );
      console.log(response);
    } catch (error) {
      console.log("====================================");
      console.log(ofYear);
      console.log("====================================");
      console.log(error);
    }
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    setOfYear(selectedYear, () => fetchResidenceOrder());
  }
  // const handleStudentCheckboxChange = async (index) => {
  //   const updatedStudents = [...students];
  //   updatedStudents[index].checked = !updatedStudents[index].checked;
  //   setStudents(updatedStudents);

  //   if (updatedStudents[index].checked) {
  //     const nationalID = updatedStudents[index].nationalID;

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/reports/printResidenceOrder?ofYear=2023-2024`,
  //         { nationalID: [nationalID] }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <div>
      {" "}
      <div className="two-column-wrapper">
        <div className="col">
          <div className="select">
            <p className="academicyear">العام الاكديمي</p>
            <Form.Select
              size="sm"
              className="selectmenu"
              onChange={handleYearChange}
              value={ofYear}
            >
              <option>اختر العام الاكديمي</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
              <option>2023-2024</option>
            </Form.Select>
          </div>
          {students.map((student, index) => (
            <ul key={index}>
              <Form.Check
                type="checkbox"
                id={`student-${index}`}
                label={student.studentName}
                // onChange={() => handleStudentCheckboxChange(index)}
              />
            </ul>
          ))}
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم الطالب </th>
                <th>الكلية</th>
                <th>المبنى </th>
              </tr>
            </thead>
            <tbody></tbody>
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
    </div>
  );
};

export default ResidenceOrder;
