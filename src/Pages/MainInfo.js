import React, { useState } from "react";
import "../Style/MainInfo.css";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const MainInfo = ({ studentData }) => {
  if (!studentData) {
    return (
      <div className="table-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>{" "}
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>تاريخ التقدم من الإنترنت</th>
              <th>{studentData.updatedAt}</th>
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
              {/* <td>{studentData.housingInLastYears}</td> */}
            </tr>
            <tr>
              <th> سكن بدون تغذية </th>
              <td>{studentData.HousingWithoutFood}</td>
            </tr>
            <tr>
              <th> السكن فى </th>
              {/* <td>{studentData.HousingWithoutFood}</td> */}
            </tr>
            <tr>
              <th> ملاحظات</th>
              {/* <td>{studentData.HousingWithoutFood}</td> */}
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="table" style={{ lineHeight: "3", marginBottom: "50px" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                بيانات الأعوام السابقة{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>رقم شئون الطلاب (كود الطالب) </th>
              <td>{studentData.studentCode}</td>
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
              <td>{studentData.fatherPhone}</td>
            </tr>
            <tr>
              <th>الموبايل</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
            <tr>
              <th>عدد جرعات اللقاح</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
            <tr>
              <th>ذوي احتياجات خاصة</th>
              <td>{studentData.withSpecialNeeds}</td>
            </tr>
            <tr>
              <th>القاعدة المقبول بها</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
            <tr>
              <th>معفى من المصروفات</th>
              <td>{studentData.phoneNumber}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MainInfo;
