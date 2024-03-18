import React, { useState } from 'react';
import axios from 'axios';
import PhotoFrame from './UniphotoFrame';
import "./UniPhoto.css";

const UniPhoto = () => {
    const uploadUrl = 'http://localhost:5000/universityPhotos/uploadPhoto'; 
  
    return (
      <div className="App">
        <h1>Photo Frames</h1>
        <div className="frames-container">
          <PhotoFrame frameId={1} uploadUrl={uploadUrl} />
          <PhotoFrame frameId={2} uploadUrl={uploadUrl} />
        </div>
      </div>
    );
  };
  
  export default UniPhoto;