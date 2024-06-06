import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentComponent = ({ onSelect }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [typeOfAbsence, setTypeOfAbsence] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Trigger handleSearch when searchQuery changes


  
const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/basicData/getBasicDataMales');
      console.log('API Response:', response.data); // Log the API response
  
      const responseData = response.data;
      if (
        responseData.status === 'success' &&
        responseData.data &&
        Array.isArray(responseData.data.students)
      ) {
        // Filter out students with isHoused set to false
        const filteredStudents = responseData.data.students.filter(
          student => student.isHoused
        );
        setStudents(filteredStudents); // Set students state with the array of students
        setFilteredStudents(filteredStudents); // Set filteredStudents state initially with all students
      } else {
        setStudents([]); // Set students to an empty array if no valid data is received
        setFilteredStudents([]); // Set filteredStudents to an empty array if no valid data is received
      }
  
      console.log('Students:', students); // Log the updated students array
      console.log('Filtered Students:', filteredStudents); // Log the updated filteredStudents array
    } catch (error) {
      console.error('Error fetching students:', error);
      // Handle errors such as displaying an error message or retrying the request
      setStudents([]); // Set students to an empty array on error
      setFilteredStudents([]); // Set filteredStudents to an empty array on error
    }
  };
  
  

  const handleSearch = () => {
    const filtered = students.filter(student => {
      // Check if student.studentName and student.nationalID are defined before using includes
      const nameMatches = student.studentName && student.studentName.includes(searchQuery);
      const idMatches = student.nationalID && student.nationalID.includes(searchQuery);
      return nameMatches || idMatches;
    });
    setFilteredStudents(filtered);
  };
  

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleApplyPermissions = () => {
    // Implement sending permissions data to backend
    const permissionsData = {
      studentIds: selectedStudents.join(','),
      TypeOfAbsence: typeOfAbsence,
      dateFrom: dateFrom,
      dateTo: dateTo,
      notes: notes
    };
    // Send permissionsData to backend API
    axios.post('http://localhost:5000/absence/', permissionsData)
      .then(response => {
        console.log('Permissions applied successfully:', response.data);
        // Reset selected students after successful submission
        setSelectedStudents([]);
        setTypeOfAbsence('');
        setDateFrom('');
        setDateTo('');
        setNotes('');
      })
      .catch(error => {
        console.error('Error applying permissions:', error);
      });
  };

  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
          <label>
            <label>نوع التصريح:</label>
            <select value={typeOfAbsence} onChange={(e) => setTypeOfAbsence(e.target.value)}>
              <option value="تصريح مفاجئ">تصريح مفاجئ</option>
              <option value="غياب">غياب</option>
              <option value="تصريح">تصريح</option>
              <option value="مرضي">مرضي</option>
              <option value="رحلة/معسكر">رحلة/معسكر</option>
              <option value="تاخير">تاخير</option>
              <option value="اجازة">اجازة</option>
            </select>
          </label>
          <label>
            تاريخ التصريح
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </label>
          <label>
            الي
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </label>
          <label>
            <input
              type="text"
              placeholder="السبب"
              value={notes}
              onChange={(e) => setNotes(e.target.value)} />
          </label>
          <label>
            <input
              type="text"
              placeholder="Search by name or national ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <h1>الطلاب:-</h1>
          <ul>
            {filteredStudents.map(student => (
              <li key={student._id}>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelectStudent(student._id)}
                />
                <div>
                  <strong>اسم الطالب:</strong> {student.studentName || 'Unknown Name'}<br />
                </div>
              </li>
            ))}
          </ul>
          <button
          style={{ backgroundColor: "green",color:"white", borderRadius:"5px" }}
          
          onClick={handleApplyPermissions}>تسجيل التصريح</button>
        </div>
        <div className="coll">
            <ul>
                <li>يتم اختيار نوع التصريح و ادخال تاريخ البداية و النهاية</li>
                <li>ثم كتابة السبب او الملاحظة</li>            
                <li>و من قائمة الطلاب يتم اختيار الاسماء ثم الضغط علي زر تسجيل التصريح </li>            
            </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;
