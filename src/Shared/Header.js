import React, { useState } from "react";
import man from "../images/man.png";
import woman from "../images/woman.png";
import settings from "../images/settings.png";
import "./Header.css";
import SIdeBar from "./SIdeBar";

function Text() {
  return <SIdeBar />;
}
function text2() {
  return <SIdeBar />;
}
function Content({ activeIndex, activeTab, show }) {
  const buttonContent = [
    [<Text />, <Text />, "Button C"],
    ["Button X", "Button Y", "Button Z"],
    ["Button M", "Button N", "Button O"],
  ];
  return show && <div>{buttonContent[activeTab][activeIndex]}</div>;
}

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);

  const buttonSets = [
    ["بيانات اساسية", "السكن", "Button C"],
    ["Button X", "Button Y", "Button Z"],
    ["Button M", "Button N", "Button O"],
  ];

  const Tabs = [
    { id: 0, image: man, titel: "بيانات الطلاب" },
    { id: 1, image: woman, titel: "بيانات الطالبات" },
    { id: 2, image: settings, titel: "الإشراف على النظام" },
  ];

  function handleButtonClick(index) {
    setActiveIndex(index);
    setShow(true);
  }
  function handleTabClick(index) {
    setActiveTab(index);
    setShow(false);
  }

  return (
    <div>
      <nav>
        <ul className="navbar">
          {Tabs.map((tab) => (
            <li key={tab.id} onClick={() => handleTabClick(tab.id)}>
              <img src={tab.image} alt={tab.title} />
              <button>{tab.titel}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div id="contentDiv">
        {buttonSets[activeTab].map((btn, index) => (
          <button key={index} onClick={() => handleButtonClick(index)}>
            {btn}
          </button>
        ))}
        <div id="content">
          <Content
            activeIndex={activeIndex}
            activeTab={activeTab}
            show={show}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
