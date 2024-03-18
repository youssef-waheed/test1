import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";

const MealPreparation = () => {
  const [selectedFilter, setSelectedFilter] = useState("pendingApplications");
  const [ofYear, setOfYear] = useState("");
  const [meal, setMeal] = useState("");
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "اليوم", checked: false },
        { label: "الوجبة", checked: false },
      ]
    );
  });
  var dateOfBookingMeals;
  var ofWhichMeal;
  useEffect(() => {
    fetchMealPreparation();
  }, [ofYear, meal]);

  const fetchMealPreparation = async () => {
    const queryString = `?ofYear=${ofYear}&dateOfBookingMeals=${dateOfBookingMeals}&ofWhichMeal=${ofWhichMeal}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/statistics/mealPreparation${queryString}`
      );
      console.log(response); // Log response data for debugging
      // TODO: Update state or UI based on the response
    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching meal preparation data:", error);
      // TODO: Display a user-friendly error message on the UI
    }
  };

  const handleRadioButtonChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
      idx === index
        ? { ...checkbox, checked: true }
        : { ...checkbox, checked: false }
    );
    setCheckboxes(updatedCheckboxes);

    const selectedLabel = updatedCheckboxes[index].label;

    dateOfBookingMeals = selectedLabel === "اليوم";
    ofWhichMeal = selectedLabel === "الوجبة";

    fetchMealPreparation();
  };
  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);

    setOfYear(selectedYear, () => fetchMealPreparation());
  }
  function handleMeal(event) {
    const selectedMeal = event.target.value;
    setMeal(selectedMeal);
    setMeal(selectedMeal, () => fetchMealPreparation());
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
          <div className="select">
            <p className="academicyear">الوجبة </p>
            <Form.Select
              size="sm"
              className="selectmenu"
              onChange={handleMeal}
              value={meal} // Attach onChange event handler
            >
              <option>الوجبة </option>
              <option>فطار</option>
              <option>غداء</option>
              <option>عشاء</option>
            </Form.Select>
          </div>
        </div>
        <div className="coll">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>الكلية</th>
                <th>أعداد الوجبات</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MealPreparation;
