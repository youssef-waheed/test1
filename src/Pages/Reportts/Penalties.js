import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
const Penalties = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];
  //   const [checkboxes, setCheckboxes] = useState(() => {
  //     const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
  //     return (
  //       storedCheckboxes || [
  //         { label: "مصرى", checked: false },
  //         { label: "وافد", checked: false },
  //         { label: "متقدمين", checked: false },
  //         { label: "مقبولين", checked: false },
  //         { label: "مرفوضين", checked: false },
  //         { label: "قدامى", checked: false },
  //         { label: "جدد", checked: false },
  //         { label: "سكن عادى", checked: false },
  //         { label: "سكن مميز", checked: false },
  //         { label: "مسلم", checked: false },
  //         { label: "مسيحى", checked: false },
  //         { label: "ساكنى العام السابق", checked: false },
  //         { label: "فى انتظار التنسيق", checked: false },
  //       ]
  //     );
  //   });
  var PenaltyDate;
  var cancellationDate;
  var penaltyKind;
  useEffect(() => {
    fetchPenaltiesReport();
  }, [ofYear, selectedPenalty]); // Pass 'selectedPenalty' as a dependency

  const fetchPenaltiesReport = async () => {
    const queryString = `?ofYear=${ofYear}&penaltyKind=${selectedPenalty}&PenaltyDate=${PenaltyDate}&cancellationDate=${cancellationDate}`;
    if (PenaltyDate || cancellationDate || ofYear || penaltyKind) {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/penalty${queryString}`
        );
        setPenalties(response.data.data.users); // Update to set penalties state
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/reports/penalty`
        );
        setPenalties(response.data.data.users); // Update to set penalties state

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    // Call fetchPenaltiesReport directly after setting the year state
    fetchPenaltiesReport();
  }
  function handlePenaltyKind(event) {
    const selectedPenaltyKind = event.target.value;
    setSelectedPenalty(selectedPenaltyKind);
    console.log(selectedPenaltyKind);
  }
  return (
    <div>
      {" "}
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
            <p>نوع الجزاء</p>
            <Form.Select
              size="sm"
              className="Type"
              m-5
              onChange={handlePenaltyKind}
              value={selectedPenalty} // Change penaltyKinds to selectedPenalty
            >
              {" "}
              <option>اختر نوع الجزاء...</option>
              {penaltyKinds.map((penalty, index) => (
                <option key={index} value={penalty}>
                  {penalty}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* {checkboxes.map((checkbox, index) => (
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
      ))} */}
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>كود الطالب </th>
                <th>نوع الجزاء </th>
                <th> سبب الجزاء </th>
              </tr>
            </thead>
            <tbody>
              {penalties.map((pen, index) => (
                <tr key={index}>
                  <td>{pen.studentName}</td>
                  <td>{pen.studentId}</td>
                  <td>{pen.penaltyKind}</td>
                  <td>{pen.reason}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Penalties;
