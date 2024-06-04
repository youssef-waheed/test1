import React, { useState, useEffect } from "react";
import "../Style/MainInfo.css";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const MainInfo = ({ studentData }) => {
  const [error, setError] = useState(false);
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    if (studentData && studentData.image && studentData.image.data) {
      try {
        const base64String = arrayBufferToBase64(studentData.image.data);
        setStudentImage(`data:image/png;base64,${base64String}`);
      } catch (e) {
        console.error("Error converting image data:", e);
      }
    }
  }, [studentData]);

  if (!studentData) {
    return (
      <div className="table-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table">
        {studentImage ? (
          <img
            src={studentImage}
            alt="Student Image"
            style={{ width: "200px", height: "200px" }}
          />
        ) : (
          <p>No image available</p>
        )}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>تاريخ التقدم من الإنترنت</th>
              <th>{new Date(studentData.updatedAt).toLocaleDateString()}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>الرقم القومى</th>
              <td>{studentData.nationalID}</td>
            </tr>
            <tr>
              <th>رقم الملف</th>
              <td>{studentData.studentCode}</td>
            </tr>
            <tr>
              <th>الاسم </th>
              <td>{studentData.studentName}</td>
            </tr>
            <tr>
              <th> البريد الالكترونى </th>
              <td>{studentData.email}</td>
            </tr>
            <tr>
              <th> التليفون </th>
              <td>{studentData.landLinePhone}</td>
            </tr>
            <tr>
              <th> اسم الأب </th>
              <td>{studentData.fatherName}</td>
            </tr>
            <tr>
              <th> وظيفة الأب </th>
              <td>{studentData.fatherJop}</td>
            </tr>
            <tr>
              <th> اسم ولى الأمر </th>
              <td>{studentData.fatherName}</td>
            </tr>
            <tr>
              <th> الرقم القومى لولى الأمر </th>
              <td>{studentData.fatherNationalId}</td>
            </tr>
            <tr>
              <th> محل الإقامة </th>
              <td>{studentData.placeOfBirth}</td>
            </tr>
            <tr>
              <th> العنوان بالتفصيل </th>
              <td>{studentData.detailedAddress}</td>
            </tr>
            <tr>
              <th> الكلية </th>
              <td>{studentData.College}</td>
            </tr>
            <tr>
              <th> التقدير </th>
              <td>{studentData.gradeOfLastYear}</td>
            </tr>
            <tr>
              <th> نسبة التقدير </th>
              <td>{studentData.gradePercentage} %</td>
            </tr>
            <tr>
              <th> السكن في الأعوام السابقة </th>
              <td>{studentData.housingInLastYears}</td>
            </tr>
            <tr>
              <th> نوع السكن </th>
              <td>{studentData.HousingType}</td>
            </tr>
            <tr>
              <th> الأسرة في الخارج </th>
              <td>{studentData.expartriates}</td>
            </tr>
            <tr>
              <th> حالة القبول </th>
              <td>{studentData.waitingForClassification}</td>
            </tr>
            <tr>
              <th> سكن بدون تغذية </th>
              <td>{studentData.HousingWithoutFood}</td>
            </tr>
            <tr>
              <th>الديانة </th>
              <td>{studentData.religion}</td>
            </tr>
            <tr>
              <th>الموبايل</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
            <tr>
              <th>الرقم القومى للأب</th>
              <td>{studentData.fatherNationalId}</td>
            </tr>
            <tr>
              <th> صلة ولى الأمر</th>
              <td>{studentData.guardianName}</td>
            </tr>
            <tr>
              <th>الموبايل</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
            <tr>
              <th>ذوي احتياجات خاصة</th>
              <td>{studentData.withSpecialNeeds}</td>
            </tr>
            <tr>
              <th>معفى من المصروفات</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {error && (
        <div
          className="warning"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          {/* <Alert variant="danger">خطا: لا يوجد بيانات لهذا الطالب/طالبة</Alert> */}
        </div>
      )}
      {error && (
        <div
          className="warning"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          {/* <Alert variant="danger">Error: Failed to upload student photo</Alert> */}
        </div>
      )}
    </div>
  );
};

export default MainInfo;
