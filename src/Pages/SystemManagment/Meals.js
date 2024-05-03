import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealsComponent = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [formData, setFormData] = useState({
    mealsName: '',
    mealsKind: '',
    mealStartTime: '',
    mealEndTime: '',
    RamadanMeal: false,
    mealReligion: '',
    studentReligion: '',
    mealAfterSubsidy: '',
    mealBeforeSubsidy: '',
    editAndAdd: '',
    createdAt: '',
  });

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mealsAdd/');
        setMeals(response.data.data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMeals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMeal = async () => {
    try {
      const response = await axios.post('http://localhost:5000/mealsAdd/', formData);
      setMeals([...meals, response.data.data.meals]);
      setFormData({
        mealsName: '',
        mealsKind: '',
        mealStartTime: '',
        mealEndTime: '',
        RamadanMeal: false,
        mealReligion: '',
        studentReligion: '',
        mealAfterSubsidy: '',
        mealBeforeSubsidy: '',
        editAndAdd: '',
        createdAt: '',
      });
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleUpdateMeal = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/mealsAdd/${selectedMeal._id}`, formData);
      const updatedMealIndex = meals.findIndex((meal) => meal._id === selectedMeal._id);
      const updatedMeals = [...meals];
      updatedMeals[updatedMealIndex] = response.data.data.meals;
      setMeals(updatedMeals);
      setSelectedMeal(null);
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  return (
    <div className='two-column-wrapper'>
      <div className='col'>

      </div>
      <div className='coll'>
        
      </div>
      <h2>Add Meal</h2>
      <form>
        <input type="text" name="mealsName" value={formData.mealsName} onChange={handleInputChange} />
        {/* Add input fields for other meal properties */}
        <button type="button" onClick={handleAddMeal}>Add Meal</button>
      </form>

      <h2>Update Meal</h2>
      {selectedMeal && (
        <form>
          <input type="text" name="mealsName" value={formData.mealsName} onChange={handleInputChange} />
          {/* Add input fields for other meal properties */}
          <button type="button" onClick={handleUpdateMeal}>Update Meal</button>
        </form>
      )}

      <h2>Meals List</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal._id} onClick={() => setSelectedMeal(meal)}>
            {meal.mealsName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealsComponent;
