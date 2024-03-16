import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import frontCardImage from "./1.png"; 
import backCardImage from "./2.png"; 
import './PrintCard.css'; 

const PrintCard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/applications/unprintedCardsForMales');
      setData(response.data.data.student || []);
      filterData(response.data.data.student || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = (dataToFilter) => {
    const filtered = dataToFilter.filter(item => {
      return (
        item.studentName.includes(searchQuery) ||
        item.nationalID.includes(searchQuery)
      );
    });
    setFilteredData(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDownloadPDF = () => {
    if (selectedStudent) {
      const frontCardElement = document.getElementById('front-card-template');
      const backCardElement = document.getElementById('back-card-template');

      html2canvas(frontCardElement).then(frontCanvas => {
        html2canvas(backCardElement).then(backCanvas => {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const frontImgData = frontCanvas.toDataURL('image/png');
          const backImgData = backCanvas.toDataURL('image/png');

          // Add front and back images to PDF
          pdf.addImage(frontImgData, 'PNG', 10, 10, 100, 64); 
          pdf.addImage(backImgData, 'PNG', 120, 10, 100, 64); 

          // Add student data to PDF
          const { studentName, year, studentCode, buildingName, floorName, roomName, image } = selectedStudent;
          const studentDetails = `
            الاسم      : ${studentName}
            السنة      : ${year}
            كود الطالب : ${studentCode}
            المبني     : ${buildingName}
            الطابق     : ${floorName}
            الغرفة     : ${roomName}
          `;

          pdf.text(20, 100, studentDetails); // Adjust position (x, y) as needed

          // Add student image to PDF
          const studentImg = new Image();
          studentImg.src = image; // Assuming the image path is provided in the student data
          studentImg.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = studentImg.width;
            canvas.height = studentImg.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(studentImg, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 20, 120, 50, 50); // Adjust image position and size

            // Save the PDF file
            pdf.save('student_card.pdf');
          };
        });
      });
    }
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
            </div>
            <div className="card">
              <img src={backCardImage} alt="Back Card Template" id="back-card-template" className="card-image" />
            </div>
            <button onClick={handleDownloadPDF}>Download PDF</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintCard;
