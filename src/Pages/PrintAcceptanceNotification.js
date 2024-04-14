// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PrintAcceptanceNotification = () => {
//   const [notificationData, setNotificationData] = useState([]);
//   const [ofYear, setOfYear] = useState("2023-2024");
//   const [normalHouse, setNormalHouse] = useState(false);
//   const [specialHouse, setSpecialHouse] = useState(false);

//   useEffect(() => {
//     setNotificationData([]); // Initialize notificationData with an empty array
//     fetchData();
//   }, [ofYear, normalHouse, specialHouse]);
  

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/AcceptanceNotification/print", {
//         params: {
//           ofYear,
//           HousingType: normalHouse ? "عادى" : specialHouse ? "مميز" : ""
//         }
//       });
//       console.log("response is" , response);
//       setNotificationData(response.data.responseArray || []); // Set notificationData to response data or an empty array if response data is undefined
//     } catch (error) {
//       console.error("Error fetching acceptance notification:", error);
//       setNotificationData([]); // Set notificationData to an empty array in case of error
//     }
//   };

//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 6; i <= currentYear; i++) {
//       years.push(i);
//     }
//     return years.map((year) => (
//       <option key={year} value={`${year}-${year + 1}`}>{`${year}-${year + 1}`}</option>
//     ));
//   };

//   return (
//     <div className="two-column-wrapper">
//       <div className="col">
//         <div>
//           <label htmlFor="ofYear">العام الاكاديمي :</label>
//           <select id="ofYear" name="ofYear" value={ofYear} onChange={(e) => setOfYear(e.target.value)}>
//             {generateYearOptions()}
//           </select>
//         </div>

//         <input type="checkbox" checked={normalHouse} onChange={(e) => setNormalHouse(e.target.checked)} />
//         <label>سكن عادي</label>

//         <input type="checkbox" checked={specialHouse} onChange={(e) => setSpecialHouse(e.target.checked)} />
//         <label>سكن مميز</label>
//       </div>

//       <div className="coll">
      


//         <ul>
//           <p>يرجي الحضور بهذا الاخطار لاتمام الكشف الطبي في الموعد المبين علي الاخطار و مع الطالب ما يلي</p>
//           <li>1- البطاقة الشخصية(الرقم القومي)</li>
//           <li>2- كارنيه الكلية(ايصال سداد رسوم الكلية)</li>
//           <li>3- عدد 2 صورة شخصية حديثة</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PrintAcceptanceNotification;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PrintAcceptanceNotification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [ofYear, setOfYear] = useState("");
  const [normalHouse, setNormalHouse] = useState(false);
  const [specialHouse, setSpecialHouse] = useState(false);

  useEffect(() => {
    fetchData();
  }, [ofYear, normalHouse, specialHouse]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/AcceptanceNotification/print", {
        params: {
          ofYear,
          HousingType: normalHouse ? "عادى" : specialHouse ? "مميز" : ""
        }
      });
      if (response.data && response.data.responseArray) {
        setNotificationData(response.data.responseArray);
      } else {
        setNotificationData([]);
      }
    } catch (error) {
      console.error("Error fetching acceptance notification:", error);
      setNotificationData([]);
    }
  };
  

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 6; i <= currentYear; i++) {
      years.push(i);
    }
    return years.map((year) => (
      <option key={year} value={`${year}-${year + 1}`}>{`${year}-${year + 1}`}</option>
    ));
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div>
          <label htmlFor="ofYear">العام الاكاديمي :</label>
          <select id="ofYear" name="ofYear" value={ofYear} onChange={(e) => setOfYear(e.target.value)}>
            {generateYearOptions()}
          </select>
        </div>

        <input type="checkbox" checked={normalHouse} onChange={(e) => setNormalHouse(e.target.checked)} />
        <label>سكن عادي</label>

        <input type="checkbox" checked={specialHouse} onChange={(e) => setSpecialHouse(e.target.checked)} />
        <label>سكن مميز</label>
           {notificationData.length === 0 ? (
  <p>No students found for the specified criteria.</p>
) : (
  <ul>
    {notificationData.map((notification, index) => (
      <li key={index}>{notification.data.studentName}</li>
    ))}
  </ul>
)}
      </div>

      <div className="coll">
   


        <p>يرجي الحضور بهذا الاخطار لاتمام الكشف الطبي في الموعد المبين علي الاخطار و مع الطالب ما يلي</p>
        <ul>
          <li>1- البطاقة الشخصية(الرقم القومي)</li>
          <li>2- كارنيه الكلية(ايصال سداد رسوم الكلية)</li>
          <li>3- عدد 2 صورة شخصية حديثة</li>
        </ul>
      </div>
    </div>
  );
};

export default PrintAcceptanceNotification;
