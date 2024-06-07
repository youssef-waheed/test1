import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
const SocialResearchReportFemale = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "قدامى", checked: false },
        { label: "جدد", checked: false },
        { label: "وفاة الوالد", checked: false },
        { label: "وفاة الوالدين", checked: false },
      ]
    );
  });
  var oldStudent;
  var newStudent;
  var deathFather;
  var deathParents;
  useEffect(() => {
    fetchSocialResearchRep();
  }, [ofYear]);

  const fetchSocialResearchRep = async () => {
    const queryString = `?ofYear=${ofYear}&oldStudent=${oldStudent}&newStudent=${newStudent}&deathFather=${deathFather}&deathParents=${deathParents}`;
    if (oldStudent || newStudent || deathFather || deathParents || ofYear) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/socialResearchcasesReportfemale${queryString}`
        );
        const responseData = response.data.data.users;
        setStudents(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/socialResearchcasesReportfemale`
        );
        const responseData = response.data.data.users;
        setStudents(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRadioButtonChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
      idx === index
        ? { ...checkbox, checked: true }
        : { ...checkbox, checked: false }
    );
    setCheckboxes(updatedCheckboxes);

    const selectedLabel = updatedCheckboxes[index].label;

    oldStudent = selectedLabel === "قدامى";
    newStudent = selectedLabel === "جدد";
    deathFather = selectedLabel === "وفاة الوالد";
    deathParents = selectedLabel === "وفاة الوالدين";

    fetchSocialResearchRep();
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }

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
              value={ofYear} // Attach onChange event handler
            >
              <option>اختر العام الاكديمي</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
              <option>2023-2024</option>
            </Form.Select>
          </div>
          {checkboxes.map((checkbox, index) => (
            <div key={index} className="checkbox-row">
              <label className="radio-label">
                <input
                  type="radio"
                  name="filter"
                  checked={checkbox.checked}
                  onChange={() => handleRadioButtonChange(index)}
                  className="radio-button"
                />
                {checkbox.label}
              </label>
            </div>
          ))}

          {/* Penalty Date */}

          {/* Cancellation Date */}
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>الكلية </th>
                <th>الرقم القومي </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.College}</td>
                  <td>{student.nationalID}</td>
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

export default SocialResearchReportFemale;
