import React, { useState } from "react";
import Review from "./ReviewFemale";
import ClassificationGeneral from "./ClassificationFemal";
import Permission from "./MassPermissionFemale";
import AcceptSpecialCases from "./SpecialCasesFemale";
import BookMeal from "./BookMeal";
import UploadPhoto from "../Pages/UploadPhoto";
import MassPenalty from "./MassPenalty";

const Page1 = () => (
  <div>
    <h2> مراجعة طلبات الانترنت</h2>
    <Review />
  </div>
);

const Page2 = () => (
  <div>
    <h2>تنسيق طالبات</h2>
    <ClassificationGeneral />
  </div>
);

const Page3 = () => (
  <div>
    <h2>تصريح جماعي</h2>
    <Permission />
  </div>
);

const Page4 = () => (
  <div>
    <h2>قبول حالات خاصة</h2>
    <AcceptSpecialCases />
  </div>
);

const Page5 = () => (
  <div>
    <h2>حجز وجبات (اكسل)</h2>
    <BookMeal />
  </div>
);

const Page6 = () => (
  <div>
    <h2>رفع الصور    </h2>
    <UploadPhoto />
  </div>
);

const Page7 = () => (
  <div>
    <h2>جزاء جماعي</h2>
    <MassPenalty />
  </div>
);

const Page8 = () => (
  <div>
    <h2>طباعة البطاقات    </h2>
    <Permission />
  </div>
);

const Page9 = () => (
  <div>
    <h2>تغيير نوع السكن    </h2>
    <Permission />
  </div>
);

const Page10 = () => (
  <div>
    <h2>طباعة اخطار القبول    </h2>
    <Permission />
  </div>
);

const Page11 = () => (
  <div>
    <h2>استلام الوجبات(اكسل)    </h2>
    <Permission />
  </div>
);

const Page12 = () => (
  <div>
     <h2>حالات البحث الاجتماعي</h2>
    
    <Permission />
  </div>
);

const Page13 = () => (
  <div>
   <h2>اخلاء جماعي</h2>
    <Permission />
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
    { text: "تصريح جماعي", page: <Page3 /> },
    { text: "قبول حالات خاصة", page: <Page4 /> },
    { text: "حجز وجبات (اكسل)", page: <Page5 /> },
    { text: "رفع الصور", page: <Page6 /> },
    { text: "جزاء جماعي", page: <Page7 /> },
    { text: "طباعة البطاقات", page: <Page8 /> },
    { text: "تغيير نوع السكن", page: <Page9 /> },
    { text: "طباعة اخطار القبول", page: <Page10 /> },
    { text: "استلام الوجبات(اكسل)", page: <Page11 /> },
    { text: "حالات البحث الاجتماعي", page: <Page12 /> },
    { text: "اخلاء جماعي", page: <Page13 /> },
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
