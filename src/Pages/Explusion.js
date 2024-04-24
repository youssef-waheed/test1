import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const Explusion = ({ _id }) => {
  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];
  const [selectedPenalty, setSelectedPenalty] = useState([]);
  const [students, setStudents] = useState({
    roomId: "",
    penaltyKind: "",
    reason: "",
  });

  const addExplusion = async () => {
    try {
      console.log("Sending data:", {
        roomId: students.roomId,
        penaltyKind: students.penaltyKind,
        reason: students.reason,
      });
      const response = await axios.post(
        `http://localhost:5000/expulsion/male/` + _id,
        {
          roomId: students.roomId,
          penaltyKind: students.penaltyKind,
          reason: students.reason,
        }
      );
      console.log(response);
      setStudents({
        roomId: "",
        penaltyKind: "",
        reason: "",
      });
      setSelectedPenalty([]);
    } catch (error) {
      console.log(error);
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
        <div style={{ fontWeight: "bold" }}>
          <div className="select1">
            <p>نوع الجزاء</p>
            <Form.Select
              size="sm"
              className="Type"
              m-5
              onChange={handlePenaltyKind}
              value={selectedPenalty} // Update value attribute to selectedPenalty
            >
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
                setStudents({ ...students, reason: e.target.value });
              }}
            />
          </div>
          <div className="select1">
            <Form.Label>الغرفة </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setStudents({ ...students, roomId: e.target.value });
              }}
            />
          </div>

          <button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={addExplusion}
          >
            حفظ
          </button>
        </div>
            
      </div>{" "}
      {/* <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>النوع</th>
            <th>السبب</th>
            <th>التاريخ </th>
          </tr>
        </thead>
        <tbody>
          {penalties.map((pen, index) => (
            <tr key={index}>
              <td>{pen.penaltyKind}</td>
              <td>{pen.reason}</td>
              <td>{new Date(pen.PenaltyDate).toLocaleDateString()}</td>
            </tr>
          ))}
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
            لا يوجد بيانات لهذا الطالب/طالبة{" "}
          </Alert>
        </div>
      )} */}
    </div>
  );
};

export default Explusion;
