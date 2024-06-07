import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
const StudentListFemale = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  // const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [College, setCollege] = useState(""); // State for storing the selected college

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
  var appliyers;
  var accepted;
  const colleges = [
    "كلية الفنون الجميلة",
    "كلية الهندسة (حلوان)",
    "كلية الهندسة (المطرية)",
    "كلية التجارة وإدارة الأعمال (حلوان)",
    "كلية التجارة وإدارة الأعمال (الزمالك)",
    "كلية الحاسبات والمعلومات",
    "كلية السياحة والفنادق",
    "كلية الفنون التطبيقية",
    "كلية التكنولوجيا والتعليم",
    "كلية الاقتصاد المنزلي",
    "كلية التربية الفنية",
    "كلية التربية الموسيقية",
    "كلية التربية الرياضية (بنين) بالهرم",
    "كلية التربية الرياضية (بنات) بالجزيرة",
    "كلية الحقوق",
    "كلية الآداب",
    "كلية التربية",
    "كلية الخدمة الاجتماعية",
    "كلية الصيدلة",
    "كلية العلوم",
    "كلية التمريض",
    "كلية الطب",
    "المعهد القومي للملكية الفكرية",
    "معهد التمريض",
  ];

  useEffect(() => {
    fetchStudentList();
  }, [ofYear, College]);

  const fetchStudentList = async () => {
    const queryString = `?College=${College}&ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&appliyers=${appliyers}&accepted=${accepted}`;
    if (
      egyptions ||
      expartriates ||
      normalHousing ||
      specialHousing ||
      oldStudent ||
      newStudent ||
      isEvacuated ||
      appliyers ||
      accepted ||
      College ||
      ofYear
    ) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/studentListsFemales${queryString}`
        );
        setStudents(response.data.data.users);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/studentListsFemales`
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
    appliyers = selectedLabel === "متقدمين";
    accepted = selectedLabel === "مقبولين";

    fetchStudentList();
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);

    setOfYear(selectedYear, () => fetchStudentList());
  }
  function handleCollegeChange(event) {
    const selectedCollege = event.target.value;
    setCollege(selectedCollege, () => fetchStudentList());
    fetchStudentList();
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
          <div className="select">
            <p>الكلية</p>
            <Form.Select
              size="sm"
              className="selectmenu"
              onChange={handleCollegeChange} // Attach onChange event handler
              value={College}
            >
              <option>اخترالكلية</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
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

export default StudentListFemale;
