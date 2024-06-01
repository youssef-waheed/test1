import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeUni = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [TransferReason, setTransferReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/basicData/getBasicDataMales');
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

  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  const applyHousingTypeChange = () => {
    if (!selectedStudent) {
      console.error('Select a student to apply housing type change.');
      return;
    }
    
    const housingTypeData = {
      transferReason: TransferReason
    };
  
    axios.post(`http://localhost:5000/transferStudent/${selectedStudent._id}`, housingTypeData)
      .then(response => {
        console.log('transferred successfully:', response.data);
        setSelectedStudent(null);
        setTransferReason('');
        fetchStudents();
      })
      .catch(error => {
        console.error('Error applying housing type change:', error);
      });
  };
  

  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
         ,<h1> سبب النقل</h1>
          <input
            type="text"
            placeholder="سبب النقل"
            value={TransferReason}
            onChange={e => setTransferReason(e.target.value)}
          />
          <p>_______________</p>
          <input
            type="text"
            placeholder="Search by name or national ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <h1>الطلاب:</h1>
          <ul>
            {filteredStudents.map(student => (
              <li key={student._id}>
                <button
                  className={selectedStudent && selectedStudent._id === student._id ? 'selected' : ''}
                  onClick={() => selectStudent(student)}
                >
                   {student.studentName || 'Unknown Name'}
                </button>
              </li>
            ))}
          </ul>
         
        </div>

        <div className="coll">
          
           {selectedStudent && (
            <div>
              <h2>بيانات الطالب :</h2>
              <p><strong>اسم الطالب : </strong> {selectedStudent.studentName}</p>
              <p><strong>الرقم القومي للطالب : </strong> {selectedStudent.nationalID}</p>
              <p><strong>  نوع السكن : </strong> {selectedStudent.HousingType}</p>
              {/* Add more details as needed */}

              <button onClick={applyHousingTypeChange}>تسجيل</button>

            </div>
            
          )}
        </div>

      </div>
    </div>
  );
};
export default ChangeUni;
