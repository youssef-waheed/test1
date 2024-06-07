import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const DeprivedOfMealsFemale = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [startDay, setStartDay] = useState("");
  const [cancellationDate, setCancellationDate] = useState("");
  const [selectedMeals, setSelectedMeals] = useState("");
  const mealsType = ["فطار", "غداء", "عشاء"];
  useEffect(() => {
    fetchDeprivedOfMeals();
  }, [ofYear, startDay, cancellationDate, selectedMeals]);

  const fetchDeprivedOfMeals = async () => {
    const queryString = `?ofYear=${ofYear}&startDay=${startDay}&cancellationDate=${cancellationDate}&selectedMeals=${selectedMeals}`;
    if (ofYear) {
      try {
        const response = await axios.get(
          `http://localhost:5000/blockMeals/depriveStudentOfMeals${queryString}`
        );
        setStudents(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/blockMeals/depriveStudentOfMeals`
        );
        setStudents(response.data.data.users);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }
  function handleStartDay(event) {
    const selectedDate = event.target.value;
    setStartDay(selectedDate);
  }

  function handleCancelationDate(event) {
    const selectedDate = event.target.value;
    setCancellationDate(selectedDate);
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
        <div className="penalty-date">
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
        </div>
        <div className="names"></div>
      </div>
      <div className="coll">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم القومي</th>
              <th>الكلية</th>
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

export default DeprivedOfMealsFemale;
