import React, { useEffect, useState } from "react";
import axios from "axios";

// http://localhost:5000/statistics/MealTakingMale
const TakeMeal = () => {
  const [ofYear, setOfYear] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchTakeMeal();
  }, [ofYear]);

  const fetchTakeMeal = async () => {
    const queryString = `?ofYear=${ofYear}`;
    if (ofYear) {
      try {
        const response = await axios.get(
          ` http://localhost:5000/statistics/MealTakingMale${queryString}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          ` http://localhost:5000/statistics/MealTakingMale`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <div></div>;
};

export default TakeMeal;
