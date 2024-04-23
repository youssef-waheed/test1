import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
// http://localhost:5000/statistics/MealTakingMale
const TakeMeal = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState("");
  const mealsType = ["فطار", "غداء", "عشاء"];

  useEffect(() => {
    fetchTakeMeal();
  }, [ofYear, selectedMeals]);

  const fetchTakeMeal = async () => {
    const queryString = `?ofYear=${ofYear}&selectedMeals=${selectedMeals}`;

    try {
      const response = await axios.get(
        ` http://localhost:5000/statistics/MealTaking${queryString}`
      );
      setStudents(response.data.jsonData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);

    setOfYear(selectedYear, () => fetchTakeMeal());
  }
  function handleMealType(event) {
    const mealsType = event.target.value;
    setSelectedMeals(mealsType);
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
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>اسم المبنى </td>
                <th>الاسم</th>
                <th>الرقم القومي </th>
                <th>كود الطالب</th>
              </tr>
            </thead>
            <tbody>
              {students.map((meal, index) => (
                <tr key={index}>
                  <td> {meal.buildingName} </td>
                  <td> {meal.studentName} </td>
                  <td> {meal.nationalID} </td>
                  <td> {meal.studentCode} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* {studentsData.length === 0 && (
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
    </div>
  );
};

export default TakeMeal;
