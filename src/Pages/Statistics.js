import React, { useState } from "react";
import "./Tatbeekat.css";
import NumOfStudents from "./NumOfStudents";
import NumOfResident from "./NumOfResident";
// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";

const Page2 = () => (
  <div>
    <NumOfResident />
  </div>
);

const Page3 = () => (
  <div>
    <h2>Page 3</h2>
  </div>
);
const Page5 = () => (
  <div>
    <NumOfStudents />
  </div>
);

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2>احصائيات</h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const Statistics = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "اعداد المتقدمين  " },
    { text: "اعداد المقيمين", page: <Page2 /> },
    { text: "احصائيات البطاقات المطبوعة ", page: <Page3 /> },
    { text: "اعداد جميع الطلاب ", page: <Page5 /> },
    { text: "تجهيز الوجبات  ", page: <Page3 /> },
    { text: "احصائية استلام الوجبات ", page: <Page3 /> },
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

export default Statistics;
