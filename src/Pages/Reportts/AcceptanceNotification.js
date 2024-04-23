import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const AcceptanceNotification = () => {
  const [students, setStudents] = useState([]);
  const [ofYear, setOfYear] = useState("");
  const [printNotif, setPrintNotif] = useState({
    ofYear: "",
    nationalIds: "",
    year: "",
    gradeOfLastYear: "",
    HousingType: "",
  });

  useEffect(() => {
    if (ofYear !== "") {
      fetchAcceptanceNotification();
    }
  }, [ofYear]);

  const fetchAcceptanceNotification = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/AcceptanceNotification`,
        {
          ofYear: ofYear,
        }
      );
      setStudents(response.data.responseArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  };
  const handleStudentCheckboxChange = async (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].checked = !updatedStudents[index].checked;
    setStudents(updatedStudents);

    const selectedStudents = updatedStudents.filter(
      (student) => student.checked
    );

    const selectedStudentNationalIDs = selectedStudents.map(
      (student) => student.nationalID
    );

    const selectedStudentsData = [];

    for (let id of selectedStudentNationalIDs) {
      try {
        const response = await axios.post(
          `http://localhost:5000/AcceptanceNotification/print`,
          {
            ofYear: printNotif.ofYear,
            nationalIds: printNotif.nationalIds,
            year: printNotif.year,
            gradeOfLastYear: printNotif.gradeOfLastYear,
            HousingType: printNotif.HousingType,
          }
        );
        setPrintNotif({
          ofYear: "",
          nationalIds: "",
          year: "",
          gradeOfLastYear: "",
          HousingType: "",
        });
      } catch (error) {
        console.log(error);
      }
    }

    // setPrintResidenceOrder(selectedStudentsData);
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
              onChange={handleYearChange}
              value={ofYear}
            >
              <option>اختر العام الاكديمي</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
              <option>2023-2024</option>
            </Form.Select>
          </div>
          {students &&
            students.length > 0 &&
            students.map((student, index) => (
              <ul key={index}>
                <Form.Check
                  type="checkbox"
                  id={`student-${index}`}
                  label={student.data.studentName}
                  onChange={() => handleStudentCheckboxChange(index)}
                />
              </ul>
            ))}
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>أسم الطالب</th>
              <th>الكلية</th>
              <th>كود الطالب </th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.length > 0 &&
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.data.studentName}</td>
                  <td>{student.data.College}</td>
                  <td>{student.data.studentCode}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="coll">
          {students && students.length === 0 && (
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

export default AcceptanceNotification;
