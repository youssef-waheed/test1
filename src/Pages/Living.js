import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import MultilevelDropdown from "../Pages/SakanTest";
import { getAuthUser } from "../helper/storage";

const auth = getAuthUser();

const Living = ({ studentData }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(studentData || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [error, setError] = useState(""); // State to store error message

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
    setUpdatedData(studentData);
    setIsUpdating(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(studentData.HousingType);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/housing/update/male/${studentData._id}`,
        {
          buildingId: selectedBuilding,
          floorId: selectedFloor,
          roomId: selectedRoom,
          housingDate: updatedData.housingDate,
          evacuationDate: updatedData.evacuationDate,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      createLogs();
      incremented();
      console.log(response);
      setIsUpdating(false);
      setError(""); // Clear error if save is successful
    } catch (error) {
      if (error.response) {
        console.log(
          "Server responded with error status:",
          error.response.status
        );
        console.log("Error data:", error.response.data);
        setError(error.response.data.msgError); // Set error message state
      } else if (error.request) {
        console.log("No response received from server.");
        setError("No response received from server.");
      } else {
        console.log("Error setting up the request:", error.message);
        setError(error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setUpdatedData({});
  };

  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "add",
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
        action: "اضافة سكن",
        objectName: `للطالب ${studentData.studentName},برقم الطالب ${studentData.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {auth && (auth.athurity === "الكل" || auth.athurity === "تعديل") && (
          <button
            onClick={toggleDiv}
            className="button"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            تعديل
          </button>
        )}

        {studentData && (
          <Table>
            <thead>
              <tr>
                <th>الاسم</th>
                <td>{studentData.studentName}</td>
              </tr>
              <tr>
                <th>المبنى</th>
                <td>{studentData.buildingName}</td>
              </tr>
              <tr>
                <th>تاريخ السكن</th>
                <td>
                  {isUpdating ? (
                    <textarea
                      name="housingDate"
                      value={updatedData.housingDate || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    new Date(studentData.housingDate).toLocaleDateString()
                  )}
                </td>
              </tr>
              <tr>
                <th> تاريخ الإخلاء</th>
                <td>
                  {isUpdating ? (
                    <textarea
                      name="evacuationDate"
                      value={updatedData.evacuationDate || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    new Date(studentData.evacuationDate).toLocaleDateString()
                  )}
                </td>
              </tr>
              <tr>
                <th>تم الإخلاء</th>
                <td>
                  {isUpdating ? (
                    <textarea
                      name="isEvacuated"
                      value={updatedData.isEvacuated || ""}
                      onChange={handleChange}
                      disabled // Disable editing for this field
                    />
                  ) : studentData.isEvacuated ? (
                    "نعم"
                  ) : (
                    "لا"
                  )}
                </td>
              </tr>
              <tr>
                <th>تم التحويل</th>
                <td>
                  {isUpdating ? (
                    <textarea
                      name="transferred"
                      value={updatedData.transferred || ""}
                      onChange={handleChange}
                      disabled // Disable editing for this field
                    />
                  ) : studentData.transferred ? (
                    "نعم"
                  ) : (
                    "لا"
                  )}
                </td>
              </tr>
            </thead>
          </Table>
        )}
      </div>{" "}
      {isUpdating && (
        <div>
          <button style={{ color: "green" }} onClick={handleSave}>
            حفظ
          </button>
          <button style={{ color: "red" }} onClick={handleCancel}>
            إلغاء
          </button>
        </div>
      )}
      <div className="info">
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          بيانات الطالب
        </p>
      </div>
      {studentData && studentData.buildingName && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>المبنى</th>
              <td>{studentData.buildingName}</td>
            </tr>
            <tr>
              <th>كود الغرفة</th>
              <td>{studentData.roomId}</td>
            </tr>
            <tr>
              <th>الغرفة</th>
              <td>{studentData.roomName}</td>
            </tr>
            <tr>
              <th>تاريخ السكن</th>
              <td>
                {studentData.housingDate &&
                  new Date(studentData.housingDate).toLocaleDateString()}
              </td>
            </tr>
          </thead>
        </Table>
      )}
      <div className="warning">
        <>
          {error && ( // Render Alert if error exists
            <Alert variant="danger" style={{ textAlign: "center" }}>
              {error}
            </Alert>
          )}
        </>
      </div>
      {isDivVisible && (
        <div>
          <MultilevelDropdown
            selectedCity={selectedCity}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom}
            onSelectCity={setSelectedCity}
            onSelectBuilding={setSelectedBuilding}
            onSelectFloor={setSelectedFloor}
            onSelectRoom={setSelectedRoom}
            housingType={studentData.HousingType} // Pass the housing type to MultilevelDropdown
          />
        </div>
      )}
    </div>
  );
};

export default Living;
