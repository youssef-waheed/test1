import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../../helper/storage";
const auth = getAuthUser();

const ChangeUni = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [TransferReason, setTransferReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/basicData/getBasicDataMales",
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      if (
        responseData.status === "success" &&
        responseData.data &&
        Array.isArray(responseData.data.students)
      ) {
        const filteredStudents = responseData.data.students.filter(
          (student) => student.isHoused
        );
        setStudents(filteredStudents);

        setFilteredStudents(filteredStudents);
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);

      setFilteredStudents([]);
    }
  };
  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "update",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createLogs = async () => {
    try {
      const logs = await axios.post("http://localhost:5000/logs/createLogs", {
        adminID: auth.log.adminID,
        adminUserName: auth.log.adminUserName,
        action: "تعديل الجامعة  ",
        objectName: `للطالب ${students.studentName},برقم الطالب ${students.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    const filtered = students.filter((student) => {
      const nameMatches =
        student.studentName && student.studentName.includes(searchQuery);
      const idMatches =
        student.nationalID && student.nationalID.includes(searchQuery);
      return nameMatches || idMatches;
    });
    setFilteredStudents(filtered);
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  const applyHousingTypeChange = () => {
    if (!selectedStudent) {
      console.error("Select a student to apply housing type change.");
      return;
    }

    const housingTypeData = {
      transferReason: TransferReason,
    };

    axios
      .post(
        `http://localhost:5000/transferStudent/${selectedStudent._id}`,
        housingTypeData
      )
      .then((response) => {
        console.log("Housing type change applied successfully:", response.data);
        setSelectedStudent(null);
        setTransferReason("");
        createLogs();
        incremented();
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error applying housing type change:", error);
      });
  };

  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
          <input
            type="text"
            placeholder="نوع السكن الجديد"
            value={TransferReason}
            onChange={(e) => setTransferReason(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by name or national ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h1>الطلاب:</h1>
          <ul>
            {filteredStudents.map((student) => (
              <li key={student._id}>
                <button
                  className={
                    selectedStudent && selectedStudent._id === student._id
                      ? "selected"
                      : ""
                  }
                  onClick={() => selectStudent(student)}
                >
                  {student.studentName || "Unknown Name"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="coll">
          {selectedStudent && (
            <div>
              <h2>بيانات الطالب :</h2>
              <p>
                <strong>اسم الطالب : </strong> {selectedStudent.studentName}
              </p>
              <p>
                <strong>الرقم القومي للطالب : </strong>{" "}
                {selectedStudent.nationalID}
              </p>
              <p>
                <strong> نوع السكن : </strong> {selectedStudent.HousingType}
              </p>
              {/* Add more details as needed */}
              {auth &&
                (auth.athurity === "الكل" ||
                  auth.athurity === "تعديل" ||
                  auth.athurity === "ادخال") && (
                  <button
                    style={{ backgroundColor: "blue" }}
                    onClick={applyHousingTypeChange}
                  >
                    تسجيل
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChangeUni;
