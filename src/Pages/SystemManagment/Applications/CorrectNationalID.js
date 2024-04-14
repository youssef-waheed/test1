import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const CorrectNationalID = ({ nationalID }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [updateID, setUpdateID] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents(); 
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/basicData/getBasicDataMales`
      );
      setStudents(response.data.data.students);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch student data");
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudentData(student);
    setUpdateID(student.nationalID);
  };

  const handleInputChange = (e) => {
    setUpdateID(e.target.value);
  };

  const updateNationalID = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/changeInfo/${selectedStudentData.nationalID}`,
        {
          ofYear: selectedStudentData.ofYear,
          newNationalID: updateID,
        }
      );
  
      const updatedStudent = response.data.data.changedData;
  
      // Update the student in the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.nationalID === selectedStudentData.nationalID
            ? { ...student, nationalID: updatedStudent.nationalID }
            : student
        )
      );
  
      // Reset the input field after successful update
      setUpdateID("");
      setSelectedStudentData(null);
      setError(null);
    } catch (error) {
      console.log("Update error:", error);
      setError("Failed to update national ID");
    }
  };
  

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="students-list-container" style={{ maxHeight: "200px", overflowY: "auto" }}>
          <ul>
            {students.slice(0, 10).map((student, index) => (
              <li key={index}>
                <button className="button" onClick={() => handleStudentClick(student)}>
                  {student.studentName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="coll">
        {selectedStudentData ? (
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
                </tr>
              </tbody>
            </Table>
            <Form>
              <Form.Group controlId="newNationalID">
                <Form.Label>الرقم القومي الجديد</Form.Label>
                <Form.Control type="text" name="newNationalID" value={updateID} onChange={handleInputChange} />
              </Form.Group>
              <button type="button" onClick={updateNationalID} style={{ backgroundColor: "blue" }}>
                تحديث الرقم القومي
              </button>
            </Form>
          </>
        ) : (
          <div className="warning">
            <Alert variant="danger" style={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}>
              لم يتم اختيار طالب بعد
            </Alert>
          </div>
        )}
        {error && (
          <div className="error">
            <Alert variant="danger" style={{ textAlign: "center", fontSize: "18px" }}>
              {error}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectNationalID;