import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../../helper/storage";
const auth = getAuthUser();

const CorrectNationalID = ({ nationalID }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [updateCode, setUpdateCode] = useState("");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/basicData/getBasicDataMales`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const filteredStudents = response.data.data.students.filter(
        (student) => student.isHoused === true
      );
      setStudents(filteredStudents);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch student data");
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudentData(student);
    setUpdateCode(student.studentCode);
  };

  const handleInputChange = (e) => {
    setUpdateCode(e.target.value);
  };
  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "update",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createLogs = async () => {
    try {
      const logs = await axios.post("http://localhost:5000/logs/createLogs", {
        adminID: auth.log.adminID,
        adminUserName: auth.log.adminUserName,
        action: "تعديل الاسم  ",
        objectName: `للطالب ${students.studentName},برقم الطالب ${students.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateNationalID = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/changeInfo/code/${selectedStudentData.nationalID}`,
        {
          ofYear: selectedStudentData.ofYear,
          studentCode: updateCode,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedStudent = response.data.data.changedData;

      // Update the student in the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentCode === selectedStudentData.studentCode
            ? { ...student, studentCode: updatedStudent.studentCode }
            : student
        )
      );

      // Reset the input field after successful update
      createLogs();
      incremented();
      setUpdateCode("");
      setSelectedStudentData(null);
      setError(null);
    } catch (error) {
      console.log("Update error:", error);
      setError("Failed to update Code");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nationalID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div
          className="students-list-container"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="البحث"
              onChange={handleSearch}
            />
          </Form.Group>
          <ul>
            {filteredStudents.slice(0, 10).map((student, index) => (
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
                <Form.Label>الكود الصحيح</Form.Label>
                <Form.Control
                  type="text"
                  name="newNationalID"
                  value={updateCode}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {auth &&
                (auth.athurity === "الكل" || auth.athurity === "تعديل") && (
                  <button
                    type="button"
                    onClick={updateNationalID}
                    style={{ backgroundColor: "blue" }}
                  >
                    تحديث الكود
                  </button>
                )}
            </Form>
          </>
        ) : (
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
        {error && (
          <div className="error">
            <Alert
              variant="danger"
              style={{ textAlign: "center", fontSize: "18px" }}
            >
              {error}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectNationalID;
