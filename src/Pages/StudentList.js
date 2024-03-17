import React, { useState } from "react";
import MainInfo from "./MainInfo";

const StudentList = () => {
  // Sample student data (replace with your actual student data)
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1", image: "base64_encoded_image_data_1" },
    { id: 2, name: "Student 2", image: "base64_encoded_image_data_2" },
    // Add more student data as needed
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} onClick={() => handleClick(student)}>
            {student.name}
          </li>
        ))}
      </ul>
      {selectedStudent && <MainInfo studentData={selectedStudent} />}
    </div>
  );
};

export default StudentList;
