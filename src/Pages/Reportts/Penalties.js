import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const Penalties = () => {
  const [ofYear, setOfYear] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("");
  const [penalties, setPenalties] = useState([]);
  const [PenaltyDate, setPenaltyDate] = useState(""); // State for PenaltyDate
  const [cancellationDate, setCancellationDate] = useState(""); // State for cancellationDate

  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];

  useEffect(() => {
    fetchPenaltiesReport();
  }, [ofYear, selectedPenalty, PenaltyDate, cancellationDate]); // Update useEffect dependencies

  const fetchPenaltiesReport = async () => {
    const queryString = `?ofYear=${ofYear}&penaltyKind=${selectedPenalty}&PenaltyDate=${PenaltyDate}&cancellationDate=${cancellationDate}`;

    try {
      const response = await axios.get(
        `http://localhost:5000/reports/penalty${queryString}`
      );
      setPenalties(response.data.data.users); // Update to set penalties state
    } catch (error) {
      console.log(error);
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }

  function handlePenaltyKind(event) {
    const selectedPenaltyKind = event.target.value;
    setSelectedPenalty(selectedPenaltyKind);
  }

  // Function to handle Penalty Date change
  function handlePenaltyDateChange(event) {
    const selectedDate = event.target.value;
    setPenaltyDate(selectedDate);
  }

  // Function to handle cancellation Date change
  function handleCancellationDateChange(event) {
    const selectedDate = event.target.value;
    setCancellationDate(selectedDate);
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
          {/* Penalty Date */}
          <div className="penalty-date">
            <p>تاريخ الجزاء</p>
            <input
              type="date"
              onChange={handlePenaltyDateChange}
              value={PenaltyDate}
            />
          </div>
          {/* Cancellation Date */}
          <div className="cancellation-date">
            <p>تاريخ الإلغاء</p>
            <input
              type="date"
              onChange={handleCancellationDateChange}
              value={cancellationDate}
            />
          </div>
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
