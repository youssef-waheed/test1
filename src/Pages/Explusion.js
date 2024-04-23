import axios from "axios";
import React, { useEffect, useState } from "react";

const Explusion = () => {
  const [students, setStudents] = useState({
    ofYear: "",
  });

  useEffect(() => {
    fetchExplusionStudents();
  }, [students.ofYear]); // Update the dependency array to include students.ofYear

  const fetchExplusionStudents = async () => {
    try {
      console.log("Sending Data:", {
        ofYear: students.ofYear,
      });
      const response = await axios.get("http://localhost:5000/expulsion/", {
        params: {
          ofYear: students.ofYear,
        },
      });
      console.log(response.data); // Assuming the response data contains the students
      setStudents({
        ofYear: "", // Clearing the year after successful fetch (if needed)
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update the onChange handler to set the selected year
  const handleYearChange = (e) => {
    setStudents({
      ofYear: e.target.value,
    });
  };

  return (
    <div>
      {/* Add the select element for year selection */}
      <select value={students.ofYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        {/* Add more options if needed */}
      </select>
    </div>
  );
};

export default Explusion;
