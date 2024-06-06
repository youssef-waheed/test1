import React, { useState, useEffect } from "react";
import axios from "axios";
import HLImage from "../Shared/HL.jpeg";

const PrintAcceptanceNotification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [ofYear, setOfYear] = useState("");
  const [normalHouse, setNormalHouse] = useState(false);
  const [specialHouse, setSpecialHouse] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, [ofYear, normalHouse, specialHouse]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/AcceptanceNotification/print", {
        ofYear: ofYear,
        HousingType: normalHouse ? "عادي" : specialHouse ? "مميز فردى طلبة" : ""
      });
      console.log('=======REEEEEEEEEEEESSSSSSSSS=============================');
      console.log(response);
      console.log('====================================');

      
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

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
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

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const htmlContent = document.querySelector(".coll").outerHTML;
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          console.warn('Could not read CSS rules from stylesheet', styleSheet.href);
          return '';
        }
      })
      .join('\n');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>${styles}</style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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

        <button
        
        style={{ backgroundColor: "green",color:"white", borderRadius:"5px" }}
        
        onClick={handlePrint}>طباعة</button>
        <br></br>
        <br></br>


        {notificationData.length === 0 ? (
          <p>No students found for the specified criteria.</p>
        ) : (
          <div>
            <h1>تفاصيل الطلاب</h1>
            <ul>
              {notificationData.map((notification, index) => (
                <li key={index} onClick={() => handleStudentClick(notification)}>
                  {notification.data.studentName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="coll">
    
        {selectedStudent && (
          <div className="student-details-container">
            <div>
            <p > اخطار بالقبول للاسكان بالمدينة للعام الجامعي {ofYear} </p>
            </div>
             <div className="left-div">

         <img src={HLImage} alt="HL" />

         </div>
    <div className="right-div">
            <p><strong>اسم الطالب:</strong> {selectedStudent.data.studentName}</p>
            <p><strong>الكلية:</strong> {selectedStudent.data.College}</p>
            <p><strong>كود الطالب:</strong> {selectedStudent.data.studentCode}</p>
            <p><strong>نوع السكن:</strong> {selectedStudent.data.HousingType}</p>
            <p><strong>التقدير:</strong> {selectedStudent.data.gradeOfLastYear}</p>
            <p><strong>رقم الطالب</strong> </p>
            <p><strong>تاريخ اجرائات الكشف الطبي و الاسكان</strong> </p>
            <p><strong>رقم الملف</strong> </p>
            <p><strong>نتيجة الكشف الطبي</strong> </p>
            <p><strong>توقيع الطبيب</strong> </p>
            <p><strong>الختم</strong> </p>
          </div>
          <div className="bottom-div"><p>يرجي الحضور بهذا الاخطار لاتمام الكشف الطبي في الموعد المبين علي الاخطار و مع الطالب ما يلي</p>
         <ul>
           <li>البطاقة الشخصية(الرقم القومي)</li>
           <li>كارنيه الكلية (ايصال سداد رسوم الكلية)  , عدد 2 صورة شخصية حديثة</li>
         </ul>
         </div>
        
         
         
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PrintAcceptanceNotification;
