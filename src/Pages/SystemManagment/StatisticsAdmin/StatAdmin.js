import React, { useState } from "react";
import "../../Tatbeekat.css";
import ActiveAdmin from "./ActiveAdmin";
import NumberOfStudentsBasedOnHousing from "./NumberOfStudentsBasedOnHousing";
import NumberOfRecievedMeals from "./NumberOfRecievedMeals";
import TakeMeal from "./TakeMeal";
import MealPreparation from "../../MealPreparation";

const Page1 = () => (
  <div>
    <h2> نشاط المستخدمين </h2>
    <ActiveAdmin />
  </div>
);
const Page2 = () => (
  <div>
    <h2> احصائية استلام الوجبات </h2>
    <TakeMeal />
  </div>
);
const Page3 = () => (
  <div>
    <h2> اعداد الطلاب حسب نوع السكن </h2>
    <NumberOfStudentsBasedOnHousing />
  </div>
);
const Page4 = () => (
  <div>
    <h2> عدد الوجبات المستلمة </h2>
    <NumberOfRecievedMeals />
  </div>
);
const Page5 = () => (
  <div>
    <h2> تجهيز وجبات </h2>
    <MealPreparation />
  </div>
);

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2> إحصائيات عامة </h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const StatAdmin = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [selectedStudentData, setSelectedStudentData] = useState(null); // State to hold selected student data

  const handleStudentClick = (student) => {
    console.log("Clicked student:", student);
    setStudentId(student._id); // Set the _id of the clicked student
    setSelectedStudentData(student); // Set the selected student data
  };
  const buttons = [
    { text: "نشاط المستخدمين ", page: <Page1 /> },
    { text: "احصائية استلام الوجبات", page: <Page2 /> },
    { text: " اعداد الطلاب حسب نوع السكن  ", page: <Page3 /> },
    { text: " عدد الوجبات المستلمة    ", page: <Page4 /> },
    { text: " تجهيز وجبات      ", page: <Page5 /> },
  ];

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

export default StatAdmin;
