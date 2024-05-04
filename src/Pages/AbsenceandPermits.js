import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const AbsenceandPermits = ({ _id, studentData }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [absenceType, setAbsenceType] = useState([]);
  const [absent, setAbsent] = useState({
    blockMealsFrom: "",
    blockMealsTo: "",
    notes: "",
    TypeOfAbsence: "",
    dateFrom: "",
    dateTo: "",
  });

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    if (_id) {
      fetchAbsenceAndPermits();
    }
  }, [_id]);

  const fetchAbsenceAndPermits = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/absence/${_id}`, {
        headers: {
          authorization: `Bearer__${auth.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setAbsenceType(response.data.data.permission);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockMealsFromChange = (value) => {
    setAbsent({ ...absent, blockMealsFrom: value });
  };

  const handleBlockMealsToChange = (value) => {
    setAbsent({ ...absent, blockMealsTo: value });
  };
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
        action: "اضافة غياب وتصاريح",
        objectName: `للطالب ${absenceType.studentName},برقم الطالب ${absenceType.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addAbsence = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/absence/${_id}`,
        {
          notes: absent.notes,
          TypeOfAbsence: absent.TypeOfAbsence,
          dateFrom: absent.dateFrom,
          dateTo: absent.dateTo,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAbsent({
        notes: "",
        TypeOfAbsence: "",
        dateFrom: "",
        dateTo: "",
      });
      createLogs();
      incremented();
      fetchAbsenceAndPermits();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {auth && (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
          <button
            onClick={toggleDiv}
            className="button"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            إضافة
          </button>
        )}

        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <br />
            <p>الإسم: {studentData.studentName}</p>
            <br />
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">النوع </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAbsent({ ...absent, TypeOfAbsence: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">من تاريخ</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAbsent({ ...absent, dateFrom: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">حتى تاريخ</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAbsent({ ...absent, dateTo: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">ملاحظات</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAbsent({ ...absent, notes: e.target.value });
                }}
              />
            </div>

            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={addAbsence}
            >
              حفظ
            </button>
          </div>
        )}
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>النوع</th>
            <th>من تاريخ</th>
            <th>حتى تاريخ</th>
          </tr>
        </thead>
        <tbody>
          {absenceType.map((absence, index) => (
            <tr key={index}>
              <td>{absence.TypeOfAbsence}</td>
              <td>{new Date(absence.dateFrom).toLocaleDateString()}</td>
              <td>{new Date(absence.dateTo).toLocaleDateString()}</td>{" "}
            </tr>
          ))}
        </tbody>
      </Table>
      {absenceType.length === 0 && (
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
      )}
    </div>
  );
};

export default AbsenceandPermits;
