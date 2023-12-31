import React, { useState } from "react";
import man from "../images/man.png";
import woman from "../images/woman.png";
import settings from "../images/settings.png";
import "./Header.css";

const ButtonAContent = () => {
  return <div>Content for Button A </div>;
};

const ButtonBContent = () => {
  return <div>Content for Button B </div>;
};
const ButtonCContent = () => {
  return <div>Content for Button C </div>;
};
const ButtonXContent = () => {
  return <div>Content for Button X  </div>;
};
const ButtonYContent = () => {
  return <div>Content for Button Y  </div>;
};
const ButtonZContent = () => {
  return <div>Content for Button Z </div>;
};
const ButtonMContent = () => {
  return <div>Content for Button M  </div>;
};
const ButtonNContent = () => {
  return <div>Content for Button N </div>;
};
const ButtonOContent = () => {
  return <div>Content for Button O </div>;
};


const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonSets = [
    ["Button A", "Button B", "Button C"],
    ["Button X", "Button Y", "Button Z"],
    ["Button M", "Button N", "Button O"]
  ];

  const contentComponents = [
    null, // Placeholder for no content
    [ButtonAContent, ButtonBContent, ButtonCContent],
    [ButtonXContent, ButtonYContent, ButtonZContent],
    [ButtonMContent, ButtonNContent, ButtonOContent]
    // Add more components for other buttons
  ];

  const buttons = buttonSets[activeIndex].map((button, index) => (
    <button key={index} onClick={() => setActiveIndex(index)}>
      {button}
    </button>
  ));

  const ContentComponent = contentComponents[activeIndex];

  return (
    <div>
      <nav>
        <ul className="navbar">
          <li>
            <img src={man} alt="Male Logo" />
            <button onClick={() => setActiveIndex(0)}>بيانات الطلاب</button>
          </li>
          <li>
            <img src={woman} alt="Female Logo" />
            <button onClick={() => setActiveIndex(1)}>بيانات الطالبات</button>
          </li>
          <li>
            <img src={settings} alt="Settings Logo" />
            <button onClick={() => setActiveIndex(2)}>الاشراف على النظام</button>
          </li>
        </ul>
      </nav>
      <div id="contentDiv">
        {buttons}
        <div className="content">
          {ContentComponent && <ContentComponent />}
        </div>
      </div>
    </div>
  );
};

export default Header;
