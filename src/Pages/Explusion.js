import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const Explusion = ({ _id }) => {
  const penaltyKinds = ["جزاء اداري", "جزاء سلوكي"];
  const [selectedPenalty, setSelectedPenalty] = useState([]);
  const [students, setStudents] = useState({
    roomId: "",
    penaltyKind: "",
    reason: "",
  });

  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "add",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createLogs = async () => {
    try {
      const logs = await axios.post("http://localhost:5000/logs/createLogs", {
        adminID: auth.log.adminID,
        adminUserName: auth.log.adminUserName,
        action: "اضافة فصل الطالب",
        objectName: `للطالب ${students.studentName},برقم الطالب ${students.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
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
          {auth && (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={addExplusion}
            >
              حفظ
            </button>
          )}
        </div>
            
      </div>{" "}
    </div>
  );
};

export default Explusion;
