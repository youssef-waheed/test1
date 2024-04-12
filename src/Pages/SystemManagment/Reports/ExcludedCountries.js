import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const ExcludedCountries = (_id) => {
  const [students, setStudents] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);

  const [excludedContry, setExcludedCountry] = useState({
    country: "",
    distance: "",
    StatusOfDependentAreas: "",
  });
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    fetchExcludedCountries();
  }, []);

  const fetchExcludedCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/excludedCountries/getExcludedCountries`
      );
      setStudents(response.data.data.excludedCountries);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExcludedCountry = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/excludedCountries/deleteExcludedCountries/${_id}`
      );
      // After deletion, fetch the updated list of excluded countries
      fetchExcludedCountries();
    } catch (error) {
      console.log(error);
    }
  };

  const addExcludedCountry = async () => {
    try {
      console.log("Sending data: ", {
        country: excludedContry.country,
        distance: excludedContry.distance,
        StatusOfDependentAreas: excludedContry.StatusOfDependentAreas,
      });
      const response = await axios.post(
        `http://localhost:5000/excludedCountries/addExcludedCountries`,
        {
          country: excludedContry.country,
          distance: excludedContry.distance,
          StatusOfDependentAreas: excludedContry.StatusOfDependentAreas,
        }
      );
      setExcludedCountry({
        country: "",
        distance: "",
        StatusOfDependentAreas: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>البلد</th>
            <th>المسافة </th>
            <th> مستبعده من التنسيق</th>
            <th>حدف </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.country}</td>
              <td>{student.distance}</td>
              <td>{student.StatusOfDependentAreas}</td>
              <button
                style={{
                  marginRight: "20px",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "red",
                }}
                onClick={() => deleteExcludedCountry(student._id)}
              >
                حذف
              </button>{" "}
            </tr>
          ))}
        </tbody>
      </Table>
      <button
        onClick={toggleDiv}
        className="button"
        style={{ backgroundColor: "blue", color: "white" }}
      >
        إضافة
      </button>
      {isDivVisible && (
        <div style={{ fontWeight: "bold" }}>
          <div className="select1">
            <p>إضافة </p>
          </div>
          <div className="select1">
            <Form.Label>البلد </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setExcludedCountry({
                  ...excludedContry,
                  country: e.target.value,
                });
              }}
            />
          </div>
          <div className="select1">
            <Form.Label>المسافة </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setExcludedCountry({
                  ...excludedContry,
                  distance: e.target.value,
                });
              }}
            />
          </div>
          <div className="select1">
            <Form.Label> مستبعده من التنسيق </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setExcludedCountry({
                  ...excludedContry,
                  StatusOfDependentAreas: e.target.value,
                });
              }}
            />
          </div>

          <button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={addExcludedCountry}
          >
            حفظ
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcludedCountries;
