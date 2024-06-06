import React, { useState } from 'react';
import axios from 'axios';
import "./Upload.css"; 

const UploadPhoto = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files).slice(0, 1000); // Limit to 1000 files
    setSelectedFiles(filesArray);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('avatar', file); 
      });

      const response = await axios.put('http://localhost:5000/applications/uploadStudentPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data);

      // Reset selected files state after successful upload
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <input type="file" onChange={handleFileChange} multiple />
        <button
        
        style={{ backgroundColor: "green",color:"white", borderRadius:"5px" }}
        
        onClick={handleUpload}>رفع</button>
        <div className="preview-container">
          {selectedFiles.map((file, index) => (
            <div key={index} className="preview">
              <img src={URL.createObjectURL(file)} alt={`Uploaded ${index}`} className="uploaded-image" />
            </div>
          ))}
        </div>
      </div>
      <div className="coll">
        <ul>
          {/* <li>رفع مجموعة صور الطلاب في ملف مضغوط</li> */}
          <li>يجب ان يكون اسم الصورة هو الرقم القومي</li>
          {/* <li>يجب ان تكون ابعاد الصورة 76*88 و اي اختلاف سيؤثر علي الصورة في الكارنيه</li> */}
        </ul>
      </div>
    </div>
  );
};

export default UploadPhoto;
