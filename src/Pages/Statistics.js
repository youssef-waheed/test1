import React, { useState } from "react";
import "./Tatbeekat.css";
// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";

const Page2 = () => (
  <div>
    <h2>Page 2</h2>
  </div>
);

const Page3 = () => (
  <div>
    <h2>Page 3</h2>
  </div>
);
const Page5 = () => <div>{/* <AcceptSpecialCases /> */}</div>;

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
    { text: "اعداد جميع الطلاب ", page: <Page3 /> },
    { text: "تجهيز الوجبات  ", page: <Page5 /> },
    { text: "احصائية استلام الوجبات ", page: <Page3 /> },
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
