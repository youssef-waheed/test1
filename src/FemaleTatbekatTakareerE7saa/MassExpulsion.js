import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MassExpulsion = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [reason, setReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/basicData/getBasicDataFemales');
      const responseData = response.data;
      if (
        responseData.status === 'success' &&
        responseData.data &&
        Array.isArray(responseData.data.students)
      ) {
        const filteredStudents = responseData.data.students.filter(student => student.isHoused);
        setStudents(filteredStudents);
        setFilteredStudents(filteredStudents);
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      setFilteredStudents([]);
    }
  };

  const handleSearch = () => {
    const filtered = students.filter(student => {
      const nameMatches = student.studentName && student.studentName.includes(searchQuery);
      const idMatches = student.nationalID && student.nationalID.includes(searchQuery);
      return nameMatches || idMatches;
    });
    setFilteredStudents(filtered);
  };

  const toggleSelectStudent = studentId => {
    setSelectedStudents(prevSelected => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter(id => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const applyExpulsion = () => {
    const expulsionData = {
      studentIds: selectedStudents.join(','),
      reason: reason
    };
    axios.put('http://localhost:5000/expulsion', expulsionData)
      .then(response => {
        console.log(expulsionData);
        console.log('Expulsion applied successfully:', response.data);
        setSelectedStudents([]);
        setReason('');

        fetchStudents();
      })
      .catch(error => {
        console.error('Error applying expulsion:', error);
      });
  };

  return (
    <div>
     <div className="two-column-wrapper">
        <div className="col">
        <label>
        <input
          type="text"
          placeholder="السبب"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Search by name or national ID"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </label>
      <h1>الطلاب:</h1>
      <ul>
        {filteredStudents.map(student => (
          <li key={student._id}>
            <input
              type="checkbox"
              checked={selectedStudents.includes(student._id)}
              onChange={() => toggleSelectStudent(student._id)}
            />
            <div>
              <strong>اسم الطالب :  </strong> {student.studentName || 'Unknown Name'}<br />
            </div>
          </li>
        ))}
      </ul>
      <button 
          style={{ backgroundColor: "green",color:"white", borderRadius:"5px" }}
      onClick={applyExpulsion}>تسجيل الاخلاء</button>
        </div>

        <div className="coll">
          <ul>
                <li>يتم كتابة سبب الاخلاء ان وجد</li>
                <li>و من قائمة الطلاب يتم اختيار الاسماء ثم الضغط علي زر تسجيل الاخلاء </li>            
            </ul>
            </div>
        
        </div>
      
    </div>
  );
};

export default MassExpulsion;
