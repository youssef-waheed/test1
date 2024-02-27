import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <h2>User Details</h2>
      <ul>
        <li><strong>Name:</strong> {user.studentName}</li>
        <li><strong>National ID:</strong> {user.nationalID}</li>
        <li><strong>Student Code:</strong> {user.studentCode}</li>
        <li><strong>Birth Date:</strong> {user.birthDate}</li>
        <li><strong>Place of Birth:</strong> {user.placeOfBirth}</li>
        <li><strong>Gender:</strong> {user.gender}</li>
        <li><strong>Religion:</strong> {user.religion}</li>
        <li><strong>Residence:</strong> {user.residence}</li>
        <li><strong>Detailed Address:</strong> {user.detailedAddress}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Landline Phone:</strong> {user.landLinePhone}</li>
        <li><strong>Phone Number:</strong> {user.phoneNumber}</li>
        <li><strong>Father's Name:</strong> {user.fatherName}</li>
        <li><strong>Father's National ID:</strong> {user.fatherNationalId}</li>
        <li><strong>Father's Job:</strong> {user.fatherJop}</li>
      </ul>
    </div>
  );
};

export default UserDetails;
