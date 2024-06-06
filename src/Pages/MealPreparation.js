import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";

const MealPreparation = () => {
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [ofYear, setOfYear] = useState("");
  const [meal, setMeal] = useState("");
  const [dateOfBookingMeals, setDateOfBookingMeals] = useState("");
  const [ofWhichMeal, setOfWhichMeal] = useState("");
  const [students, setStudents] = useState([]);
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "اليوم", checked: false },
        { label: "الوجبة", checked: false },
      ]
    );
  });

  useEffect(() => {
    fetchMealPreparation();
  }, [ofYear, ofWhichMeal, dateOfBookingMeals]);

  const fetchMealPreparation = async () => {
    const queryString = `?ofYear=${ofYear}&dateOfBookingMeals=${dateOfBookingMeals}&ofWhichMeal=${ofWhichMeal}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/statistics/mealPreparation${queryString}`
      );
      setStudents(response.data.jsonData || []); // Ensure data is accessed correctly
      console.log(response);
    } catch (error) {
      console.error("Error fetching meal preparation data:", error);
      // Optionally set an error state to display an error message to the user
    }
  };

  const handleRadioButtonChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
      idx === index
        ? { ...checkbox, checked: true }
        : { ...checkbox, checked: false }
    );
    setCheckboxes(updatedCheckboxes);

    fetchMealPreparation();
  };

  const handleYearChange = (event) => {
    setOfYear(event.target.value);
  };

  const handleMeal = (event) => {
    setMeal(event.target.value);
  };

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
          <div>
            <label htmlFor="ofWhichMeal">Meal Type:</label>
            <select
              id="ofWhichMeal"
              name="ofWhichMeal"
              value={ofWhichMeal}
              onChange={(e) => setOfWhichMeal(e.target.value)}
            >
              <option value="غداء">غداء</option>
              <option value="عشاء">عشاء</option>
              <option value="فطار">فطار</option>
              <option value="سحور">سحور</option>
            </select>
          </div>
          <div>
            <label htmlFor="dateOfReceivingMeals">
              Date of Receiving Meals:
            </label>
            <input
              type="date"
              id="dateOfReceivingMeals"
              name="dateOfReceivingMeals"
              value={dateOfBookingMeals}
              onChange={(e) => setDateOfBookingMeals(e.target.value)}
            />
          </div>
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>الكلية</th>
                <th>أعداد الوجبات</th>
                <th>الرقم القومي </th>
                <th>كودالطالب </th>
              </tr>
            </thead>
            <tbody>
              {students.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.buildingNamegender}</td>
                  <td>{meal.studentName}</td>
                  <td>{meal.nationalID}</td>
                  <td>{meal.studentCode}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MealPreparation;
