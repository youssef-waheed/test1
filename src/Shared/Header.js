import React, { useEffect, useState } from "react";
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
import AbsenceandPermits from "../Pages/AbsenceandPermits";
import Fees from "../Pages/Fees";
import StatementCase from "../Pages/StatementCase";
import Meals from "../Pages/Meals";
import FeeStatement from "../Pages/FeeStatement";
import ApplicationDeadline from "../Pages/SystemManagment/ApplicationDeadline";
// import TypesOfLiving from "../Pages/SystemManagment/TypesOfLiving";
// import { Checkbox } from "@mui/material";
import TypesOfLivings from "../Pages/TypesOfLivings";
import Penalties from "../Pages/Penalties/Penalties";
import axios from "axios";
import Checkbox from "../Shared/Checkbox";

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(false);
  const [College, setCollege] = useState(""); // State for storing the selected college
  const [ofYear, setOfYear] = useState(""); // State for storing the selected academic year
  // var ofYear;
  // var College;
  var egyptions;
  var expartriates;
  var normalHousing;
  var specialHousing;
  var oldStudent;
  var newStudent;
  var appliers;
  var acceptedApplications;
  const colleges = [
    "كلية الفنون الجميلة",
    "كلية الهندسة (حلوان)",
    "كلية الهندسة (المطرية)",
    "كلية التجارة وإدارة الأعمال (حلوان)",
    "كلية التجارة وإدارة الأعمال (الزمالك)",
    "كلية الحاسبات والمعلومات",
    "كلية السياحة والفنادق",
    "كلية الفنون التطبيقية",
    "كلية التكنولوجيا والتعليم",
    "كلية الاقتصاد المنزلي",
    "كلية التربية الفنية",
    "كلية التربية الموسيقية",
    "كلية التربية الرياضية (بنين) بالهرم",
    "كلية التربية الرياضية (بنات) بالجزيرة",
    "كلية الحقوق",
    "كلية الآداب",
    "كلية التربية",
    "كلية الخدمة الاجتماعية",
    "كلية الصيدلة",
    "كلية العلوم",
    "كلية التمريض",
    "كلية الطب",
    "المعهد القومي للملكية الفكرية",
    "معهد التمريض",
  ];

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
    ["مواعيد التقديم", "تعليمات التقدم", "صور الجامعة", "أنواع السكن المميز"],
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
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [checkboxes, setCheckboxes] = useState(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
    return (
      storedCheckboxes || [
        { label: "مصرى", checked: false },
        { label: "وافد", checked: false },
        { label: "متقدمين", checked: false },
        { label: "مقبولين", checked: false },
        { label: "قدامى", checked: false },
        { label: "جدد", checked: false },
        { label: "سكن عادى", checked: false },
        { label: "سكن مميز", checked: false },
        { label: "إخلاء ", checked: false },
      ]
    );
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const queryString = `?egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&appliers=${appliers}&acceptedApplications=${acceptedApplications}&College=${College}&ofYear=${ofYear}`;

    if (
      egyptions ||
      expartriates ||
      normalHousing ||
      specialHousing ||
      oldStudent ||
      newStudent ||
      appliers ||
      acceptedApplications ||
      College ||
      ofYear
    ) {
      try {
        const response = await axios.get(
          `http://localhost:5000/basicData/getBasicDataMales${queryString}`
        );
        console.log("QUERY STRING");
        console.log(queryString);
        console.log("QUERY STRING");
        console.log(response);
        setStudents(response.data.data.students);
        setFilteredStudents(response.data.data.students);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/basicData/getBasicDataMales`
        );
        console.log("QUERY STRING");
        console.log(queryString);
        console.log("QUERY STRING");
        console.log(response);
        setStudents(response.data.data.students);
        setFilteredStudents(response.data.data.students);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
      idx === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);

    // Update the corresponding variables based on the selected checkboxes
    const selectedLabels = updatedCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    egyptions = selectedLabels.includes("مصرى");
    expartriates = selectedLabels.includes("وافد");
    appliers = selectedLabels.includes("متقدمين");
    acceptedApplications = selectedLabels.includes("مقبولين");
    oldStudent = selectedLabels.includes("قدامى");
    newStudent = selectedLabels.includes("جدد");
    normalHousing = selectedLabels.includes("سكن عادى");
    specialHousing = selectedLabels.includes("سكن مميز");

    // Fetch students based on the selected checkboxes
    fetchStudents();
  };

  function handleCollegeChange(event) {
    setCollege(event.target.value); // Update College state with the selected value
  }

  function handleYearChange(event) {
    setOfYear(event.target.value); // Update ofYear state with the selected value
  }

  function SIdeBar() {
    return (
      <Container className="container">
        <div className="bar">{activeButton}</div>
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleYearChange}
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </Form.Select>
        </div>
        <div className="select">
          <p>الكلية</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleCollegeChange}
          >
            {colleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="form">
          <div className="sidebar-form-container">
            <div className="sidebar-form">
              {checkboxes.map((checkbox, index) => (
                <div key={index} className="checkbox-row">
                  <Checkbox
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={() => handleCheckboxChange(index)}
                    className="checkbox"
                  />
                </div>
              ))}

              <div style={{ width: "20px" }} className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            </div>
            <div className="students-list-container">
              <ul>
                {filteredStudents.map((student, index) => (
                  <li key={index}>
                    <p> {student.studentName}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    );
  }
  function Text() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <SIdeBar />
        </div>
        <div className="coll">Column 2 (75% width)</div>
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
  function Text10() {
    return (
      <div className="two-column-wrapper">
        <div className="col"> مواعيد التقدم - جامعة حلوان</div>
        <div className="coll">
          <ApplicationDeadline />
        </div>
      </div>
    );
  }
  function Text11() {
    return (
      <div className="two-column-wrapper">
        {/* <div className="col"></div> */}
        <div className="coll">
          <TypesOfLivings />
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
      [<Text10 />, "Button N", "<Button O>", <Text11 />],
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
