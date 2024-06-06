import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MassPenalty = ({ onSelect }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [penaltyKind, setPenaltyKind] = useState('');
  const [penaltyDate, setPenaltyDate] = useState('');
  const [cancellationDate, setCancellationDate] = useState('');
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
      const response = await axios.get('http://localhost:5000/basicData/getBasicDataFemales');
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
    // Implement sending penalty data to backend
    const penaltyData = {
      studentIds: selectedStudents,
      penaltyKind: penaltyKind,
      reason: notes,
      penaltyDate: penaltyDate,
      cancellationDate: cancellationDate
    };
    // Send penaltyData to backend API
    axios.post('http://localhost:5000/penalty/', penaltyData)
      .then(response => {
        console.log('Penalty applied successfully:', response.data);
        // Reset selected students after successful submission
        setSelectedStudents([]);
        setPenaltyKind('');
        setPenaltyDate('');
        setCancellationDate('');
        setNotes('');
      })
      .catch(error => {
        console.error('Error applying penalty:', error);
      });
  };

  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
          <label>
            <label>نوع الجزاء:</label>
            <select value={penaltyKind} onChange={(e) => setPenaltyKind(e.target.value)}>
              <option value="انذار بالحرمان">انذار بالحرمان</option>
              <option value="حجب النتيجة الدراسية لعدم سداد المصروفات">حجب النتيجة الدراسية لعدم سداد المصروفات</option>
              <option value="تجاوز مدة التصاريح">تجاوز مدة التصاريح</option>
              <option value="جزاء اداري">جزاء اداري</option>
              <option value="مجلس تاديب">مجلس تاديب</option>
              <option value="لفت نظر">لفت نظر</option>
              <option value="تجاوز مدة الغياب">تجاوز مدة الغياب</option>
              <option value="حرمان نهائي">حرمان نهائي</option>
              <option value="حرمان مؤقت">حرمان مؤقت</option>
              <option value="تاخير">تاخير</option>
              <option value="فصل شهر">فصل شهر</option>
              <option value="فصل اسبوعين">فصل اسبوعين</option>
              <option value="فصل اسبوع">فصل اسبوع</option>
              <option value="انهاء اقامة">انهاء اقامة</option>
            </select>
          </label>
          <label>
            تاريخ الجزاء
            <input type="date" value={penaltyDate} onChange={(e) => setPenaltyDate(e.target.value)} />
          </label>
          <label>
            تاريخ الغاء الجزاء
            <input type="date" value={cancellationDate} onChange={(e) => setCancellationDate(e.target.value)} />
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
          <h1>الطالبات:-</h1>
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
          
          onClick={handleApplyPermissions}>تسجيل الجزاء</button>
        </div>
        <div className="coll">
            <ul>
                <li>يتم اختيار نوع الجزاء و ادخال تاريخ البداية و النهاية</li>
                <li>ثم كتابة السبب او الملاحظة</li>            
                <li>و من قائمة الطالبات يتم اختيار الاسماء ثم الضغط علي زر تسجيل الجزاء </li>            
            </ul>
        </div>
      </div>
    </div>
  );
};

export default MassPenalty;
