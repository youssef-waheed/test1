import React from "react";
import "./ReviewOnlineRequest.css";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <ul>
        <li>
          <strong>الاسم:</strong> {user.studentName}
        </li>
        <li>
          <strong>الرقم القومي:</strong> {user.nationalID}
        </li>
        <li>
          <strong>رقم الطالب:</strong> {user.studentCode}
        </li>
        <li>
          <strong>تاريخ الميلاد:</strong> {user.birthDate}
        </li>
        <li>
          <strong>مكان الميلاد:</strong> {user.placeOfBirth}
        </li>
        <li>
          <strong>الجنس:</strong> {user.gender}
        </li>
        <li>
          <strong>الديانة:</strong> {user.religion}
        </li>
        <li>
          <strong>الاقامة:</strong> {user.residence}
        </li>
        <li>
          <strong>العنوان بالتفصيل:</strong> {user.detailedAddress}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>الرقم الارضي:</strong> {user.landLinePhone}
        </li>
        <li>
          <strong>رقم الهاتف:</strong> {user.phoneNumber}
        </li>
        <li>
          <strong>اسم الاب:</strong> {user.fatherName}
        </li>
        <li>
          <strong>رقم القومي للاب:</strong> {user.fatherNationalId}
        </li>
        <li>
          <strong>وظيفة الاب:</strong> {user.fatherJop}
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
