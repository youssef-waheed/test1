import React, { useState } from "react";
import "./Tatbeekat.css";
import NumOfStudents from "./NumOfStudents";
import NumOfResident from "./NumOfResident";
import NumOfAppliers from "./NumOfAppliers";
import NumOfPrintedCards from "./NumOfPrintedCards";
import MealPreparation from "./MealPreparation";
import StatuesOfRooms from "./Reportts/StatuesOfRooms";
import FeesReports from "./Reportts/FeesReports";
import ExpulsionStudents from "./Reportts/ExpulsionStudents";
import PrintedCards from "./Reportts/PrintedCards";
import StudentList from "./Reportts/StudentList";
import Penalties from "./Reportts/Penalties";
import ApsenceAndPermitsReport from "./Reportts/ApsenceAndPermitsReport";
// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";

const Page1 = () => (
  <div>
    <StudentList />
  </div>
);
const Page2 = () => (
  <div>
    <Penalties />
  </div>
);
const Page3 = () => (
  <div>
    <FeesReports />
  </div>
);

const Page4 = () => (
  <div>
    <StatuesOfRooms />
  </div>
);
const Page5 = () => (
  <div>
    <ExpulsionStudents />
  </div>
);
const Page6 = () => (
  <div>
    <PrintedCards />
  </div>
);
const Page7 = () => (
  <div>
    <ApsenceAndPermitsReport />
  </div>
);

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2 style={{ fontSize: "28px", color: "darkred" }}>التقارير</h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "قوائم الطلاب ", page: <Page1 /> },
    { text: "الجزاءات", page: <Page2 /> },
    { text: "الغياب والتصاريح ", page: <Page7 /> },
    { text: "الرسوم ", page: <Page3 /> },
    { text: "حالة الغرف  ", page: <Page4 /> },
    { text: "الطلاب المقصوئين ", page: <Page5 /> },
    { text: "البطاقات المطبوعة   ", page: <Page6 /> },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
  ];

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ButtonDisplay buttons={buttons} handleClick={handleClick} />
      <div className="sisi"> {currentPage} </div>
    </div>
  );
};

export default Reports;
