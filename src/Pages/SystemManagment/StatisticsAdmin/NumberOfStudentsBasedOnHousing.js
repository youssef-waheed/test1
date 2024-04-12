import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const NumberOfStudentsBasedOnHousing = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState(null); // State to hold the fetched data

  useEffect(() => {
    fetchStudentsBasedOnHousing();
  }, [ofYear]);
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "مصرى", checked: false },
        { label: "وافد", checked: false },
        { label: "قدامى", checked: false },
        { label: "جدد", checked: false },
      ]
    );
  });
  var egyptions;
  var expartriates;
  var oldStudent;
  var newStudent;

  const fetchStudentsBasedOnHousing = async () => {
    const queryString = `?ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&oldStudent=${oldStudent}&newStudent=${newStudent}`;
    if (egyptions || expartriates || oldStudent || newStudent || ofYear) {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/allStudents${queryString}`
        );
        console.log(response);
        setStudentsData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/allStudents`
        );
        setStudentsData(response.data.data);
        console.log(response);
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

    egyptions = selectedLabel === "مصرى";
    expartriates = selectedLabel === "وافد";

    oldStudent = selectedLabel === "قدامى";
    newStudent = selectedLabel === "جدد";

    fetchStudentsBasedOnHousing();
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);

    setOfYear(selectedYear, () => fetchStudentsBasedOnHousing());
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
        </div>
        <div className="coll">
          {studentsData && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <td>النوع</td>
                  <th>سكن مميز فردى طلبة</th>
                  <th>عادي</th>
                </tr>
              </thead>
              <tbody>
                {studentsData && (
                  <tr>
                    <td>ساكن</td>
                    <td>{studentsData["سكن مميز فردى طلبة"]?.isHoused}</td>
                    <td>{studentsData["عادى"]?.isHoused}</td>
                  </tr>
                )}
                {studentsData && (
                  <tr>
                    <td>اخلاء</td>
                    <td>{studentsData["سكن مميز فردى طلبة"]?.isEvacuated}</td>
                    <td>{studentsData["عادى"]?.isEvacuated}</td>
                  </tr>
                )}
                {studentsData && (
                  <tr>
                    <td>قيد الانتظار</td>
                    <td>{studentsData["سكن مميز فردى طلبة"]?.pending}</td>
                    <td>{studentsData["عادى"]?.pending}</td>
                  </tr>
                )}
                {studentsData && (
                  <tr>
                    <td>مرفوض</td>
                    <td>{studentsData["سكن مميز فردى طلبة"]?.rejected}</td>
                    <td>{studentsData["عادى"]?.rejected}</td>
                  </tr>
                )}
                {studentsData && (
                  <tr>
                    <td>في انتظار التصنيف</td>
                    <td>
                      {
                        studentsData["سكن مميز فردى طلبة"]
                          ?.waitingForClassification
                      }
                    </td>
                    <td>{studentsData["عادى"]?.waitingForClassification}</td>
                  </tr>
                )}
                {studentsData && (
                  <tr>
                    <td>فى انتظار التسكين</td>
                    <td>
                      {studentsData["سكن مميز فردى طلبة"]?.waitingForHousing}
                    </td>
                    <td>{studentsData["عادى"]?.waitingForHousing}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
        {/* {studentsData.length === 0 && (
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
        )} */}
      </div>
    </div>
  );
};

export default NumberOfStudentsBasedOnHousing;
