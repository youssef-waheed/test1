import React, { useState, useEffect }  from "react";
import "./Social.css";
import axios from "axios";

const SocialResearch = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });

  const [oldChecked, setOldChecked] = useState(true);
  const [newChecked, setNewChecked] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]); // Define filteredApplications state

  const handleOldChange = () => {
    setOldChecked(!oldChecked);
    setNewChecked(oldChecked);
  };

  const handleNewChange = () => {
    setNewChecked(!newChecked);
    setOldChecked(newChecked);
  };

  useEffect(() => {
    const areAllChecked = Object.values(childChecked).every((val) => val);
    setParentChecked(areAllChecked);
  }, [childChecked]);

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setParentChecked(isChecked);
    setChildChecked({
      checkbox1: isChecked,
      checkbox2: isChecked,
      checkbox3: isChecked,
      checkbox4: isChecked,
      checkbox5: isChecked,
    });
  };

  const handleChildChange = (event) => {
    const { name, checked } = event.target;
    setChildChecked({
      ...childChecked,
      [name]: checked,
    });
  };

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
  
  

  useEffect(() => {
    applyFilter();
  }, [filter, oldChecked, newChecked, applications]); // Include dependencies in useEffect

  const applyFilter = () => {
    if (!Array.isArray(applications)) {
      // Ensure applications is an array
      console.error("Applications is not an array");
      return;
    }
  
    const filteredApps = applications.filter(
      (application) =>
        application.studentName.includes(filter) ||
        application.nationalID.includes(filter) ||
        (oldChecked ? application.oldStudent : true) ||
        (newChecked ? application.newStudent : true)
    );
    console.log("Filtered Applications:", filteredApps);
    setFilteredApplications(filteredApps);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
          id="checkbox1"
          name="checkbox1"
          checked={childChecked.checkbox1}
          onChange={handleChildChange}
        />{" "}بعد المسافة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox2"
          name="checkbox2"
          checked={childChecked.checkbox2}
          onChange={handleChildChange}
        />
        {" "}انفصال</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox3"
          name="checkbox3"
          checked={childChecked.checkbox3}
          onChange={handleChildChange}
        />
         {" "}وفاة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox4"
          name="checkbox4"
          checked={childChecked.checkbox4}
          onChange={handleChildChange}
        />
          {" "}اجتماعي</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox5"
          name="checkbox5"
          checked={childChecked.checkbox5}
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
      <img
        src={`data:image/png;base64,${arrayBufferToBase64(selectedApplication.image.data)}`}
        alt="Student"
        style={{
          maxWidth: '300px', // Adjust the maximum width as needed
          maxHeight: '300px', // Adjust the maximum height as needed
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div  style={{ marginLeft: '120px' }}>
        <h2>{selectedApplication.studentName}</h2>
        <p><strong>ID:</strong> {selectedApplication._id}</p>
        <p><strong>Student ID:</strong> {selectedApplication.studentCode}</p>
        <p><strong>Phone Number:</strong> {selectedApplication.phoneNumber}</p>
        <p><strong>Address:</strong> {selectedApplication.residence}</p>
        <p><strong>Date of Birth:</strong> {new Date(selectedApplication.birthDate).toLocaleDateString()}</p>
        <p><strong>Social Research Cases:</strong></p>
        <ul>
          {selectedApplication.socialResearchcases.map((caseItem, index) => (
            <li key={index}>{caseItem}</li>
          ))}
        </ul>
        <p><strong>Old Student:</strong> {selectedApplication.oldStudent ? 'Yes' : 'No'}</p>
<p><strong>New Student:</strong> {selectedApplication.newStudent ? 'Yes' : 'No'}</p>
        {/* Display any other important data */}
      </div>
    </div>
  )}
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
