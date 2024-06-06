import React, { useState, useEffect }  from "react";
import "./Social.css";
import axios from "axios";

const SocialResearch = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState({
    longDistance: false,
    divorce: false,
    death: false,
    social: false,
    sick: false,
  });

  const [oldChecked, setOldChecked] = useState(true);
  const [newChecked, setNewChecked] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]); // Define filteredApplications state


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/basicData/getBasicDataMales");
      console.log("API Response:", response.data); // Log the API response
  
      const responseData = response.data;
      if (responseData.status === 'success' && responseData.data && Array.isArray(responseData.data.students)) {
        setApplications(responseData.data.students); // Set applications to the array of students
      } else {
        setApplications([]); // Set applications to an empty array if no valid data is received
      }
  
      console.log("Applications:", applications); // Log the updated applications array
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors such as displaying an error message or retrying the request
      setApplications([]); // Set applications to an empty array on error
    }
  };


  const handleOldChange = () => {
    setOldChecked(!oldChecked);
    setNewChecked(oldChecked);
  };

  const handleNewChange = () => {
    setNewChecked(!newChecked);
    setOldChecked(newChecked);
  };

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setParentChecked(isChecked);
    setChildChecked({
      longDistance: isChecked,
      divorce: isChecked,
      death: isChecked,
      social: isChecked,
      sick: isChecked,
    });
  };

  const handleChildChange = (event) => {
    const { name, checked } = event.target;
    setChildChecked({
      ...childChecked,
      [name]: checked,
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const areAllChecked = Object.values(childChecked).every((val) => val);
    setParentChecked(areAllChecked);
  }, [childChecked]);

  
  const applyFilter = () => {
    if (!Array.isArray(applications)) {
      console.error("Applications is not an array");
      return;
    }

const normalizedFilter = filter.toLowerCase().trim();
  
    const filteredApps = applications.filter((application) => {
      const normalizedName = application.studentName?.trim().toLowerCase();
      const matchesName = normalizedName?.includes(normalizedFilter);
      const matchesNationalID = application.nationalID?.includes(filter);
      const isOldStudent = application.oldStudent;
      const isNewStudent = application.newStudent;
  
      // Check if socialResearchcases is defined and an array before using includes
      const socialResearchCases = Array.isArray(application.socialResearchcases)
        ? application.socialResearchcases.map((caseItem) => caseItem.trim().toLowerCase())
        : [];
      const matchesSocialResearch = socialResearchCases.includes(normalizedFilter);
  
      return (
        (matchesName || matchesNationalID) &&
        ((oldChecked && isOldStudent) || (!oldChecked && isNewStudent))
      );
    });
  
    setFilteredApplications(filteredApps);
  };


  // const addSocialResearchCase = async () => {
  //   const selectedCases = Object.keys(childChecked).filter((key) => childChecked[key]);
  //   if (selectedCases.length === 0 || !selectedApplication) {
  //     return;
  //   }
  
  //   const queryParams = selectedCases.map((caseKey) => `${caseKey}=true`).join('&');
  //   const url = `http://localhost:5000/applications/socialResearchcases/${selectedApplication.nationalID}?${queryParams}`;
  //   console.log(url);
  //   try {
  //     const response = await axios.post(url, { cases: selectedCases });
  //     console.log("Social Research Case Added:", response.data);
  //     fetchData();
  
  //     // You can handle success or show a message to the user
  //   } catch (error) {
  //     console.error("Error adding social research case:", error);
  //     // You can handle the error and show an appropriate message to the user
  //   }
  // };
  
  const addSocialResearchCase = async () => {
    const selectedCases = Object.keys(childChecked).filter((key) => childChecked[key]);
    if (selectedCases.length === 0 || !selectedApplication) {
      return;
    }
  
    const queryParams = selectedCases.map((caseKey) => `${caseKey}=true`).join('&');
    const url = `http://localhost:5000/applications/socialResearchcases/${selectedApplication.nationalID}?${queryParams}`;
    
    try {
      await axios.post(url, { cases: selectedCases });
      console.log("Social Research Case Added");
      await fetchData(); // Fetch updated data
      const updatedStudent = applications.find(app => app.nationalID === selectedApplication.nationalID);
      if (updatedStudent) {
        setSelectedApplication(updatedStudent);
        showDetails(updatedStudent);
      }

      // You can handle success or show a message to the user
    } catch (error) {
      console.error("Error adding social research case:", error);
      // You can handle the error and show an appropriate message to the user
    }
  };
  

  useEffect(() => {
    applyFilter();
  }, [filter, oldChecked, newChecked, applications]); // Include dependencies in useEffect


  const showDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <label>
          <input
            type="checkbox"
            checked={oldChecked}
            onChange={handleOldChange}
          />
          قديم
        </label>
        <label>
          <input
            type="checkbox"
            checked={newChecked}
            onChange={handleNewChange}
          />
          جديد
        </label>
        <p>___________________</p>
        <div className="check">
          <label>    
            <input
        type="checkbox"
        id="parentCheckbox"
        checked={parentChecked}
        onChange={handleParentChange}
      />{" "}حالة خاصة
      </label>
        </div>
      <div>
      <label><input
          type="checkbox"
          id="longDistance"
          name="longDistance"
          checked={childChecked.longDistance}
          onChange={handleChildChange}
        />{" "}بعد المسافة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="divorce"
          name="divorce"
          checked={childChecked.divorce}
          onChange={handleChildChange}
        />
        {" "}انفصال</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="death"
          name="death"
          checked={childChecked.death}
          onChange={handleChildChange}
        />
         {" "}وفاة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="social"
          name="social"
          checked={childChecked.social}
          onChange={handleChildChange}
        />
          {" "}اجتماعي</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="sick"
          name="sick"
          checked={childChecked.sick}
          onChange={handleChildChange}
        />
        {" "}مرضي</label>
      </div>
      <input
          type="text"
          placeholder="Search by name or national ID"
          value={filter}
          onChange={handleFilterChange}
        />

        <h1>اسماء الطلاب :-</h1>
        <div className="names">
          <ul>
            {filteredApplications.map((application) => (
              <li key={application._id} onClick={() => showDetails(application)}>
                {application.studentName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="coll">
  {selectedApplication && (
    <div  style={{ position: 'relative' }}>
       {selectedApplication.image?.data && (<img
        src={`data:image/png;base64,${arrayBufferToBase64(selectedApplication.image.data)}`}
        alt="Student"
        style={{
          maxWidth: '300px', // Adjust the maximum width as needed
          maxHeight: '300px', // Adjust the maximum height as needed
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />)}
      <div  style={{ marginLeft: '120px' }}>
        <h2>{selectedApplication.studentName}</h2>
        {selectedApplication.nationalID &&<p><strong>National ID:</strong> {selectedApplication.nationalID}</p>}
        <p><strong>Student ID:</strong> {selectedApplication.studentCode}</p>
        <p><strong>Phone Number:</strong> {selectedApplication.phoneNumber}</p>
        <p><strong>Address:</strong> {selectedApplication.residence}</p>
        <p><strong>Date of Birth:</strong> {new Date(selectedApplication.birthDate).toLocaleDateString()}</p>
        {selectedApplication.socialResearchcases?.length > 0 && (
      <div>
        <p><strong>Social Research Cases:</strong></p>
        <ul>
          {selectedApplication.socialResearchcases.map((caseItem, index) => (
            <li key={index}>{caseItem}</li>
          ))}
        </ul>
      </div>
    )}
        <p><strong>Old Student:</strong> {selectedApplication.oldStudent ? 'Yes' : 'No'}</p>
<p><strong>New Student:</strong> {selectedApplication.newStudent ? 'Yes' : 'No'}</p>
        {/* Display any other important data */}
      </div>
    </div>
  )}
   <button 
       style={{ backgroundColor: "green", }}
   onClick={addSocialResearchCase}>اضافة حالة بحث اجتماعي</button>
</div>
    </div>
  );
};

export default SocialResearch;

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
