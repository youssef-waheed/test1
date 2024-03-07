import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewOnlineRequest.css";
import UserDetails from "./UserDetails";
import Alert from "react-bootstrap/Alert";

const YourComponent = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filters, setFilters] = useState({
    egyptian: true,
    expatriate: false,
    oldStudent: false,
    newStudent: false,
    normalHousing: false,
    specialHousing: false,
    rejectedApplications: false,
    pendingApplications: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/applications/reviewOnlineRequestsMales"
      );
      setApplications(response.data.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const acceptApplication = async (studentId) => {
    try {
      await axios.put(
        `http://localhost:5000/applications/acceptOnlineRequests/${studentId}`
      );
      setApplications(
        applications.map((application) => {
          if (application._id === studentId) {
            return { ...application, statusOfOnlineRequests: "accepted" };
          }
          return application;
        })
      );
      fetchData();
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const rejectApplication = async (studentId) => {
    try {
      await axios.put(
        `http://localhost:5000/applications/rejectOnlineRequests/${studentId}`
      );
      setApplications(
        applications.map((application) => {
          if (application._id === studentId) {
            return { ...application, statusOfOnlineRequests: "rejected" };
          }
          return application;
        })
      );
      fetchData();
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const filteredApplications = applications.filter(
    (application) =>
      (application.studentName.includes(filter) ||
        application.nationalID.includes(filter)) &&
      (filters.egyptian ? application.egyptions : true) &&
      (filters.expatriate ? application.expartriates : true) &&
      (filters.oldStudent ? application.oldStudent : true) &&
      (filters.newStudent ? application.newStudent : true) &&
      (filters.normalHousing ? application.HousingType === "عادي" : true) &&
      (filters.specialHousing ? application.HousingType === "مميز" : true) &&
      (filters.pendingApplications
        ? application.statusOfOnlineRequests === "pending"
        : true) &&
      (filters.rejectedApplications
        ? application.statusOfOnlineRequests === "rejected"
        : true)
  );

  const showDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleCheckboxChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <label>
          <input
            type="checkbox"
            checked={filters.egyptian}
            onChange={() => handleCheckboxChange("egyptian")}
          />{" "}
          مصري
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.expatriate}
            onChange={() => handleCheckboxChange("expatriate")}
          />{" "}
          وافد
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.oldStudent}
            onChange={() => handleCheckboxChange("oldStudent")}
          />{" "}
          قديم
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.newStudent}
            onChange={() => handleCheckboxChange("newStudent")}
          />{" "}
          جديد
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.normalHousing}
            onChange={() => handleCheckboxChange("normalHousing")}
          />{" "}
          سكن عادي
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.specialHousing}
            onChange={() => handleCheckboxChange("specialHousing")}
          />{" "}
          سكن مميز
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.pendingApplications}
            onChange={() => handleCheckboxChange("pendingApplications")}
          />{" "}
          الطلبات الجديدة
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.rejectedApplications}
            onChange={() => handleCheckboxChange("rejectedApplications")}
          />{" "}
          الطلبات المرفوضة
        </label>
        <input
          type="text"
          placeholder="Search by name or national ID"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <h1>اسماء الطلاب :-</h1>
        <div className="names">
          <ul>
            {filteredApplications.map((application) => (
              <li
                key={application._id}
                onClick={() => showDetails(application)}
              >
                {application.studentName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="coll">
        {selectedApplication && (
          <>
            <UserDetails user={selectedApplication} />
            <div>
              <button
                onClick={() => acceptApplication(selectedApplication._id)}
              >
                Approve
              </button>
              <button
                onClick={() => rejectApplication(selectedApplication._id)}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YourComponent;
