import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminMeal.css";
import { getAuthUser } from "../../helper/storage";
const auth = getAuthUser();

const MealsOFAdmin = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [formData, setFormData] = useState({
    mealsName: "",
    mealsKind: "",
    mealStartTime: "",
    mealEndTime: "",
    RamadanMeal: false,
    mealReligion: "",
    studentReligion: "",
  });
  const [showRamadanMeals, setShowRamadanMeals] = useState(false);
  const [showNonRamadanMeals, setShowNonRamadanMeals] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mealsAdd/", {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        });
        setMeals(response.data.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
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
        action: "اضافة الوجبات ",
        objectName: `للطالب ${meals.studentName},برقم الطالب ${meals.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMeal = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/mealsAdd/",
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        },
        formData
      );
      setMeals([...meals, response.data.data.meals]);
      setFormData({
        mealsName: "",
        mealsKind: "",
        mealStartTime: "",
        mealEndTime: "",
        RamadanMeal: false,
        mealReligion: "",
        studentReligion: "",
      });
      createLogs();
      incremented();
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const handleUpdateMeal = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/mealsAdd/${selectedMeal._id}`,
        formData
      );
      const updatedMealIndex = meals.findIndex(
        (meal) => meal._id === selectedMeal._id
      );
      const updatedMeals = [...meals];
      updatedMeals[updatedMealIndex] = response.data.data.meals;
      setMeals(updatedMeals);
      setSelectedMeal(null);
      setFormData({
        mealsName: "",
        mealsKind: "",
        mealStartTime: "",
        mealEndTime: "",
        RamadanMeal: false,
        mealReligion: "",
        studentReligion: "",
      });

      handleCancelButtonClick();
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  const filterMeals = (meal) => {
    if (showRamadanMeals && meal.RamadanMeal) {
      return true;
    }
    if (showNonRamadanMeals && !meal.RamadanMeal) {
      return true;
    }
    return false;
  };

  const filteredMeals = meals.filter(filterMeals);

  const handleEditButtonClick = () => {
    setFormData({
      mealsName: selectedMeal.mealsName,
      mealsKind: selectedMeal.mealsKind,
      mealStartTime: selectedMeal.mealStartTime,
      mealEndTime: selectedMeal.mealEndTime,
      RamadanMeal: selectedMeal.RamadanMeal,
      mealReligion: selectedMeal.mealReligion,
      studentReligion: selectedMeal.studentReligion,
    });
    setShowUpdateForm(true);
  };

  const handleCancelButtonClick = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div>
          <label>
            <input
              type="checkbox"
              checked={showRamadanMeals}
              onChange={() => setShowRamadanMeals(!showRamadanMeals)}
            />
            رمضان
          </label>
          <label>
            <input
              type="checkbox"
              checked={showNonRamadanMeals}
              onChange={() => setShowNonRamadanMeals(!showNonRamadanMeals)}
            />
            غير رمضان
          </label>
        </div>
        <ul>
          {filteredMeals.map((meal) => (
            <li key={meal._id} onClick={() => setSelectedMeal(meal)}>
              {meal.mealsName}
            </li>
          ))}
        </ul>
        <p>_______________________</p>

        <h2>اضافة وجبات</h2>
        <form>
          <p> اسم الوجبة </p>
          <input
            type="text"
            name="mealsName"
            label="اسم الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />

          <p> نوع الوجبة </p>
          <input
            type="text"
            name="mealsKind"
            label="نوع الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />
          <p> وقت بداية استلام الوجبة </p>
          <input
            type="text"
            name="mealStartTime"
            label="وقت بداية استلام الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />
          <p> وقت نهاية استلام الوجبة </p>
          <input
            type="text"
            name="mealEndTime"
            label="وقت نهاية استلام الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />
          <p> ديانة الوجبة </p>
          <input
            type="text"
            name="mealReligion"
            label="ديانة الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />
          <p> ديانة مستلم الوجبة </p>
          <input
            type="text"
            name="studentReligion"
            label="ديانة مستلم الوجبة "
            onChange={handleInputChange}
            className="form-input"
          />
          <label className="checkbox-label">
            الوجبة رمضانية:
            <input
              type="checkbox"
              name="RamadanMeal"
              checked={formData.RamadanMeal}
              onChange={handleInputChange}
              className="checkbox-input"
            />
          </label>
          {auth && (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
            <button
              type="button"
              onClick={handleAddMeal}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              اضافة
            </button>
          )}
        </form>
      </div>
      <div className="coll">
        {selectedMeal && (
          <div>
            <p>اسم الوجبة: {selectedMeal.mealsName}</p>
            <p>نوع الوجبة: {selectedMeal.mealsKind}</p>
            <p>وقت بداية الحصول علي الوجبة: {selectedMeal.mealStartTime}</p>
            <p>وقت نهاية الحصول علي الوجبة: {selectedMeal.mealEndTime}</p>
            <p>الوجبة رمضانية: {selectedMeal.RamadanMeal ? "ايوة" : "لا"}</p>
            <p>ديانة الوجبة: {selectedMeal.mealReligion}</p>
            <p>ديانة من يتناول الوجبة: {selectedMeal.studentReligion}</p>

            {auth &&
              (auth.athurity === "الكل" || auth.athurity === "تعديل") && (
                <button
                  type="button"
                  onClick={handleEditButtonClick}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  تعديل
                </button>
              )}
          </div>
        )}

        {showUpdateForm && selectedMeal && (
          <form>
            <input
              type="text"
              name="mealsName"
              label="اسم الوجبة "
              value={formData.mealsName}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="mealsKind"
              label="نوع الوجبة "
              value={formData.mealsKind}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="mealStartTime"
              label="وقت بداية استلام الوجبة "
              value={formData.mealStartTime}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="mealEndTime"
              label="وقت نهاية استلام الوجبة "
              value={formData.mealEndTime}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="mealReligion"
              label="ديانة الوجبة "
              value={formData.mealReligion}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="studentReligion"
              label="ديانة مستلم الوجبة "
              value={formData.studentReligion}
              onChange={handleInputChange}
              className="form-input"
            />
            <label className="checkbox-label">
              الوجبة رمضانية:
              <input
                type="checkbox"
                name="RamadanMeal"
                checked={formData.RamadanMeal}
                onChange={handleInputChange}
                className="checkbox-input"
              />
            </label>
            <button
              type="button"
              onClick={handleUpdateMeal}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              تعديل
            </button>
            <button
              type="button"
              onClick={handleCancelButtonClick}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              الغاء
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MealsOFAdmin;
