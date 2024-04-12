import React, { useState } from "react";
import "./Tatbeekat.css";

import CorrectionOfId from "./CorrectionOfId";

const Page1 = () => (
  <div>
    <h2> تغيير الرقم القومي </h2>
    <CorrectionOfId />
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

  const buttons = [{ text: "تغيير الرقم القومي  ", page: <Page1 /> }];

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

export default App;
