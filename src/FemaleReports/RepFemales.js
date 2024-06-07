import React, { useState } from "react";
import "../Pages/Tatbeekat.css";
import StudentListFemale from "./StudentListFemal";
import PenaltiesFemale from "./PenaltiesFemale";
import ApsenceAndPermitsFemaleReport from "./ApsenceAndPremitsFemaleReport";
import FemaleFeesRep from "./FemaleFeesRep";
import StatuesOfRoomsFemale from "./StatuesoFRoomsFemale";
import ExpulsionStudentsFemale from "./ExplusionsStudentsFemale";
import PrintedCardsFemale from "./PrintedCardsFemale";
import StudentsWithOutImageFemale from "./StudentsWithoutImageFemale";
import SocialResearchReportFemale from "./SocialResearchReportsFemale";
import DeprivedOfMealsFemale from "./DeprivedOfMealsFemale";
// import NumOfStudents from "./NumOfStudents";
// import NumOfResident from "./NumOfResident";
// import NumOfAppliers from "./NumOfAppliers";
// import NumOfPrintedCards from "./NumOfPrintedCards";
// import MealPreparation from "./MealPreparation";

// import Review from "./ReviewOnlineRequests";
// import AcceptSpecialCases from "./AcceptSpecialCases";

const Page1 = () => (
  <div>
    <StudentListFemale />
  </div>
);
const Page2 = () => (
  <div>
    <PenaltiesFemale />
  </div>
);
const Page3 = () => (
  <div>
    <ApsenceAndPermitsFemaleReport />
  </div>
);

const Page4 = () => (
  <div>
    <FemaleFeesRep />
  </div>
);
const Page5 = () => (
  <div>
    <StatuesOfRoomsFemale />
  </div>
);
const Page6 = () => (
  <div>
    <ExpulsionStudentsFemale />
  </div>
);
const Page7 = () => (
  <div>
    <PrintedCardsFemale />
  </div>
);
const Page8 = () => (
  <div>
    <StudentsWithOutImageFemale />
  </div>
);
const Page9 = () => (
  <div>
    <RepFemales />
  </div>
);
const Page10 = () => (
  <div>
    <SocialResearchReportFemale />
  </div>
);
const Page11 = () => (
  <div>
    <DeprivedOfMealsFemale />
  </div>
);
const Page12 = () => <div></div>;

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2 style={{ fontSize: "28px", color: "darkred", textAlign: "center" }}>
      التقارير
    </h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const RepFemales = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: "قوائم الطلاب ", page: <Page1 /> },
    { text: "الجزاءات", page: <Page2 /> },
    { text: "الغياب والتصاريح ", page: <Page3 /> },
    { text: "الرسوم ", page: <Page4 /> },
    { text: "حالة الغرف  ", page: <Page5 /> },
    { text: "الطلاب المقصوئين ", page: <Page6 /> },
    { text: "البطاقات المطبوعة   ", page: <Page7 /> },
    { text: "طلاب بدون صور ", page: <Page8 /> },
    { text: "امر تسكين ", page: <Page9 /> },
    { text: "  حالات البحث الاجتماعي ", page: <Page10 /> },
    { text: "  المحرومين من الوجبات ", page: <Page11 /> },
    { text: "  اخطار القبول ", page: <Page12 /> },
    // { text: "احصائية استلام الوجبات " },
    // { text: "احصائية استلام الوجبات " },
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

export default RepFemales;
