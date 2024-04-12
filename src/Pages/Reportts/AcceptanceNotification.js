import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
const AcceptanceNotification = () => {
  const [students, setStudents] = useState([]);
  const [printAcceptanceNotification, setPrintAcceptanceNotification] =
    useState([]);
  const { acceptanceNotif, setAcceptanceNotif } = useState({
    nationalIds: "",
    ofYear: "",
  });

  useEffect(() => {
    fetchAcceptanceNotification();
  });
  const fetchAcceptanceNotification = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/AcceptanceNotification`,
        {
          nationalIds: acceptanceNotif.nationalIds,
          ofYear: acceptanceNotif.ofYear,
        }
      );
      setAcceptanceNotif({
        nationalIds: "",
        ofYear: "",
      });
      fetchAcceptanceNotification();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
          { nationalID: [id] }
        );
        selectedStudentsData.push(...response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    setPrintAcceptanceNotification(selectedStudentsData);
  };
  return (
    <div>
      {" "}
      <div className="two-column-wrapper">
        <div className="col">
          {students.map((student, index) => (
            <ul key={index}>
              <Form.Check
                type="checkbox"
                id={`student-${index}`}
                label={student.studentName}
                onChange={() => handleStudentCheckboxChange(index)}
              />
            </ul>
          ))}
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>امر التسكين</th>
                {/* <th>الكلية</th>
            <th>المبنى </th> */}
              </tr>
            </thead>
            <tbody>
              {printAcceptanceNotification.map((list, index) => (
                <tr key={index}>
                  <td> {list} </td>
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
    </div>
  );
};

export default AcceptanceNotification;
