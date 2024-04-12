import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const NumberOfRecievedMeals = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState("");
  const mealsType = ["فطار", "غداء", "عشاء"];

  useEffect(() => {
    fetchNumberOfMeals();
  }, [ofYear, selectedMeals]);

  const fetchNumberOfMeals = async () => {
    const queryString = `?ofYear=${ofYear}&selectedMeals=${selectedMeals}`;
    if (ofYear || selectedMeals) {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/numberOfReceivedMeals${queryString}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }
  function handleMealType(event) {
    const mealsType = event.target.value;
    setSelectedMeals(mealsType);
  }
  return (
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
          <p style={{ fontWeight: "bold", width: "30px" }}>نوع الوجبة</p>
          <Form.Select
            style={{ width: "150px" }}
            size="sm"
            className="Type"
            m-5
            onChange={handleMealType}
            value={selectedMeals}
          >
            <option>اختر نوع الوجبة...</option>
            {mealsType.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </Form.Select>
        </div>
        {/* <div className="penalty-date">
      <p style={{ fontWeight: "bold" }}> من تاريخ</p>
      <input type="date" onChange={handleStartDay} value={startDay} />
    </div>
    <div className="cancellation-date">
      <p style={{ fontWeight: "bold" }}> الى تاريخ</p>
      <input
        type="date"
        onChange={handleCancelationDate}
        value={cancellationDate}
      />
    </div> */}
        <div className="names"></div>
      </div>
      <div className="coll">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th> المبنى</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) &&
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.nationalID}</td>
                  <td>{student.College}</td>
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
    </div>
  );
};

export default NumberOfRecievedMeals;
