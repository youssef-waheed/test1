import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import "./Penalties.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const Penalties = ({ studentData, _id }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState([]);
  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];
  const [penalty, setPenalty] = useState({
    reason: "",
    penaltyKind: "",
    PenaltyDate: "",
    cancellationDate: "",
  });
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  if (!studentData) {
    return (
      <div className="table-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>{" "}
      </div>
    );
  }
  const addPenaltyForMale = async () => {
    try {
      console.log("Sending data:", {
        reason: penalty.reason,
        penaltyKind: selectedPenalty,
        PenaltyDate: penalty.PenaltyDate,
        cancellationDate: penalty.cancellationDate,
      });

      const response = await axios.post(
        `http://localhost:5000/penalty/male/` + _id,
        {
          reason: penalty.reason,
          penaltyKind: selectedPenalty,
          PenaltyDate: penalty.PenaltyDate,
          cancellationDate: penalty.cancellationDate,
        }
      );

      setPenalty({
        reason: "",
        penaltyKind: "",
        PenaltyDate: "",
        cancellationDate: "",
      });
      setSelectedPenalty([]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  function handlePenaltyKind(event) {
    const selectedPenaltyKind = event.target.value;
    setSelectedPenalty(selectedPenaltyKind);
    console.log(selectedPenaltyKind);
  }

  return (
    <div>
      <div>
        <button
          onClick={toggleDiv}
          className="button"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          إضافة
        </button>
        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <p>الإسم: {studentData.studentName}</p>{" "}
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
            <div className="select1">
              <Form.Label>السبب </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setPenalty({ ...penalty, reason: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label>تاريخ الجزاء </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setPenalty({ ...penalty, PenaltyDate: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label>تاريخ الاخلاء </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setPenalty({ ...penalty, cancellationDate: e.target.value });
                }}
              />
            </div>
            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={addPenaltyForMale}
            >
              حفظ
            </button>
          </div>
        )}
            
      </div>{" "}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>النوع</th>
            <th>السبب</th>
            <th>التاريخ </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{studentData.penaltyKind}</td>
            <td></td>
            <td>{studentData.PenaltyDate}</td>
          </tr>
        </tbody>
      </Table>
      <div className="warning">
        <>
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              This is a {variant} alert—check it out!
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default Penalties;
