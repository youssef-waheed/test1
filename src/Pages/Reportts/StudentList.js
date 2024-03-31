import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
const StudentList = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");

  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "مصرى", checked: false },
        { label: "وافد", checked: false },
        { label: "متقدمين", checked: false },
        { label: "مقبولين", checked: false },
        { label: "قدامى", checked: false },
        { label: "جدد", checked: false },
        { label: "سكن عادى", checked: false },
        { label: "سكن مميز", checked: false },
        { label: "ذوى احتياجات خاصة", checked: false },
        { label: "إخلاء  ", checked: false },
      ]
    );
  });
  var egyptions;
  var expartriates;
  var normalHousing;
  var specialHousing;
  var oldStudent;
  var newStudent;
  var isEvacuated;

  useEffect(() => {
    fetchStudentList();
  }, [ofYear, selectedFilter]);

  const fetchStudentList = async () => {
    const queryString = `?ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&isEvacuated=${isEvacuated}`;
    if (
      egyptions ||
      expartriates ||
      normalHousing ||
      specialHousing ||
      oldStudent ||
      newStudent ||
      isEvacuated ||
      ofYear
    ) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/studentListsMales${queryString}`
        );
        setStudents(response.data.data.users);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/studentListsMales`
        );
        setStudents(response.data.data.users);

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
    normalHousing = selectedLabel === "سكن عادى";
    specialHousing = selectedLabel === "سكن مميز";
    isEvacuated = selectedLabel === "إخلاء";

    fetchStudentList();
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);

    setOfYear(selectedYear, () => fetchStudentList());
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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>الكلية</th>
                <th>وظيفة الأب</th>
                <th>اسم الأب</th>
                <th>الرقم الوقمى للأب</th>
                <th>رقم الأب</th>
                <th>الرقم القومي</th>
                <th>محل الميلاد</th>
                <th>الديانة</th>
                {/* <th>الكلية</th>
                <th>الكلية</th> */}
              </tr>
            </thead>
            <tbody>
              {students.map((list, index) => (
                <tr key={index}>
                  <td> {list.studentName} </td>
                  <td> {list.College} </td>
                  <td> {list.fatherJop} </td>
                  <td> {list.fatherName} </td>
                  <td> {list.fatherNationalId} </td>
                  <td> {list.fatherPhone} </td>
                  <td> {list.nationalID} </td>
                  <td> {list.placeOfBirth} </td>
                  <td> {list.religion} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
