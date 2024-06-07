import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const NumberOfStudentsBasedOnHousing = () => {
  const [ofYear, setOfYear] = useState("");
  const [studentsData, setStudentsData] = useState(null);

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

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
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
                  <th>سكن مميز فردي طلبة</th>
                  <th>سكن مميز فردي طالبات</th>
                  <th>عادي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ساكن</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.isHoused}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.isHoused}</td>
                  <td>{studentsData["عادي"]?.isHoused}</td>
                </tr>
                <tr>
                  <td>اخلاء</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.isEvacuated}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.isEvacuated}</td>
                  <td>{studentsData["عادي"]?.isEvacuated}</td>
                </tr>
                <tr>
                  <td>قيد الانتظار</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.pending}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.pending}</td>
                  <td>{studentsData["عادي"]?.pending}</td>
                </tr>
                <tr>
                  <td>مرفوض</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.rejected}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.rejected}</td>
                  <td>{studentsData["عادي"]?.rejected}</td>
                </tr>
                <tr>
                  <td>في انتظار التصنيف</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.waitingForClassification}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.waitingForClassification}</td>
                  <td>{studentsData["عادي"]?.waitingForClassification}</td>
                </tr>
                <tr>
                  <td>فى انتظار التسكين</td>
                  <td>{studentsData["سكن مميز فردي طلبة"]?.waitingForHousing}</td>
                  <td>{studentsData["سكن مميز فردي طالبات"]?.waitingForHousing}</td>
                  <td>{studentsData["عادي"]?.waitingForHousing}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberOfStudentsBasedOnHousing;
