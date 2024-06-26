import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import man from "../images/man.png";
import woman from "../images/woman.png";
import settings from "../images/settings.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import "../Style/Bar.css";
import Form from "react-bootstrap/Form";
import Living from "../Pages/Living";
import Students from "../Pages/Students";
import AbsenceandPermits from "../Pages/AbsenceandPermits";
import Fees from "../Pages/Fees";
import StatementCase from "../Pages/StatementCase";
import Meals from "../Pages/Meals";
import FeeStatement from "../Pages/FeeStatement";
import ApplicationDeadline from "../Pages/SystemManagment/ApplicationDeadline";
import TypesOfLivings from "../Pages/TypesOfLivings";
import Penalties from "../Pages/Penalties/Penalties";
import axios from "axios";
import Checkbox from "../Shared/Checkbox";
import MainInfo from "../Pages/MainInfo";
import Instructions from "../Pages/InstructionsForApplying";
import Tskeen from "../Pages/Tskeen";
import Tatbeekat from "../Pages/Tatbeekat";
import TatbeekatFemale from "../FemaleTatbekatTakareerE7saa/TatbeekatFemale";
import "../Style/Header.css";
import AdminFees from "../Pages/SystemManagment/AdminFees";
import AdminFeeTypes from "../Pages/SystemManagment/AdminFeeTypes";
import Statistics from "../Pages/Statistics";
import UniPhoto from "../Pages/UniPhoto";
import Reports from "../Pages/Reports";
import ReportsAdmin from "../Pages/SystemManagment/Reports/ReportsAdmin";
import ApplicationsAdmin from "../Pages/SystemManagment/Applications/ApplicationsAdmins";
import StatAdmin from "../Pages/SystemManagment/StatisticsAdmin/StatAdmin";
import Explusion from "../Pages/Explusion";
import BlockMeals from "../Pages/BlockMeals";
import Users from "../Pages/Users";
import AdminMeals from "../Pages/SystemManagment/AdminMeals";
import StatFemale from "../FemaleStatisitcs/StatFemale";

import { removeAuthUser, getAuthUser } from "../helper/storage";
import RepFemales from "../FemaleReports/RepFemales";
const auth = getAuthUser();
const logout = () => {
  removeAuthUser();
  window.location.href = "/";
  // window.location.reload()
};

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(false);
  const [College, setCollege] = useState(""); // State for storing the selected college
  const [ofYear, setOfYear] = useState(""); // State for storing the selected academic year
  const [studentId, setStudentId] = useState(null);
  const [selectedStudentData, setSelectedStudentData] = useState(null); // State to hold selected student data
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    // You can perform any other actions here based on the selected option
  };
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

    [
      "مواعيد التقديم",
      "تعليمات التقديم",
      "صور الجامعة",
      "انواع السكن",
      "الوجبات",
      "الرسوم",
      "الغرف",
      "المستخدمين",
      "تطبيقات الطلاب",
      "احصائيات عامة",
      "تقارير",
    ],
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
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [FemaleStudents, setFemaleStudents] = useState([]);
  const [filteredFemaleStudents, setFilteredFemaleStudents] = useState([]);

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
    fetchFemaleStudents();
  }, [College, ofYear]);

  const Refresh = () => {
    fetchStudents();
    fetchFemaleStudents();
  };

  // const fetchStudents = async () => {
  //   //TODO : show only those who are classified
  //   const queryString = `?College=${College}&ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&appliers=${appliers}&acceptedApplications=${acceptedApplications}&searchQuery=${searchQuery}`;

  //   if (
  //     egyptions ||
  //     expartriates ||
  //     normalHousing ||
  //     specialHousing ||
  //     oldStudent ||
  //     newStudent ||
  //     appliers ||
  //     acceptedApplications ||
  //     College ||
  //     ofYear
  //   ) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/basicData/getBasicDataMales${queryString}`
  //       );
  //       console.log("QUERY STRING");
  //       console.log(queryString);
  //       console.log("QUERY STRING");
  //       console.log(response);
  //       setStudents(response.data.data.students);
  //       setFilteredStudents(response.data.data.students);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/basicData/getBasicDataMales`
  //       );
  //       console.log("QUERY STRING");
  //       console.log(queryString);
  //       console.log("QUERY STRING");
  //       console.log(response);
  //       setStudents(response.data.data.students);
  //       setFilteredStudents(response.data.data.students);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // const filterStudents = (query) => {
  //   const filtered = students.filter(
  //     (student) =>
  //       student.studentName.toLowerCase().includes(query.toLowerCase()) ||
  //       student._id.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredStudents(filtered);
  // };

  const fetchStudents = async () => {
    const queryString = `?College=${College}&ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&appliers=${appliers}&acceptedApplications=${acceptedApplications}&searchQuery=${searchQuery}`;

    try {
      const url =
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
          ? `http://localhost:5000/basicData/getBasicDataMales${queryString}`
          : `http://localhost:5000/basicData/getBasicDataMales`;

      const response = await axios.get(url);
      console.log("QUERY STRING", queryString);
      console.log("RESPONSE", response);

      // Filter students to include only those with isClassified set to true
      const classifiedStudents = response.data.data.students.filter(
        (student) => student.isClassified
      );

      setStudents(classifiedStudents);
      setFilteredStudents(classifiedStudents);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFemaleStudents = async () => {
    const queryString = `?College=${College}&ofYear=${ofYear}&egyptions=${egyptions}&expartriates=${expartriates}&normalHousing=${normalHousing}&specialHousing=${specialHousing}&oldStudent=${oldStudent}&newStudent=${newStudent}&appliers=${appliers}&acceptedApplications=${acceptedApplications}&searchQuery=${searchQuery}`;

    console.log("============TOOOOOOOOOOOOOOKEN========================");
    console.log(auth.token);
    console.log("====================================");

    try {
      const url =
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
          ? `http://localhost:5000/basicData/getBasicDataFemales${queryString}`
          : `http://localhost:5000/basicData/getBasicDataFemales`;

      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer__${auth.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("QUERY STRING", queryString);
      console.log("RESPONSE", response);

      // Filter students to include only those with isClassified set to true
      const classifiedStudents = response.data.data.students.filter(
        (student) => student.isClassified
      );

      setFemaleStudents(classifiedStudents);
      setFilteredFemaleStudents(classifiedStudents);
    } catch (error) {
      console.log(error);
    }
  };

  const filterStudents = (query) => {
    const filtered = students.filter(
      (student) =>
        student.studentName.toLowerCase().includes(query.toLowerCase()) ||
        student._id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    console.log("Search Query:", value); // Log the current value of the search query
    setSearchQuery(value); // Update the searchQuery state with the input value
    filterStudents(value); // Filter students based on the input value
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
    const selectedCollege = event.target.value;
    setCollege(selectedCollege, () => fetchStudents());
    fetchStudents();
  }

  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
    console.log("====================================");
    console.log(selectedYear);
    setOfYear(selectedYear, () => fetchStudents());
    console.log("===================================="); // Update the ofYear state with the selected value
  }
  const handleStudentClick = (student) => {
    console.log("Clicked student:", student);
    setStudentId(student._id); // Set the _id of the clicked student
    setSelectedStudentData(student); // Set the selected student data
  };

  function SIdeBar() {
    return (
      <Container className="container">
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleYearChange}
            value={ofYear} // Attach onChange event handler
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
            onChange={handleCollegeChange} // Attach onChange event handler
            value={College}
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
              {/* <button
                onClick={Refresh}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  margin: "5px",
                }}
              >
                تحديث البيانات
              </button> */}
              <div style={{ width: "20px" }} className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name or national ID"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />

                {/* <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                /> */}
              </div>
            </div>
            <div
              className="students-list-container"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <ul>
                {filteredStudents.slice(0, 10).map((student, index) => (
                  <li key={index}>
                    <button
                      className="button"
                      onClick={() => handleStudentClick(student)}
                    >
                      {student.studentName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  function FemaleSIdeBar() {
    return (
      <Container className="container">
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleYearChange}
            value={ofYear} // Attach onChange event handler
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
            onChange={handleCollegeChange} // Attach onChange event handler
            value={College}
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
              <button
                onClick={Refresh}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  margin: "5px",
                }}
              >
                تحديث البيانات
              </button>
              <div style={{ width: "20px" }} className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name or national ID"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />

                {/* <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                /> */}
              </div>
            </div>
            <div
              className="students-list-container"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <ul>
                {filteredFemaleStudents.slice(0, 10).map((student, index) => (
                  <li key={index}>
                    <button
                      className="button"
                      onClick={() => handleStudentClick(student)}
                    >
                      {student.studentName}
                    </button>
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
        <div className="coll">
          {selectedStudentData && (
            <MainInfo studentData={selectedStudentData} />
          )}
        </div>
      </div>
    );
  }

  function TextFemale() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          {selectedStudentData && (
            <MainInfo studentData={selectedStudentData} />
          )}
        </div>
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
          <Living studentData={selectedStudentData} />
        </div>
      </div>
    );
  }

  function Text2Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <Living studentData={selectedStudentData} />
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
          <Explusion _id={studentId} />
        </div>
      </div>
    );
  }

  function Text3Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <Explusion _id={studentId} />
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
          <Penalties _id={studentId} studentData={selectedStudentData} />
        </div>
      </div>
    );
  }

  function Text4Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <Penalties _id={studentId} studentData={selectedStudentData} />
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
          <AbsenceandPermits
            _id={studentId}
            studentData={selectedStudentData}
          />
        </div>
      </div>
    );
  }

  function Text5Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <AbsenceandPermits
            _id={studentId}
            studentData={selectedStudentData}
          />
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
          <Fees _id={studentId} />{" "}
        </div>
      </div>
    );
  }

  function Text6Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <Fees _id={studentId} />{" "}
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
          <StatementCase _id={studentId} />
        </div>
      </div>
    );
  }

  function Text7Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <StatementCase _id={studentId} />
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
          <BlockMeals _id={studentId} />
        </div>
      </div>
    );
  }

  function Text8Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <BlockMeals _id={studentId} />
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
          <FeeStatement _id={studentId} />
        </div>
      </div>
    );
  }

  function Text9Female() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <FemaleSIdeBar />
        </div>
        <div className="coll">
          <FeeStatement _id={studentId} />
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

  function Text12() {
    return (
      <div className="two-column-wrapper">
        <div>
          <Tatbeekat />
        </div>
      </div>
    );
  }

  function Text13() {
    return (
      <div className="two-column-wrapper">
        <div>
          <TatbeekatFemale />
        </div>
      </div>
    );
  }
  function Stat() {
    return (
      <div className="two-column-wrapper">
        <div>
          <Statistics />
        </div>
      </div>
    );
  }
  function Report() {
    return (
      <div>
        <Reports />
      </div>
    );
  }

  function ReportAdmin() {
    return (
      <div>
        <ReportsAdmin />
      </div>
    );
  }
  function AppAdmin() {
    return (
      <div>
        <ApplicationsAdmin />
      </div>
    );
  }
  function StatisticsAdminn() {
    return (
      <div>
        <StatAdmin />
      </div>
    );
  }

  function Text9999() {
    return <div className="two-column-wrapper"></div>;
  }

  function Text99999() {
    return (
      <div className="two-column-wrapper">
        <div className="col">
          <p>صور جامعة حلوان</p>
        </div>
        <div className="coll">
          <UniPhoto />
        </div>
      </div>
    );
  }

  function Text14() {
    return (
      <div>
        <AdminFees _id={studentId} />
      </div>
    );
  }
  function Text15() {
    return <Users />;
  }

  function Text1010() {
    return <AdminMeals />;
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
        <Text12 />,
        <Report />,
        <Stat />,
      ],
      [
        <TextFemale />,
        <Text2Female />,
        <Text3Female />,
        <Text4Female />,
        <Text5Female />,
        <Text6Female />,
        <Text7Female />,
        <Text8Female />,
        <Text9Female />,
        <Text13 />,
        <RepFemales />,
        <StatFemale />,
      ],

      [
        <Text10 />,
        <Text99 />,
        <Text99999 />,
        <Text11 />,
        <Text1010 />,
        <Text14 />,
        <Text999 />,
        <Text15 />,
        <AppAdmin />,
        <StatisticsAdminn />,
        <ReportAdmin />,
      ],
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

          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
            onClick={logout}
          >
            تسجيل الخروج
          </button>

          {/* <button
            style={{
              backgroundColor: "red",
              width: " 80px",
              height: "40px",
              color: "white",
              border: "",
            }}
            onClick={logout}
          >
            logout
          </button> */}
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
            selectedStudentData={selectedStudentData} // Pass selected student data to Content component
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
//
