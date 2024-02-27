//
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const Living = ({ studentData }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(studentData || {});
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
    setUpdatedData(studentData); // Set initial data to be updated
    setIsUpdating(true); // Enable updating mode
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

  if (!studentData) {
    return (
      <div className="table-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>{" "}
      </div>
    );
  }

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
              <td>{studentData.buildingId}</td>
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
    </div>
  );
};

export default Living;
