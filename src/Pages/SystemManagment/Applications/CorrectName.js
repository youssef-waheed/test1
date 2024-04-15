import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const CorrectNationalID = ({ nationalID }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents(); 
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/basicData/getBasicDataMales`
      );
      const filteredStudents = response.data.data.students.filter(student => student.isHoused === true);
      setStudents(filteredStudents);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch student data");
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudentData(student);
    setUpdateName(student.studentName);
  };

  const handleInputChange = (e) => {
    setUpdateName(e.target.value);
  };

  const updateNationalID = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/changeInfo/name/${selectedStudentData._id}`,
        {
          ofYear: selectedStudentData.ofYear,
          studentName: updateName,
        }
      );
  
      const updatedStudent = response.data.data.changedData;
  
      // Update the student in the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentName === selectedStudentData.studentName
            ? { ...student, studentName: updatedStudent.studentName }
            : student
        )
      );
  
      // Reset the input field after successful update
      setUpdateName("");
      setSelectedStudentData(null);
      setError(null);
    } catch (error) {
      console.log("Update error:", error);
      setError("Failed to update Name");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nationalID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="students-list-container" style={{ maxHeight: "200px", overflowY: "auto" }}>
          <Form.Group controlId="search">
           
            <Form.Control type="text" placeholder="البحث" onChange={handleSearch} />
          </Form.Group>
          <ul>
            {filteredStudents.slice(0, 10).map((student, index) => (
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
                <Form.Label>الاسم الصحيح</Form.Label>
                <Form.Control type="text" name="newNationalID" value={updateName} onChange={handleInputChange} />
              </Form.Group>
              <button type="button" onClick={updateNationalID} style={{ backgroundColor: "blue" }}>
                تحديث الاسم
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
