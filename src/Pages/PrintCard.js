<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import frontCardImage from './1.png';
import './PrintCard.css';
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import arabicFont from "../../src/Katibeh-Regular.ttf";
// import fontkit from "fontkit";
import frontCardImage from "./1.png";
import backCardImage from "./2.png";
import "./PrintCard.css";
>>>>>>> 2073d63e7824c373ef9e1670b0a599523bb05533

const PrintCard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('http://localhost:5000/applications/unprintedCardsForMales');
      setFilteredData(response.data.data.student || []);
=======
      const response = await axios.get(
        "http://localhost:5000/applications/unprintedCardsForMales"
      );
      setData(response.data.data.student || []);
      filterData(response.data.data.student || []);
>>>>>>> 2073d63e7824c373ef9e1670b0a599523bb05533
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

<<<<<<< HEAD
=======
  const loadFonts = () => {
    const font = new FontFace("arabic-normal", `url(${arabicFont})`);
    font
      .load()
      .then(() => {
        setFontLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading font:", error);
      });
  };

  const filterData = (dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      return (
        item.studentName.includes(searchQuery) ||
        item.nationalID.includes(searchQuery)
      );
    });
    setFilteredData(filtered);
  };

>>>>>>> 2073d63e7824c373ef9e1670b0a599523bb05533
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

<<<<<<< HEAD
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
        ctx.fillStyle = 'black'; // Text color
        ctx.font = '14px Arial'; // Font size and family
        ctx.fillText(`Name: ${selectedStudent.studentName}`, 20, 150); // Adjust position as needed
        ctx.fillText(`Year: ${selectedStudent.year}`, 20, 170); // Adjust position as needed
        ctx.fillText(`Student Code: ${selectedStudent.studentCode}`, 20, 190); // Adjust position as needed
        // Add other student details as needed

        // Convert buffer data to base64 image
        const imgData = `data:image/png;base64,${arrayBufferToBase64(selectedStudent.image.data)}`;
        const studentImage = new Image();
        studentImage.src = imgData;
        studentImage.onload = () => {
          ctx.drawImage(studentImage, 250, 100, 100, 100); // Adjust position and size as needed

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
=======
  const handleDownloadPDF = () => {
    if (selectedStudent && fontLoaded) {
      const frontCardElement = document.getElementById("front-card-template");
      const backCardElement = document.getElementById("back-card-template");

      html2canvas(frontCardElement).then((frontCanvas) => {
        html2canvas(backCardElement).then((backCanvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          const frontImgData = frontCanvas.toDataURL("image/png");
          const backImgData = backCanvas.toDataURL("image/png");

          // Add front and back images to PDF
          pdf.addImage(frontImgData, "PNG", 10, 10, 100, 64);
          pdf.addImage(backImgData, "PNG", 120, 10, 100, 64);

          // Add student data to PDF
          const {
            studentName,
            year,
            studentCode,
            buildingName,
            floorName,
            roomName,
            image,
          } = selectedStudent;
          const studentDetails = [
            { label: "الاسم", value: studentName },
            { label: "السنة", value: year },
            { label: "كود الطالب", value: studentCode },
            { label: "المبنى", value: buildingName },
            { label: "الطابق", value: floorName },
            { label: "الغرفة", value: roomName },
          ];

          // Convert base64 image to image data
          const imgData = image.replace(
            /^data:image\/(png|jpg|jpeg);base64,/,
            ""
          );

          // Add student image to PDF
          try {
            if (imgData) {
              pdf.addImage(imgData, "PNG", 20, 120, 50, 50); // Adjust image position and size
            } else {
              throw new Error("Image data is empty or invalid.");
            }
          } catch (error) {
            console.error("Error adding image to PDF:", error);
          }

          // Set font and encoding for Arabic text
          pdf.setFont("arabic-normal");
          pdf.setFontSize(12);

          // Add student details table to PDF using autotable plugin
          pdf.autoTable({
            startY: 200,
            body: studentDetails.map(({ label, value }) => [label, value]),
            headStyles: { fillColor: [176, 196, 222] }, // Light blue header color
          });

          // Save the PDF file
          pdf.save("student_card.pdf");
        });
      });
    } else {
      console.error("Font not loaded or no student selected.");
    }
  };
>>>>>>> 2073d63e7824c373ef9e1670b0a599523bb05533

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
          <li>
            الاسماء المعروضة هي الطلاب الساكنين و لهم صور و لم يتم طباعة بطاقتهم
          </li>
          <li>اختار الاسماء المراد طباعتها</li>
          <li>راجع شكل البطاقة و اضغط طباعة</li>
          <li>بعد التاكد من طباعة البطاقات اضغط اخفاء</li>
          <li>__________________________________________________</li>
        </ul>
        {selectedStudent && (
          <div className="card-container">
            <div className="card">
              <img
                src={frontCardImage}
                alt="Front Card Template"
                id="front-card-template"
                className="card-image"
              />
              <div className="card-details">
                <p>Name: {selectedStudent.studentName}</p>
                <p>Year: {selectedStudent.year}</p>
                <p>Student Code: {selectedStudent.studentCode}</p>
                {/* Add other student details */}
              </div>
              <img src={`data:image/png;base64,${arrayBufferToBase64(selectedStudent.image.data)}`} alt="Student" className="student-image" />
            </div>
<<<<<<< HEAD
            <button onClick={handleDownloadImage}>Download Image</button>
=======
            <div className="card">
              <img
                src={backCardImage}
                alt="Back Card Template"
                id="back-card-template"
                className="card-image"
              />
            </div>
            <button onClick={handleDownloadPDF}>Download PDF</button>
>>>>>>> 2073d63e7824c373ef9e1670b0a599523bb05533
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintCard;
