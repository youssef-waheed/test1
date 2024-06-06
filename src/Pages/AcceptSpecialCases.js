import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "../Style/AcceptSpecialCases.css";
import UserDetails from "./UserDetails";
import Form from "react-bootstrap/Form";

const AcceptSpecialCases = () => {
  const [specialCases, setSpecialCases] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [ofYear, setOfYear] = useState(""); 
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);

  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchAcceptSpecialCases();
  }, [ofYear]);


  const fetchAcceptSpecialCases = async () => {
    const queryString = `?ofYear=${ofYear}`;
    try {
      const response = await axios.get(
        `http://localhost:5000/applications/getRejectedStudents${queryString}`
      );
      setSpecialCases(response.data.data.student);
      setFilteredStudents(response.data.data.student);
    } catch (error) {
      console.log(error);
    }
  };


  function handleYearChange(event) {
    const selectedYear = event.target.value;
    setOfYear(selectedYear);
  }


  const showDetails = (specialCase) => {
    setSelectedCase(specialCase);
    setOfYear(specialCase.ofYear); 
  };

 
  const filteredCases = specialCases.filter((specialCase) => {
    return (
      (ofYear === "" || specialCase.ofYear === ofYear) && 
      ( specialCase.gender === "ذكر") &&
      (specialCase.studentName.includes(filter) || 
        specialCase.nationalID.includes(filter)) 
    );
  });

  const acceptApplication = async (studentID) => {
    try {
      await axios.put(
        `http://localhost:5000/applications/acceptRejectedStudents/${studentID}`
      );
      setSpecialCases(
        specialCases.map((specialCases) => {
          if (specialCases._id === studentID) {
            return { ...specialCases, statusOfOnlineRequests: "accepted" };
          }
          return specialCases;
        })
      );
      fetchAcceptSpecialCases();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleYearChange}
            value={ofYear}
          >
            <option value="">اختر العام الأكاديمي</option>
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </Form.Select>
        </div>

        <input
          type="text"
          placeholder="البحث بالاسم أو الرقم القومي"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          اسماء الطلاب :-
        </h1>
        <div className="names">
          <ul>
            {filteredCases.map((specialCase) => (
              <li
                key={specialCase._id}
                onClick={() => showDetails(specialCase)}
              >
                {specialCase.studentName}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="coll">
        {selectedCase && (
          <>
            <UserDetails user={selectedCase} />
            <div>
              <button
                style={{ backgroundColor: "green", }}
                onClick={() => acceptApplication(selectedCase._id)}
              >
                قبول
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptSpecialCases;
