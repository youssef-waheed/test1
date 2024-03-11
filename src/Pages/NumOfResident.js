import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const NumOfResident = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

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
    fetchNumOfResident();
  }, [ofYear, selectedFilter]);

  const fetchNumOfResident = async () => {
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
          `http://localhost:5000/statistics/getNumberOfResidents${queryString}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/getNumberOfResidents`
        );
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
    withSpecialNeeds = selectedLabel === "ذوى احتياجات خاصة";

    fetchNumOfResident();
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    console.log("====================================");
    console.log(selectedYear);
    setOfYear(selectedYear, () => fetchNumOfResident());
    console.log("===================================="); // Update the ofYear state with the selected value
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
          <div className="buttons">
            <button style={{ backgroundColor: "blue", color: "white" }}>
              عرض التقرير
            </button>
          </div>
        </div>
        <div className="coll">
          {/* <Table striped bordered hover size="sm">
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
          </Table> */}
        </div>
      </div>
    </div>
  );
};

export default NumOfResident;
