import React, { useState } from 'react';
import "./Upload.css"; 

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      // Reset selected file state after upload
      setSelectedFile(null);
    } else {
      console.log("No file selected for upload.");
    }
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {selectedFile && (
          <div className="preview">
            <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
      </div>
      <div className="coll">
        <ul>
          <li>رفع مجموعة صور الطلاب في ملف مضغوط</li>
          <li>يجب ان يكون اسم الصورة هو الرقم القومي</li>
          <li>يجب ان تكون ابعاد الصورة 76*88 و اي اختلاف سيؤثر علي الصورة في الكارنيه</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadPhoto;
