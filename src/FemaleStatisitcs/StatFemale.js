import React, { useState } from "react";
import "../Pages/Tatbeekat.css";

import NumOfAppliersFemale from "./NumOfAppliersFemale";
import NumOfResidentFemale from "./NumOfResidentFemale";
import NumOfPrintedCardFemale from "./NumOfPrintedCardFemale";
import NumberOfAllStudentsFemale from "./NumberOfAllStudentsFemale";

// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";

const Page1 = () => (
  <div>
    <NumOfAppliersFemale />
  </div>
);
const Page2 = () => (
  <div>
    <NumOfResidentFemale />
  </div>
);

const Page3 = () => (
  <div>
    <NumOfPrintedCardFemale />
  </div>
);
const Page5 = () => (
  <div>
    <NumberOfAllStudentsFemale />
  </div>
);
const Page4 = () => <div></div>;

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2 style={{ fontSize: "28px", color: "darkred", textAlign: "center" }}>
      احصائيات
    </h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const StatFemale = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "اعداد المتقدمين ", page: <Page1 /> },
    { text: "اعداد المقيمين", page: <Page2 /> },
    { text: "احصائيات البطاقات المطبوعة ", page: <Page3 /> },
    { text: "اعداد جميع الطالبات ", page: <Page5 /> },
    // { text: "تجهيز الوجبات  ", page: <Page4 /> },

    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
    { text: "   " },
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

export default StatFemale;
