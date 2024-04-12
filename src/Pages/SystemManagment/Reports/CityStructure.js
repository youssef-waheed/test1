import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const CityStructure = () => {
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    fetchCityStructure();
  }, []);

  const fetchCityStructure = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Structure`);
      setCityData(response.data.data.BuildingWithTotalRoomsCount); // Set the fetched data to state
      setCity(response.data.data.city);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>المبانى بأعداد الغرف</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>اسم المبنى</th>
            <th>النوع</th>
            <th>نوع المدينة</th>
            <th>المبنى</th>
            <th>الغرف الإدارية</th>
            <th>القاعات الرياضية</th>
            <th>قاعة الانترنت</th>
            <th>عدد الطلاب</th>
            <th>عدد الغرف الكلي</th>
          </tr>
        </thead>
        <tbody>
          {cityData &&
            cityData.map((building, index) => (
              <tr key={index}>
                <td>{building.BuildingName}</td>
                <td>{building.BuildingGender}</td>
                <td>{building.cityGender}</td>
                <td> {city[index]?.Name || ""} </td>{" "}
                <td> {city[index]?.AdministrativeRooms || ""} </td>{" "}
                <td> {city[index]?.sportsHall || ""} </td>{" "}
                <td> {city[index]?.InternetHall || ""} </td>{" "}
                {/* Use optional chaining and provide a default value */}
                <td>{building.totalOccupantsCount}</td>
                <td>{building.totalRoomsCount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CityStructure;
