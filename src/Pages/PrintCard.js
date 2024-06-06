import React, { useState, useEffect } from 'react';
import axios from 'axios';
import frontCardImage from './1.png';
import './PrintCard.css';

const PrintCard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/applications/unprintedCardsForMales');
      
      
      const studentsWithImages = response.data.data.student.filter(student => {
        const hasValidImage = student.image && typeof student.image === 'object' && student.image.data && Array.isArray(student.image.data) && student.image.data.length > 0;
        return hasValidImage;
      });
  
      setFilteredData(studentsWithImages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (query) => {
    const filtered = filteredData.filter((item) => {
      return item.studentName.includes(query) || item.nationalID.includes(query);
    });
    setFilteredData(filtered);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDownloadImage = () => {
    if (selectedStudent) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match the card image
      canvas.width = 400; // Adjust width as needed
      canvas.height = 250; // Adjust height as needed

      // Load the card image
      const cardImage = new Image();
      cardImage.src = frontCardImage;
      cardImage.onload = () => {
        ctx.drawImage(cardImage, 0, 0, canvas.width, canvas.height);

        // Add student details to the canvas
        ctx.fillStyle = '#edc74f'; // Text color // Text color
        ctx.font = '14px Arial'; // Font size and family
        ctx.fillText(`Name: ${selectedStudent.studentName}`, 20, 105); // Adjust position as needed
        ctx.fillText(`Year: ${selectedStudent.year}`, 20, 125); // Adjust position as needed
        ctx.fillText(`Student Code: ${selectedStudent.studentCode}`, 20, 145); // Adjust position as needed
        

        // Convert buffer data to base64 image
        const imgData = `data:image/png;base64,${arrayBufferToBase64(selectedStudent.image.data)}`;
        const studentImage = new Image();
        studentImage.src = imgData;
        studentImage.onload = () => {
          ctx.drawImage(studentImage, 210, 40, 170, 170); // Adjust position and size as needed

          // Convert canvas to image and download
          const downloadLink = document.createElement('a');
          downloadLink.href = canvas.toDataURL('image/png');
          downloadLink.download = 'student_card.png';
          downloadLink.click();
        };
      };
    } else {
      console.error('No student selected.');
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <input
          type="text"
          placeholder="Search by name or national ID"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <ul>
          {filteredData.map((item) => (
            <li key={item._id} onClick={() => handleStudentClick(item)}>
              {item.studentName}
            </li>
          ))}
        </ul>
      </div>
      <div className="coll">
        <ul>
          <li>الاسماء المعروضة هي الطلاب الساكنين و لهم صور و لم يتم طباعة بطاقتهم</li>
          <li>اختار الاسماء المراد طباعتها</li>
          <li>راجع شكل البطاقة و اضغط طباعة</li>
          <li>بعد التاكد من طباعة البطاقات اضغط اخفاء</li>
          <li>__________________________________________________</li>
        </ul>
        {selectedStudent && (
          <div className="card-container">
            <div className="card">
              <img src={frontCardImage} alt="Front Card Template" id="front-card-template" className="card-image" />
              <div className="card-details">
                <p>Name: {selectedStudent.studentName}</p>
                <p>Year: {selectedStudent.year}</p>
                <p>Student Code: {selectedStudent.studentCode}</p>
                {/* Add other student details */}
              </div>
             {selectedStudent.image && <img src={`data:image/png;base64,${arrayBufferToBase64(selectedStudent.image.data)}`} alt="Student" className="student-image" />}
            </div>
            <button
            style={{ backgroundColor: "green", }}
            onClick={handleDownloadImage}>طباعة</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintCard;
