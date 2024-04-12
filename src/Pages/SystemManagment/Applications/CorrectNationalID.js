import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const CorrectNationalID = ({ nationalID }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [updateID, setUpdateID] = useState("");

  useEffect(() => {
    fetchStudents(); // Fetch all students initially
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/basicData/getBasicDataMales`
      );
      setStudents(response.data.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudentData(student); // Set the selected student data
    setUpdateID(student.nationalID); // Set the current national ID in the input field
  };

  const handleInputChange = (e) => {
    setUpdateID(e.target.value); // Update the value of the input field
  };

  const updateNationalID = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/changeInfo/${selectedStudentData.nationalID}`, // Use student's nationalID for the endpoint
        {
          newNationalID: updateID, // Update the national ID with the input field value
        }
      );
      console.log("Update response:", response.data);

      // Update the student in the local state
      const updatedStudents = students.map((student) => {
        if (student.nationalID === selectedStudentData.nationalID) {
          return {
            ...student,
            nationalID: updateID, // Update the national ID
          };
        }
        return student;
      });
      setStudents(updatedStudents);

      // Reset the input field after successful update
      setUpdateID("");
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div
          className="students-list-container"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <ul>
            {students.slice(0, 10).map((student, index) => (
              <li key={index}>
                <button
                  className="button"
                  onClick={() => handleStudentClick(student)}
                >
                  {student.studentName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="coll">
        {selectedStudentData && (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>الرقم القومى</th>
                  <th>الكلية</th>
                  <th>رقم شئون الطلاب</th>
                  <th>محل الإقامة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedStudentData.studentName}</td>
                  <td>{selectedStudentData.nationalID}</td>
                  <td>{selectedStudentData.College}</td>
                  <td>{selectedStudentData.studentCode}</td>
                  <td>{selectedStudentData.residence}</td>
                  {/* Add other fields as needed */}
                </tr>
              </tbody>
            </Table>
            <Form>
              <Form.Group controlId="newNationalID">
                <Form.Label>الرقم القومي الجديد</Form.Label>
                <Form.Control
                  type="text"
                  name="newNationalID"
                  value={updateID}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <button
                type="button"
                onClick={updateNationalID}
                style={{ backgroundColor: "blue" }}
              >
                تحديث الرقم القومي
              </button>
            </Form>
          </>
        )}
        {!selectedStudentData && (
          <div className="warning">
            <Alert
              variant="danger"
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              لم يتم اختيار طالب بعد
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectNationalID;
