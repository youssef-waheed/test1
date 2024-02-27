import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/applications/reviewOnlineRequestsFemales');
      setApplications(response.data.data.users.filter(application => application.statusOfOnlineRequests === 'pending'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const acceptApplication = async (studentId) => {
    try {
      await axios.put(`http://localhost:5000/applications/acceptOnlineRequests/${studentId}`);
      // Update the status directly in the response data
      setApplications(applications.map(application => {
        if (application._id === studentId) {
          return { ...application, statusOfOnlineRequests: 'accepted' };
        }
        return application;
      }));
      fetchData();
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const rejectApplication = async (studentId) => {
    try {
      await axios.put(`http://localhost:5000/applications/rejectOnlineRequests/${studentId}`);
      // Update the status directly in the response data
      setApplications(applications.map(application => {
        if (application._id === studentId) {
          return { ...application, statusOfOnlineRequests: 'rejected' };
        }
        return application;
      }));
      fetchData();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  return (
    <div>
      <h1>Applications</h1>
      <ul>
        {applications.map(application => (
          <li key={application._id}>
            {application.studentName} - {application.statusOfOnlineRequests}
            <button onClick={() => acceptApplication(application._id)}>Accept</button>
            <button onClick={() => rejectApplication(application._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
