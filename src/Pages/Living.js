import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import MultilevelDropdown from "../Pages/SakanTest";

const Living = ({ studentData }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(studentData || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  

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
        }
      );
      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      if (error.response) {
        console.log(
          "Server responded with error status:",
          error.response.status
        );
        console.log("Error data:", error.response.data);
      } else if (error.request) {
        console.log("No response received from server.");
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setUpdatedData({});
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleDiv}
          className="button"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          تعديل
        </button>
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
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              This is a {variant} alert—check it out!
            </Alert>
          ))}
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
          />
        </div>
      )}
    </div>
  );
};

export default Living;
