import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const CityStructure = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    fetchCityStructure();
  }, []);

  const fetchCityStructure = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Structure");
      setCityData(response.data.data);
      console.log("city data is",cityData);
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
            <th>اسم المدينة</th>
            <th>اسم المبنى</th>
            <th>النوع</th>
            <th>عدد الغرف الإدارية</th>
            <th>عدد القاعات الرياضية</th>
            <th>عدد قاعات الانترنت</th>
            <th>عدد الطلاب</th>
            <th>عدد الغرف الكلي</th>
          </tr>
        </thead>
        <tbody>
          {cityData &&
            cityData.map((city, index) => (
              city.Buildings.map((building, index) => (
                <tr key={index}>
                  <td>{city.CityName}</td>
                  <td>{building.BuildingName}</td>
                  <td>{building.BuildingGender}</td>
                  <td>{building.AdministrativeRooms}</td>
                  <td>{building.sportsHall}</td>
                  <td>{building.InternetHall}</td>
                  <td>{building.TotalOccupantsCount}</td>
                  <td>{building.TotalRoomsCount}</td>
                </tr>
              ))
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CityStructure;
