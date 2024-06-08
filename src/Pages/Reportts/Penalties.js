import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const Penalties = () => {
  const [ofYear, setOfYear] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("");
  const [penalties, setPenalties] = useState([]); // Ensure penalties is an array
  const [PenaltyDate, setPenaltyDate] = useState("");
  const [cancellationDate, setCancellationDate] = useState("");

  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];

  useEffect(() => {
    fetchPenaltiesReport();
  }, [ofYear, selectedPenalty, PenaltyDate, cancellationDate]);

  const fetchPenaltiesReport = async () => {
    const queryString = `?ofYear=${ofYear}&penaltyKind=${selectedPenalty}&PenaltyDate=${PenaltyDate}&cancellationDate=${cancellationDate}`;

    try {
      const response = await axios.get(
        `http://localhost:5000/reports/penaltyMale${queryString}`
      );
      setPenalties(response.data.data.users || []); // Ensure the response sets an array
      console.log(response);
    } catch (error) {
      console.log(error);
      setPenalties([]); // Set penalties to an empty array in case of error
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

  function handlePenaltyDateChange(event) {
    const selectedDate = event.target.value;
    setPenaltyDate(selectedDate);
  }

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
              value={ofYear}
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
              style={{ width: "150px" }}
              size="sm"
              className="Type"
              m-5
              onChange={handlePenaltyKind}
              value={selectedPenalty}
            >
              <option>اختر نوع الجزاء...</option>
              {penaltyKinds.map((penalty, index) => (
                <option key={index} value={penalty}>
                  {penalty}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="penalty-date">
            <p>تاريخ الجزاء</p>
            <input
              type="date"
              onChange={handlePenaltyDateChange}
              value={PenaltyDate}
            />
          </div>
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
                <th>نوع الجزاء</th>
                <th>سبب الجزاء</th>
              </tr>
            </thead>
            <tbody>
              {penalties.length > 0 ? (
                penalties.map((pen, index) => (
                  <tr key={index}>
                    <td>{pen.studentName}</td>
                    <td>{pen.penaltyKind}</td>
                    <td>{pen.reason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* <td colSpan="3" style={{ textAlign: "center" }}>
                    لا يوجد بيانات لهذا الطالب/طالبة
                  </td> */}
                </tr>
              )}
            </tbody>
          </Table>
          {penalties.length === 0 && (
            <div className="warning">
              <Alert
                variant="danger"
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                لا يوجد بيانات
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Penalties;
