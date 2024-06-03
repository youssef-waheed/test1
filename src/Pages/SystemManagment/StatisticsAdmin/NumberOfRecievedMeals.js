import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const NumberOfRecievedMeals = () => {
  const [ofYear, setOfYear] = useState("");
  const [receivedMeals, setReceivedMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState("");
  const [file, setFile] = useState(null);
  const mealsType = ["استلام فطار", "استلام غداء", "استلام عشاء"];

  useEffect(() => {
    fetchNumberOfMeals();
  }, [ofYear, selectedMeals]);

  const fetchNumberOfMeals = async () => {
    const queryString = `?ofYear=${ofYear}&selectedMeals=${selectedMeals}`;
    if (ofYear || selectedMeals) {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/numberOfReceivedMeals${queryString}`
        );
        setReceivedMeals(response.data.numberOfReceivedMeals || {});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleYearChange = (event) => {
    setOfYear(event.target.value);
  };

  const handleMealType = (event) => {
    setSelectedMeals(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("receivedMeals", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/v1/received-meal/receive-meals",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle response after successful upload
        console.log(response.data);
        // Optionally, refetch the meal data
        fetchNumberOfMeals();
      } catch (error) {
        console.log(error);
      }
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
            <option>اختر العام الاكديمي</option>
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </Form.Select>
        </div>
        <div className="select1">
          <p style={{ fontWeight: "bold", width: "30px" }}>نوع الوجبة</p>
          <Form.Select
            style={{ width: "150px" }}
            size="sm"
            className="Type"
            onChange={handleMealType}
            value={selectedMeals}
          >
            <option>اختر نوع الوجبة...</option>
            {mealsType.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="upload">
          <form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Excel File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </form>
        </div>
      </div>
      <div className="coll">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>المبنى</th>
              <th>عدد الوجبات المستلمة</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(receivedMeals).length > 0 ? (
              Object.entries(receivedMeals).map(([building, count], index) => (
                <tr key={index}>
                  <td>{building}</td>
                  <td>{count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  <Alert
                    variant="danger"
                    style={{
                      textAlign: "center",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    لا يوجد بيانات
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default NumberOfRecievedMeals;
