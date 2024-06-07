import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Checkbox } from "@material-ui/core";

const NumberOfAllStudentsFemale = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState("");

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
  var withSpecialNeeds;
  useEffect(() => {
    fetchAllStudents();
  }, [ofYear, selectedFilter]); // Ensure to refetch when the filters change

  const fetchAllStudents = async () => {
    const queryString = `?ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&withSpecialNeeds=${withSpecialNeeds}`;
    if (
      egyptions ||
      expartriates ||
      normalHousing ||
      specialHousing ||
      oldStudent ||
      newStudent ||
      withSpecialNeeds ||
      ofYear
    ) {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/getNumberOfAllStudentsFemale${queryString}`
        );
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/getNumberOfAllStudentsFemale`
        );
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
    withSpecialNeeds = selectedLabel === "ذوى احتياجات خاصة";

    fetchAllStudents();
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    console.log("====================================");
    console.log(selectedYear);
    setOfYear(selectedYear, () => fetchAllStudents());
    console.log("===================================="); // Update the ofYear state with the selected value
  }
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
            {Object.keys(students).map((collegeName, index) => (
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
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default NumberOfAllStudentsFemale;
