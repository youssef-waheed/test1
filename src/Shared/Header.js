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
import Living from "../Pages/Living";
import Students from "../Pages/Students";
import Penalties from "../Pages/Penalties";
import AbsenceandPermits from "../Pages/AbsenceandPermits";
import Fees from "../Pages/Fees";
import StatementCase from "../Pages/StatementCase";
import Meals from "../Pages/Meals";
import FeeStatement from "../Pages/FeeStatement";
import MainInfo from "../Pages/MainInfo";
import Instructions from "../Pages/InstructionsForApplying";
import Tskeen from "../Pages/Tskeen";
const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const buttonSets = [
    [
      "بيانات اساسية",
      "السكن",
      "فصل الطلاب",
      "الجزاءات",
      "الغياب و التصاريح",
      "الرسوم",
      "بيان حالة",
      "حجب وجبات",
      "بيان الرسوم",
      "تطبيقات",
      "تقارير",
      "احصائيات",
    ],
    [
      "بيانات اساسية",
      "السكن",
      "فصل الطالبات",
      "الجزاءات",
      "الغياب و التصاريح",
      "الرسوم",
      "بيان حالة",
      "حجب وجبات",
      "بيان الرسوم",
      "تطبيقات",
      "تقارير",
      "احصائيات",
    ],
    ["مواعيد التقديم",
       "تعليمات التقديم",
        "صور الجامعة",
        "انواع السكن",
        "الوجبات" ,
        "الرسوم"  ,
        "الغرف",
        "الفئات" ,
        "البلاد" ,
        "المستخدمين" ,
        "تطبيقات الطلاب" ,
        "احصائيات عامة" 
      , "تقارير"],
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

  function SIdeBar() {
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
  }
  function Text() {
    return (
      <div className="two-column-wrapper">
       
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll"><MainInfo /></div>
      </div>
    );
  }
  function Text2() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Living />
        </div>
      </div>
    );
  }
  function Text3() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Students />
        </div>
      </div>
    );
  }
  function Text4() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Penalties />
        </div>
      </div>
    );
  }
  function Text5() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <AbsenceandPermits />
        </div>
      </div>
    );
  }
  function Text6() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Fees />{" "}
        </div>
      </div>
    );
  }
  function Text7() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <StatementCase />
        </div>
      </div>
    );
  }
  function Text8() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Meals />{" "}
        </div>
      </div>
    );
  }
  function Text9() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <FeeStatement />
        </div>
      </div>
    );
  }

  function Text99() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Instructions />
        </div>
      </div>
    );
  }


  function Text999() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">
          <Tskeen />
        </div>
      </div>
    );
  }
  
  function Content({ activeIndex, activeTab, show }) {
    const buttonContent = [
      [
        <Text />,
        <Text2 />,
        <Text3 />,
        <Text4 />,
        <Text5 />,
        <Text6 />,
        <Text7 />,
        <Text8 />,
        <Text9 />,
        "تطبيقات",
        "تقارير",
        "احصائيات",
      ],
      [
        <Text />,
        <Text2 />,
        <Text3 />,
        <Text4 />,
        <Text5 />,
        <Text6 />,
        <Text7 />,
        <Text8 />,
        <Text9 />,
        "تطبيقات",
        "تقارير",
        "احصائيات",
      ],
      ["مواعيد التقديم",
       <Text99 />,
        "صور الجامعة",
        "انواع السكن",
        "الوجبات" ,
        "الرسوم"  ,
        <Text999 />,
        "الفئات" ,
        "البلاد" ,
        "المستخدمين" ,
        "تطبيقات الطلاب" ,
        "احصائيات عامة" 
      , "تقارير"],
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
