import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MultilevelDropdown from '../Pages/SakanTest'; 


const Living = ({ studentData }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(studentData || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/housing/");
        const { buildings, floors, rooms } = response.data;
        setBuildings(buildings);
        setFloors(floors);
        setRooms(rooms);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
        updatedData
      );
      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating data: ", error);
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
                )}{" "}
              </td>
            </tr>
          </thead>
        </Table>
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>المبنى</th>
            <td>{studentData.buildingId}</td>
          </tr>
          <tr>
            <th>الغرفة</th>
            <td>{studentData.roomId}</td>
          </tr>
          <tr>
            <th>تاريخ السكن</th>
            <td>{new Date(studentData.housingDate).toLocaleDateString()}</td>
          </tr>
        </thead>
      </Table>
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
      selectedCity={selectedBuilding}
      selectedBuilding={selectedBuilding}
      selectedFloor={selectedFloor}
      selectedRoom={selectedRoom}
      onSelectCity={setSelectedBuilding}
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
