// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ChangeHousingType = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [newHousingType, setNewHousingType] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     handleSearch();
//   }, [searchQuery]);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/basicData/getBasicDataMales');
//       const responseData = response.data;
//       if (
//         responseData.status === 'success' &&
//         responseData.data &&
//         Array.isArray(responseData.data.students)
//       ) {
//         const filteredStudents = responseData.data.students.filter(student => student.isHoused);
//         setStudents(filteredStudents);
//         setFilteredStudents(filteredStudents);
//       } else {
//         setStudents([]);
//         setFilteredStudents([]);
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       setStudents([]);
//       setFilteredStudents([]);
//     }
//   };

//   const handleSearch = () => {
//     const filtered = students.filter(student => {
//       const nameMatches = student.studentName && student.studentName.includes(searchQuery);
//       const idMatches = student.nationalID && student.nationalID.includes(searchQuery);
//       return nameMatches || idMatches;
//     });
//     setFilteredStudents(filtered);
//   };

//   const selectStudent = (studentId) => {
//     setSelectedStudent(studentId);
//   };

//   const applyHousingTypeChange = () => {
//     if (!selectedStudent) {
//       console.error('Select a student to apply housing type change.');
//       return;
//     }
    
//     const housingTypeData = {
//       newHousingType: newHousingType
//     };
  
//     axios.put(`http://localhost:5000/housing/${selectedStudent}`, housingTypeData)
//       .then(response => {
//         console.log('Housing type change applied successfully:', response.data);
//         setSelectedStudent(null);
//         setNewHousingType('');
//         fetchStudents();
//       })
//       .catch(error => {
//         console.error('Error applying housing type change:', error);
//       });
//   };
  

//   return (
//     <div>
//       <div className="two-column-wrapper">
//         <div className="col">
//           <input
//             type="text"
//             placeholder="New Housing Type"
//             value={newHousingType}
//             onChange={e => setNewHousingType(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search by name or national ID"
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//           />
//           <h1>Students:</h1>
//           <ul>
//             {filteredStudents.map(student => (
//               <li key={student._id}>
//                 <button
//                   className={selectedStudent === student._id ? 'selected' : ''}
//                   onClick={() => selectStudent(student._id)}
//                 >
//                   <strong>Student Name: </strong> {student.studentName || 'Unknown Name'}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button onClick={applyHousingTypeChange}>Apply Housing Type Change</button>
//         </div>

//         <div className="coll">
//           <ul>
//             <li>Enter the new housing type</li>
//             <li>Select a student from the list by clicking on their name and click the button to apply the housing type change</li>
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// };
// export default ChangeHousingType;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeHousingType = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newHousingType, setNewHousingType] = useState('');
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
      newHousingType: newHousingType
    };
  
    axios.put(`http://localhost:5000/housing/${selectedStudent._id}`, housingTypeData)
      .then(response => {
        console.log('Housing type change applied successfully:', response.data);
        setSelectedStudent(null);
        setNewHousingType('');
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
          <input
            type="text"
            placeholder="نوع السكن الجديد"
            value={newHousingType}
            onChange={e => setNewHousingType(e.target.value)}
          />
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
         
          <button onClick={applyHousingTypeChange}>Apply Housing Type Change</button>
        </div>

        <div className="coll">
          <ul>
          <li>يتم كتابة سبب الاخلاء ان وجد</li>
                  <li>و من قائمة الطلاب يتم اختيار الاسماء ثم الضغط علي زر تسجيل الاخلاء </li>  
          </ul>
           {selectedStudent && (
            <div>
                <p>___________________</p>
              <h2>بيانات الطالب :</h2>
              <p><strong>اسم الطالب : </strong> {selectedStudent.studentName}</p>
              <p><strong>الرقم القومي للطالب : </strong> {selectedStudent.nationalID}</p>
              <p><strong>  نوع السكن : </strong> {selectedStudent.HousingType}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default ChangeHousingType;
