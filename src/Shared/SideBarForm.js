// import React, { useState, useEffect } from "react";
// import Checkbox from "../Shared/Checkbox";
// import { Form, Button } from "react-bootstrap"; // Assuming you're using Bootstrap for styling
// import "../Style/Form.css";
// import axios from "axios";

// const SideBarForm = () => {
//   const [BasicDataMales, setBasicDataMales] = useState([]);
//   const [checkboxes, setCheckboxes] = useState(() => {
//     const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
//     return (
//       storedCheckboxes || [
//         { label: "مصرى", checked: false },
//         { label: "وافد", checked: false },
//         { label: "متقدمين", checked: false },
//         { label: "مقبولين", checked: false },
//         { label: "قدامى", checked: false },
//         { label: "جدد", checked: false },
//         { label: "سكن عادى", checked: false },
//         { label: "سكن مميز", checked: false },
//         { label: "إخلاء ", checked: false },
//       ]
//     );
//   });

//   // useEffect(() => {
//   //   sessionStorage.setItem("checkboxes", JSON.stringify(checkboxes));
//   // }, [checkboxes]);
//   useEffect(() => {
//     fetchAllStudents();
//   });
//   const fetchAllStudents = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/basicData/getBasicDataMales"
//       );
//       console.log(response);
//       setBasicDataMales(response.data.data.students);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleCheckboxChange = (index) => {
//     const updatedCheckboxes = [...checkboxes];
//     updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
//     setCheckboxes(updatedCheckboxes);
//   };

//   return (
//     <div className="sidebar-form">
//       {checkboxes.map((checkbox, index) => (
//         <div key={index} className="checkbox-row">
//           <Checkbox
//             label={checkbox.label}
//             checked={checkbox.checked}
//             onChange={() => handleCheckboxChange(index)}
//             className="checkbox"
//           />
//         </div>
//       ))}
//       <div style={{ width: "20px" }} className="search-bar">
//         <input type="text" placeholder="Search..." />
//       </div>
//       {/* Display filtered students */}
//       <div className="students-list">
//         <h2>Students</h2>
//         <ul>
//           {BasicDataMales.map((student, index) => (
//             <li key={index}>
//               {student.name} - {student.id}{" "}
//               {/* Assuming these are the properties of each student */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBarForm;

// import React, { useState, useEffect } from "react";
// import Checkbox from "../Shared/Checkbox";
// import { Form, Button } from "react-bootstrap";
// import "../Style/Form.css";
// import axios from "axios";

// const SideBarForm = () => {
//   var ofYear;
//   var College;
//   var egyptians;
//   var expartriates;
//   var normalHousing;
//   var specialHousing;
//   var oldStudent;
//   var newStudent;
//   var appliers;
//   var acceptedApplications;

//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [checkboxes, setCheckboxes] = useState(() => {
//     const storedCheckboxes = JSON.parse(sessionStorage.getItem("checkboxes"));
//     return (
//       storedCheckboxes || [
//         { label: "مصرى", checked: false },
//         { label: "وافد", checked: false },
//         { label: "متقدمين", checked: false },
//         { label: "مقبولين", checked: false },
//         { label: "قدامى", checked: false },
//         { label: "جدد", checked: false },
//         { label: "سكن عادى", checked: false },
//         { label: "سكن مميز", checked: false },
//         { label: "إخلاء ", checked: false },
//       ]
//     );
//   });

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/basicData/getBasicDataMales"
//       );
//       console.log(response);
//       setStudents(response.data.data.students);
//       setFilteredStudents(response.data.data.students);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedCheckboxes = [...checkboxes];
//     updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
//     setCheckboxes(updatedCheckboxes);

//     // Set the value of egyptions based on the checkbox state
//     if (updatedCheckboxes[index].label === "مصرى") {
//       egyptians = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "وافد") {
//       expartriates = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "متقدمين") {
//       appliers = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "مقبولين") {
//       acceptedApplications = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === " قدامى") {
//       oldStudent = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "جدد") {
//       newStudent = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "سكن عادى") {
//       normalHousing = updatedCheckboxes[index].checked;
//     }
//     if (updatedCheckboxes[index].label === "سكن مميز") {
//       specialHousing = updatedCheckboxes[index].checked;
//     }

//     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
//     console.log(egyptians);
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

//     // Get selected labels for all checkboxes
//     const selectedLabels = updatedCheckboxes
//       .filter((checkbox) => checkbox.checked)
//       .map((checkbox) => checkbox.label);

//     // Filter students based on selected checkboxes
//     if (selectedLabels.length === 0) {
//       // If no checkboxes are selected, display all students
//       setFilteredStudents(students);
//     } else {
//       // Filter students based on selected checkboxes
//       const filtered = students.filter((student) => {
//         // Check if student matches any selected criteria
//         return selectedLabels.some((label) => {
//           // Example: Check if student's nationality matches the label
//           if (label === "مصرى" && student.egyptians === true) {
//             return true;
//           }
//           // Example: Check if student's housing type matches the label
//           if (label === "سكن عادى" && student.housingType === "سكن عادى") {
//             return true;
//           }
//           // Add additional criteria checks here as needed
//           return false;
//         });
//       });
//       setFilteredStudents(filtered);
//     }
//   };

//   return (
//     <div className="sidebar-form-container">
//       <div className="sidebar-form">
//         {checkboxes.map((checkbox, index) => (
//           <div key={index} className="checkbox-row">
//             <Checkbox
//               label={checkbox.label}
//               checked={checkbox.checked}
//               onChange={() => handleCheckboxChange(index)}
//               className="checkbox"
//             />
//           </div>
//         ))}
//         <div style={{ width: "20px" }} className="search-bar">
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="students-list-container">
//         <h2>Students</h2>
//         <ul>
//           {filteredStudents.map((student, index) => (
//             <li key={index}>
//               <p> {student.studentName}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBarForm;
