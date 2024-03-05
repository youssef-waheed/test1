// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const AdminFeeTypes = () => {
//   const [feeTypes, setFeeTypes] = useState([]);
//   useEffect(() => {
//     fetchFeeTypes();
//   }, []);
//   const fetchFeeTypes = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/fees/getFeeType`);
//       setFeeTypes(response.data.data.fees);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="FeeTypes">
//       <p style={{ fontSize: "22px", fontWeight: "bold" }}>أنواع الرسوم</p>
//       {feeTypes.map((type, index) => (
//         <ul>
//           <li>
//             {" "}
//             <option key={index}>{type.feeType}</option>
//           </li>
//         </ul>
//       ))}
//     </div>
//   );
// };

// export default AdminFeeTypes;
