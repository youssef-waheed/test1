import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UniPhoto.css";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const PhotoFrame = ({ frameId, uploadUrl }) => {
  const [whatForText, setWhatForText] = useState(
    frameId === 1 ? "شعار الجامعة" : "توقيع"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/universityPhotos/getPhotos",
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("whatFor", whatForText);

    setLoading(true);
    setUploadMessage("");

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUploadMessage("Upload successful");
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploadMessage("Upload failed");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setUploadMessage("");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="photo-frame">
      {loading && <p>Uploading...</p>}
      {uploadMessage && <p>{uploadMessage}</p>}
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter description"
        value={whatForText}
        onChange={(e) => setWhatForText(e.target.value)}
      />
      {auth && (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
        <button style={{ backgroundColor: "blue" }} onClick={handleUpload}>
          Upload
        </button>
      )}

      {/* Display photos based on their WhatFor value */}
      <div className="photo-grid">
        {photos.map((photo) => {
          if (photo.whatFor === whatForText) {
            return (
              <div key={photo._id} className="photo-item">
                <p>{photo.whatFor}</p>
                <img
                  src={`data:${photo.contentType};base64,${photo.data}`}
                  alt={photo.name}
                />
              </div>
            );
          }
          return null; // Don't render photos that don't match the current WhatFor text
        })}
      </div>
    </div>
  );
};

export default PhotoFrame;
