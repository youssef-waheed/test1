import React, { useState } from "react";
import "../../Tatbeekat.css";
import ExcludedCountries from "./ExcludedCountries";
import TransferredStudents from "./TransferredStudents";
import UniversityStructure from "./UniversityStructure";
import CityStructure from "./CityStructure";
import GetAdmin from "./GetAdmin";

const Page1 = () => (
  <div>
    <ExcludedCountries />
  </div>
);
const Page2 = () => (
  <div>
    <TransferredStudents />
  </div>
);
const Page3 = () => (
  <div>
    <UniversityStructure />
  </div>
);
const Page4 = () => (
  <div>
    <CityStructure />
  </div>
);
const Page5 = () => (
  <div>
    <GetAdmin />
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

const ReportsAdmin = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "البلاد المستبعده   ", page: <Page1 /> },
    { text: "الطلاب المحولين   ", page: <Page2 /> },
    { text: " الهيكل الجامعى   ", page: <Page3 /> },
    { text: " هيكل المدن   ", page: <Page4 /> },
    { text: " صلاحيات المستخدمين    ", page: <Page5 /> },
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

export default ReportsAdmin;
