import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ReviewOnlineRequest.css";
import UserDetails from './UserDetails';

const YourComponent = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/applications/reviewOnlineRequestsMales');
      setApplications(response.data.data.users.filter(application => application.statusOfOnlineRequests === 'pending'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const acceptApplication = async (studentId) => {
    try {
      await axios.put(`http://localhost:5000/applications/acceptOnlineRequests/${studentId}`);
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

  const filteredApplications = applications.filter(application =>
    application.studentName.includes(filter) || application.nationalID.includes(filter)
  );

  const showDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="two-column-wrapper">
      <div className='col'>
        <label>
          <input type="checkbox" value="مصري" /> مصري
        </label>
        <label>
          <input type="checkbox" value="وافد" /> وافد
        </label>
        <label>
          <input type="checkbox" value="قدامي" /> قدامي
        </label>
        <label>
          <input type="checkbox" value="جدد" /> جدد
        </label>
        <label>
          <input type="checkbox" value="سكن عادي" /> سكن عادي
        </label>
        <label>
          <input type="checkbox" value="سكن مميز" /> سكن مميز
        </label>
        <label>
          <input type="checkbox" value="الطلبات الجديدة" /> الطلبات الجديدة
        </label>
        <label>
          <input type="checkbox" value="الطلبات المرفوضة" /> الطلبات المرفوضة
        </label>
        <input
          type="text"
          placeholder="Search by name or national ID"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        <h1>اسماء الطلاب :-</h1>
        <div className='names'>
        <ul>
          {filteredApplications.map(application => (
            <li key={application._id} onClick={() => showDetails(application)}>
              {application.studentName}
            </li>
          ))}
        </ul>
        </div>
        
      </div>
      <div className='coll'>
        <h1>Applications</h1>
        <ul>
          {filteredApplications.map(application => (
            <li key={application._id} onClick={() => showDetails(application)}>
              {application.studentName} - {application.statusOfOnlineRequests}
              <button onClick={() => acceptApplication(application._id)}>Accept</button>
              <button onClick={() => rejectApplication(application._id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedApplication && <UserDetails user={selectedApplication} />}
    </div>
  );
};

export default YourComponent;