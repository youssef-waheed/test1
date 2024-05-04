import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();
const BlockMeals = ({ _id }) => {
  const [students, setStudents] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [blockMeal, setBlockMeal] = useState({
    dateTo: "",
    dateFrom: "",
    meals: "",
  });

  useEffect(() => {
    if (_id) {
      fetchBlockMeals();
    }
  }, [_id]);
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };
  const fetchBlockMeals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/blockMeals/` + _id,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setStudents(response.data.data); // Update students state with the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  const addBlockMeal = async () => {
    try {
      console.log("Sending data: ", {
        dateTo: blockMeal.dateTo,
        dateFrom: blockMeal.dateFrom,
        meals: blockMeal.meals,
      });
      const response = await axios.post(
        `http://localhost:5000/blockMeals/` + _id,
        {
          dateTo: blockMeal.dateTo,
          dateFrom: blockMeal.dateFrom,
          meals: blockMeal.meals,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBlockMeal({
        dateTo: "",
        dateFrom: "",
        meals: "",
      });
      createLogs();
      incremented();
    } catch (error) {
      console.log(error);
      console.log(_id);
    }
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
        action: "اضافة حجز وجبات",
        objectName: `للطالب ${students.studentName},برقم الطالب ${students.nationalID}`,
      });
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
            <div className="select1">
              <Form.Label>الوجبات </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setBlockMeal({ ...blockMeal, meals: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label>من تاريخ </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setBlockMeal({ ...blockMeal, dateFrom: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label>تاريخ الاخلاء </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setBlockMeal({ ...blockMeal, dateTo: e.target.value });
                }}
              />
            </div>
            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={addBlockMeal}
            >
              حفظ
            </button>
          </div>
        )}
            
      </div>{" "}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>نوع الوجبة</th>
            <th>من تاريخ</th>
            <th>إلى تاريخ </th>
          </tr>
        </thead>
        <tbody>
          {students.map((meal, index) => (
            <tr key={index}>
              <td>{meal.meals}</td>
              <td>{new Date(meal.dateFrom).toLocaleDateString()}</td>
              <td>{new Date(meal.dateTo).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {students.length === 0 && (
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

export default BlockMeals;
