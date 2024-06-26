import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Checkbox } from "@material-ui/core";

const NumOfStudents = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState({}); // Initialize as an empty object

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

  // Declare variables as state to trigger re-render
  const [egyptions, setEgyptions] = useState(false);
  const [expartriates, setExpartriates] = useState(false);
  const [normalHousing, setNormalHousing] = useState(false);
  const [specialHousing, setSpecialHousing] = useState(false);
  const [oldStudent, setOldStudent] = useState(false);
  const [newStudent, setNewStudent] = useState(false);
  const [withSpecialNeeds, setWithSpecialNeeds] = useState(false);

  useEffect(() => {
    fetchAllStudents();
  }, [
    ofYear,
    selectedFilter,
    egyptions,
    expartriates,
    normalHousing,
    specialHousing,
    oldStudent,
    newStudent,
    withSpecialNeeds,
  ]); // Ensure to refetch when the filters change

  const fetchAllStudents = async () => {
    const queryString = `?ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&withSpecialNeeds=${withSpecialNeeds}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/statistics/getNumberOfAllStudentsMale${queryString}`
      );
      console.log(response);
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

    setEgyptions(selectedLabel === "مصرى");
    setExpartriates(selectedLabel === "وافد");
    setOldStudent(selectedLabel === "قدامى");
    setNewStudent(selectedLabel === "جدد");
    setNormalHousing(selectedLabel === "سكن عادى");
    setSpecialHousing(selectedLabel === "سكن مميز");
    setWithSpecialNeeds(selectedLabel === "ذوى احتياجات خاصة");
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  };

  const showDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
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
        <div className="names"></div>
      </div>
      <div className="coll">
        <h1>اعداد الطلاب لجامعة حلوان</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>الجامعة/الكلية</th>
              <th>مرفوض </th>
              <th>تحت المراجعة </th>
              <th>فى انتظار تنسيق</th>
              <th>فى انتظار تسكين</th>
              <th>سكن</th>
              <th>إخلاء</th>
              <th>إجمالي</th>
            </tr>
          </thead>
          <tbody>
            {students && Object.keys(students).length > 0 ? (
              Object.keys(students).map((collegeName, index) => (
                <tr key={index}>
                  <td>{collegeName}</td>
                  <td>{students[collegeName].rejected}</td>
                  <td>{students[collegeName].waitingForClassification}</td>
                  <td>{students[collegeName].pending}</td>
                  <td>{students[collegeName].isHoused}</td>
                  <td>{students[collegeName].isClassified}</td>
                  <td>{students[collegeName].isEvacuated}</td>
                  <td>{students[collegeName].all}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default NumOfStudents;
