import React, { useState } from "react";
import "./Tatbeekat.css";
import NumOfStudents from "./NumOfStudents";
import NumOfResident from "./NumOfResident";
import NumOfAppliers from "./NumOfAppliers";
import NumOfPrintedCards from "./NumOfPrintedCards";
import MealPreparation from "./MealPreparation";
import StatuesOfRooms from "./Reportts/StatuesOfRooms";
import FeesReports from "./Reportts/FeesReports";
// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";
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
    { text: "قوائم الطلاب " },
    { text: "الجزاءات" },
    { text: "الغياب والتصاريح " },
    { text: "الرسوم ", page: <Page3 /> },
    { text: "حالة الغرف  ", page: <Page4 /> },
    { text: "احصائية استلام الوجبات " },
    { text: "احصائية استلام الوجبات " },
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
