import React, { useState } from "react";
import "./Tatbeekat.css";
import Review from "./ReviewOnlineRequests";
import AcceptSpecialCases from "./AcceptSpecialCases";
import Social from "../Pages/SocialResearchCases";
import Upload from "../Pages/UploadPhoto";
import CardPrinting from "../Pages/PrintCard";
import Recieve from "../Pages/RecieveMeal";
import Book from "../Pages/BookMeal";
import Abscence from "../Pages/MassPermissions";
import Penalty from "../Pages/MassPenalty";
import Expulsion from "../Pages/MassExpulsion";
import PrintAcceptanceNotification from "./PrintAcceptanceNotification";
import ChangeHousinhgType from "./ChangeHousingType";

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
    <h2>تغيير نوع السكن</h2>
    <ChangeHousinhgType />
  </div>
);

const Page4 = () => (
  <div>
    <h2>حالات البحث الاجتماعي</h2>
    <Social />
  </div>
);

const Page5 = () => (
  <div>
    <h2>قبول حالات خاصة</h2>
    <AcceptSpecialCases />
  </div>
);

const Page6 = () => (
  <div>
    <h2>رفع الصور</h2>
    <Upload />
  </div>
);

const Page7 = () => (
  <div>
    <h2>طباعة البطاقات</h2>
    <CardPrinting />
  </div>
);
const Page8 = () => (
  <div>
    <h2>استلام الوجبات(اكسل)</h2>
    <Recieve />
  </div>
);

const Page9 = () => (
  <div>
    <h2>حجز الوجبات(اكسل)</h2>
    <Book />
  </div>
);

const Page10 = () => (
  <div>
    <h2> تصريح جماعي</h2>
    <Abscence />
  </div>
);
const Page11 = () => (
  <div>
    <h2> جزاء جماعي</h2>
    <Penalty />
  </div>
);

const Page12 = () => (
  <div>
    <h2> اخلاء جماعي</h2>
    <Expulsion />
  </div>
);

const Page13 = () => (
  <div>
    <h2> طباعة اخطار القبول</h2>
    <PrintAcceptanceNotification />
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
    { text: "تصريح جماعي", page: <Page10 /> },
    { text: "قبول حالات خاصة", page: <Page5 /> },
    { text: "حجز وجبات (اكسل)", page: <Page9 /> },
    { text: "رفع الصور", page: <Page6 /> },
    { text: "جزاء جماعي", page: <Page11 /> },
    { text: "طباعة البطاقات", page: <Page7 /> },
    { text: "تغيير نوع السكن", page: <Page3 /> },
    { text: "طباعة اخطار القبول", page: <Page13 /> },
    { text: "استلام الوجبات(اكسل)", page: <Page8 /> },
    { text: "حالات البحث الاجتماعي", page: <Page4 /> },
    { text: "اخلاء جماعي", page: <Page12 /> },
  ];

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
     <div className="buttonn"><ButtonDisplay buttons={buttons} handleClick={handleClick} /></div> 
      <div className="sisi"> {currentPage} </div>
    </div>
  );
};

export default App;
