import axios from "axios";
import React, { useEffect, useState } from "react";

const AcceptSpecialCases = () => {
  const [specialCases, setSpecialCases] = useState([]);

  useEffect(() => {
    fetchAcceptSpecialCases();
    // fetchStudents();
  }, []);

  const fetchAcceptSpecialCases = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/applications/getRejectedStudents`
      );
      console.log(response);
      setSpecialCases(response.data.data.student);
    } catch (error) {
      console.log(error);
    }
  };
  const acceptApplication = async (studentID) => {
    try {
      await axios.put(
        `http://localhost:5000/applications/acceptRejectedStudents/${studentID}`
      );
      setSpecialCases(
        specialCases.map((specialCases) => {
          if (specialCases._id === studentID) {
            return { ...specialCases, statusOfOnlineRequests: "accepted" };
          }
          return specialCases;
        })
      );
      fetchAcceptSpecialCases();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul>
        {specialCases.map((cases) => (
          <li key={cases._id}>
            {cases.studentName} - {cases.statusOfOnlineRequests}
            {/* <button onClick={() => acceptApplication(application._id)}>Accept</button>
        <button onClick={() => rejectApplication(application._id)}>Reject</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptSpecialCases;
