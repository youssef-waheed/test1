// import React,{useState,useEffect} from "react";
// import { Axios } from "axios";

// const PrintAcceptanceNotification = () => {
//     return(
// <div className="two-column-wrapper">
// <div className="col">

// </div>
// <div className="coll">
// <ul>
//     <p>يرجي الحضور بهذا الاخطار لاتمام الكشف الطبي في الموعد المبين علي الاخطار و مع الطالب ما يلي</p>
//     <li>1- البطاقة الشخصية(الرقم القومي)</li>
//     <li>2- كارنيه الكلية(ايصال سداد رسوم الكلية)</li>
//     <li>3- عدد 2 صورة شخصية حديثة</li>
// </ul>
// </div>
// </div>
//     );
// } 
// export default PrintAcceptanceNotification;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PrintAcceptanceNotification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [ofYear, setOfYear] = useState("");
  const [year, setYear] = useState("");
  const [gradeOfLastYear, setGradeOfLastYear] = useState("");
  const [housingType, setHousingType] = useState("");
  const [nationalIds, setNationalIds] = useState("");
  const [includeHousedStudents, setIncludeHousedStudents] = useState(false);
  const [includeNonHousedStudents, setIncludeNonHousedStudents] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/AcceptanceNotification/print", {
        params: {
          ofYear,
          HousingType: includeHousedStudents ? "عادى" : includeNonHousedStudents ? "مميز" : ""
        }
        
      });
      console.log("response is",response);
      setNotificationData(response.data.responseArray);
      console.log(notificationData);
    } catch (error) {
      console.error("Error fetching acceptance notification:", error);
    }
  };
  

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 6; i <= currentYear ; i++) {
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

           <input type="checkbox" checked={includeHousedStudents} onChange={(e) => setIncludeHousedStudents(e.target.checked)} />
        <label>سكن عادي</label>

        {/* Checkbox for Including Non-Housed Students */}
        <input type="checkbox" checked={includeNonHousedStudents} onChange={(e) => setIncludeNonHousedStudents(e.target.checked)} />
        <label>سكن مميز</label>
      </div>

      <div className="coll">
        {/* Display notification data */}
        {notificationData && notificationData.map((notification, index) => (
  <div key={index}>
    <p>Student Name: {notification.data.studentName}</p>
    <p>College: {notification.data.College}</p>
    <p>Student Code: {notification.data.studentCode}</p>
  </div>
))}


        <ul>
          <p>يرجي الحضور بهذا الاخطار لاتمام الكشف الطبي في الموعد المبين علي الاخطار و مع الطالب ما يلي</p>
          <li>1- البطاقة الشخصية(الرقم القومي)</li>
          <li>2- كارنيه الكلية(ايصال سداد رسوم الكلية)</li>
          <li>3- عدد 2 صورة شخصية حديثة</li>
        </ul>
      </div>
    </div>
  );
};

export default PrintAcceptanceNotification;
