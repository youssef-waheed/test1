import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const NumOfPrintedCardFemale = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState("");
  const [date, setDate] = useState("");
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "ساكن", checked: false },
        { label: "تاريخ الطباعة", checked: false },
        { label: "إخلاء  ", checked: false },
      ]
    );
  });

  var isEvacuated;
  var isHoused;
  var dateOfPrinting;

  useEffect(() => {
    fetchNumOfPrintedCards();
  }, [ofYear, date]);

  const fetchNumOfPrintedCards = async () => {
    const queryString = `?ofYear=${ofYear}&isHoused=${isHoused}&isEvacuated=${isEvacuated}&dateOfPrinting=${date}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/statistics/getNumberOfPrintedCardsForFemales${queryString}`
      );
      setStudents(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
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

    isHoused = selectedLabel === "ساكن";
    dateOfPrinting = selectedLabel === "تاريخ الطباعة";
    isEvacuated = selectedLabel === "إخلاء";

    fetchNumOfPrintedCards();
  };
  const updateTableAndDatabase = async (selectedDate) => {
    // Assuming students is an array of objects with properties including date
    const updatedStudents = students.map((student) => ({
      ...student,
      dateOfPrinting: selectedDate, // Assuming the property name is dateOfPrinting
    }));

    // Update the state to reflect the changes immediately
    setStudents(updatedStudents);

    try {
      // Send updated data to the backend to update the database
      const response = await axios.post(
        "http://localhost:5000/updateStudents",
        updatedStudents
      );
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }

  function handleDateChange(event) {
    const selectedDate = event.target.value;
    setDate(selectedDate);
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
          <div className="select1">
            <Form.Label>اليوم </Form.Label>
            <Form.Control
              type="date"
              className="Type"
              onChange={handleDateChange}
              value={date}
            />
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
                <th>الكلية</th>
                <th>أعداد الطباعة</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(students).map((collegeName, index) => (
                <tr key={index}>
                  <td>{collegeName}</td>
                  <td>{students[collegeName].printedCard}</td>
                  {/* <td>{student.dateOfPrinting}</td> Display the date in the table */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default NumOfPrintedCardFemale;
