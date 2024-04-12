import React, { useState } from "react";
import "../../Tatbeekat.css";
import CorrectNationalID from "./CorrectNationalID";

const Page1 = () => (
  <div>
    <h2> تغيير الرقم القومي </h2>
    <CorrectNationalID />
  </div>
);

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2>تطبيقات</h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const ApplicationsAdmin = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [selectedStudentData, setSelectedStudentData] = useState(null); // State to hold selected student data

  const handleStudentClick = (student) => {
    console.log("Clicked student:", student);
    setStudentId(student._id); // Set the _id of the clicked student
    setSelectedStudentData(student); // Set the selected student data
  };
  const buttons = [{ text: "تغيير الرقم القومي  ", page: <Page1 /> }];

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="buttonn">
        <ButtonDisplay buttons={buttons} handleClick={handleClick} />
      </div>
      <div className="sisi"> {currentPage} </div>
    </div>
  );
};

export default ApplicationsAdmin;
