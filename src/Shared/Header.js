import React, { useState } from "react";
import man from "../images/man.png";
import woman from "../images/woman.png";
import settings from "../images/settings.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import SideBarForm from "./SideBarForm";
import "../Style/Bar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";




const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const buttonSets = [
    ["بيانات اساسية", "السكن", "فصل الطلاب" , "الجزاءات" , "الغياب و التصاريح" , "الرسوم" , "بيان حالة" , "حجب وجبات" , "بيان الرسوم" , "تطبيقات" , "تقارير" , "احصائيات"],
    ["بيانات اساسية", "السكن", "فصل الطالبات" , "الجزاءات" , "الغياب و التصاريح" , "الرسوم" , "بيان حالة" , "حجب وجبات" , "بيان الرسوم" , "تطبيقات" , "تقارير" , "احصائيات"],
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
  const activeButton = buttonSets[activeTab][activeIndex];

  
function SIdeBar ()  {
  return (
    <Container className="container">
    
          <div className="bar">{activeButton}</div>
          <div className="select">
            <p className="academicyear">العام الاكديمي</p>
            <Form.Select size="sm" className="selectmenu">
              <option>2025 - 2026</option>
              <option>2024 - 2025</option>
              <option>2023 - 2024</option>
            </Form.Select>
          </div>
          <div className="select">
            <p>الكلية</p>
            <Form.Select size="sm" className="selectmenu">
              <option>حاسبات</option>
              <option>هندسة</option>
              <option>آداب</option>
            </Form.Select>
          </div>
          <div className="form">
            <SideBarForm />
          </div>
          
      
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Container>
  );
};
function Text() {

  return (
    <div className="two-column-wrapper">
      <div className="col"><SIdeBar /></div>
      <div className="coll">Column 2 (75% width)</div>
    </div>
  );

}
function Text2() {
  return( 
    <div className="two-column-wrapper">
     <div className="col"><SIdeBar /></div>
      <div className="coll">Column 2 (75% width)</div></div>
  );
}
function Content({ activeIndex, activeTab, show }) {
  const buttonContent = [
    [<Text />, <Text2 />, "فصل الطلاب" , "الجزاءات" , "الغياب و التصاريح" , "الرسوم" , "بيان حالة" , "حجب وجبات" , "بيان الرسوم" , "تطبيقات" , "تقارير" , "احصائيات"],
    ["بيانات اساسية", "السكن", "فصل الطالبات" , "الجزاءات" , "الغياب و التصاريح" , "الرسوم" , "بيان حالة" , "حجب وجبات" , "بيان الرسوم" , "تطبيقات" , "تقارير" , "احصائيات"],
    ["Button M", "Button N", "Button O"],
  ];
  return show && <div>{buttonContent[activeTab][activeIndex]}</div>;
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
