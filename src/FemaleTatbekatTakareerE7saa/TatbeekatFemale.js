import React, { useState } from "react";
import Review from "./ReviewFemale";

const Page1 = () => (
  <div>
    <h2> مراجعة طلبات الانترنت</h2>
    <Review />
  </div>
);

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

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "مراجعة طلبات الانترنت", page: <Page1 /> },
    { text: "تنسيق", page: <Page2 /> },
    { text: "سحب الصور", page: <Page3 /> },
    { text: "تصريح جماعي", page: <Page3 /> },
    { text: "قبول حالات خاصة", page: <Page3 /> },
    { text: "حجز وجبات (اكسل)", page: <Page3 /> },
    { text: "رفع الصور", page: <Page3 /> },
    { text: "جزاء جماعي", page: <Page3 /> },
    { text: "طباعة البطاقات", page: <Page3 /> },
    { text: "تغيير نوع السكن", page: <Page3 /> },
    { text: "طباعة اخطار القبول", page: <Page3 /> },
    { text: "استلام الوجبات(اكسل)", page: <Page3 /> },
    { text: "حالات البحث الاجتماعي", page: <Page3 /> },
    { text: "اخلاء جماعي", page: <Page3 /> },
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

export default App;
